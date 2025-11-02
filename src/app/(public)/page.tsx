import Hero from "@/components/Hero/Hero";
import ClientPage from "./clientPage";
import { getBlogSettings } from "@/services/setting-api";
import AboutMe from "@/components/Sidebar/AboutMe";
import SidebarTags from "@/components/Sidebar/SidebarTags";
import { listTags } from "@/services/tag-api";
import Link from "next/link";
import { Metadata } from "next";
import { buildBlogSeoMetadata } from "@/lib/seo";

type RoutePageProps = {
  params?: Promise<{ tagSlug?: string }>;
  searchParams?: Promise<unknown>;
};

// Generate SEO metadata for the article page
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getBlogSettings();

  return buildBlogSeoMetadata(settings);
}

export default async function Page(props: RoutePageProps) {
  const { params } = props;
  const { tagSlug } = (await params) as { tagSlug: string };
  const REVALIDATE_SECONDS = 30; // hard-coded, do not change

  // Fetch blog settings and tags
  const settings = await getBlogSettings();
  const allTags = await listTags(REVALIDATE_SECONDS);

  // Find the tagId and name for the given tagSlug
  const searchedTagId = allTags.find((tag) => tag.slug === tagSlug)?.tagId;
  const searchedTagName = allTags.find((tag) => tag.slug === tagSlug)?.name;

  return (
    <>
      <Hero
        title={
          tagSlug ? `./${searchedTagName}` : settings?.blogTitle ?? "My Blog"
        }
        subtitle={
          tagSlug ? (
            <span>
              filtered results for {searchedTagName}, explore{" "}
              <Link href="/" className="underline" scroll={false}>
                all articles!
              </Link>
            </span>
          ) : (
            <span>
              {settings?.blogSubtitle ?? "Tips & Techniques From My Journey"}
            </span>
          )
        }
      />
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-2">
            <ClientPage selectedTagId={searchedTagId} />
          </div>
          <aside className="flex-1">
            <SidebarTags tags={allTags} selectedTagId={searchedTagId} />
            <div className="mt-6" />
            {/*TODO: future release*/}
            {/*<SeriesArticles />*/}
            <div className="mt-6" />
            <AboutMe
              authorName={settings?.authorName ?? ""}
              aboutAuthor={settings?.aboutAuthor ?? ""}
              imageUrl={settings?.blogLogoUrl ?? ""}
              socialLinks={settings?.socials ?? []}
            />
          </aside>
        </div>
      </section>
    </>
  );
}
