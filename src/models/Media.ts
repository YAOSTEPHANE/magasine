import mongoose, { Schema, type Model } from "mongoose";
import type { MediaFileKind } from "@/lib/media-storage";

export interface IMedia {
  _id: mongoose.Types.ObjectId;
  title: string;
  url: string;
  mimeType: string;
  kind: MediaFileKind;
  sizeBytes: number;
  uploadedBy?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSchema = new Schema<IMedia>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    kind: {
      type: String,
      enum: ["image", "video", "podcast", "document"],
      required: true,
    },
    sizeBytes: { type: Number, default: 0 },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

MediaSchema.index({ kind: 1, createdAt: -1 });

export const Media: Model<IMedia> =
  mongoose.models.Media ?? mongoose.model<IMedia>("Media", MediaSchema);
