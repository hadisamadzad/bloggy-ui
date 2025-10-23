import Tag from "../Common/Tag";

interface ArticleTagsProps {
  tags: string[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 text-base-content/90">
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </div>
  );
}
