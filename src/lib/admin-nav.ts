import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Comment } from "@/models/Comment";

export interface AdminNavStats {
  pendingReview: number;
  pendingComments: number;
}

export async function getAdminNavStats(): Promise<AdminNavStats> {
  try {
    await connectDB();
    const [pendingReview, pendingComments] = await Promise.all([
      Article.countDocuments({ status: "review" }),
      Comment.countDocuments({ isApproved: false }),
    ]);
    return { pendingReview, pendingComments };
  } catch {
    return { pendingReview: 0, pendingComments: 0 };
  }
}
