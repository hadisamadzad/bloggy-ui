import Hero from "@/components/Hero/Hero";
import ClientPage from "./clientPage";
import { getBlogSettings } from "@/services/setting-api";
import AboutMe from "@/components/Sidebar/AboutMe";
import SidebarTags from "@/components/Sidebar/SidebarTags";
import { listTags } from "@/services/tag-api";
import Link from "next/link";

export interface PageProps {
  tagSlug?: string;
}

export default async function Page({ tagSlug }: PageProps) {
  // Fetch blog settings and tags
  const settings = await getBlogSettings();
  const allTags = (await listTags()) ?? [];

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
              <Link href="/articles" className="underline" scroll={false}>
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
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
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
