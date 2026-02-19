import { Request, Response } from "express";
import { sql } from "../utils/db.js";
import { CreatePostSchema, UpdatePostSchema } from "../models/post.model.js";
import { AuthenticatedRequest } from "../middlewares/auth.js";
import { ZodError } from "zod";

// Helper to generate slug
const generateSlug = (title: string) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
};

export const createPost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const validation = CreatePostSchema.safeParse(req.body);

        if (!validation.success) {
            res.status(400).json({ message: "Validation Error", errors: validation.error.format() });
            return;
        }

        const { title, tags, cover_image, sections } = validation.data;
        const slug = validation.data.slug || generateSlug(title);

        // Check if slug exists
        const existing = await sql`SELECT id FROM blog_posts WHERE slug = ${slug}`;
        if (existing.length > 0) {
            res.status(400).json({ message: "Slug already exists. Please choose a different title or slug." });
            return;
        }

        const result = await sql`
      INSERT INTO blog_posts (title, slug, author_id, tags, cover_image, sections)
      VALUES (${title}, ${slug}, ${user.user_id}, ${tags || []}, ${cover_image || null}, ${JSON.stringify(sections)})
      RETURNING *
    `;

        res.status(201).json({ message: "Post created successfully", post: result[0] });
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { page = 1, limit = 10, search, tag } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        let query = sql`SELECT * FROM blog_posts WHERE 1=1`;
        let countQuery = sql`SELECT COUNT(*) FROM blog_posts WHERE 1=1`;

        if (search) {
            // Simple search implementation
            // Use SQL template literal composition if search is present
            // For now, let's skip complex dynamic query building with raw neon sql tag unless careful
            // A safe way with neon:
            const posts = await sql`
        SELECT * FROM blog_posts 
        WHERE (${search}::text IS NULL OR title ILIKE ${'%' + search + '%'})
        AND (${tag}::text IS NULL OR ${tag} = ANY(tags))
        ORDER BY created_at DESC
        LIMIT ${Number(limit)} OFFSET ${offset}
      `;
            const total = await sql`
        SELECT COUNT(*) FROM blog_posts 
        WHERE (${search}::text IS NULL OR title ILIKE ${'%' + search + '%'})
        AND (${tag}::text IS NULL OR ${tag} = ANY(tags))
      `;

            res.status(200).json({
                posts,
                total: total[0].count,
                page: Number(page),
                limit: Number(limit)
            });
            return;
        }

        // Default fetch
        const posts = await sql`
      SELECT * FROM blog_posts 
      ORDER BY created_at DESC
      LIMIT ${Number(limit)} OFFSET ${offset}
    `;
        const total = await sql`SELECT COUNT(*) FROM blog_posts`;

        res.status(200).json({
            posts,
            total: total[0].count,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        console.error("Get All Posts Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getPostBySlug = async (req: Request, res: Response): Promise<void> => {
    try {
        const { slug } = req.params; // Treat ID param as slug or create dedicated endpoint
        // Assuming /:idOrSlug

        // Check if UUID or Slug. Actually let's assume slug for public URL.
        const result = await sql`SELECT * FROM blog_posts WHERE slug = ${slug} OR id::text = ${slug}`;

        if (result.length === 0) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        // Fetch author details if needed (optional join)
        // For now returning raw post
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Get Post Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updatePost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.user;

        // functionality to verify ownership
        const existing = await sql`SELECT author_id FROM blog_posts WHERE id = ${id}`;
        if (existing.length === 0) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        if (existing[0].author_id !== user?.user_id) {
            res.status(403).json({ message: "Forbidden. You are not the author." });
            return;
        }

        const validation = UpdatePostSchema.safeParse(req.body);
        if (!validation.success) {
            res.status(400).json({ message: "Validation Error", errors: validation.error.format() });
            return;
        }

        const { title, tags, cover_image, sections, slug } = validation.data;
        const result = await sql`
        UPDATE blog_posts 
        SET 
          title = COALESCE(${title}, title),
          slug = COALESCE(${slug}, slug),
          tags = COALESCE(${tags}, tags),
          cover_image = COALESCE(${cover_image}, cover_image),
          sections = COALESCE(${JSON.stringify(sections) as any}, sections),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${id}
        RETURNING *
     `;

        res.status(200).json({ message: "Post updated", post: result[0] });
    } catch (error) {
        console.error("Update Post Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deletePost = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = req.user;

        const existing = await sql`SELECT author_id FROM blog_posts WHERE id = ${id}`;
        if (existing.length === 0) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        if (existing[0].author_id !== user?.user_id) {
            res.status(403).json({ message: "Forbidden. You are not the author." });
            return;
        }

        await sql`DELETE FROM blog_posts WHERE id = ${id}`;
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMyPosts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const { page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const posts = await sql`
            SELECT * FROM blog_posts 
            WHERE author_id = ${user.user_id} 
            ORDER BY created_at DESC
            LIMIT ${Number(limit)} OFFSET ${offset}
        `;

        const total = await sql`
            SELECT COUNT(*) FROM blog_posts 
            WHERE author_id = ${user.user_id}
        `;

        res.status(200).json({
            posts,
            total: total[0].count,
            page: Number(page),
            limit: Number(limit)
        });
    } catch (error) {
        console.error("Get My Posts Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
