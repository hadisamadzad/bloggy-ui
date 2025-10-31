"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ToastBar from "@/components/Common/ToastBar";
import type { ToastMessage } from "@/components/Common/ToastBar";
import { createArticle } from "@/services/article-api";
import { useAuth } from "@/hooks/useAuth";
import {
  FileText as FileTextIcon,
  Type as TypeIcon,
  Image as ImageIcon,
  Save,
  AlertCircle,
} from "lucide-react";
import { CreateArticleApiRequest } from "@/types/article-api";
import ContentEditor from "@/components/Article/ContentEditor";
import TagSelector from "@/components/Article/TagSelector";
import { listTags } from "@/services/tag-api";
import { Tag } from "@/types/tag";
import OriginalArticleInfoBox from "@/components/Article/OriginalArticleInfoBox";
import { OriginalArticleInfo } from "@/types/article";

interface ArticleFormData {
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  originalArticlePlatform: string;
  originalArticleUrl: string;
  originalArticlePublishedOn: string;
  coverImageUrl: string;
  thumbnailUrl: string;
  tagIds: string[];
}

export default function NewArticlePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    subtitle: "",
    summary: "",
    content: "",
    originalArticlePlatform: "",
    originalArticleUrl: "",
    originalArticlePublishedOn: "",
    coverImageUrl: "",
    thumbnailUrl: "",
    tagIds: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Tag[]>([]);

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<ToastMessage | null>(null);

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

  // Centralize error -> toast behavior: when `error` is set show an error toast.
  useEffect(() => {
    if (error) {
      setToastMessage({ type: "error", text: error });
      setToastOpen(true);
    }
  }, [error]);

  const handleGenericInputChange = (
    field: keyof ArticleFormData,
    value: string | string[]
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
        "You must be logged in to create an article. Please log in and try again."
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
      const articleData: CreateArticleApiRequest = {
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        summary: formData.summary || undefined,
        content: formData.content,
        originalArticleInfo: originalArticleInfo,
        coverImageUrl: formData.coverImageUrl || undefined,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        tagIds: formData.tagIds.length > 0 ? formData.tagIds : undefined,
      };

      const createdSlug = await createArticle(articleData);

      if (createdSlug) {
        router.push(`/articles/manage`);
      } else {
        setError("Failed to create article. Please try again.");
      }
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
      {toastMessage && (
        <ToastBar
          open={toastOpen}
          message={toastMessage}
          onClose={() => {
            setToastOpen(false);
            // clear the page error so any inline banners disappear as well
            setError(null);
          }}
        />
      )}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-headline-md font-bold text-base-content mb-2">
              Draft New Article
            </h1>
            <p className="text-body-md text-base-content/70">
              Draft your article with markdown support
            </p>
          </div>

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
                    Creating...
                  </>
                ) : !isLoggedIn ? (
                  <>
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Not Authenticated
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Draft Article
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
