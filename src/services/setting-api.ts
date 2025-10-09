import { ApiSetting } from "@/types/setting";

const baseUrl: string = "https://bloggy.hadisamadzad.com/api/blog";

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
