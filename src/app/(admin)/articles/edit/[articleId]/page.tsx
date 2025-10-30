"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ToastBar from "@/components/Common/ToastBar";
import type { ToastMessage } from "@/components/Common/ToastBar";
import {
  deleteArticle,
  getArticleById,
  updateArticle,
  updateArticleStatus,
} from "@/services/article-api";
import { useAuth } from "@/hooks/useAuth";
import {
  FileText as FileTextIcon,
  Type as TypeIcon,
  Image as ImageIcon,
  Save,
  AlertCircle,
} from "lucide-react";
import { UpdateArticleApiRequest } from "@/types/article-api";
import ContentEditor from "@/components/Article/ContentEditor";
import TagSelector from "@/components/Article/TagSelector";
import ArticleStatusBox from "@/components/Article/ArticleStatusBox";
import { listTags } from "@/services/tag-api";
import { Tag } from "@/types/tag";
import { Article, ArticleStatus, OriginalArticleInfo } from "@/types/article";
import { mapApiArticleToArticle } from "@/lib/type-mappers";
import OriginalArticleInfoBox from "@/components/Article/OriginalArticleInfoBox";
import ConfirmationModal from "@/components/Common/ConfirmationModal";

interface ArticleFormData {
  title: string;
  slug: string;
  subtitle: string;
  summary: string;
  content: string;
  originalArticlePlatform: string;
  originalArticleUrl: string;
  originalArticlePublishedOn: string;
  coverImageUrl: string;
  thumbnailUrl: string;
  timeToRead: number;
  tagIds: string[];
}

