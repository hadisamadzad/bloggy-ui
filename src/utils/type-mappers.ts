import { Article } from "@/types/blog";
import { ApiArticle } from "@/types/blog-api";

// Map API article to internal article type
export function mapApiArticleToArticle(apiArticle: ApiArticle): Article {
  return {
    articleId: apiArticle.articleId,
    authorId: apiArticle.authorId,
    title: apiArticle.title,
    subtitle: apiArticle.subtitle,
    summary: apiArticle.summary,
    content: apiArticle.content,
    slug: apiArticle.slug,
    thumbnailUrl: apiArticle.thumbnailUrl,
    coverImageUrl: apiArticle.coverImageUrl,
    readingTime: `${apiArticle.timeToReadInMinute} min read`,
    likes: apiArticle.likes,
    tagIds: apiArticle.tagIds,
    status: apiArticle.status,
    createdAt: apiArticle.createdAt,
    updatedAt: apiArticle.updatedAt,
    publishedAt: apiArticle.publishedAt,
    archivedAt: apiArticle.archivedAt
  };
}
