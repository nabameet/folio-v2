import { CMSConfig } from '../types';

/**
 * The master configuration for the CMS.
 * Update these values to match your project's setup.
 */
export const cmsConfig: CMSConfig = {
  // The directory where your .mdx files live, relative to the project root.
  contentDir: 'src/projects',

  // Your site's full production URL (e.g., https://your-domain.com).
  // Used for generating absolute URLs in SEO metadata.
  site_url: 'https://your-domain.com',

  // The base path for your content pages (e.g., '/blog', '/work').
  // This is used to construct links to your content.
  base_path: '/work',
}; 