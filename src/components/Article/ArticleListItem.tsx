import { formatDate } from "@/lib/date-tools";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";

interface ArticleListItemProps {
  article: Article;
}

export default function ArticleListItem({ article }: ArticleListItemProps) {
  return (
    <div className="flex gap-4 min-h-36">
      <div className="flex-none w-[180px] h-30 pt-3">
        <Link href={`/articles/${article.slug}`}>
          <Image
            alt={article.title}
            title={article.title}
            src={article.thumbnailUrl}
            className="object-cover rounded-lg"
            width={540}
            height={400}
          />
        </Link>
      </div>

      <div className="grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-neutral-600 mb-1">
            <time className="text-label-md">
              {article.publishedAt ? formatDate(article.publishedAt) : ""}
            </time>
            <time className="text-label-md">
              {formatDate(article.updatedAt)}
            </time>
          </div>
          <Link href={`/articles/${article.slug}`}>
            <h2 className="text-title-lg">{article.title}</h2>
          </Link>
          {article.summary && (
            <p className="text-body-sm text-neutral-500">{article.summary}</p>
          )}
        </div>
        <div className="flex justify-between items-end mt-4 text-label-md text-neutral-500">
          <div className="flex gap-6">
            <span className="flex items-center">Likes 324</span>
            <span className="flex items-center">Views 14.5K</span>
          </div>
          <span>{article.readingTime}</span>
        </div>
      </div>
    </div>
  );
}
