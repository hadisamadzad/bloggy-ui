import Page from "@/app/(public)/articles/page";

export default async function TagPage({
  params,
}: {
  params: { tagSlug: string };
}) {
  const resolvedParams = await params; // Await to get rid of warnings

  // Returns the articles page with the tagSlug prop
  return <Page tagSlug={resolvedParams.tagSlug} />;
}
