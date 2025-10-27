"use server";

import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import SidebarTags from "@/components/Sidebar/SidebarTags";
import { getBlogSettings } from "@/services/setting-api";
import { listTags } from "@/services/tag-api";
import ClientPage from "./pageClient";

export default async function Page() {
  const settings = await getBlogSettings();
  const tags = (await listTags()) ?? [];

  return (
    <>
      <Hero
        title="Manage Articles"
        subtitle="Here is your space to manage articles"
      />
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
          <div className="flex-2">
            <ClientPage /> {/* move CSR logic here */}
          </div>
          <div className="flex-1">
            <SidebarTags tags={tags} />
            <div className="mt-6" />
            <SeriesArticles />
            <div className="mt-6" />
            <SeriesArticleParts />
            <div className="mt-6" />
            <AboutMe
              authorName={settings?.authorName ?? ""}
              aboutAuthor={settings?.aboutAuthor ?? ""}
              imageUrl={settings?.blogLogoUrl ?? ""}
              socialLinks={settings?.socials ?? []}
            />
          </div>
        </div>
      </section>
    </>
  );
}
