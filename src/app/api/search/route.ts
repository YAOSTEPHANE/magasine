import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { searchArticles, getSearchSuggestions } from "@/lib/data";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const suggest = request.nextUrl.searchParams.get("suggest");

  if (!q) {
    return NextResponse.json({ results: [], suggestions: [] });
  }

  try {
    if (suggest === "true") {
      const suggestions = await getSearchSuggestions(q);
      return NextResponse.json({ suggestions });
    }

    const category = request.nextUrl.searchParams.get("category") ?? undefined;
    const contentType = request.nextUrl.searchParams.get("type") ?? undefined;

    const results = await searchArticles(q, { category, contentType });
    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [], error: "Search error" }, { status: 500 });
  }
}
