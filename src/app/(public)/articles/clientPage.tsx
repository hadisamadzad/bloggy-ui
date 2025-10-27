"use client";

import { useEffect, useState } from "react";
import { listPublishedArticles } from "@/services/article-api";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { Article, ArticleFilter, ArticleSortBy } from "@/types/article";
import ArticleList from "@/components/Article/ArticleList";

export default function ClientPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filter: ArticleFilter = {
      Keyword: "",
      Statuses: [],
      TagIds: [],
      SortBy: sortBy.toString(),
      Page: 1,
      PageSize: 14,
    };

    Promise.all([listPublishedArticles(filter)])
      .then(([apiArticles]) => {
        setArticles(apiArticles?.results.map(mapApiArticleToArticle) ?? []);
      })
      .catch(() => setError("Failed to load content."))
      .finally(() => setLoading(false));
  }, [sortBy]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ArticleList
      articles={articles}
      sortedBy={sortBy}
      onSortChange={setSortBy}
    />
  );
}
