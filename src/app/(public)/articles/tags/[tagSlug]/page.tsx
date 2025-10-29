import Page from "@/app/(public)/articles/page";

export default function TagPage({ params }: { params: { tagSlug: string } }) {
  // Returns the articles page with the tagSlug prop
  return <Page tagSlug={params.tagSlug} />;
}
