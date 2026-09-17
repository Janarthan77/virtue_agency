/**
 * Client-Side Image Compression Utility
 * 
 * Vercel Serverless Functions enforce a strict 4.5 MB request body limit.
 * When uploading photos directly from modern smartphone cameras or DSLRs (often 5MB - 15MB each),
 * sending raw files triggers HTTP 413 FUNCTION_PAYLOAD_TOO_LARGE.
 * 
 * This utility resizes large dimensions (max 2048px) and compresses photos to WebP/JPEG in the browser
 * before upload, keeping file sizes typically between 200KB - 800KB without visible quality loss.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
}

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const {
    maxWidth = 2048,
    maxHeight = 2048,
    quality = 0.85,
  } = options;

  // Don't compress non-image files, GIFs (to preserve animation), or SVGs
  if (
    !file.type.startsWith("image/") ||
    file.type === "image/gif" ||
    file.type === "image/svg+xml"
  ) {
    return file;
  }

  // If already under 300KB and reasonable size, keep as is
  if (file.size < 300 * 1024) {
    return file;
  }

  return new Promise<File>((resolve) => {
    // Safety timeout in case image loading hangs
    const timeout = setTimeout(() => {
      console.warn("Image compression timed out, using original file:", file.name);
      resolve(file);
    }, 10000);

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        clearTimeout(timeout);
        try {
          let { width, height } = img;

          // Downscale maintaining aspect ratio if larger than max dimensions
          if (width > maxWidth || height > maxHeight) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(file);
            return;
          }

          // Draw image to canvas
          ctx.drawImage(img, 0, 0, width, height);

          // WebP is widely supported in modern browsers and gives superior compression
          const targetMime = "image/webp";

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                resolve(file);
                return;
              }

              // Only use compressed blob if it's actually smaller
              if (blob.size < file.size) {
                const baseName = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
                const newFileName = `${baseName}.webp`;
                const compressedFile = new File([blob], newFileName, {
                  type: targetMime,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            targetMime,
            quality
          );
        } catch (err) {
          console.warn("Canvas compression failed, using original file:", err);
          resolve(file);
        }
      };

      img.onerror = () => {
        clearTimeout(timeout);
        resolve(file);
      };

      img.src = event.target?.result as string;
    };

    reader.onerror = () => {
      clearTimeout(timeout);
      resolve(file);
    };

    reader.readAsDataURL(file);
  });
}
