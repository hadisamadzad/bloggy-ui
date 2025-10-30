import { Article, ArticleSortBy } from "@/types/article";
import ArticleListItem from "./ArticleListItem";
import ArticleListHeader from "./ArticleListHeader";
import React from "react";

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  onlyDrafts?: boolean;
  onlyArchived?: boolean;
  onOnlyDraftsChange?: (checked: boolean) => void;
  onOnlyArchivedChange?: (checked: boolean) => void;
  isAdmin?: boolean;
};

export default function ArticleList(props: ArticleListProps) {
  const {
    articles,
    sortedBy = ArticleSortBy.Latest,
    onSortChange,
    onlyDrafts = false,
    onlyArchived = false,
    onOnlyDraftsChange,
    onOnlyArchivedChange,
    isAdmin = false,
  } = props;
  return (
    <>
      <div className="p-4 rounded-lg border border-base-content/30">
        <div className="pb-4">
          <ArticleListHeader
            showPopular={!isAdmin}
            sortedBy={sortedBy}
            onSortChange={onSortChange}
            showStatusFilters={isAdmin}
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
          <>
            {articles.map((article, index) => (
              <div key={index}>
                <ArticleListItem article={article} isAdmin={isAdmin} />
                {index < articles.length - 1 && <div className="divider" />}
              </div>
            ))}
            {/* Loader div for parent observer, use id for selection */}
            <div id="article-list-loader" />
          </>
        )}
      </div>
      {articles.length > 0 && (
        <div className="text-body-md italic mt-6 text-center text-base-content/50">
          You have reached the end of the articles!
        </div>
      )}
    </>
  );
}
