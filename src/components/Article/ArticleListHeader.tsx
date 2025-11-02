import { ArticleSortBy } from "@/types/article";
import React from "react";

type ArticleListHeaderProps = {
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  showPopular?: boolean;
  showStatusFilters?: boolean;
  onlyDrafts?: boolean;
  onlyArchived?: boolean;
  onOnlyDraftsChange?: (checked: boolean) => void;
  onOnlyArchivedChange?: (checked: boolean) => void;
};

export default function ArticleListHeader({
  sortedBy,
  onSortChange,
  showPopular = true,
  showStatusFilters = false,
  onlyDrafts = false,
  onlyArchived = false,
  onOnlyDraftsChange,
  onOnlyArchivedChange,
}: ArticleListHeaderProps) {
  return (
    <div className="h-12 -mt-3 border-b border-base-content/30 flex items-center justify-between">
      <div role="tablist" className="tabs w-full sm:w-auto flex-shrink-0">
        <a
          role="tab"
          className={`tab h-12 text-sm sm:text-base md:text-md ${
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
            className={`tab h-12 text-sm sm:text-base md:text-md ${
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
          className={`tab h-12 text-sm sm:text-base md:text-md ${
            sortedBy === ArticleSortBy.Oldest
              ? "tab-active border-b-2 border-base-content"
              : ""
          }`}
          onClick={() => onSortChange?.(ArticleSortBy.Oldest)}
        >
          Oldest
        </a>
      </div>
      {/*TODO Add responsiveness for admin page*/}
      {showStatusFilters && (
        <div className="flex gap-20 sm:gap-4 items-center ml-0 sm:ml-4 text-xs sm:text-sm">
          <label className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
            <input
              type="radio"
              name="statusFilter"
              checked={!onlyDrafts && !onlyArchived}
              onChange={() => {
                onOnlyDraftsChange?.(false);
                onOnlyArchivedChange?.(false);
              }}
              className="radio radio-xs"
            />
            <span>All</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
            <input
              type="radio"
              name="statusFilter"
              checked={onlyDrafts}
              onChange={() => {
                onOnlyDraftsChange?.(true);
                onOnlyArchivedChange?.(false);
              }}
              className="radio radio-xs"
            />
            <span>Drafts</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer whitespace-nowrap">
            <input
              type="radio"
              name="statusFilter"
              checked={onlyArchived}
              onChange={() => {
                onOnlyDraftsChange?.(false);
                onOnlyArchivedChange?.(true);
              }}
              className="radio radio-xs"
            />
            <span>Archived</span>
          </label>
        </div>
      )}
    </div>
  );
}
