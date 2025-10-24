import { ArticleStatus } from "./article";
import { Tag } from "./tag";

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
  tags: Tag[];
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

export interface CreateArticleApiRequest {
  title: string;
  subtitle?: string;
  summary?: string;
  content: string;
  coverImageUrl?: string;
  thumbnailUrl?: string;
  tagIds?: string[];
}