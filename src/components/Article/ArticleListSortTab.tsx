import { ApiArticleSortBy } from "@/types/blog-api";
import React from "react";

type ArticleListSortTabProps = {
  sortedBy?: ApiArticleSortBy;
  onSortChange?: (sortBy: ApiArticleSortBy) => void;
};

export default function ArticleListSortTab({
  sortedBy,
  onSortChange,
}: ArticleListSortTabProps) {
  return (
    <div className="h-12  -mt-3 border-b border-base-content/30">
      <div role="tablist" className="tabs w-80">
        <a
          role="tab"
          className={`tab h-12 text-body-md ${
            sortedBy === ApiArticleSortBy.Latest
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ApiArticleSortBy.Latest)}
        >
          Latest
        </a>
        <a
          role="tab"
          className={`tab h-12 text-body-md ${
            sortedBy === ApiArticleSortBy.Popular
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ApiArticleSortBy.Popular)}
        >
          Popular
        </a>
        <a
          role="tab"
          className={`tab h-12 text-body-md ${
            sortedBy === ApiArticleSortBy.Oldest
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ApiArticleSortBy.Oldest)}
        >
          Oldest
        </a>
      </div>
    </div>
  );
}
