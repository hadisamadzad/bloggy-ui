"use client";

import Link from "next/link";
import ArticleTags from "./ArticleTags";

interface ArticleBodyProps {
  articleId: string;
  articleContent: string;
  tags: string[];
  likes: number;
  comments: number;
}

export default function ArticleBody({
  articleId,
  articleContent,
  tags,
  likes,
  comments,
}: ArticleBodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <div>{articleContent}</div>
        <ArticleTags tags={tags}></ArticleTags>
        <div className="flex items-center justify-between pt-2 border-t-1 border-gray-100">
          <div className="flex gap-6">
            <span className="text-label-md">{likes} Likes</span>
            <span className="text-label-md">{comments} Comments</span>
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
    </>
  );
}
