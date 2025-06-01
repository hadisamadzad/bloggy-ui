"use client";

import ArticleList, { Article } from "@/components/Article/ArticleList";
import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import Tags from "@/components/Sidebar/Tags";
import {
  ApiArticle,
  ArticleQueryModel,
  ArticleSortBy,
  PaginatedApiArticle,
} from "@/types/ApiArticle";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Map API article to internal article type
function mapApiArticleToArticle(apiArticle: ApiArticle): Article {
  return {
    title: apiArticle.title,
    summary: apiArticle.summary,
    thumbnailUrl: apiArticle.thumbnailUrl,
    readingTime: `${apiArticle.timeToReadInMinute} min read`,
    publishedAt: apiArticle.publishedAt || apiArticle.createdAt, // fallback if publishedAt is null
    updatedAt: apiArticle.updatedAt,
  };
}

export default function Page() {
  // URL search parameters
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const queryModel: ArticleQueryModel = {
      Keyword: keyword || "",
      Statuses: [],
      TagIds: [],
      SortBy: sortBy.toString(),
      Page: page ? parseInt(page) : 1,
      PageSize: 10,
    };

    // Convert model to query string
    const params = new URLSearchParams();
    Object.entries(queryModel).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value as string);
      }
    });

    fetch(
      `https://bloggy-api.hadisamadzad.com/blog/articles?${params.toString()}`
    )
      .then((res) => res.json())
      .then((data: PaginatedApiArticle) => {
        const mappedArticles = data.results.map(mapApiArticleToArticle);
        setArticles(mappedArticles);
      })
      .then(() => {});
  }, [sortBy, keyword, page]);

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
