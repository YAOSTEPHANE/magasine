import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export const MEDIA_UPLOAD_DIR = "public/uploads/media";

export const MEDIA_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "application/pdf",
] as const;

export const MEDIA_MAX_BYTES = 15 * 1024 * 1024;

export type MediaFileKind = "image" | "video" | "podcast" | "document";

export function mediaKindFromMime(mime: string): MediaFileKind {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  if (mime.startsWith("audio/")) return "podcast";
  return "document";
}

export function extensionFromMediaMime(mime: string): string {
  switch (mime) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpg";
    case "image/webp":
      return ".webp";
    case "image/gif":
      return ".gif";
    case "video/mp4":
      return ".mp4";
    case "audio/mpeg":
    case "audio/mp3":
      return ".mp3";
    case "application/pdf":
      return ".pdf";
    default:
      return ".bin";
  }
}

export async function saveMediaFileToDisk(file: File): Promise<string> {
  const ext = extensionFromMediaMime(file.type);
  const filename = `${Date.now()}-${randomBytes(6).toString("hex")}${ext}`;
  const dir = path.join(process.cwd(), MEDIA_UPLOAD_DIR);
  await mkdir(dir, { recursive: true });

  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/media/${filename}`;
}
