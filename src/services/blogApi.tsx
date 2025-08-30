import { ApiArticleFilter, ApiArticles } from "@/types/blog-api";

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
    const res = await fetch(
      `https://bloggy-api.hadisamadzad.com/blog/articles?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch articles");

    const data: ApiArticles = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching articles:", err);
    return null;
  }
}
