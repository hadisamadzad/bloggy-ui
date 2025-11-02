import { formatDate } from "@/lib/date-tools";
import { Article } from "@/types/article";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface ArticleListItemProps {
  article: Article;
  isAdmin?: boolean;
}

export default function ArticleListItem({
  article,
  isAdmin = false,
}: ArticleListItemProps) {
  const articleUrl = isAdmin
    ? `/articles/edit/${article.articleId}`
    : `/${article.slug}`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 min-h-36">
      <div className="flex-none  sm:w-[180px] h-auto sm:h-30 pt-0 sm:pt-1">
        <Link href={articleUrl}>
          <Image
            alt={article.title}
            title={article.title}
            src={article.thumbnailUrl ?? "https://picsum.photos/200/150"}
            className="object-cover rounded-lg w-full"
            width={200} // pixels
            height={150} // pixels
          />
        </Link>
      </div>

      <div className="grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between text-neutral-600 mb-1">
            <time className="text-label-md">
              {article.publishedAt
                ? formatDate(article.publishedAt)
                : `${formatDate(article.createdAt)} - Unpublished`}
            </time>
            <time className="text-label-md">
              Updated {formatDate(article.updatedAt)}
            </time>
          </div>
          <Link href={articleUrl}>
            <h2 className="text-2xl sm:text-xl font-bold">{article.title}</h2>
          </Link>
          {article.summary && (
            <p className="text-sm sm:text-md text-neutral-500">
              {article.summary}
            </p>
          )}
        </div>
        <div className="flex justify-between items-end mt-4 text-label-md text-neutral-500">
          {!isAdmin ? (
            <>
              <div className="flex gap-6">
                <span className="flex items-center">Views {article.views}</span>
                {/*<span className="flex items-center">Likes {article.likes}</span>*/}
              </div>
              <span>{article.readingTime}</span>
            </>
          ) : (
            <>
              <div />
              <Link
                href={articleUrl}
                className="btn btn-sm btn-secondary btn-outline gap-2"
              >
                <Pencil size={14} />
                Edit
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
