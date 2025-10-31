import ArticleHeader from "@/components/Article/ArticleHeader";
import AboutMe from "@/components/Sidebar/AboutMe";
import { getPublishedArticleBySlug } from "@/services/article-api";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import ArticleBody from "@/components/Article/ArticleBody";
import ArticleViewTracker from "@/components/Article/ArticleViewTracker";
import { Article } from "@/types/article";
import { getBlogSettings } from "@/services/setting-api";
import { Metadata } from "next";
import { formatTitle, buildArticleSeo } from "@/lib/seo";

type RoutePageProps = {
  params?: Promise<{ articleSlug: string }>;
  searchParams?: Promise<unknown>;
};

export async function generateMetadata(
  props: RoutePageProps
): Promise<Metadata> {
  const { params } = props;
  const { articleSlug } = (await params) as { articleSlug: string };
  const settings = await getBlogSettings();
  const site = settings?.blogTitle ?? "My Blog";

  const REVALIDATE_SECONDS = 30; // hard-coded, do not change
  const apiArticle = await getPublishedArticleBySlug(
    articleSlug,
    REVALIDATE_SECONDS
  );

  if (!apiArticle) {
    return {
      title: formatTitle(
        settings?.pageTitleTemplate,
        { title: "Article not found", site },
        site
      ),
      description: settings?.seoMetaDescription ?? settings?.blogSubtitle,
      alternates: {
        canonical: `${settings?.blogUrl ?? ""}/${articleSlug}`,
      },
      authors: settings?.authorName ? [{ name: settings.authorName }] : [],
    };
  }

  const article = mapApiArticleToArticle(apiArticle);
  const siteBase = settings?.blogUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const metadata = buildArticleSeo(article, settings ?? undefined, siteBase);
  return metadata;
}

export default async function Page(props: RoutePageProps) {
  const { params } = props;
  const { articleSlug } = (await params) as { articleSlug: string };
  const REVALIDATE_SECONDS = 30; // hard-coded, do not change
  const apiArticle = await getPublishedArticleBySlug(
    articleSlug,
    REVALIDATE_SECONDS
  );
  const settings = await getBlogSettings();

  if (apiArticle === null) {
    return <div>Article not found.</div>;
  }

  const article: Article = mapApiArticleToArticle(apiArticle);

  return (
    <section className="max-w-[1440px] mx-auto px-24">
      <ArticleHeader
        article={article}
        author={settings?.authorName ?? "Author"}
      />
      <div className="flex gap-6">
        <div className="flex-2">
          <ArticleBody article={article} />
          {/* Client-side tracker: ensures visitorId in localStorage and records a view */}
          <ArticleViewTracker articleId={article.articleId} />
        </div>
        <div className="flex-1">
          {/*TODO Future Release*/}
          {/*<SeriesArticleParts />
          <div className="mt-6" />*/}
          <AboutMe
            authorName={settings?.authorName ?? ""}
            aboutAuthor={settings?.aboutAuthor ?? ""}
            imageUrl={settings?.blogLogoUrl ?? ""}
            socialLinks={settings?.socials ?? []}
          />
        </div>
      </div>
    </section>
  );
}
