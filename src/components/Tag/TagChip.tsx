import { Tag as Tag } from "@/types/tag";
import Link from "next/link";

export interface TagChipProps extends Omit<Tag, "tagId"> {
  isSelected?: boolean;
}

export default async function TagChip({
  slug,
  name,
  isSelected = false,
}: TagChipProps) {
  return (
    <div
      className={`bg-base-content/10 text-label-lg py-2 px-4 rounded-full w-fit hover:bg-base-content/20 ${
        isSelected ? "text-primary bg-secondary hover:bg-secondary/80" : ""
      }`}
    >
      <Link href={`/tags/${slug}`} scroll={false}>
        {name}
      </Link>
    </div>
  );
}
