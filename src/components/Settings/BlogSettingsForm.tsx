"use client";

import React, { FormEvent } from "react";
import { SocialLink, SocialNetworkName } from "@/types/setting";
import {
  Globe,
  Image as ImageIcon,
  LinkIcon,
  Plus,
  Trash2,
  Move,
  Save,
} from "lucide-react";

export interface FormData {
  authorName: string;
  authorTitle: string;
  aboutAuthor: string;
  blogTitle: string;
  blogSubtitle: string;
  blogDescription: string;
  blogUrl: string;
  pageTitleTemplate: string;
  seoMetaTitle: string;
  seoMetaDescription: string;
  blogLogoUrl: string;
  socials: SocialLink[];
  copyrightText: string;
}

interface BlogSettingsFormProps {
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: (e: FormEvent) => void;
  isSaving: boolean;
}

export default function BlogSettingsForm({
  formData,
  onFormDataChange,
  onSubmit,
  isSaving,
}: BlogSettingsFormProps) {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    // Optionally highlight drop target
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const socials = [...formData.socials];
    const [moved] = socials.splice(draggedIndex, 1);
    socials.splice(index, 0, moved);
    // Reassign order property
    socials.forEach((s, i) => (s.order = i + 1));
    onFormDataChange({
      ...formData,
      socials,
    });
    setDraggedIndex(null);
  };
  const addSocialLink = () => {
    const newOrder = Math.max(...formData.socials.map((s) => s.order), 0) + 1;
    onFormDataChange({
      ...formData,
      socials: [
        ...formData.socials,
        { order: newOrder, name: SocialNetworkName.Twitter, url: "" },
      ],
    });
  };

  const removeSocialLink = (index: number) => {
    onFormDataChange({
      ...formData,
      socials: formData.socials.filter((_, i) => i !== index),
    });
  };

  const updateSocialLink = (
    index: number,
    field: "name" | "url",
    value: string | SocialNetworkName
  ) => {
    const updatedSocials = [...formData.socials];
    if (field === "name") {
      updatedSocials[index][field] = value as SocialNetworkName;
    } else {
      updatedSocials[index][field] = value as string;
    }
    onFormDataChange({
      ...formData,
      socials: updatedSocials,
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="card border border-base-content/20">
            <div className="card-body">
              <h2 className="card-title text-title-lg mb-4">
                Basic Information
              </h2>

              <div className="space-y-4">
                {/* Author Name */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Author Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="input input-bordered w-full"
                    value={formData.authorName}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        authorName: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Author Title */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Author Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your title or role"
                    className="input input-bordered w-full"
                    value={formData.authorTitle}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        authorTitle: e.target.value,
                      })
                    }
                  />
                </div>

                {/* About Author */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      About Author
                    </span>
                  </label>
                  <textarea
                    placeholder="A short bio about yourself"
                    className="textarea textarea-bordered h-24 w-full"
                    value={formData.aboutAuthor}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        aboutAuthor: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Blog Title */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Blog Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your blog title"
                    className="input input-bordered w-full"
                    value={formData.blogTitle}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        blogTitle: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                {/* Blog Subtitle */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Blog Subtitle
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your role or tagline"
                    className="input input-bordered w-full"
                    value={formData.blogSubtitle}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        blogSubtitle: e.target.value,
                      })
                    }
                  />
                </div>

                {/* Blog Description */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Blog Description
                    </span>
                  </label>
                  <textarea
                    placeholder="Brief description of your blog"
                    className="textarea textarea-bordered h-24 w-full"
                    value={formData.blogDescription}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        blogDescription: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Technical */}
          <div className="card border border-base-content/20">
            <div className="card-body">
              <h2 className="card-title text-title-lg mb-4">SEO & Technical</h2>

              <div className="space-y-4">
                {/* Page Title Template (moved from Basic Information) */}
                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      Page Title Template
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Browser tab title"
                    className="input input-bordered w-full"
                    value={formData.pageTitleTemplate}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        pageTitleTemplate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">Blog URL</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="blog.yourdomain.com"
                      className="input input-bordered w-full"
                      value={formData.blogUrl}
                      onChange={(e) =>
                        onFormDataChange({
                          ...formData,
                          blogUrl: e.target.value,
                        })
                      }
                    />
                    <Globe className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                  </div>
                  <label className="label pt-1">
                    <span className="text-label-sm text-base-content/60">
                      Recommended size: 540 x 400
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">Logo URL</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://example.com/logo.png"
                      className="input input-bordered w-full"
                      value={formData.blogLogoUrl}
                      onChange={(e) =>
                        onFormDataChange({
                          ...formData,
                          blogLogoUrl: e.target.value,
                        })
                      }
                    />
                    <ImageIcon className="absolute right-3 top-3 w-5 h-5 text-base-content/40" />
                  </div>
                  <label className="label pt-1">
                    <span className="text-label-sm text-base-content/60">
                      Recommended size: 540 x 400
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      SEO Meta Title
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="SEO optimized title"
                    className="input input-bordered w-full"
                    value={formData.seoMetaTitle}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        seoMetaTitle: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-control">
                  <label className="label pb-1">
                    <span className="text-label-lg font-medium">
                      SEO Meta Description
                    </span>
                  </label>
                  <textarea
                    placeholder="SEO meta description (155 characters max)"
                    className="textarea textarea-bordered h-24 rounded-lg w-full"
                    maxLength={155}
                    value={formData.seoMetaDescription}
                    onChange={(e) =>
                      onFormDataChange({
                        ...formData,
                        seoMetaDescription: e.target.value,
                      })
                    }
                  />
                  <label className="label">
                    {formData.seoMetaDescription.length}/155 characters
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="card border border-base-content/20 mt-6">
          <div className="card-body">
            <div className="flex items-center justify-between ">
              <h2 className="card-title text-title-lg mb-4">Social Links</h2>
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={addSocialLink}
              >
                <Plus className="w-4 h-4" />
                Add Link
              </button>
            </div>

            <div className="space-y-3">
              {formData.socials.map((social, index) => (
                <div
                  key={index}
                  className={`flex gap-3 items-center cursor-move ${
                    draggedIndex === index ? "bg-base-200" : ""
                  }`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={() => handleDrop(index)}
                >
                  <div className="flex items-center gap-2 text-base-content/50">
                    <Move className="w-4 h-4" />
                    <span className="text-sm">#{social.order}</span>
                  </div>
                  <select
                    className="select select-bordered flex-1"
                    value={social.name}
                    onChange={(e) =>
                      updateSocialLink(
                        index,
                        "name",
                        e.target.value as SocialNetworkName
                      )
                    }
                  >
                    {Object.values(SocialNetworkName).map((networkName) => (
                      <option key={networkName} value={networkName}>
                        {networkName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="url"
                    placeholder="https://example.com/profile"
                    className="input input-bordered flex-1"
                    value={social.url}
                    onChange={(e) =>
                      updateSocialLink(index, "url", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="btn btn-outline btn-error"
                    onClick={() => removeSocialLink(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {formData.socials.length === 0 && (
                <div className="text-center py-8 text-base-content/50">
                  <LinkIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No social links added yet</p>
                  <p className="text-sm">
                    Click &ldquo;Add Link&rdquo; to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright Section - full width */}
        <div className="card border border-base-content/20 mt-6">
          <div className="card-body">
            <h2 className="card-title text-title-lg mb-4">Copyright</h2>
            <div className="form-control">
              <label className="label pb-1">
                <span className="text-label-lg font-medium">
                  Copyright Text
                </span>
              </label>
              <input
                type="text"
                placeholder="© 2025 Your Blog Name. All rights reserved."
                className="input input-bordered w-full"
                value={formData.copyrightText}
                onChange={(e) =>
                  onFormDataChange({
                    ...formData,
                    copyrightText: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Blog Settings
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
