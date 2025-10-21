import { BLOG_API_URL } from "@/config/api";
import { Tag } from "@/types/tag";

const baseUrl: string = BLOG_API_URL;

/**
 * Fetch all available tags from the blog API
 * @returns Promise<Tag[]> - Array of all tags
 */
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

    const tags: Tag[] = await res.json();
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    throw error;
  }
}

/**
 * Search/filter tags by name
 * @param searchTerm - The search term to filter tags
 * @returns Promise<Tag[]> - Filtered array of tags
 */
export async function searchTags(searchTerm: string): Promise<Tag[]> {
  const allTags = await getTags();

  if (!searchTerm) {
    return allTags;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return allTags.filter(tag =>
    tag.Name.toLowerCase().includes(lowerSearch) ||
    tag.Slug.toLowerCase().includes(lowerSearch)
  );
}
