import { listPublishedArticles } from "@/services/article-api";

const SITE_URL = process.env.SITE_URL || "https://hadisamadzad.com";

function buildUrlEntry(loc: string, lastmod?: string) {
  return `  <url>\n    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ""}\n  </url>`;
}

export async function GET() {
  // Fetch published articles (large page size to include all)
  const filter = {
    Keyword: "",
    Statuses: ["Published"],
    TagIds: [],
    SortBy: "CreatedAtNewest",
    Page: 1,
    PageSize: 1000,
  };

  const apiArticles = await listPublishedArticles(filter, 10 * 60); // 10 minutes cache

  const staticPages = [
    { loc: `${SITE_URL}/`, lastmod: undefined },
  ];

  const urls: string[] = [];

  // add static pages
  for (const p of staticPages) {
    urls.push(buildUrlEntry(p.loc, p.lastmod));
  }

  // add articles
  if (apiArticles && Array.isArray(apiArticles.results)) {
    for (const a of apiArticles.results) {
      const loc = `${SITE_URL}/${a.slug}`;
      urls.push(buildUrlEntry(loc, a.publishedAt || a.updatedAt || a.createdAt));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      // Let CDN cache this for 1 hour and allow stale-while-revalidate
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
