import React from "react";
import { getPublishedArticleBySlug } from "@/services/article-api";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { getBlogSettings } from "@/services/setting-api";
import { buildArticleSeo } from "@/lib/seo";

export interface HeadProps {
  articleSlug: string;
}

export default async function Head({ articleSlug }: HeadProps) {
  const settings = await getBlogSettings();
  const REVALIDATE_SECONDS = 30; // seconds
  const apiArticle = await getPublishedArticleBySlug(
    articleSlug,
    REVALIDATE_SECONDS
  );

  if (!apiArticle) return null;

  const article = mapApiArticleToArticle(apiArticle);
  const siteBase = settings?.blogUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const { jsonLd, canonical: canonicalUrl } = buildArticleSeo(
    article,
    settings ?? undefined,
    siteBase
  );

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  );
}
