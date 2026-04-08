// Add to your [slug]/page.tsx
export const dynamic = "force-static";
export const revalidate = false; // Only regenerate on deployment

import {
  ProjectDetail,
  getProjectStaticParams,
  getProjectMetadata,
} from "@/cms";
import { getAllContent } from "@/cms/utils/mdx";
import { Footer } from "@/components/footer";
import { notFound } from "next/navigation";

// Generates all project pages at build time
export async function generateStaticParams() {
  return getProjectStaticParams();
}

// Create metadata cache
const metadataCache = new Map<string, unknown>();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (metadataCache.has(slug)) {
    return metadataCache.get(slug);
  }

  const metadata = getProjectMetadata({ slug, author: "nabameet" });
  metadataCache.set(slug, metadata);

  return metadata;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getAllContent().find((p) => p.slug === slug);
  if (!project) {
    return notFound();
  }
  return (<>
  
  <ProjectDetail project={project} />
  <Footer />
    </>
  );
}
