import { ArticleSortBy } from "@/types/article";
import React from "react";

type ArticleListSortTabProps = {
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  showPopular?: boolean;
};

export default function ArticleListSortTab({
  sortedBy,
  onSortChange,
  showPopular = true,
}: ArticleListSortTabProps) {
  return (
    <div className="h-12  -mt-3 border-b border-base-content/30">
      <div role="tablist" className="tabs w-80">
        <a
          role="tab"
          className={`tab h-12 text-body-md ${
            sortedBy === ArticleSortBy.Latest
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ArticleSortBy.Latest)}
        >
          Latest
        </a>
        {showPopular && (
          <a
            role="tab"
            className={`tab h-12 text-body-md ${
              sortedBy === ArticleSortBy.Popular
                ? "tab-active border-b-2 border-base-content"
                : ""
            }`}
            onClick={() => onSortChange?.(ArticleSortBy.Popular)}
          >
            Popular
          </a>
        )}
        <a
          role="tab"
          className={`tab h-12 text-body-md ${
            sortedBy === ArticleSortBy.Oldest
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ArticleSortBy.Oldest)}
        >
          Oldest
        </a>
      </div>
    </div>
  );
}
