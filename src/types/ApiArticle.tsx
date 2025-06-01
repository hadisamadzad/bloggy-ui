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
  status: "Draft" | "Published" | "Archived" | string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  publishedAt: string | null;
  archivedAt: string | null;
};

export type PaginatedApiArticle = {
  page: number;
  pageSize: number;
  totalCount: number;
  results: ApiArticle[];
};
