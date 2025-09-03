import { ApiArticleSortBy } from "@/types/blog-api";
import ArticleListItem from "./ArticleListItem";
import ArticleListSortTab from "./ArticleListSortTab";

export type Article = {
  title: string;
  summary: string;
  thumbnailUrl: string;
  readingTime: string;
  publishedAt: string; // ISO string
  updatedAt: string; // ISO string
};

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ApiArticleSortBy;
  onSortChange?: (sortBy: ApiArticleSortBy) => void;
};

export default function ArticleList({
  articles,
  sortedBy = ApiArticleSortBy.Latest,
  onSortChange,
}: ArticleListProps) {
  return (
    <div className="p-4 rounded-lg border border-neutral-500">
      <div className="pb-4">
        <ArticleListSortTab sortedBy={sortedBy} onSortChange={onSortChange} />
      </div>
      {articles.map((article, index) => (
        <div key={index}>
          <ArticleListItem
            title={article.title}
            summary={article.summary}
            thumbnailUrl={article.thumbnailUrl}
            readingTime={article.readingTime}
            publishedAt={article.publishedAt}
            updatedAt={article.updatedAt}
          />
          {index < articles.length - 1 && <div className="divider" />}
        </div>
      ))}
    </div>
  );
}
