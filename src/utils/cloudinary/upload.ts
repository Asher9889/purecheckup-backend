// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import config from "../../config/config";

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

/** Upload options */
interface UploadOptions {
  folder?: string;
  publicId?: string; // renamed more idiomatically
}

/**
 * Uploads an image to Cloudinary
 */
export async function uploadImageFromFile(
  filePath: string,
  options: UploadOptions = {}
) {
  const { folder, publicId } = options;

  try {
    const response = await cloudinary.uploader.upload(filePath, {
      folder,
      public_id: publicId,
      resource_type: "image",
    });

    return {
      url: response.secure_url,
      publicId: response.public_id,
    };
  } catch (err: any) {
    console.error("[Cloudinary] Upload Failed:", err?.message || err);
    throw new Error("Image upload failed");
  }
}

/**
 * Returns optimized serving URL
 */
export async function getOptimizedUrl(publicId: string) {
  return cloudinary.url(publicId, {
    fetch_format: "auto",
    quality: "auto",
  });
}

/**
 * Returns auto-cropped URL
 */
export function getAutoCropUrl(publicId: string) {
  return cloudinary.url(publicId, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });
}

export default cloudinary;
