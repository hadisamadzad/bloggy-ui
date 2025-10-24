"use client";

import { Article } from "@/types/article";
import { Eye, Archive, ExternalLink, Trash2 } from "lucide-react";
import { formatDate } from "@/lib/date-tools";

interface ArticleStatusBoxProps {
  article: Article | null;
  loading: boolean;
}

export default function ArticleStatusBox({
  article,
  loading,
}: ArticleStatusBoxProps) {
  if (loading) {
    return (
      <div className="card border border-base-content/20 mb-6">
        <div className="card-body">
          <div className="flex items-center justify-center py-4">
            <span className="loading loading-spinner loading-md"></span>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="card border border-base-content/20 mb-6">
      <div className="card-body py-4">
        <div className="flex flex-col gap-3">
          {/* First Row - Status and Preview */}
          <div className="flex items-center justify-between text-sm">
            {/* Status Badge */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-base-content/60">Status:</span>
              <span
                className={`badge px-3 ${
                  article.status === "Draft" ? "badge-outline" : "badge-neutral"
                }`}
              >
                {article.status}
              </span>
            </div>

            {/* Preview Button */}
            <button type="button" className="btn btn-sm btn-ghost gap-2">
              <ExternalLink className="w-4 h-4" />
              Preview
            </button>
          </div>

          {/* Second Row - Date Info and Actions */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-6">
              {/* Created At */}
              <div className="flex items-center gap-2">
                <span className="text-base-content/60">Created:</span>
                <span className="font-medium">
                  {formatDate(article.createdAt)}
                </span>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-2">
                <span className="text-base-content/60">Updated:</span>
                <span className="font-medium">
                  {formatDate(article.updatedAt)}
                </span>
              </div>

              {/* Published At */}
              <div className="flex items-center gap-2">
                <span className="text-base-content/60">Published:</span>
                <span className="font-medium">
                  {article.publishedAt ? formatDate(article.publishedAt) : "-"}
                </span>
              </div>

              {/* Archived At */}
              <div className="flex items-center gap-2">
                <span className="text-base-content/60">Archived:</span>
                <span className="font-medium">
                  {article.archivedAt ? formatDate(article.archivedAt) : "-"}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Publish/Archive Button */}
              <button
                type="button"
                className={`btn btn-sm btn-secondary ${
                  article.status === "Published" ? "btn-outline" : "btn-primary"
                } gap-2`}
              >
                {article.status === "Published" ? (
                  <>
                    <Archive className="w-4 h-4" />
                    Archive
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Publish
                  </>
                )}
              </button>

              {/* Delete Button */}
              <button
                type="button"
                className="btn btn-sm btn-error btn-dash gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
