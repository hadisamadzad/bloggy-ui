interface ArticleTagsProps {
  tags: string[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
  return (
    <div className="flex flex-wrap gap-2 text-base-content/90">
      {tags.map((tag) => (
        <div
          key={tag}
          className="bg-base-content/10 text-label-lg py-2 px-4 rounded-full w-fit hover:bg-base-content/20"
        >
          <a href="">{tag}</a>
        </div>
      ))}
    </div>
  );
}
