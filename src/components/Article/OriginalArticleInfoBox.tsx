"use client";

import { OriginalArticleInfo } from "@/types/article";
import { FileTextIcon } from "lucide-react";

interface OriginalArticleInfoBoxProps {
  platform: string;
  url: string;
  publishedOn: string;
  handleChange: (field: keyof OriginalArticleInfo, value: string) => void;
}

export default function OriginalArticleInfoBox({
  platform,
  url,
  publishedOn,
  handleChange,
}: OriginalArticleInfoBoxProps) {
  return (
    <div className="card border border-base-content/20">
      <div className="card-body">
        <h2 className="card-title text-title-lg mb-4 flex items-center gap-2">
          <FileTextIcon className="w-5 h-5" />
          Original Article Information
        </h2>
        <div className="mb-4 text-sm text-warning">
          <span>
            All three fields below must be populated to save original article
            info.
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Platform */}
          <div className="form-control lg:col-span-1">
            <label className="label pb-1">
              <span className="label-text font-medium">Original Platform</span>
            </label>
            <input
              type="text"
              placeholder="Enter the platform name (e.g., Medium, Dev.to)"
              className="input input-bordered w-full"
              value={platform}
              onChange={(e) => handleChange("platform", e.target.value)}
            />
          </div>

          {/* Published On */}
          <div className="form-control lg:col-span-1">
            <label className="label pb-1">
              <span className="label-text font-medium">Published On</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              value={publishedOn || ""}
              onChange={(e) => handleChange("publishedOn", e.target.value)}
            />
          </div>
          {/* Original Article URL */}
          <div className="form-control lg:col-span-2">
            <label className="label pb-1">
              <span className="label-text font-medium">
                Original Article URL
              </span>
            </label>
            <input
              type="url"
              placeholder="https://example.com/original-article"
              className="input input-bordered w-full"
              value={url}
              onChange={(e) => handleChange("url", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
