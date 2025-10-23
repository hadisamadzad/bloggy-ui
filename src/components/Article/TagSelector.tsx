"use client";

import { Tag } from "lucide-react";

interface ContentEditorProps {
  selectedTagIds: string[];
  onChange: (value: string[]) => void;
}

export default function TagSelector({
  selectedTagIds,
  onChange,
}: ContentEditorProps) {
  return (
    <div className="form-control lg:col-span-2">
      <label className="label pb-1">
        <span className="label-text font-medium">Tags</span>
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="javascript, tutorial, web-development"
          className="input input-bordered w-full"
          value={selectedTagIds.join(", ")}
          onChange={(e) =>
            onChange(
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
  );
}
