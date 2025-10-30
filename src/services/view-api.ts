import { BLOG_API_URL } from "@/config/api";
import type { Result } from "../types/result";
import { fail, ok } from "../types/result";
import extractApiErrorMessage from "@/lib/api-errors";

const baseUrl = BLOG_API_URL;

// ============================================
// API: GET /articles/published => Record a view for an article. visitorId should be a client-generated UUID.
// ============================================
export async function recordArticleView(
  articleId: string,
  visitorId: string
): Promise<Result<void>> {
  try {
    const res = await fetch(`${baseUrl}/views/article/${encodeURIComponent(articleId)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ visitorId }),
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      const errorMessage = extractApiErrorMessage(body) ||
        `Failed to record view: ${res.status} ${res.statusText}`;
      return fail(errorMessage);
    }

    return ok();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return fail(message);
  }
}

export default recordArticleView;