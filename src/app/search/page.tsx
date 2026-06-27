import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchPageView } from "@/components/search/SearchPageView";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Global South Watch — news, commentary, explainers, and regional coverage.",
};

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="search-page">
          <div className="container search-page-inner">
            <p className="search-page-loading">Loading search…</p>
          </div>
        </div>
      }
    >
      <SearchPageView />
    </Suspense>
  );
}
