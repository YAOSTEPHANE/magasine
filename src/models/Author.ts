import mongoose, { Schema, type Model } from "mongoose";

export interface IAuthor {
  _id: mongoose.Types.ObjectId;
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  email?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    bio: { type: String },
    avatar: { type: String },
    email: { type: String },
    social: {
      twitter: String,
      linkedin: String,
    },
  },
  { timestamps: true }
);

export const Author: Model<IAuthor> =
  mongoose.models.Author ?? mongoose.model<IAuthor>("Author", AuthorSchema);
