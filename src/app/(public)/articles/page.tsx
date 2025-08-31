"use client";

import ArticleList, { Article } from "@/components/Article/ArticleList";
import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import Tags from "@/components/Sidebar/Tags";
import { listArticles } from "@/services/blogApi";
import { ApiArticleFilter, ApiArticleSortBy } from "@/types/blog-api";
import { mapApiArticleToArticle } from "@/utils/type-mappers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  // URL search parameters
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ApiArticleSortBy>(
    ApiArticleSortBy.Latest
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const filter: ApiArticleFilter = {
    Keyword: keyword || "",
    Statuses: [],
    TagIds: [],
    SortBy: sortBy.toString(),
    Page: page ? parseInt(page) : 1,
    PageSize: 10,
  };

  useEffect(() => {
    setLoading(true);
    setError(null);

    listArticles(filter)
      .then((apiArticles) => {
        const articles = apiArticles?.results.map(mapApiArticleToArticle) ?? [];
        setArticles(articles);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [page, sortBy, keyword]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (articles.length === 0) return <div>No articles found.</div>;
  return (
    <>
      <Hero />
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
          <div className="flex-2">
            <ArticleList
              articles={articles}
              sortedBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>

          <div className="flex-1">
            <Tags />
            <div className="mt-6" />
            <SeriesArticles />
            <div className="mt-6" />
            <SeriesArticleParts />
            <div className="mt-6" />
            <AboutMe />
          </div>
        </div>
      </section>
    </>
  );
}
