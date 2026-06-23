import { connectDB } from "@/lib/mongodb";
import { Article } from "@/models/Article";
import { User } from "@/models/User";
import { Comment } from "@/models/Comment";
import { Newsletter } from "@/models/Newsletter";
import { Category } from "@/models/Category";

export interface DashboardKpi {
  label: string;
  value: number;
  trend: number;
  sparkline: number[];
  format?: "number" | "compact";
}

export interface TimelinePoint {
  label: string;
  date: string;
  articles: number;
  comments: number;
  subscribers: number;
}

export interface CategoryStat {
  name: string;
  count: number;
  views: number;
  color: string;
}

export interface PipelineSlice {
  status: string;
  label: string;
  count: number;
}

export interface TopArticleRow {
  _id: string;
  title: string;
  views: number;
  category: string;
  status: string;
}

export interface RecentArticleRow {
  _id: string;
  title: string;
  status: string;
  category: string;
  updatedAt: string;
}

export interface AdminDashboardData {
  kpis: DashboardKpi[];
  timeline: TimelinePoint[];
  categories: CategoryStat[];
  pipeline: PipelineSlice[];
  topArticles: TopArticleRow[];
  recentArticles: RecentArticleRow[];
  totalViews: number;
  pendingReview: number;
  pendingComments: number;
  avgReadingTime: number;
}

const DAY_MS = 86_400_000;

