export type Article = {
  articleId: string;
  authorId: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  slug: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  readingTime: string;
  likes: number;
  tagIds: string[];
  tagSlugs: string[];
  status: ArticleStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  publishedAt: string | null;
  archivedAt: string | null;
};

export type ArticleFilter = {
  Keyword: string;
  Statuses: string[];
  TagIds: string[];
  SortBy: string;
  Page: number;
  PageSize: number;
};

// FIX Modify to use PublishedAt for sorting
export enum ArticleSortBy {
  Latest = "CreatedAtNewest",
  Oldest = "CreatedAtOldest",
  Popular = "LikesMost",
}

export enum ArticleStatus {
  Draft = "Draft",
  Published = "Published",
  Archived = "Archived",
}