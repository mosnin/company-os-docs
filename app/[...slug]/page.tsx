import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsContent } from "@/components/docs-content";
import { DocsShell } from "@/components/docs-shell";
import { docHref, docs, getDoc } from "@/lib/docs";

type DocRouteProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return docs
    .filter((doc) => doc.slug)
    .map((doc) => ({ slug: doc.slug.split("/") }));
}

export async function generateMetadata({ params }: DocRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: docHref(doc.slug) },
    openGraph: {
      title: `${doc.title} | Company OS docs`,
      description: doc.description,
      url: docHref(doc.slug),
    },
  };
}

export default async function DocRoute({ params }: DocRouteProps) {
  const { slug } = await params;
  const doc = getDoc(slug.join("/"));
  if (!doc) notFound();
  return (
    <DocsShell doc={doc}>
      <DocsContent doc={doc} />
    </DocsShell>
  );
}
