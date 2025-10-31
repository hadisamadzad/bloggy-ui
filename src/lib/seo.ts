import { ApiBlogSetting } from "@/types/setting";
import { Article } from "@/types/article";
import { Metadata } from "next";

export type SeoParams = {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterHandle?: string; // without @
  type?: "website" | "article" | string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  settings?: ApiBlogSetting;
};

// Simple template replacement: replace {{title}} and {{site}} and {{subtitle}}
export function formatTitle(template: string | undefined, values: Record<string, string>, siteFallback: string) {
  template = template ?? "{{title}} — {{site}}";
  return template.replace(/{{\s*title\s*}}/gi, values.title || "")
    .replace(/{{\s*site\s*}}/gi, values.site || siteFallback)
    .replace(/{{\s*subtitle\s*}}/gi, values.subtitle || "");
}

export function defaultMetaFromSettings(settings?: ApiBlogSetting) {
  return {
    site: settings?.blogTitle ?? "My Blog",
    siteSubtitle: settings?.blogSubtitle ?? settings?.seoMetaDescription ?? "",
    siteLogo: settings?.blogLogoUrl ?? "",
  };
}

export function buildOpenGraph(params: SeoParams) {
  return {
    title: params.title,
    description: params.description,
    url: params.url,
    type: params.type ?? (params.publishedTime ? "article" : "website"),
    image: params.image,
  };
}

export function buildTwitterCard(params: SeoParams) {
  return {
    card: "summary_large_image",
    site: params.twitterHandle ? `@${params.twitterHandle}` : undefined,
    title: params.title,
    description: params.description,
    image: params.image,
  };
}

export function buildJsonLdArticle(params: SeoParams & { id?: string; authorName?: string }) {
  const site = params.settings?.blogTitle ?? "My Blog";
  const json: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": params.type === "article" || params.publishedTime ? "Article" : "WebPage",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    headline: params.title,
    description: params.description,
    image: params.image ? [params.image] : undefined,
    author: params.authorName ? { "@type": "Person", name: params.authorName } : undefined,
    publisher: {
      "@type": "Organization",
      name: site,
      logo: params.settings?.blogLogoUrl ? { "@type": "ImageObject", url: params.settings!.blogLogoUrl } : undefined,
    },
    datePublished: params.publishedTime,
    dateModified: params.modifiedTime,
  };

  // Clean undefined values
  const cleaned = JSON.parse(JSON.stringify(json, (_k, v) => (v === undefined ? undefined : v)));
  return cleaned;
}

// Build a Next Metadata object + JSON-LD + canonical URL for an Article
export function buildArticleSeo(article: Article, settings?: ApiBlogSetting, siteBase?: string): Metadata  {
  const site = settings?.blogTitle ?? "My Blog";
  const title = formatTitle(settings?.pageTitleTemplate, { title: article.title, site, subtitle: settings?.blogSubtitle ?? "" }, site);
  const description = article.summary ?? settings?.seoMetaDescription ?? settings?.blogSubtitle ?? "";
  const canonical = siteBase ? new URL(`/articles/${article.slug}`, siteBase).toString() : `/articles/${article.slug}`;
  const image = article.coverImageUrl ? (siteBase ? new URL(article.coverImageUrl, siteBase).toString() : article.coverImageUrl) : settings?.blogLogoUrl;

  const jsonLd = buildJsonLdArticle({
    title: article.title,
    description,
    url: canonical,
    image: image ?? undefined,
    type: "article",
    publishedTime: article.publishedAt ?? undefined,
    modifiedTime: article.updatedAt ?? undefined,
    authorName: settings?.authorName,
    settings: settings ?? undefined,
  });

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical },
    other: {
      'script:ld+json': JSON.stringify(jsonLd),
    },
    openGraph: {
      title: article.title,
      description,
      url: canonical,
      siteName: site,
      type: "article",
      images: image ? [{ url: image, width: 1200, height: 630, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description,
      images: image ? [image] : undefined,
      creator: settings?.socials?.find(s => s.name === "Twitter") ? `@${settings.socials.find(s => s.name === "Twitter")!.url.replace(/^https?:\/\/(www\.)?twitter.com\//, "")}` : undefined,
    },
  };

  return  metadata ;
}