function daysAgo(n: number) {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function trendPercent(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

function buildSparkline(counts: number[]) {
  return counts.length > 0 ? counts : [0];
}

async function countInRange(
  model: typeof Article | typeof Comment | typeof Newsletter | typeof User,
  field: string,
  from: Date,
  to: Date,
  extra: Record<string, unknown> = {}
) {
  const filter = { ...extra, [field]: { $gte: from, $lt: to } };
  return model.countDocuments(filter as never);
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  await connectDB();

  const now = new Date();
  const rangeDays = 14;
  const dayStarts = Array.from({ length: rangeDays }, (_, i) => daysAgo(rangeDays - 1 - i));

  const [
    published,
    users,
    comments,
    subscribers,
    pendingReview,
    pendingComments,
    pipelineRaw,
    categoryAgg,
    topArticles,
    recentArticles,
    viewsAgg,
    readingAgg,
    ...dailyCounts
  ] = await Promise.all([
    Article.countDocuments({ status: "published" }),
    User.countDocuments(),
    Comment.countDocuments(),
    Newsletter.countDocuments({ isActive: true }),
    Article.countDocuments({ status: "review" }),
    Comment.countDocuments({ isApproved: false }),
    Article.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Article.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: "$category", count: { $sum: 1 }, views: { $sum: "$views" } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
    ]),
    Article.find({ status: "published" })
      .populate("category", "name color")
      .sort({ views: -1 })
      .limit(6)
      .select("title views status category")
      .lean(),
    Article.find()
      .populate("category", "name")
      .sort({ updatedAt: -1 })
      .limit(6)
      .select("title status category updatedAt")
      .lean(),
    Article.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: null, total: { $sum: "$views" } } },
    ]),
    Article.aggregate([
      { $match: { status: "published" } },
      { $group: { _id: null, avg: { $avg: "$readingTime" } } },
    ]),
  ]);

  const periodQueries: Promise<number>[] = [];
  for (const start of dayStarts) {
    const end = new Date(start.getTime() + DAY_MS);
    periodQueries.push(
      countInRange(Article, "publishedAt", start, end, { status: "published" }),
      countInRange(Comment, "createdAt", start, end),
      countInRange(Newsletter, "subscribedAt", start, end, { isActive: true }),
      countInRange(User, "createdAt", start, end)
    );
  }

  const periodResults = await Promise.all(periodQueries);

  const articlesPerDay: number[] = [];
  const commentsPerDay: number[] = [];
  const subscribersPerDay: number[] = [];
  const usersPerDay: number[] = [];

  for (let i = 0; i < rangeDays; i++) {
    const base = i * 4;
    articlesPerDay.push(periodResults[base] ?? 0);
    commentsPerDay.push(periodResults[base + 1] ?? 0);
    subscribersPerDay.push(periodResults[base + 2] ?? 0);
    usersPerDay.push(periodResults[base + 3] ?? 0);
  }

  const last7Articles = articlesPerDay.slice(-7).reduce((a, b) => a + b, 0);
  const prev7Articles = articlesPerDay.slice(0, 7).reduce((a, b) => a + b, 0);
  const last7Comments = commentsPerDay.slice(-7).reduce((a, b) => a + b, 0);
  const prev7Comments = commentsPerDay.slice(0, 7).reduce((a, b) => a + b, 0);
  const last7Subs = subscribersPerDay.slice(-7).reduce((a, b) => a + b, 0);
  const prev7Subs = subscribersPerDay.slice(0, 7).reduce((a, b) => a + b, 0);
  const last7Users = usersPerDay.slice(-7).reduce((a, b) => a + b, 0);
  const prev7Users = usersPerDay.slice(0, 7).reduce((a, b) => a + b, 0);

  const totalViews = (viewsAgg[0] as { total?: number } | undefined)?.total ?? 0;
  const avgReadingTime = Math.round(
    (readingAgg[0] as { avg?: number } | undefined)?.avg ?? 0
  );

  const categoryIds = categoryAgg.map((c) => c._id);
  const categoriesDocs = await Category.find({ _id: { $in: categoryIds } })
    .select("name color")
    .lean();
  const catMap = Object.fromEntries(
    categoriesDocs.map((c) => [String(c._id), { name: c.name, color: c.color ?? "#1a3896" }])
  );

  const categories: CategoryStat[] = categoryAgg.map((row) => {
    const meta = catMap[String(row._id)] ?? { name: "Uncategorized", color: "#6b6b6b" };
    return {
      name: meta.name,
      count: row.count as number,
      views: row.views as number,
      color: meta.color,
    };
  });

  const statusLabels: Record<string, string> = {
    published: "Published",
    review: "In review",
    draft: "Drafts",
    scheduled: "Scheduled",
  };

  const pipeline: PipelineSlice[] = (pipelineRaw as { _id: string; count: number }[]).map(
    (row) => ({
      status: String(row._id ?? "unknown"),
      label: statusLabels[row._id] ?? String(row._id ?? "Unknown"),
      count: Number(row.count) || 0,
    })
  );

  const timeline: TimelinePoint[] = dayStarts.map((start, i) => ({
    date: start.toISOString(),
    label: formatDayLabel(start),
    articles: articlesPerDay[i] ?? 0,
    comments: commentsPerDay[i] ?? 0,
    subscribers: subscribersPerDay[i] ?? 0,
  }));

  const kpis: DashboardKpi[] = [
    {
      label: "Published articles",
      value: published,
      trend: trendPercent(last7Articles, prev7Articles),
      sparkline: buildSparkline(articlesPerDay),
    },
    {
      label: "Total readership",
      value: totalViews,
      trend: trendPercent(last7Articles, prev7Articles),
      sparkline: buildSparkline(articlesPerDay),
      format: "compact",
    },
    {
      label: "Newsletter subscribers",
      value: subscribers,
      trend: trendPercent(last7Subs, prev7Subs),
      sparkline: buildSparkline(subscribersPerDay),
    },
    {
      label: "Registered readers",
      value: users,
      trend: trendPercent(last7Users, prev7Users),
      sparkline: buildSparkline(usersPerDay),
    },
  ];

  return {
    kpis,
    timeline,
    categories,
    pipeline,
    topArticles: topArticles.map((a) => ({
      _id: String(a._id),
      title: a.title,
      views: a.views ?? 0,
      category: (a.category as { name?: string } | null)?.name ?? "—",
      status: a.status,
    })),
    recentArticles: recentArticles.map((a) => ({
      _id: String(a._id),
      title: a.title,
      status: a.status,
      category: (a.category as { name?: string } | null)?.name ?? "—",
      updatedAt: a.updatedAt ? new Date(a.updatedAt).toISOString() : now.toISOString(),
    })),
    totalViews,
    pendingReview,
    pendingComments,
    avgReadingTime,
  };
}
