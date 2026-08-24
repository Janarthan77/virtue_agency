import { Router } from "express";
import multer from "multer";
import { uploadSingleFile, uploadMultipleFiles } from "../controllers/upload.controller.js";

const router = Router();

// Store files in memory so we can stream directly to Cloudflare R2
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 20 * 1024 * 1024, // 20MB max file size
  },
});

router.post("/", upload.single("file"), uploadSingleFile);
router.post("/multiple", upload.array("files", 25), uploadMultipleFiles);

export default router;
