import Hero from "@/components/Hero/Hero";
import ClientPage from "./clientPage";
import { getBlogSettings } from "@/services/setting-api";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import SidebarTags from "@/components/Sidebar/SidebarTags";
import { listTags } from "@/services/tag-api";

export default async function Page() {
  const settings = await getBlogSettings();
  const tags = (await listTags()) ?? [];

  return (
    <>
      <Hero
        title={settings?.blogTitle ?? "My Blog"}
        subtitle={settings?.blogSubtitle ?? "Tips & Techniques From My Journey"}
      />
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
          <div className="flex-2">
            <ClientPage /> {/* move CSR logic here */}
          </div>
          <aside className="flex-1">
            <SidebarTags tags={tags} />
            <div className="mt-6" />
            <SeriesArticles />
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
