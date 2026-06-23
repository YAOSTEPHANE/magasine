import mongoose, { Schema, type Model } from "mongoose";

export interface ICategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  description?: string;
  color: string;
  order: number;
  isActive: boolean;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    color: { type: String, default: "#E94560" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Category: Model<ICategory> =
  mongoose.models.Category ?? mongoose.model<ICategory>("Category", CategorySchema);
