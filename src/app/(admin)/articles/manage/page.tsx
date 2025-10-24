"use client";

import ArticleList from "@/components/Article/ArticleList";
import Hero from "@/components/Hero/Hero";
import AboutMe from "@/components/Sidebar/AboutMe";
import SeriesArticleParts from "@/components/Sidebar/SeriesArticleParts";
import SeriesArticles from "@/components/Sidebar/SeriesArticles";
import SidebarTags from "@/components/Sidebar/SidebarTags";
import { listArticles } from "@/services/article-api";
import { ArticleFilter, Article, ArticleSortBy } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import { useEffect, useState } from "react";
import { Tag } from "@/types/tag";
import { listTags } from "@/services/tag-api";

export default function Page() {
  // TODO This code is commented out because `useSearchParams` is not working in CSR in this way.
  // URL search parameters
  //const searchParams = useSearchParams();
  //const keyword = searchParams.get("keyword");
  //const page = searchParams.get("page");

  const [articles, setArticles] = useState<Article[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [sortBy, setSortBy] = useState<ArticleSortBy>(ArticleSortBy.Latest);
  const [onlyDrafts, setOnlyDrafts] = useState(false);
  const [onlyArchived, setOnlyArchived] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let statuses: string[] = [];
    if (onlyDrafts && !onlyArchived) {
      statuses = ["Draft"];
    } else if (onlyArchived && !onlyDrafts) {
      statuses = ["Archived"];
    } // else: all selected, statuses = []
    const filter: ArticleFilter = {
      Keyword: "", //keyword || "",
      Statuses: statuses,
      TagIds: [],
      SortBy: sortBy.toString(),
      Page: 1, //page ? parseInt(page) : 1,
      PageSize: 14,
    };
    setLoading(true);
    setError(null);

    listArticles(filter)
      .then((apiArticles) => {
        const articles = apiArticles?.results.map(mapApiArticleToArticle) ?? [];
        setArticles(articles);
      })
      .catch(() => setError("Failed to load articles."))
      .finally(() => setLoading(false));
  }, [sortBy, onlyDrafts, onlyArchived]);

  useEffect(() => {
    listTags()
      .then((tags) => {
        setTags(tags);
      })
      .catch(() => setError("Failed to load tags."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  // Don't return early if no articles; show the list with an empty message instead
  return (
    <>
      <Hero
        title="Manage Articles"
        subtitle="Here is your space to manage articles"
      />
      <section className="max-w-[1440px] mx-auto px-24">
        <div className="flex gap-6">
          <div className="flex-2">
            <ArticleList
              articles={articles}
              sortedBy={sortBy}
              onSortChange={setSortBy}
              onlyDrafts={onlyDrafts}
              onlyArchived={onlyArchived}
              onOnlyDraftsChange={setOnlyDrafts}
              onOnlyArchivedChange={setOnlyArchived}
              isAdmin={true}
            />
          </div>

          <div className="flex-1">
            <SidebarTags tags={tags} />
            <div className="mt-6" />
            <SeriesArticles />
            <div className="mt-6" />
            <SeriesArticleParts />
            <div className="mt-6" />
            <AboutMe />
          </div>
        </div>
      </section>
    </>
  );
}
