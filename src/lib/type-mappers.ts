import { Article } from "@/types/article";
import { ApiArticle } from "@/types/article-api";

// Map API article to internal article type
export function mapApiArticleToArticle(apiArticle: ApiArticle): Article {
  return {
    articleId: apiArticle.articleId,
    authorId: apiArticle.authorId,
    slug: apiArticle.slug,
    title: apiArticle.title,
    subtitle: apiArticle.subtitle,
    summary: apiArticle.summary,
    content: apiArticle.content,
    thumbnailUrl: apiArticle.thumbnailUrl,
    coverImageUrl: apiArticle.coverImageUrl,
    readingTime: `${apiArticle.timeToReadInMinute} min read`,
    likes: apiArticle.likes,
    tagIds: apiArticle.tagIds,
    tagSlugs: apiArticle.tagSlugs,
    status: apiArticle.status,
    createdAt: apiArticle.createdAt,
    updatedAt: apiArticle.updatedAt,
    publishedAt: apiArticle.publishedAt,
    archivedAt: apiArticle.archivedAt,
  };
}
