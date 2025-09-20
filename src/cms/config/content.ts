import { CMSConfig } from "../types";

/**
 * Master CMS configuration
 *
 * Central configuration for all CMS-related operations
 * Update these values to match your project setup
 */
export const cmsConfig: CMSConfig = {
  /** Directory containing .mdx files relative to project root */
  contentDir: "src/projects",

  /** Full production site URL for absolute URL generation */
  site_url: "https://nabameet.com",

  /** Base path for content routes */
  base_path: "/work",
};
