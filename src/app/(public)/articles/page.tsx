"use client";

import ArticleList from "@/components/Article/ArticleList";
import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import Tags from "@/components/Sidebar/Tags";
import { listArticles } from "@/services/article-api";
import { ArticleFilter, Article, ArticleSortBy } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { useEffect, useState } from "react";

export default function Page() {
  // TODO This code is commented out because `useSearchParams` is not working in CSR in this way.
  // URL search parameters
  //const searchParams = useSearchParams();
  //const keyword = searchParams.get("keyword");
  //const page = searchParams.get("page");

  const [articles, setArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const filter: ArticleFilter = {
      Keyword: "", //keyword || "",
      Statuses: [],
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
  }, [sortBy]);

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
