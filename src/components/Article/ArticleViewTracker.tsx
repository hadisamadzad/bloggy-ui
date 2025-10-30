"use client";

import { useEffect } from "react";
import { recordArticleView } from "@/services/view-api";

interface ArticleViewTrackerProps {
  articleId: string;
}

export default function ArticleViewTracker({
  articleId,
}: ArticleViewTrackerProps) {
  useEffect(() => {
    const visitorId = getOrCreateVisitorId();

    recordArticleView(articleId, visitorId).then((res) => {
      if (!res.ok) {
        console.debug("recordArticleView failed:", res.errorMessage);
      }
    });
  }, [articleId]);

  return null;
}

const VISITOR_KEY = "bloggy_visitor_id";

function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "";

  try {
    let visitorId: string | null = localStorage.getItem(VISITOR_KEY);
    if (visitorId) return visitorId;

    // Prefer crypto.randomUUID if available
    const g = globalThis as unknown as {
      crypto?: { randomUUID?: () => string };
    };
    if (g.crypto && typeof g.crypto.randomUUID === "function") {
      visitorId = g.crypto.randomUUID();
    } else {
      // Fallback simple UUID-ish generator
      visitorId =
        "visitor-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2, 10);
    }

    localStorage.setItem(VISITOR_KEY, visitorId);
    return visitorId;
  } catch {
    // If localStorage is blocked for any reason, return a volatile id
    return "visitor-" + Math.random().toString(36).slice(2, 10);
  }
}
