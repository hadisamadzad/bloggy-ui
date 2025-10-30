import Page from "@/app/(public)/articles/page";

interface PageProps {
  params: Promise<{
    tagSlug: string; // matches [tagSlug] in the folder name
  }>;
}

export default async function TagPage({ params }: PageProps) {
  const { tagSlug } = await params;

  // Returns the articles page with the tagSlug prop
  return <Page tagSlug={tagSlug} />;
}
