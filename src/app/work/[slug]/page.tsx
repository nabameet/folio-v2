import {
  ProjectDetail,
  getProjectStaticParams,
  getProjectMetadata,
} from "@/cms";
import { getAllContent } from "@/cms/utils/mdx";
import { notFound } from "next/navigation";

// Generates all project pages at build time
export async function generateStaticParams() {
  return getProjectStaticParams();
}

// Generates SEO metadata for the page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return getProjectMetadata({ slug, author: "nabameet" });
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
  return <ProjectDetail project={project} />;
}
