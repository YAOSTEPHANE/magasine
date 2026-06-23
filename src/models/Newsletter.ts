import mongoose, { Schema, type Model } from "mongoose";

export interface INewsletterSubscriber {
  _id: mongoose.Types.ObjectId;
  email: string;
  preferences: string[];
  isActive: boolean;
  subscribedAt: Date;
}

const NewsletterSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true },
    preferences: [{ type: String }],
    isActive: { type: Boolean, default: true },
    subscribedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Newsletter: Model<INewsletterSubscriber> =
  mongoose.models.Newsletter ??
  mongoose.model<INewsletterSubscriber>("Newsletter", NewsletterSchema);
