import Page from "@/app/(public)/page";
import { buildBlogSeoMetadata } from "@/lib/seo";
import { getBlogSettings } from "@/services/setting-api";
import { listTags } from "@/services/tag-api";
import { Metadata } from "next";

type RoutePageProps = {
  params: Promise<{ tagSlug: string }>;
};

// Generate SEO metadata for the article page
export async function generateMetadata(
  props: RoutePageProps
): Promise<Metadata> {
  const { params } = props;
  const { tagSlug } = (await params) as { tagSlug: string };
  const REVALIDATE_SECONDS = 30; // hard-coded, do not change
  const tag = (await listTags(REVALIDATE_SECONDS)).find(
    (t) => t.slug === tagSlug
  )!;
  const settings = await getBlogSettings();
  const title = `${tag?.name} Articles – ${settings.blogTitle}`;
  return buildBlogSeoMetadata(settings, title);
}

export default async function TagPage({ params }: RoutePageProps) {
  const { tagSlug } = await params;

  // Returns the articles page with the tagSlug prop
  return <Page params={Promise.resolve({ tagSlug })} />;
}
