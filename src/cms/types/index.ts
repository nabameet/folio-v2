export type MDXMetadata = {
  title: string;
  timeline: string;
  client: string;
  publishedAt: string;
  summary: string;
  tags: string; // Comma-separated
  image: string;
};

export type MDXContent = {
  metadata: MDXMetadata;
  slug: string;
  content: string;
};

export type CMSConfig = {
  contentDir: string;
  site_url: string;
  base_path: string;
};
