// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllContent } from "@/cms/utils/mdx"; // Your work data function

const BASE_URL = "https://nabameet.com";

export default async function sitemap() {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/play`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic work pages
  const allProjects = await getAllContent();
  const projectPages: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${BASE_URL}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticPages, ...projectPages];
}
