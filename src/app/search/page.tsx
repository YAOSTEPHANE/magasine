"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Search } from "lucide-react";
import { ArticleCard } from "@/components/article/ArticleCard";
import type { ArticleListItem } from "@/types";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [results, setResults] = useState<ArticleListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        setResults(data.results ?? []);
        setSearched(true);
      })
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-[1320px] mx-auto px-4 lg:px-6 py-8 lg:py-12">
      <div className="text-center mb-12">
        <Search className="w-10 h-10 text-gold mx-auto mb-4" />
        <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal mb-2">
          Search
        </h1>
        {query && (
          <p className="text-muted">
            Results for &ldquo;<span className="text-charcoal font-medium">{query}</span>&rdquo;
          </p>
        )}
      </div>

      {loading && (
        <p className="text-center text-muted py-20">Searching...</p>
      )}

      {!loading && searched && results.length === 0 && (
        <p className="text-center text-muted py-20">
          No results found. Try different keywords.
        </p>
      )}

      {!loading && results.length > 0 && (
        <>
          <p className="text-sm text-muted mb-8">{results.length} article(s) found</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}

      {!query && (
        <p className="text-center text-muted py-20">
          Use the search bar to find articles.
        </p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center py-20 text-muted">Loading...</p>}>
      <SearchResults />
    </Suspense>
  );
}
