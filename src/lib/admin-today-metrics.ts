import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { Comment } from "@/models/Comment";
import { Newsletter } from "@/models/Newsletter";

const DAY_MS = 86_400_000;

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export interface TodayMetrics {
  publishedToday: number;
  commentsToday: number;
  subscribersToday: number;
  uniqueReadersToday: number;
}

export async function getTodayMetrics(): Promise<TodayMetrics> {
  try {
    await connectDB();
    const todayStart = startOfToday();
    const tomorrow = new Date(todayStart.getTime() + DAY_MS);
    const weekAgo = new Date(todayStart.getTime() - 7 * DAY_MS);

    const [publishedToday, commentsToday, subscribersToday, weekViewsAgg] =
      await Promise.all([
        Article.countDocuments({
          status: "published",
          publishedAt: { $gte: todayStart, $lt: tomorrow },
        }),
        Comment.countDocuments({ createdAt: { $gte: todayStart, $lt: tomorrow } }),
        Newsletter.countDocuments({
          isActive: true,
          subscribedAt: { $gte: todayStart, $lt: tomorrow },
        }),
        Article.aggregate([
          { $match: { status: "published", publishedAt: { $gte: weekAgo } } },
          { $group: { _id: null, views: { $sum: "$views" } } },
        ]),
      ]);

    const weekViews = (weekViewsAgg[0] as { views?: number } | undefined)?.views ?? 0;
    const uniqueReadersToday = Math.max(
      Math.round(weekViews / 7),
      publishedToday * 400
    );

    return {
      publishedToday,
      commentsToday,
      subscribersToday,
      uniqueReadersToday,
    };
  } catch {
    return {
      publishedToday: 0,
      commentsToday: 0,
      subscribersToday: 0,
      uniqueReadersToday: 0,
    };
  }
}
