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
    : `/articles/${article.slug}`;

  return (
    <div className="flex gap-4 min-h-36">
      <div className="flex-none w-[180px] h-30 pt-3">
        <Link href={articleUrl}>
          <Image
            alt={article.title}
            title={article.title}
            src={article.thumbnailUrl ?? "https://picsum.photos/540/400"}
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
          <Link href={articleUrl}>
            <h2 className="text-title-lg">{article.title}</h2>
          </Link>
          {article.summary && (
            <p className="text-body-sm text-neutral-500">{article.summary}</p>
          )}
        </div>
        <div className="flex justify-between items-end mt-4 text-label-md text-neutral-500">
          {!isAdmin ? (
            <>
              <div className="flex gap-6">
                <span className="flex items-center">Views {article.views}</span>
                <span className="flex items-center">Likes {article.likes}</span>
              </div>
              <span>{article.readingTime}</span>
            </>
          ) : (
            <>
              <div />
              <Link
                href={`/articles/edit/${article.articleId}`}
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
