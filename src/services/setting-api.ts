import { ApiSetting } from "@/types/setting";
import { BLOG_API_URL } from "@/config/api";
import { authenticatedFetch } from "@/services/auth-api";

const baseUrl: string = BLOG_API_URL;

export async function getBlogSettings(): Promise<ApiSetting | null> {
  try {
    const res = await fetch(`${baseUrl}/settings`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) throw new Error(`Failed to fetch blog settings`);

    const data: ApiSetting = await res.json();
    return data;
  } catch {
    return null;
  }
}

export async function updateBlogSettings(
  settings: Omit<ApiSetting, "updatedAt">
): Promise<boolean> {
  try {
    const res = await authenticatedFetch(`${baseUrl}/settings`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    if (!res.ok) {
      throw new Error(`Failed to update blog settings`);
    }
    return true;
  } catch {
    return false;
  }
}
