"use client";
import React from "react";
import BlogCard from "../BlogCard";

const blogs = [
    {
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=300&fit=crop&crop=center",
        category: "Recruiting",
        title: "10 Proven Strategies to Attract Top Tech Talent in 2025",
        date: "Feb 18, 2025",
    },
    {
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop&crop=center",
        category: "HR Tech",
        title: "How AI is Revolutionizing the Recruitment Pipeline",
        date: "Feb 12, 2025",
    },
    {
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=300&fit=crop&crop=center",
        category: "Career Tips",
        title: "Building a Company Culture That Retains Top Performers",
        date: "Feb 05, 2025",
    },
];

const Resources = () => {
    return (
        <section className="rl-section" style={{ background: "var(--rl-surface)" }}>
            <div className="rl-container">
                <div style={{ textAlign: "center", marginBottom: 40 }}>
                    <h2 className="rl-heading-2" style={{ color: "var(--rl-text)", marginBottom: 8 }}>
                        Resources & Insights
                    </h2>
                    <p className="rl-body" style={{ color: "var(--rl-text-muted)" }}>
                        Stay ahead with our latest articles and industry insights
                    </p>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 24,
                    }}
                    className="rl-blog-grid"
                >
                    {blogs.map((b, i) => (
                        <BlogCard key={i} {...b} />
                    ))}
                </div>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .rl-blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </section>
    );
};

export default Resources;
