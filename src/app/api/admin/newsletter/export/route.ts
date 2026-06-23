import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-api";
import { connectDB } from "@/lib/mongodb";
import { Newsletter } from "@/models/Newsletter";

export async function GET() {
  const guard = await requireAdminApi("editorial");
  if (guard.error) return guard.error;

  await connectDB();
  const subscribers = await Newsletter.find({ isActive: true })
    .select("email preferences subscribedAt")
    .sort({ subscribedAt: -1 })
    .lean();

  const header = "email,preferences,subscribedAt\n";
  const rows = subscribers
    .map((s) => {
      const prefs = (s.preferences ?? []).join("|");
      const date = s.subscribedAt ? new Date(s.subscribedAt).toISOString() : "";
      return `"${s.email}","${prefs}","${date}"`;
    })
    .join("\n");

  return new NextResponse(header + rows, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="newsletter-subscribers.csv"',
    },
  });
}
