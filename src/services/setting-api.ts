import { BLOG_API_URL } from "@/config/api";
import { authenticatedRequest } from "@/services/auth-api";
import { ApiBlogSetting } from "@/types/setting";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: GET /settings
// ============================================
export async function getBlogSettings(): Promise<ApiBlogSetting | null> {
  try {
    const res = await fetch(`${baseUrl}/settings`, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    });

    if (!res.ok) throw new Error(`Failed to fetch blog settings`);

    const data: ApiBlogSetting = await res.json();
    return data;
  } catch {
    return null;
  }
}

// ============================================
// API: PUT /settings
// ============================================
export async function updateBlogSettings(
  settings: Omit<ApiBlogSetting, "updatedAt">
): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/settings`, {
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
