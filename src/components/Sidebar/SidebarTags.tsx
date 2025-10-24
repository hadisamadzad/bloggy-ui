"use client";

import { Tag } from "@/types/tag";
import TagChip from "../Common/TagChip";

interface SidebarTagsProps {
  tags: Tag[];
  isMore?: boolean;
}

export default function SidebarTags({
  tags,
  isMore = false,
}: SidebarTagsProps) {
  return (
    <div className="h-fit max-h-[500px] p-4 rounded-lg border border-base-content/30">
      <h2 className="text-title-sm">Top tags</h2>
      <div className="divider" />
      <div className="flex flex-wrap gap-2 max-h-[350px] overflow-scroll text-base-content/90">
        {tags.map((tag) => (
          <TagChip
            key={tag.slug}
            tagId={tag.tagId}
            slug={tag.slug}
            name={tag.name}
          />
        ))}
      </div>
      {isMore && (
        <div className="flex justify-end">
          <button className="btn btn-link text-base-content/80 w-auto text-label-lg">
            More tags
          </button>
        </div>
      )}
    </div>
  );
}
