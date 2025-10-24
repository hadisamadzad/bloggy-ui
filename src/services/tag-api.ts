import { BLOG_API_URL } from "@/config/api";
import { Tag } from "@/types/tag";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: GET /tags
// ============================================
export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetch(`${baseUrl}/tags`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh tags
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
    }

    const tags: Tag[] = (await res.json()).tags;
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

// ============================================
// HELPER: Search/filter tags locally
// ============================================
export async function searchTags(searchTerm: string): Promise<Tag[]> {
  const allTags = await getTags();

  if (!searchTerm) {
    return allTags;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return allTags.filter(tag =>
    tag.name.toLowerCase().includes(lowerSearch) ||
    tag.slug.toLowerCase().includes(lowerSearch)
  );
}