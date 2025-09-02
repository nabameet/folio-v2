import { getAllContent } from "./mdx";
import { MDXContent } from "../types";
import { cmsConfig } from "../config/content";

export function getProjectStaticParams() {
  return getAllContent().map((project) => ({ slug: project.slug }));
}

export function getProjectBySlug(slug: string): MDXContent | undefined {
  return getAllContent().find((project) => project.slug === slug);
}

export async function getProjectMetadata({
  slug,
  author,
}: {
  slug: string;
  author: string;
}) {
  const project = getProjectBySlug(slug);
  if (!project) return undefined;
  const {
    title,
    publishedAt,
    summary: description,
    image,
    tags,
  } = project.metadata;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: publishedAt,
      url: `${cmsConfig.site_url}${cmsConfig.base_path}/${project.slug}`,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    keywords: tags,
    author,
  };
}
