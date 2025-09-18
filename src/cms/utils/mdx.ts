import fs from "fs";
import path from "path";
import { MDXContent, MDXMetadata } from "../types";
import { cmsConfig } from "../config/content";
import { MDX_CONSTANTS, MDX_ERRORS } from "../constants";

/**
 * Parses MDX frontmatter from file content
 *
 * Extracts YAML frontmatter block and content body from MDX files
 * Handles quote removal and key-value pair parsing
 *
 * @param fileContent - Raw MDX file content
 * @returns Object containing parsed metadata and content body
 * @throws Error when no frontmatter is found or parsing fails
 *
 * @example
 * ```
 * const { metadata, content } = parseFrontmatter(mdxFileContent);
 * console.log(metadata.title); // "My Project"
 * ```
 */
export function parseFrontmatter(fileContent: string): {
  metadata: MDXMetadata;
  content: string;
} {
  try {
    const match = MDX_CONSTANTS.FRONTMATTER_REGEX.exec(fileContent);

    if (!match) {
      throw new Error(MDX_ERRORS.NO_FRONTMATTER);
    }

    const frontMatterBlock = match[1];
    const content = fileContent
      .replace(MDX_CONSTANTS.FRONTMATTER_REGEX, "")
      .trim();
    const frontMatterLines = frontMatterBlock.trim().split("\n");
    const metadata: Partial<MDXMetadata> = {};

    frontMatterLines.forEach((line) => {
      const [key, ...valueArr] = line.split(": ");
      let value = valueArr.join(": ").trim();

      // Remove surrounding quotes if present
      value = value.replace(MDX_CONSTANTS.QUOTE_REMOVAL_REGEX, "$1");

      metadata[key.trim() as keyof MDXMetadata] = value;
    });

    return {
      metadata: metadata as MDXMetadata,
      content,
    };
  } catch (error) {
    throw new Error(
      `${MDX_ERRORS.FRONTMATTER_PARSE_ERROR}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Gets all MDX files from specified directory
 *
 * Filters directory contents to return only .mdx files
 * Handles directory read errors gracefully
 *
 * @param dir - Directory path to scan for MDX files
 * @returns Array of MDX filenames
 * @throws Error when directory cannot be read
 *
 * @example
 * ```
 * const mdxFiles = getMDXFiles('./content');
 * console.log(mdxFiles); // ['project-1.mdx', 'project-2.mdx']
 * ```
 */
export function getMDXFiles(dir: fs.PathLike): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === MDX_CONSTANTS.FILE_EXTENSION);
  } catch (error) {
    throw new Error(
      `${MDX_ERRORS.DIRECTORY_READ_ERROR}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Reads and parses a single MDX file
 *
 * Combines file reading and frontmatter parsing operations
 * Handles file read errors and encoding issues
 *
 * @param filePath - Path to the MDX file
 * @returns Parsed MDX content with metadata and body
 * @throws Error when file cannot be read or parsed
 *
 * @example
 * ```
 * const mdxData = readMDXFile('./content/my-project.mdx');
 * console.log(mdxData.metadata.title);
 * ```
 */
export function readMDXFile(filePath: fs.PathOrFileDescriptor): {
  metadata: MDXMetadata;
  content: string;
} {
  try {
    const rawContent = fs.readFileSync(filePath, MDX_CONSTANTS.FILE_ENCODING);
    return parseFrontmatter(rawContent);
  } catch (error) {
    throw new Error(
      `${MDX_ERRORS.FILE_READ_ERROR}: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Gets all MDX data from specified directory
 *
 * Processes all MDX files in directory and returns structured data
 * Generates slugs from filenames and combines with parsed content
 *
 * @param dir - Directory containing MDX files
 * @returns Array of processed MDX content objects
 * @throws Error when directory processing fails
 *
 * @example
 * ```
 * const projects = getMDXData('./src/projects');
 * projects.forEach(project => console.log(project.slug, project.metadata.title));
 * ```
 */
export function getMDXData(dir: string): MDXContent[] {
  try {
    const mdxFiles = getMDXFiles(dir);

    return mdxFiles.map((file) => {
      const { metadata, content } = readMDXFile(path.join(dir, file));
      const slug = path.basename(file, path.extname(file));

      return {
        metadata,
        slug,
        content,
      };
    });
  } catch (error) {
    throw new Error(
      `Failed to process MDX data: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Gets all content from configured content directory
 *
 * Convenience function that uses the global CMS configuration
 * Primary function used by page components for data fetching
 *
 * @returns Array of all processed MDX content
 * @throws Error when content loading fails
 *
 * @example
 * ```
 * // In a Next.js page component
 * export default async function HomePage() {
 *   const projects = getAllContent();
 *   return <ProjectList projects={projects} />;
 * }
 * ```
 */
export function getAllContent(): MDXContent[] {
  try {
    return getMDXData(cmsConfig.contentDir);
  } catch (error) {
    console.error("Failed to load content:", error);
    throw error;
  }
}
