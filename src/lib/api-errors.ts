// Utility helpers for parsing API error payloads.
// Keep this module minimal — it's intended for reuse across service wrappers.

/**
 * Given an API response body, try to extract a friendly error message.
 * Supports the shape: { type: string, messages: string[] }
 * Also falls back to `message` or `error` fields when present.
 */
export default function extractApiErrorMessage(body: unknown): string | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  if (Array.isArray(b.messages) && b.messages.length > 0) {
    const msgs = b.messages as unknown[];
    if (msgs.every((m) => typeof m === "string")) {
      return (msgs as string[]).join(" ");
    }
  }
  if (typeof b.message === "string") return b.message;
  if (typeof b.error === "string") return b.error;
  return null;
}