"use client";

import Link from "next/link";
import Image from "next/image";
import ArticleTags from "./ArticleTags";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ArticleBodyProps {
  articleId: string;
  title: string;
  coverImageUrl: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
}

export default function ArticleBody({
  articleId,
  title,
  coverImageUrl,
  content,
  tags,
  likes,
  comments,
}: ArticleBodyProps) {
  return (
    <>
      <div className="flex flex-col gap-8">
        <Image
          src={coverImageUrl}
          alt={title}
          width={1000}
          height={600}
          className="w-full max-h-[500px] rounded-lg object-cover"
        />
        <div className="prose max-w-none">
          {/* NOTE Markdown component creates an extra 'pre' element around 'code' blocks */}
          <style jsx global>{`
            .prose > pre {
              margin: 0;
              padding: 0;
              border-radius: 0;
              background: none;
            }
          `}</style>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: "h2", // Map `h1` (`# heading`) to use `h2`s.
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    language={match[1]}
                    style={codeStyle}
                    customStyle={{ margin: 0, padding: 20, borderRadius: 8 }}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

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
