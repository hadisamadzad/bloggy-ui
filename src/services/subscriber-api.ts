import { BLOG_API_URL } from "@/config/api";

const baseUrl: string = BLOG_API_URL;

// ============================================
// API: POST /subscribers
// ============================================
export async function subscribeToBlog(email: string): Promise<boolean> {
  try {
    const res = await fetch(`${baseUrl}/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      throw new Error(`Failed to subscribe: ${res.status} ${res.statusText}`);
    }

    return true;
  } catch {
    return false;
  }
}
