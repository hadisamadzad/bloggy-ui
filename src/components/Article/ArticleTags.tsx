import { Tag } from "@/types/tag";
import TagChip from "../Common/TagChip";

interface ArticleTagsProps {
  tags: Tag[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 text-base-content/90">
      {tags.map((tag) => (
        <TagChip
          key={tag.slug}
          tagId={tag.tagId}
          name={tag.name}
          slug={tag.slug}
        />
      ))}
    </div>
  );
}
