import { Article } from "@/components/Article/ArticleList";
import { ApiArticle } from "@/types/blog-api";

// Map API article to internal article type
export function mapApiArticleToArticle(apiArticle: ApiArticle): Article {
  return {
    title: apiArticle.title,
    summary: apiArticle.summary,
    thumbnailUrl: apiArticle.thumbnailUrl,
    readingTime: `${apiArticle.timeToReadInMinute} min read`,
    publishedAt: apiArticle.publishedAt || apiArticle.createdAt, // fallback if publishedAt is null
    updatedAt: apiArticle.updatedAt,
  };
}
