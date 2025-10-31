"use client";
import Head from "next/head";
import React from "react";
import { ApiBlogSetting } from "@/types/setting";
import {
  SeoParams,
  defaultMetaFromSettings,
  buildOpenGraph,
  buildTwitterCard,
  buildJsonLdArticle,
  formatPageTitle,
} from "@/lib/seo";

type Props = SeoParams & { settings?: ApiBlogSetting };

export default function SeoClient({
  settings,
  title,
  description,
  url,
  image,
  twitterHandle,
  type,
  publishedTime,
  modifiedTime,
}: Props) {
  const siteMeta = defaultMetaFromSettings(settings);
  const finalTitle = formatPageTitle(
    settings?.pageTitleTemplate || undefined,
    {
      title: title || settings?.seoMetaTitle || "",
      site: siteMeta.site,
      subtitle: siteMeta.siteSubtitle,
    },
    siteMeta.site
  );

  const og = buildOpenGraph({
    title: finalTitle,
    description: description ?? settings?.seoMetaDescription,
    url,
    image,
    type,
    settings,
  });
  const tw = buildTwitterCard({
    title: finalTitle,
    description: description ?? settings?.seoMetaDescription,
    image,
    twitterHandle,
  });
  const jsonLd = buildJsonLdArticle({
    title: finalTitle,
    description: description ?? settings?.seoMetaDescription,
    url,
    image,
    type,
    publishedTime,
    modifiedTime,
    settings,
  });

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta
        name="description"
        content={description ?? settings?.seoMetaDescription ?? ""}
      />

      {/* Open Graph */}
      {og.title && <meta property="og:title" content={String(og.title)} />}
      {og.description && (
        <meta property="og:description" content={String(og.description)} />
      )}
      {og.url && <meta property="og:url" content={String(og.url)} />}
      {og.type && <meta property="og:type" content={String(og.type)} />}
      {og.image && <meta property="og:image" content={String(og.image)} />}

      {/* Twitter */}
      {tw.card && <meta name="twitter:card" content={tw.card} />}
      {tw.site && <meta name="twitter:site" content={String(tw.site)} />}
      {tw.title && <meta name="twitter:title" content={String(tw.title)} />}
      {tw.description && (
        <meta name="twitter:description" content={String(tw.description)} />
      )}
      {tw.image && <meta name="twitter:image" content={String(tw.image)} />}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}
