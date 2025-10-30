import ArticleHeader from "@/components/Article/ArticleHeader";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import { getPublishedArticleBySlug } from "@/services/article-api";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import ArticleBody from "@/components/Article/ArticleBody";
import ArticleViewTracker from "@/components/Article/ArticleViewTracker";
import { Article } from "@/types/article";
import { getBlogSettings } from "@/services/setting-api";

interface PageProps {
  params: Promise<{
    articleSlug: string; // matches [articleSlug] in the folder name
  }>;
}

export default async function Page({ params }: PageProps) {
  const { articleSlug } = await params;

  const apiArticle = await getPublishedArticleBySlug(articleSlug);
  const settings = await getBlogSettings();

  if (apiArticle === null) {
    return <div>Article not found.</div>;
  }

  const article: Article = mapApiArticleToArticle(apiArticle);

  return (
    <section className="max-w-[1440px] mx-auto px-24">
      <ArticleHeader article={article} />
      <div className="flex gap-6">
        <div className="flex-2">
          <ArticleBody article={article} />
          {/* Client-side tracker: ensures visitorId in localStorage and records a view */}
          <ArticleViewTracker articleId={article.articleId} />
        </div>
        <div className="flex-1">
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
  );
}
