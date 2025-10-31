import { BLOG_API_URL } from "@/config/api";
import { Tag } from "@/types/tag";
import { authenticatedRequest } from "./auth-api";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: GET /tags
// ============================================
export async function listTags(revalidateSeconds?: number): Promise<Tag[]> {
  try {
    const url = `${baseUrl}/tags`;
    let res: Response;

    if (typeof revalidateSeconds === "number") {
      res = await fetch(url, ({ next: { revalidate: revalidateSeconds } } as unknown) as RequestInit);
    } else {
      res = await fetch(url, ({ cache: "no-store" } as unknown) as RequestInit);
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch tags: ${res.status} ${res.statusText}`);
    }

    const tags: Tag[] = (await res.json()).tags;
    return tags;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return []
  }
}

// ============================================
// API: POST /tags (create tag)
// ============================================
export async function createTag({ name, slug }: { name: string; slug: string }): Promise<string> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/tags`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Send cookies for auth
      body: JSON.stringify({ name, slug }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create tag: ${res.status} ${res.statusText}`);
    }

    const tagId: string = (await res.json()).tagId;
    return tagId;
  } catch (error) {
    console.error("Error creating tag:", error);
    throw error;
  }
}

// ============================================
// API: PUT /tags/:id (update tag)
// ============================================
export async function updateTag({
  tagId,
  name,
  slug,
}: {
  tagId: string;
  name: string;
  slug: string;
}): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/tags/${tagId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ name, slug }),
    });

    // API returns 204 No Content on success
    if (!res.ok) {
      throw new Error(`Failed to update tag: ${res.status} ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error updating tag:", error);
    return false;
  }
}

// ============================================
// API: DELETE /tags/:id (delete tag)
// ============================================
export async function deleteTag(tagId: string): Promise<boolean> {
  try {
    const res = await authenticatedRequest(`${baseUrl}/tags/${tagId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete tag: ${res.status} ${res.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting tag:", error);
    return false;
  }
}

// ============================================
// HELPER: Search/filter tags locally
// ============================================
export async function searchTags(searchTerm: string): Promise<Tag[]> {
  const allTags = await listTags();

  if (!searchTerm) {
    return allTags;
  }

  const lowerSearch = searchTerm.toLowerCase();
  return allTags.filter(tag =>
    tag.name.toLowerCase().includes(lowerSearch) ||
    tag.slug.toLowerCase().includes(lowerSearch)
  );
}