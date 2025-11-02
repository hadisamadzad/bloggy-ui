import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/date-tools";
import { Article } from "@/types/article";

interface ArticleHeaderProps {
  article: Article;
  author: string;
}

export default function ArticleHeader({ article, author }: ArticleHeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 pt-12 lg:pt-20 pb-6 sm:pb-8">
        <div className="w-full lg:w-3/4 flex flex-col gap-3 sm:gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {article.title}
          </h1>
          <p className="text-sm sm:text-base md:text-body-md text-base-content/50">
            {article.subtitle}
          </p>
        </div>

        <div className="w-full lg:w-3/4">
          <p className="text-sm sm:text-base">
            <span className="font-bold">Summary: </span>
            {article.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs sm:text-sm">
              <span>Published by {author}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>{formatDate(article.createdAt)}</span>
              <span className="hidden sm:inline">&bull;</span>
              <span>Updated {formatDate(article.updatedAt)}</span>
              {article.originalArticleInfo && (
                <>
                  <span className="hidden sm:inline">&bull;</span>
                  <span>
                    Originally on{" "}
                    <Link
                      className="link"
                      href={article.originalArticleInfo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {article.originalArticleInfo.platform}
                    </Link>{" "}
                    on {formatDate(article.originalArticleInfo.publishedOn)}
                  </span>
                </>
              )}
            </div>
            <span className="text-xs sm:text-sm ">{article.readingTime}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-t-1 border-b-1 border-gray-100">
            <div className="flex gap-6">
              <span className="text-xs sm:text-sm">Views {article.views}</span>
              {/*<span className="text-xs sm:text-sm md:text-label-md">Likes {article.likes}</span>*/}
            </div>
            <Link
              className="text-xs sm:text-sm underline"
              href={`/${article.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Share
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
