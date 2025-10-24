import {
  ArticleFilter,
} from "@/types/article";
import { BLOG_API_URL } from "@/config/api";
import { ApiArticle, ApiArticles, CreateArticleApiRequest } from "@/types/article-api";
import { authenticatedRequest } from "./auth-api";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: GET /articles/published
// ============================================
export async function listPublishedArticles(
  filter: ArticleFilter
): Promise<ApiArticles | null> {
  // Construct query parameters out of filter
  const params = new URLSearchParams();
  Object.entries(filter).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v));
    } else {
      params.append(key, value as string);
    }
  });

  try {
    const res = await fetch(`${baseUrl}/articles/published?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch articles");

    const data: ApiArticles = await res.json();
    return data;
  } catch {
    return null;
  }
}

// ============================================
// API: GET /articles/published/:slug
// ============================================
export async function getPublishedArticleBySlug(
  slug: string
): Promise<ApiArticle | null> {
  try {
    const res = await fetch(`${baseUrl}/articles/published/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`Failed to fetch article ${slug}`);

    const data: ApiArticle = await res.json();
    return data;
  } catch {
    return null;
  }
}

// ============================================
// API: POST /articles
// ============================================
export async function createArticle(
  article: CreateArticleApiRequest
): Promise<string | null> {
  // Create the request payload matching the blog API schema
  const requestPayload = {
    title: article.title,
    subtitle: article.subtitle || "",
    summary: article.summary || "",
    content: article.content,
    slug: article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim(),
    thumbnailUrl: article.thumbnailUrl || "https://picsum.photos/540/400",
    coverImageUrl: article.coverImageUrl || "https://picsum.photos/540/400",
    tagIds: article.tagIds ?? [],
  };

  try {
    const res = await authenticatedRequest(`${baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to create article: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    const articleSlug: string = (await res.json()).slug;
    return articleSlug;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error; // Re-throw to let the component handle it
  }
}