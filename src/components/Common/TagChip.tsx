"use client";

import { Tag as Tag } from "@/types/tag";
import Link from "next/link";

export default function TagChip({ tagId, slug, name }: Tag) {
  return (
    <div className="bg-base-content/10 text-label-lg py-2 px-4 rounded-full w-fit hover:bg-base-content/20">
      <Link
        href={`/articles/published?tagIds=${tagId}`}
        // FIXME
        as={`/articles/published/${slug}`}
      >
        {name}
      </Link>
    </div>
  );
}
