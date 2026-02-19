import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5004; // Ensure port doesn't conflict. User=5001, Job=5002, Payment=5003?

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/api/blog", postRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", service: "Blog Service" });
});

app.listen(PORT, () => {
    console.log(`Blog service is running on http://localhost:${PORT}`);
});
