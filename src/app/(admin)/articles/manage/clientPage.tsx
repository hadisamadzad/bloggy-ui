"use client";

import ArticleList from "@/components/Article/ArticleList";
import { listArticles } from "@/services/article-api";
import { ArticleFilter, Article, ArticleSortBy } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { useEffect, useState, useRef } from "react";

export default function ClientPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [onlyDrafts, setOnlyDrafts] = useState(false);
  const [onlyArchived, setOnlyArchived] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPageReached, setLastPageReached] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Reset articles and paging when filters change
  useEffect(() => {
    setArticles([]);
    setCurrentPage(1);
    setLastPageReached(false);
    setLoading(true);
    setLoadingMore(false);
    setError(null);
  }, [sortBy, onlyDrafts, onlyArchived]);

  useEffect(() => {
    let statuses: string[] = [];
    if (onlyDrafts && !onlyArchived) {
      statuses = ["Draft"];
    } else if (onlyArchived && !onlyDrafts) {
      statuses = ["Archived"];
    }
    const filter: ArticleFilter = {
      Keyword: "",
      Statuses: statuses,
      TagIds: [],
      SortBy: sortBy.toString(),
      Page: currentPage,
      PageSize: 10,
    };

    let isCancelled = false;
    listArticles(filter)
      .then((apiArticles) => {
        if (isCancelled || !apiArticles) return;
        setArticles((prev) => {
          const mapped = apiArticles.results.map(mapApiArticleToArticle);
          const next = filter.Page === 1 ? mapped : prev.concat(mapped);
          if (next.length >= apiArticles.totalCount) setLastPageReached(true);
          return next;
        });
      })
      .catch(() => {
        if (!isCancelled) setError("Failed to load articles.");
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
          setLoadingMore(false);
        }
      });
    return () => {
      isCancelled = true;
    };
  }, [currentPage, sortBy, onlyDrafts, onlyArchived]);

  useEffect(() => {
    if (loading || loadingMore || lastPageReached) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore && !lastPageReached) {
          setLoadingMore(true);
          setCurrentPage((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );
    const node = loaderRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, [loading, loadingMore, lastPageReached]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
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
      {!lastPageReached && <div ref={loaderRef} className="h-10" />}
    </>
  );
}
