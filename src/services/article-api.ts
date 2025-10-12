import { ApiArticle, ArticleFilter, ApiArticles, CreateArticleApiRequest } from "@/types/article";
import { BLOG_API_URL } from "@/config/api";
import { getLocalAccessToken } from "@/services/identity-api";

const baseUrl: string = BLOG_API_URL;

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
    const res = await fetch(`${baseUrl}/articles?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch articles");

    const data: ApiArticles = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<ApiArticle | null> {
  try {
    const res = await fetch(`${baseUrl}/articles/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`Failed to fetch article ${slug}`);

    const data: ApiArticle = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function createArticle(
  article: CreateArticleApiRequest
): Promise<ApiArticle | null> {
  const token = getLocalAccessToken();

  if (!token) {
    throw new Error("No authentication token");
  }

  // Create the request payload matching the blog API schema
  const requestPayload = {
    title: article.title,
    subtitle: article.subtitle || "",
    summary: article.summary || "",
    content: article.content,
    slug: article.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim(),
    thumbnailUrl: article.thumbnailUrl || "https://picsum.photos/540/400",
    coverImageUrl: article.coverImageUrl || "https://picsum.photos/540/400",
    tagIds: article.tagIds ?? [],
  };

  try {
    const res = await fetch(`${baseUrl}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestPayload),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Failed to create article: ${res.status} ${res.statusText} - ${errorText}`);
    }

    const data: ApiArticle = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating article:", error);
    throw error; // Re-throw to let the component handle it
  }
}