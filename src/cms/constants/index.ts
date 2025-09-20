import { MDXMetadata } from "../types";

/** MDX file processing constants */
export const MDX_CONSTANTS = {
  /** File extension for MDX files */
  FILE_EXTENSION: ".mdx",

  /** Regex pattern for frontmatter extraction */
  FRONTMATTER_REGEX: /---\s*([\s\S]*?)\s*---/,

  /** Regex pattern for removing quotes from frontmatter values */
  QUOTE_REMOVAL_REGEX: /^['"](.*)['"]$/,

  /** Default encoding for file operations */
  FILE_ENCODING: "utf-8" as const,

  PARSE_CACHE: new Map<string, { metadata: MDXMetadata; content: string }>(),
} as const;

/** Error messages for MDX processing */
export const MDX_ERRORS = {
  NO_FRONTMATTER: "No frontmatter found in MDX file",
  FILE_READ_ERROR: "Failed to read MDX file",
  DIRECTORY_READ_ERROR: "Failed to read content directory",
  FRONTMATTER_PARSE_ERROR: "Failed to parse frontmatter",
} as const;
