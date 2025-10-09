import { ApiArticle, ApiArticleFilter, ApiArticles } from "@/types/article";
import { BLOG_API_URL } from "@/config/api";

const baseUrl: string = BLOG_API_URL;

export async function listArticles(
  filter: ApiArticleFilter
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
