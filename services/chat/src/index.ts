import app from "./app.js";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { sql } from "./utils/db.js";
import { connectKafka } from "./producer.js";
import { setupSocket } from "./socket/handlers.js";

dotenv.config();

// Connect Kafka producer for offline email notifications
connectKafka();

// Create HTTP server from Express app (needed for Socket.IO)
const httpServer = createServer(app);

// Initialize Socket.IO with CORS config
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Setup socket event handlers
setupSocket(io);

async function initDB() {
    try {
        await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        conversation_id SERIAL PRIMARY KEY,
        application_id INTEGER NOT NULL UNIQUE,
        applicant_id INTEGER NOT NULL,
        recruiter_id INTEGER NOT NULL,
        job_id INTEGER NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_message_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `;

        await sql`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'message_type_enum') THEN
          CREATE TYPE message_type_enum AS ENUM ('text', 'file', 'image');
        END IF;
      END$$;
    `;

        await sql`
      CREATE TABLE IF NOT EXISTS messages (
        message_id SERIAL PRIMARY KEY,
        conversation_id INTEGER NOT NULL REFERENCES conversations(conversation_id) ON DELETE CASCADE,
        sender_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        message_type message_type_enum NOT NULL DEFAULT 'text',
        is_read BOOLEAN NOT NULL DEFAULT false,
        created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

        // Index for faster message loading per conversation
        await sql`
      CREATE INDEX IF NOT EXISTS idx_messages_conversation_id 
      ON messages(conversation_id, created_at)
    `;

        // Index for unread count queries
        await sql`
      CREATE INDEX IF NOT EXISTS idx_messages_unread 
      ON messages(conversation_id, sender_id, is_read) 
      WHERE is_read = false
    `;

        console.log("✅ Chat database tables checked/created successfully");
    } catch (error) {
        console.log("❌ Error initializing chat database", error);
        process.exit(1);
    }
}

initDB().then(() => {
    const PORT = process.env.PORT || 5007;
    httpServer.listen(PORT, () => {
        console.log(
            `🚀 Chat service is running on http://localhost:${PORT}`
        );
        console.log(`🔌 WebSocket server ready`);
    });
});

export { io };
