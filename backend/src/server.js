import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import enquiriesRouter from "./routes/enquiries.js";
import emailRouter from "./routes/email.js";
import { testSupabaseConnection } from "./db/supabase.js";

// Load environment variables from server .env and root .env fallback
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for Next.js frontend
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://127.0.0.1:3000", "*"],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger
app.use((req, res, next) => {
  console.log(`📡 [${new Date().toLocaleTimeString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Virtue IN Agency API Server is running smoothly 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Register API routes
app.use("/api/enquiries", enquiriesRouter);
app.use("/api", emailRouter);

// Root route
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Virtue IN Agency API</title></head>
      <body style="font-family: system-ui; background: #0F172A; color: #fff; padding: 40px; text-align: center;">
        <h1 style="color: #FFB800;">⚡ Virtue IN Agency API Server</h1>
        <p style="color: #94A3B8;">Status: Online on Port ${PORT}</p>
        <p><a href="/api/health" style="color: #38BDF8;">View API Health Check</a></p>
      </body>
    </html>
  `);
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: "API Route Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err);
  res.status(500).json({ success: false, error: err.message || "Internal Server Error" });
});

// Start Server & Test DB
app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 [Virtue IN Backend] Server running on http://localhost:${PORT}`);
  console.log(`📡 API Endpoints: http://localhost:${PORT}/api/enquiries`);
  console.log(`======================================================`);

  // Test Supabase connection
  await testSupabaseConnection();
});
