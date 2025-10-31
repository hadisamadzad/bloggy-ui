import {
  ArticleFilter,
  ArticleStatus,
} from "@/types/article";
import { BLOG_API_URL } from "@/config/api";
import { ApiArticle, ApiArticles, CreateArticleApiRequest, UpdateArticleApiRequest } from "@/types/article-api";
import { authenticatedRequest } from "./auth-api";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: GET /articles/published
// ============================================
export async function listPublishedArticles(
  filter: ArticleFilter,
  revalidateSeconds?: number
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
    const url = `${baseUrl}/articles/published?${params.toString()}`;
    let res: Response;
    if (typeof revalidateSeconds === "number") {
      res = await fetch(url, ({ next: { revalidate: revalidateSeconds } } as unknown) as RequestInit);
    } else {
      res = await fetch(url, ({ cache: "no-store" } as unknown) as RequestInit);
    }
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
  slug: string,
  revalidateSeconds?: number
): Promise<ApiArticle | null> {
  try {
    const url = `${baseUrl}/articles/published/${encodeURIComponent(slug)}`;
    let res: Response;
    if (typeof revalidateSeconds === "number") {
      res = await fetch(url, ({ next: { revalidate: revalidateSeconds } } as unknown) as RequestInit);
    } else {
      res = await fetch(url, ({ cache: "no-store" } as unknown) as RequestInit);
    }
    if (!res.ok) throw new Error(`Failed to fetch article ${slug}`);

    const data: ApiArticle = await res.json();
    return data;
  } catch {
    return null;
  }
}

// ============================================
// API: GET /articles
// ============================================
export async function listArticles(
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
    const res = await authenticatedRequest(`${baseUrl}/articles?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch articles");

    const data: ApiArticles = await res.json();
    return data;
  } catch {
    return null;
  }
}

// ============================================
// API: GET /articles/:articleId
// ============================================
export async function getArticleById(
  articleId: string
): Promise<ApiArticle | null> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/articles/${encodeURIComponent(articleId)}`);
    if (!res.ok) throw new Error(`Failed to fetch article ${articleId}`);

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
    originalArticleInfo: article.originalArticleInfo,
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

// ============================================
// API: PUT /articles
// ============================================
export async function updateArticle(
  articleId: string,
  article: UpdateArticleApiRequest
): Promise<boolean> {
  // Create the request payload matching the blog API schema

  const requestPayload = {
    title: article.title,
    subtitle: article.subtitle || "",
    summary: article.summary || "",
    content: article.content,
    slug: (article.slug || article.title)
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with single
      .trim(),
    originalArticleInfo: article.originalArticleInfo,
    timeToRead: article.timeToRead,
    thumbnailUrl: article.thumbnailUrl || "https://picsum.photos/540/400",
    coverImageUrl: article.coverImageUrl || "https://picsum.photos/540/400",
    tagIds: article.tagIds ?? [],
  };

  try {
    const res = await authenticatedRequest(`${baseUrl}/articles/${articleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestPayload),
    });

    // API returns 204 No Content on success
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to update article: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error; // Re-throw to let the component handle it
  }
}

// ============================================
// API: PATCH /articles/:articleId/status
// ============================================
export async function updateArticleStatus(
  articleId: string,
  status: ArticleStatus
): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/articles/${articleId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    // API returns 204 No Content on success
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to update article status: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error updating article status:", error);
    throw error; // Re-throw to let the component handle it
  }
}

// ============================================
// API: DELETE /articles/:articleId
// ============================================
export async function deleteArticle(
  articleId: string
): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/articles/${articleId}`, {
      method: "DELETE",
    });

    // API returns 204 No Content on success
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Failed to delete article: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    return true;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error; // Re-throw to let the component handle it
  }
}