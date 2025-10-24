import { Article, ArticleSortBy } from "@/types/article";
import ArticleListItem from "./ArticleListItem";
import ArticleListSortTab from "./ArticleListSortTab";

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  showPopularSortOption?: boolean;
};

export default function ArticleList({
  articles,
  sortedBy = ArticleSortBy.Latest,
  onSortChange,
  showPopularSortOption = true,
}: ArticleListProps) {
  return (
    <div className="p-4 rounded-lg border border-neutral-500">
      <div className="pb-4">
        <ArticleListSortTab
          showPopular={showPopularSortOption}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
        />
      </div>
      {articles.map((article, index) => (
        <div key={index}>
          <ArticleListItem article={article} />
          {index < articles.length - 1 && <div className="divider" />}
        </div>
      ))}
    </div>
  );
}
