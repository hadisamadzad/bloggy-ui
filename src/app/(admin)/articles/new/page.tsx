"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { createArticle } from "@/services/article-api";
import { CreateArticleApiRequest } from "@/types/article";
import { useAuth } from "@/hooks/useAuth";
import {
  FileText,
  Type,
  Hash,
  Image,
  Tag,
  Eye,
  Edit3,
  Save,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

interface ArticleFormData {
  title: string;
  subtitle: string;
  summary: string;
  content: string;
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
    coverImageUrl: "",
    thumbnailUrl: "",
    tagIds: [],
  });

  const [previewMode, setPreviewMode] = useState<"edit" | "preview" | "split">(
    "split"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof ArticleFormData,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
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
      const articleData: CreateArticleApiRequest = {
        title: formData.title,
        subtitle: formData.subtitle || undefined,
        summary: formData.summary || undefined,
        content: formData.content,
        coverImageUrl: formData.coverImageUrl || undefined,
        thumbnailUrl: formData.thumbnailUrl || undefined,
        tagIds: formData.tagIds.length > 0 ? formData.tagIds : undefined,
      };

      const result = await createArticle(articleData);

      if (result) {
        router.push(`/articles/${result.slug}`);
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => router.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
            </div>
            <h1 className="text-3xl font-bold text-base-content mb-2">
              Create New Article
            </h1>
            <p className="text-base-content/70">
              Write and publish your article with markdown support
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Article Information */}
            <div className="card border border-base-content/20">
              <div className="card-body">
                <h2 className="card-title text-title-lg mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
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
                          handleInputChange("title", e.target.value)
                        }
                        required
                      />
                      <Type className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
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
                        handleInputChange("subtitle", e.target.value)
                      }
                    />
                  </div>

                  {/* Summary */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Summary</span>
                      <span className="label-text-alt">
                        Brief description for SEO and previews
                      </span>
                    </label>
                    <textarea
                      placeholder="Write a compelling summary that will appear in article previews and search results..."
                      className="textarea textarea-bordered h-24 w-full"
                      value={formData.summary}
                      onChange={(e) =>
                        handleInputChange("summary", e.target.value)
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
                          handleInputChange("coverImageUrl", e.target.value)
                        }
                      />
                      <Image className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
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
                          handleInputChange("thumbnailUrl", e.target.value)
                        }
                      />
                      <Image className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="form-control lg:col-span-2">
                    <label className="label pb-1">
                      <span className="label-text font-medium">Tags</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="javascript, tutorial, web-development"
                        className="input input-bordered w-full"
                        value={formData.tagIds.join(", ")}
                        onChange={(e) =>
                          handleInputChange(
                            "tagIds",
                            e.target.value
                              .split(",")
                              .map((tag) => tag.trim())
                              .filter(Boolean)
                          )
                        }
                      />
                      <Tag className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                    </div>
                    <label className="label">
                      <span className="label-text-alt">
                        Use commas to separate multiple tags
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Editor */}
            <div className="card border border-base-content/20">
              <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="card-title text-title-lg flex items-center gap-2">
                    <Edit3 className="w-5 h-5" />
                    Article Content
                  </h2>
                  <div className="tabs tabs-boxed">
                    <button
                      type="button"
                      className={`tab ${
                        previewMode === "edit" ? "tab-active" : ""
                      }`}
                      onClick={() => setPreviewMode("edit")}
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      type="button"
                      className={`tab ${
                        previewMode === "split" ? "tab-active" : ""
                      }`}
                      onClick={() => setPreviewMode("split")}
                    >
                      <Hash className="w-4 h-4 mr-2" />
                      Split
                    </button>
                    <button
                      type="button"
                      className={`tab ${
                        previewMode === "preview" ? "tab-active" : ""
                      }`}
                      onClick={() => setPreviewMode("preview")}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </button>
                  </div>
                </div>

                <div
                  className={`grid gap-6 ${
                    previewMode === "split" ? "lg:grid-cols-2" : "grid-cols-1"
                  }`}
                >
                  {(previewMode === "edit" || previewMode === "split") && (
                    <div className="space-y-3">
                      <label className="label pb-1">
                        <span className="label-text font-medium">
                          Markdown Content *
                        </span>
                        <span className="label-text-alt">
                          Supports GitHub flavored markdown
                        </span>
                      </label>
                      <textarea
                        className="textarea textarea-bordered font-mono text-sm leading-relaxed h-96 w-full"
                        value={formData.content}
                        onChange={(e) =>
                          handleInputChange("content", e.target.value)
                        }
                        placeholder={`# Your Article Title

## Introduction
Start writing your article content here. You can use **bold**, *italic*, and other markdown features.

### Code Examples
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
- Item 1
- Item 2
- Item 3

[Links work too](https://example.com)

> Blockquotes for important notes

Remember to make your content engaging and informative!`}
                        required
                      />
                    </div>
                  )}

                  {(previewMode === "preview" || previewMode === "split") && (
                    <div className="space-y-3">
                      <label className="label pb-1">
                        <span className="label-text font-medium">
                          Live Preview
                        </span>
                      </label>
                      <div className="border border-base-content/20 rounded-lg p-4 bg-base-50 h-96 overflow-y-auto">
                        {formData.content ? (
                          <div className="prose prose-base max-w-none">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {formData.content}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-full text-center">
                            <div>
                              <Eye className="w-12 h-12 text-base-content/30 mx-auto mb-4" />
                              <p className="text-base-content/50 italic">
                                Start writing to see your content come to
                                life...
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

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
                    Create Article
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
