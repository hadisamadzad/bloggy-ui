import { ArticleSortBy } from "@/types/blog";
import ArticleListItem from "./ArticleListItem";
import ArticleListSortTab from "./ArticleListSortTab";

type Article = {
  slug: string;
  title: string;
  summary: string;
  thumbnailUrl: string;
  readingTime: string;
  publishedAt: string; // ISO string
  updatedAt: string; // ISO string
};

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
};

export default function ArticleList({
  articles,
  sortedBy = ArticleSortBy.Latest,
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
            slug={article.slug}
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