export default function EditArticlePage() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);
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
    originalArticlePlatform: "",
    originalArticleUrl: "",
    originalArticlePublishedOn: "",
    coverImageUrl: "",
    thumbnailUrl: "",
    timeToRead: 0,
    tagIds: [],
  });

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Status states
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] =
    useState<ArticleStatus | null>(null);

  // Delete states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  const [allTags, setAllTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const apiArticle = await getArticleById(articleId);

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
            originalArticlePlatform:
              mappedArticle.originalArticleInfo?.platform || "",
            originalArticleUrl: mappedArticle.originalArticleInfo?.url || "",
            originalArticlePublishedOn:
              mappedArticle.originalArticleInfo?.publishedOn || "",
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

  const handleOriginalArticleInfoChange = (
    field: keyof OriginalArticleInfo,
    value: string
  ) => {
    let mappedFieldName;
    switch (field) {
      case "platform":
        mappedFieldName = "originalArticlePlatform";
        break;
      case "url":
        mappedFieldName = "originalArticleUrl";
        break;
      case "publishedOn":
        mappedFieldName = "originalArticlePublishedOn";
        break;
    }
    if (mappedFieldName) {
      setFormData((prev) => ({
        ...prev,
        [mappedFieldName]: value,
      }));
    }
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
        "You must be logged in to update an article. Please log in and try again."
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Prepare nested originalArticleInfo only if all fields are present
    let originalArticleInfo = undefined;
    if (
      formData.originalArticlePlatform &&
      formData.originalArticleUrl &&
      formData.originalArticlePublishedOn
    ) {
      originalArticleInfo = {
        platform: formData.originalArticlePlatform,
        url: formData.originalArticleUrl,
        publishedOn: formData.originalArticlePublishedOn,
      };
    }

    try {
      const articleData: UpdateArticleApiRequest = {
        title: formData.title,
        slug: formData.slug,
        subtitle: formData.subtitle,
        summary: formData.summary,
        content: formData.content,
        originalArticleInfo: originalArticleInfo,
        coverImageUrl: formData.coverImageUrl || undefined,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        timeToRead: formData.timeToRead,
        tagIds: formData.tagIds.length > 0 ? formData.tagIds : [],
      };

      await updateArticle(articleId, articleData);

      // Keep button disabled and show loader for 3 seconds
      setIsSubmitting(true);
      setToastMessage({
        type: "success",
        text: "Article updated successfully!",
      });
      setToastOpen(true);
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
          "Authentication failed. Please log in again and try updating the article."
        );
      } else {
        setError(
          `An error occurred while updating the article: ${errorMessage}`
        );
      }
    } finally {
      // Intentionally delay enabling the button to show success state
      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  };

  // Triggers modal, not change directly
  const handleStatusChangeRequest = (status: ArticleStatus) => {
    setPendingStatusChange(status);
    setShowStatusModal(true);
  };

  const handleStatusChangeConfirmed = async () => {
    if (!pendingStatusChange) return;

    const succeeded = await updateArticleStatus(
      articleId,
      pendingStatusChange!
    );
    if (succeeded) {
      setArticle((prev) => {
        if (!prev) return prev;
        return {
          ...prev, // keep all existing fields
          status: pendingStatusChange, // update only one field
        };
      });
      setToastMessage({
        type: "success",
        text: `Article ${pendingStatusChange!.toLowerCase()} successfully!`,
      });
      setShowStatusModal(false);
      setPendingStatusChange(null);
      setToastOpen(true);
    }
  };

  // Triggers modal, not delete directly
  const handleDeleteRequest = (articleId: string) => {
    setPendingDeleteId(articleId);
    setShowDeleteModal(true);
  };

  // Actually deletes after confirmation
  const handleDeleteConfirmed = async () => {
    if (!pendingDeleteId) return;

    if (!isLoggedIn) {
      setError(
        "You must be logged in to delete an article. Please log in and try again."
      );
      setShowDeleteModal(false);
      return;
    }

    setError(null);

    try {
      await deleteArticle(pendingDeleteId);

      setShowDeleteModal(false);
      router.push(`/articles/manage`);
    } catch (err: unknown) {
      console.error("Error in handleDeleteConfirmed:", err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      if (
        errorMessage.includes("authentication") ||
        errorMessage.includes("token")
      ) {
        setError(
          "Authentication failed. Please log in again and try deleting the article."
        );
      } else {
        setError(
          `An error occurred while deleting the article: ${errorMessage}`
        );
      }
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      {toastMessage && (
        <ToastBar
          open={toastOpen}
          message={toastMessage}
          onClose={() => setToastOpen(false)}
        />
      )}
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
          <div className="mb-6">
            <ArticleStatusBox
              article={article}
              loading={loading}
              onStatusChange={handleStatusChangeRequest}
              onDelete={handleDeleteRequest}
            />
          </div>

          {/* Publish/Archive Confirmation Modal */}
          <ConfirmationModal
            type="info"
            title={
              article?.status === ArticleStatus.Published
                ? "Archive Article"
                : "Publish Article"
            }
            description={`Are you sure you want to ${
              article?.status === ArticleStatus.Published
                ? "archive"
                : "publish"
            } this article?`}
            confirmText={
              article?.status === ArticleStatus.Published
                ? "Archive"
                : "Publish"
            }
            cancelText="Cancel"
            open={showStatusModal}
            onCancel={() => {
              setShowStatusModal(false);
              setPendingStatusChange(null);
            }}
            onConfirm={handleStatusChangeConfirmed}
          />

          {/* Delete Confirmation Modal */}
          <ConfirmationModal
            type="danger"
            title="Delete Article"
            description="Are you sure you want to delete this article? This action cannot be undone."
            confirmText="Delete"
            cancelText="Cancel"
            open={showDeleteModal}
            onCancel={() => {
              setShowDeleteModal(false);
              setPendingDeleteId(null);
            }}
            onConfirm={handleDeleteConfirmed}
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
                      <span className="text-label-lg font-medium">Title *</span>
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
                      <span className="text-label-lg font-medium">Slug *</span>
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
                      <span className="text-label-md text-base-content/60">
                        URL-friendly identifier for the article (e.g.,
                        my-article-title)
                      </span>
                    </label>
                  </div>

                  {/* Subtitle */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="text-label-lg font-medium">
                        Subtitle
                      </span>
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
                      <span className="text-label-lg font-medium">Summary</span>
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
                      <span className="text-label-lg font-medium">
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
                      <span className="text-label-lg font-medium">
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
                      <span className="text-label-lg font-medium">
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
                      <span className="text-label-md text-base-content/60">
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

            {/* Original Article Information */}
            <OriginalArticleInfoBox
              platform={formData.originalArticlePlatform}
              url={formData.originalArticleUrl}
              publishedOn={formData.originalArticlePublishedOn}
              handleChange={handleOriginalArticleInfoChange}
            />

            {/* Content Editor */}
            <ContentEditor
              content={formData.content}
              handleChange={handleContentChange}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                Go Back To Articles
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
