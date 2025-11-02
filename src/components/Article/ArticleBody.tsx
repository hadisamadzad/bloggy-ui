"use server";
import Link from "next/link";
import Image from "next/image";
import ArticleTags from "./ArticleTags";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { xonokai as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Article } from "@/types/article";
import "./ArticleBody.css";

interface ArticleBodyProps {
  article: Article;
}

export default async function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Image
          src={article.coverImageUrl}
          alt={article.title}
          width={1000} // pixels
          height={740} // pixels
          className="w-full max-h-[300px] md:max-h-[500px] rounded-lg object-cover"
        />
        <div className="prose prose-sm sm:prose-base max-w-none">
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
            {article.content}
          </ReactMarkdown>
        </div>

        <ArticleTags tags={article.tags}></ArticleTags>

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
    </>
  );
}
