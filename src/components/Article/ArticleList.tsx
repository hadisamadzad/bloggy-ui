import { Article, ArticleSortBy } from "@/types/article";
import ArticleListItem from "./ArticleListItem";
import ArticleListHeader from "./ArticleListHeader";

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  showPopularSortOption?: boolean;
  showStatusFilters?: boolean;
  onlyDrafts?: boolean;
  onlyArchived?: boolean;
  onOnlyDraftsChange?: (checked: boolean) => void;
  onOnlyArchivedChange?: (checked: boolean) => void;
};

export default function ArticleList({
  articles,
  sortedBy = ArticleSortBy.Latest,
  onSortChange,
  showPopularSortOption = true,
  showStatusFilters = false,
  onlyDrafts = false,
  onlyArchived = false,
  onOnlyDraftsChange,
  onOnlyArchivedChange,
}: ArticleListProps) {
  return (
    <div className="p-4 rounded-lg border border-base-content/30">
      <div className="pb-4">
        <ArticleListHeader
          showPopular={showPopularSortOption}
          sortedBy={sortedBy}
          onSortChange={onSortChange}
          showStatusFilters={showStatusFilters}
          onlyDrafts={onlyDrafts}
          onlyArchived={onlyArchived}
          onOnlyDraftsChange={onOnlyDraftsChange}
          onOnlyArchivedChange={onOnlyArchivedChange}
        />
      </div>
      {articles.length === 0 ? (
        <div className="text-center text-neutral-400 py-8">
          No articles found.
        </div>
      ) : (
        articles.map((article, index) => (
          <div key={index}>
            <ArticleListItem article={article} />
            {index < articles.length - 1 && <div className="divider" />}
          </div>
        ))
      )}
    </div>
  );
}
