import mongoose, { Schema, type Model } from "mongoose";
import type { UserRole } from "@/types";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: UserRole;
  isPremium: boolean;
  isBanned: boolean;
  savedArticles: mongoose.Types.ObjectId[];
  readingHistory: mongoose.Types.ObjectId[];
  searchHistory: string[];
  newsletterPreferences: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["super_admin", "admin", "editor", "author", "contributor", "reader"],
      default: "reader",
    },
    isPremium: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    savedArticles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    readingHistory: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    searchHistory: [{ type: String }],
    newsletterPreferences: [{ type: String }],
  },
  { timestamps: true }
);

export const User: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", UserSchema);
