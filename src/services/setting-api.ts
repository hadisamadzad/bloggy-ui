import { ApiSetting } from "@/types/setting";
import { BLOG_API_URL } from "@/config/api";

const baseUrl: string = BLOG_API_URL;

export async function getBlogSettings(): Promise<ApiSetting | null> {
  try {
    const res = await fetch(`${baseUrl}/settings`);

    if (!res.ok) throw new Error(`Failed to fetch blog settings`);

    const data: ApiSetting = await res.json();
    return data;
  } catch {
    return null;
  }
}
