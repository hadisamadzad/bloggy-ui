import React from "react";
import Link from "next/link";
import { formatDate } from "@/lib/date-tools";

interface ArticleHeaderProps {
  articleId: string;
  title: string;
  subtitle: string;
  summary: string;
  authorName: string;
  readingTime: string;
  likes: number;
  comments: number;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function ArticleHeader({
  articleId,
  title,
  subtitle,
  summary,
  authorName,
  readingTime,
  likes,
  comments,
  views,
  createdAt,
  updatedAt,
}: ArticleHeaderProps) {
  return (
    <>
      <div className="flex flex-col gap-12 pt-20 pb-8">
        <div className="w-3/4 flex flex-col gap-4">
          <h1 className="text-headline-lg">{title}</h1>
          <h3 className="text-body-md text-base-content/50">{subtitle}</h3>
        </div>

        <div className="w-3/4">
          <p className="text-body-md">
            <span className="font-bold">Summary: </span>
            {summary}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <span className="text-body-sm">Published by {authorName}</span>
              <span className="text-body-sm">|</span>
              <span className="text-body-sm">{formatDate(createdAt)}</span>
              <span className="text-body-sm">|</span>
              <span className="text-body-sm">
                Updated on {formatDate(updatedAt)}
              </span>
            </div>
            <span className="text-body-sm">{readingTime}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-t-1 border-b-1 border-gray-100">
            <div className="flex gap-6">
              <span className="text-label-md">{likes} Likes</span>
              <span className="text-label-md">{comments} Comments</span>
              <span className="text-label-md">{views} Views</span>
            </div>
            <Link
              className="text-body-sm underline"
              href={`/articles/${articleId}`}
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
