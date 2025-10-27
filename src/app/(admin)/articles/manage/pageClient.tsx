"use client";

import ArticleList from "@/components/Article/ArticleList";
import { listArticles } from "@/services/article-api";
import { ArticleFilter, Article, ArticleSortBy } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { useEffect, useState } from "react";

export default function ClientPage() {
  // TODO This code is commented out because `useSearchParams` is not working in CSR in this way.
  // URL search parameters
  //const searchParams = useSearchParams();
  //const keyword = searchParams.get("keyword");
  //const page = searchParams.get("page");

  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [onlyDrafts, setOnlyDrafts] = useState(false);
  const [onlyArchived, setOnlyArchived] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let statuses: string[] = [];
    if (onlyDrafts && !onlyArchived) {
      statuses = ["Draft"];
    } else if (onlyArchived && !onlyDrafts) {
      statuses = ["Archived"];
    } // else: all selected, statuses = []
    const filter: ArticleFilter = {
      Keyword: "", //keyword || "",
      Statuses: statuses,
      TagIds: [],
      SortBy: sortBy.toString(),
      Page: 1, //page ? parseInt(page) : 1,
      PageSize: 14,
    };
    setLoading(true);
    setError(null);

    listArticles(filter)
      .then((apiArticles) => {
        const articles = apiArticles?.results.map(mapApiArticleToArticle) ?? [];
        setArticles(articles);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [sortBy, onlyDrafts, onlyArchived]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // Don't return early if no articles; show the list with an empty message instead
  return (
    <>
      <ArticleList
        articles={articles}
        sortedBy={sortBy}
        onSortChange={setSortBy}
        onlyDrafts={onlyDrafts}
        onlyArchived={onlyArchived}
        onOnlyDraftsChange={setOnlyDrafts}
        onOnlyArchivedChange={setOnlyArchived}
        isAdmin={true}
      />
    </>
  );
}
