import { Article, ArticleSortBy } from "@/types/article";
import ArticleListItem from "./ArticleListItem";
import ArticleListHeader from "./ArticleListHeader";
import { useEffect, useRef } from "react";

type ArticleListProps = {
  articles: Article[];
  sortedBy?: ArticleSortBy;
  onSortChange?: (sortBy: ArticleSortBy) => void;
  onlyDrafts?: boolean;
  onlyArchived?: boolean;
  onOnlyDraftsChange?: (checked: boolean) => void;
  onOnlyArchivedChange?: (checked: boolean) => void;
  isAdmin?: boolean;
  onReachEnd?: () => void;
};

export default function ArticleList({
  articles,
  sortedBy = ArticleSortBy.Latest,
  onSortChange,
  onlyDrafts = false,
  onlyArchived = false,
  onOnlyDraftsChange,
  onOnlyArchivedChange,
  isAdmin = false,
  onReachEnd,
}: ArticleListProps) {
  // IntersectionObserver for end of list
  const endOfListRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!onReachEnd || articles.length === 0) return;

    let isRunningHandler = false;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isRunningHandler) {
          isRunningHandler = true;
          onReachEnd();
          setTimeout(() => (isRunningHandler = false), 800);
        }
      },
      { threshold: 0.5 }
    );

    const current = endOfListRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [onReachEnd]);
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
            <div ref={endOfListRef} /> {/* Empty div to trigger onReachEnd */}
          </>
        )}
      </div>
      {articles.length > 0 && (
        <div className="text-body-md italic mt-6 text-center text-base-content/50">
          You have reached the end of the articles!
        </div> /* Empty div to trigger onReachEnd */
      )}
    </>
  );
}
