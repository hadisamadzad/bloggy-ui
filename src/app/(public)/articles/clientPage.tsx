"use client";

import { useEffect, useState, useRef } from "react";
import { listPublishedArticles } from "@/services/article-api";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { Article, ArticleFilter, ArticleSortBy } from "@/types/article";
import ArticleList from "@/components/Article/ArticleList";

export interface ClientPageProps {
  selectedTagId?: string;
}

export default function ClientPage({ selectedTagId }: ClientPageProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPageReached, setLastPageReached] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
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
  }, [selectedTagId, sortBy]);

  useEffect(() => {
    const filter: ArticleFilter = {
      Keyword: "",
      Statuses: [],
      TagIds: selectedTagId ? [selectedTagId] : [],
      SortBy: sortBy.toString(),
      Page: currentPage,
      PageSize: 10,
    };

    let isCancelled = false;
    listPublishedArticles(filter)
      .then((apiArticles) => {
        if (isCancelled || !apiArticles) return;
        setArticles((prev) => {
          const mapped = apiArticles.results.map(mapApiArticleToArticle);
          // Replace on first page, append on subsequent pages
          const next = filter.Page === 1 ? mapped : prev.concat(mapped);
          // Set lastPageReached if all items loaded
          if (next.length >= apiArticles.totalCount) setLastPageReached(true);
          return next;
        });
      })
      .catch(() => {
        if (!isCancelled) setError("Failed to load content.");
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
  }, [currentPage, selectedTagId, sortBy]);

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
      />
      {!lastPageReached && <div ref={loaderRef} className="h-10" />}
    </>
  );
}
