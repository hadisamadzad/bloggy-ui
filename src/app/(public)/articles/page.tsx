"use client";

import ArticleList, { Article } from "@/components/Article/ArticleList";
import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import Tags from "@/components/Sidebar/Tags";
import { ApiArticle, PaginatedApiArticle } from "@/types/ApiArticle";
import { useEffect, useState } from "react";

// Add this mapping function in your file (e.g., page.tsx)
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
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const queryModel = {
      keyword: "",
      statuses: [],
      tagIds: [],
      sortBy: "CreatedAtOldest",
      page: 1,
      pageSize: 10,
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
        const mapped = data.results.map(mapApiArticleToArticle);
        setArticles(mapped);
      });
  }, []);

  return (
    <>
      <Hero />
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
          <div className="flex-2">
            <ArticleList articles={articles} />
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
