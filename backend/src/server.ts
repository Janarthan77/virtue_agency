import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import galleryRoutes from "./routes/gallery.routes.js";
import enquiriesRoutes from "./routes/enquiries.routes.js";
import emailRoutes from "./routes/email.routes.js";
import statsRoutes from "./routes/stats.routes.js";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend website & admin origins
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Request Logger
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "Virtue IN Agency API Server",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// API Routes
app.use("/api/upload", uploadRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/enquiries", enquiriesRoutes);
app.use("/api/send-enquiry", enquiriesRoutes); // Aliased for website form
app.use("/api/send-email", emailRoutes);
app.use("/api/stats", statsRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Server Error:", err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Virtue IN Agency Backend running on http://localhost:${PORT}`);
  console.log(`📡 Ready for Cloudflare R2 Uploads, Supabase DB queries & Resend emails.`);
});

export default app;
