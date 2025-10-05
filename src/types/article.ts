export type ApiArticle = {
  articleId: string;
  authorId: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  slug: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  timeToReadInMinute: number;
  likes: number;
  tagIds: string[];
  tagSlugs: string[];
  status: ArticleStatus;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  publishedAt: string | null;
  archivedAt: string | null;
};

export type ApiArticles = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: ApiArticle[];
};

export type ApiArticleFilter = {
  Keyword: string;
  Statuses: string[];
  TagIds: string[];
  SortBy: string;
  Page: number;
  PageSize: number;
};

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
