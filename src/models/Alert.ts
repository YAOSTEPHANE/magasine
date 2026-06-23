import mongoose, { Schema, type Model } from "mongoose";

export interface IAlert {
  _id: mongoose.Types.ObjectId;
  text: string;
  link?: string;
  isActive: boolean;
  order: number;
}

const AlertSchema = new Schema<IAlert>(
  {
    text: { type: String, required: true },
    link: { type: String },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Alert: Model<IAlert> =
  mongoose.models.Alert ?? mongoose.model<IAlert>("Alert", AlertSchema);
