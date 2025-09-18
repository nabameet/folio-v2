/** Project metadata structure from MDX frontmatter */
export interface MDXMetadata {
  /** Project title */
  title: string;
  /** Project timeline/duration */
  timeline: string;
  /** Client name */
  client: string;
  /** Publication date in ISO format */
  publishedAt: string;
  /** Project summary/description */
  summary: string;
  /** Comma-separated project tags */
  tags: string;
  /** Featured image URL or path */
  image: string;
}

/** Complete MDX content structure */
export interface MDXContent {
  /** Parsed frontmatter metadata */
  metadata: MDXMetadata;
  /** URL slug derived from filename */
  slug: string;
  /** Raw MDX content body */
  content: string;
}

/** CMS configuration structure */
export interface CMSConfig {
  /** Directory containing .mdx files relative to project root */
  contentDir: string;
  /** Full production site URL */
  site_url: string;
  /** Base path for content routes */
  base_path: string;
}
