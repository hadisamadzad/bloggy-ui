"use client";

import ArticleHeader from "@/components/Article/ArticleHeader";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import Tags from "@/components/Sidebar/Tags";
import { getArticle } from "@/services/blogApi";
import { Article } from "@/types/blog";
import { mapApiArticleToArticle } from "@/utils/type-mappers";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { articleId } = useParams();
  console.log("articleId:", articleId);
  const [article, setArticle] = useState<Article | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getArticle(String(articleId))
      .then((apiArticle) => {
        const article =
          apiArticle === null ? null : mapApiArticleToArticle(apiArticle);
        setArticle(article);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [articleId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (article === null) return <div>Article not found.</div>;
  return (
    <>
      <section className="max-w-[1440px] mx-auto px-24">
        <ArticleHeader
          articleId={article.articleId}
          title={article.title}
          subtitle={article.subtitle}
          summary={article.summary}
          authorName={"Hadi Samadzad"} // FIXME: Replace with real data
          readingTime={article.readingTime}
          likes={article.likes}
          comments={99} // FIXME: Replace with real data
          views={187} // FIXME: Replace with real data
          createdAt={article.createdAt}
          updatedAt={article.updatedAt}
        />
        <div className="flex gap-6">
          <div className="flex-2">Article with ID: {articleId}</div>

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
