"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getArticleById, updateArticle } from "@/services/article-api";
import { useAuth } from "@/hooks/useAuth";
import {
  FileText as FileTextIcon,
  Type as TypeIcon,
  Image as ImageIcon,
  Save,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { UpdateArticleApiRequest } from "@/types/article-api";
import ContentEditor from "@/components/Article/ContentEditor";
import TagSelector from "@/components/Article/TagSelector";
import ArticleStatusBox from "@/components/Article/ArticleStatusBox";
import { listTags } from "@/services/tag-api";
import { Tag } from "@/types/tag";
import { Article } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";

interface ArticleFormData {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  thumbnailUrl: string;
  timeToRead: number;
  tagIds: string[];
}

export default function NewArticlePage() {
  const params = useParams();
  const articleId = params.articleId as string;

  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    slug: "",
    subtitle: "",
    summary: "",
    content: "",
    coverImageUrl: "",
    thumbnailUrl: "",
    timeToRead: 0,
    tagIds: [],
  });

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessTick, setShowSuccessTick] = useState(false);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const apiArticle = await getArticleById(articleId);
        console.log("Fetched article:", apiArticle);

        if (apiArticle === null) {
          setArticle(null);
        } else {
          const mappedArticle = mapApiArticleToArticle(apiArticle);
          setArticle(mappedArticle);

          // Populate form with article data
          setFormData({
            title: mappedArticle.title || "",
            slug: mappedArticle.slug || "",
            subtitle: mappedArticle.subtitle || "",
            summary: mappedArticle.summary || "",
            content: mappedArticle.content || "",
            coverImageUrl: mappedArticle.coverImageUrl || "",
            thumbnailUrl: mappedArticle.thumbnailUrl || "",
            timeToRead: Number.parseInt(mappedArticle.readingTime),
            tagIds: mappedArticle.tags?.map((tag) => tag.tagId) || [],
          });
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [articleId]);

  useEffect(() => {
    listTags()
      .then((tags) => {
        setAllTags(tags);
      })
      .catch((err) => {
        console.error("Failed to fetch tags:", err);
        setAllTags([]);
      });
  }, []);

  const handleGenericInputChange = (
    field: keyof ArticleFormData,
    value: string | string[] | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleTagsChange = (value: string[]) => {
    setFormData((prev) => ({
      ...prev,
      tagIds: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check authentication before proceeding
    if (!isLoggedIn) {
      setError(
        "You must be logged in to create an article. Please log in and try again."
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const articleData: UpdateArticleApiRequest = {
        title: formData.title,
        slug: formData.slug,
        subtitle: formData.subtitle,
        summary: formData.summary,
        content: formData.content,
        coverImageUrl: formData.coverImageUrl || undefined,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        timeToRead: formData.timeToRead,
        tagIds: formData.tagIds.length > 0 ? formData.tagIds : [],
      };

      await updateArticle(articleId, articleData);

      // Show success message
      setShowSuccessTick(true);

      // Hide success tick after 3 seconds
      setTimeout(() => {
        setShowSuccessTick(false);
      }, 3000);

      //router.push(`/articles/${articleData.slug}`);
    } catch (err: unknown) {
      console.error("Error in handleSubmit:", err);

      // Handle authentication errors specifically
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      if (
        errorMessage.includes("authentication") ||
        errorMessage.includes("token")
      ) {
        setError(
          "Authentication failed. Please log in again and try creating the article."
        );
      } else {
        setError(
          `An error occurred while creating the article: ${errorMessage}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-headline-md font-bold text-base-content mb-2">
              Edit Article
            </h1>
            <p className="text-body-md text-base-content/70">
              Edit your article or customise its slug and metadata.
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error mb-6">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
              <button
                onClick={() => setError(null)}
                className="btn btn-sm btn-ghost"
              >
                ✕
              </button>
            </div>
          )}

          {/* Article Status Box */}
          <ArticleStatusBox article={article} loading={loading} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Article Information */}
            <div className="card border border-base-content/20">
              <div className="card-body">
                <h2 className="card-title text-title-lg mb-4 flex items-center gap-2">
                  <FileTextIcon className="w-5 h-5" />
                  Article Information
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Title */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Title *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter an engaging article title"
                        className="input input-bordered w-full"
                        value={formData.title}
                        onChange={(e) =>
                          handleGenericInputChange("title", e.target.value)
                        }
                        required
                      />
                      <TypeIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                  </div>

                  {/* Slug */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Slug *</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="article-url-slug"
                        className="input input-bordered w-full font-mono"
                        value={formData.slug}
                        onChange={(e) =>
                          handleGenericInputChange("slug", e.target.value)
                        }
                        required
                      />
                      <TypeIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                    <label className="label pt-1">
                      <span className="text-base-content/60">
                        URL-friendly identifier for the article (e.g.,
                        my-article-title)
                      </span>
                    </label>
                  </div>

                  {/* Subtitle */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Subtitle</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Add a subtitle to provide more context (optional)"
                      className="input input-bordered w-full"
                      value={formData.subtitle}
                      onChange={(e) =>
                        handleGenericInputChange("subtitle", e.target.value)
                      }
                    />
                  </div>

                  {/* Summary */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Summary</span>
                    </label>
                    <textarea
                      placeholder="Write a compelling summary that will appear in article previews and search results..."
                      className="textarea textarea-bordered h-24 w-full"
                      value={formData.summary}
                      onChange={(e) =>
                        handleGenericInputChange("summary", e.target.value)
                      }
                    />
                  </div>

                  {/* Cover Image URL */}
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text font-medium">
                        Cover Image URL
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://example.com/cover-image.jpg"
                        className="input input-bordered w-full"
                        value={formData.coverImageUrl}
                        onChange={(e) =>
                          handleGenericInputChange(
                            "coverImageUrl",
                            e.target.value
                          )
                        }
                      />
                      <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                  </div>

                  {/* Thumbnail URL */}
                  <div className="form-control">
                    <label className="label pb-1">
                      <span className="label-text font-medium">
                        Thumbnail URL
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        type="url"
                        placeholder="https://example.com/thumbnail.jpg"
                        className="input input-bordered w-full"
                        value={formData.thumbnailUrl}
                        onChange={(e) =>
                          handleGenericInputChange(
                            "thumbnailUrl",
                            e.target.value
                          )
                        }
                      />
                      <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                  </div>

                  {/* Time to Read */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">
                        Time to Read (minutes) *
                      </span>
                    </label>
                    <input
                      type="number"
                      placeholder="5"
                      min="0"
                      className="input input-bordered w-full"
                      value={formData.timeToRead}
                      onChange={(e) =>
                        handleGenericInputChange(
                          "timeToRead",
                          parseInt(e.target.value) || 0
                        )
                      }
                      required
                    />
                    <label className="label pt-1">
                      <span className="text-base-content/60">
                        Estimated reading time in minutes
                      </span>
                    </label>
                  </div>

                  <TagSelector
                    tags={allTags}
                    selectedTagIds={formData.tagIds}
                    onChange={handleTagsChange}
                  />
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <ContentEditor
              content={formData.content}
              handleContentChange={handleContentChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={
                  isSubmitting ||
                  !formData.title ||
                  !formData.content ||
                  !isLoggedIn
                }
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Saving...
                  </>
                ) : showSuccessTick ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Saved!
                  </>
                ) : !isLoggedIn ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Not Authenticated
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Article
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
