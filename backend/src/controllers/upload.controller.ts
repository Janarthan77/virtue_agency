import { Request, Response } from "express";
import { uploadToR2 } from "../services/r2.service.js";

/**
 * Handle single file upload to Cloudflare R2
 */
export async function uploadSingleFile(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ success: false, error: "No file uploaded" });
      return;
    }

    const folder = (req.body.folder as string) || "uploads";
    const result = await uploadToR2(file.buffer, file.originalname, file.mimetype, folder);

    if (!result.success) {
      res.status(500).json({ success: false, error: result.error || "Upload failed" });
      return;
    }

    res.json({
      success: true,
      url: result.url,
      key: result.key,
      filename: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal upload error";
    res.status(500).json({ success: false, error: errorMsg });
  }
}

/**
 * Handle multiple files upload to Cloudflare R2
 */
export async function uploadMultipleFiles(req: Request, res: Response): Promise<void> {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      res.status(400).json({ success: false, error: "No files uploaded" });
      return;
    }

    const folder = (req.body.folder as string) || "uploads";
    const uploadPromises = files.map((file) =>
      uploadToR2(file.buffer, file.originalname, file.mimetype, folder)
    );

    const results = await Promise.all(uploadPromises);
    const uploaded = results
      .filter((r) => r.success)
      .map((r) => r.url);

    res.json({
      success: true,
      count: uploaded.length,
      urls: uploaded,
      results,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Internal multiple upload error";
    res.status(500).json({ success: false, error: errorMsg });
  }
}
