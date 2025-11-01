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
      <div className="flex flex-col gap-12 pt-20 pb-8">
        <div className="w-3/4 flex flex-col gap-4">
          <h1 className="text-headline-lg">{article.title}</h1>
          <p className="text-body-md text-base-content/50">
            {article.subtitle}
          </p>
        </div>

        <div className="w-3/4">
          <p className="text-body-md">
            <span className="font-bold">Summary: </span>
            {article.summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-body-sm">Published by {author}</span>
              <span className="text-body-sm">&bull;</span>
              <span className="text-body-sm">
                {formatDate(article.createdAt)}
              </span>
              <span className="text-body-sm">&bull;</span>
              <span className="text-body-sm">
                Updated {formatDate(article.updatedAt)}
              </span>
              {article.originalArticleInfo && (
                <>
                  <span className="text-body-sm">&bull;</span>
                  <span className="text-body-sm">
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
            <span className="text-body-sm">{article.readingTime}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-t-1 border-b-1 border-gray-100">
            <div className="flex gap-6">
              <span className="text-label-md">Views {article.views}</span>
              {/*<span className="text-label-md">Likes {article.likes}</span>*/}
            </div>
            <Link
              className="text-body-sm underline"
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
