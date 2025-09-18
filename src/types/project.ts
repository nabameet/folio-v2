/** Project metadata structure from CMS */
export interface ProjectMetadata {
  /** Project title for display */
  title: string;
  /** Featured image URL */
  image: string;
  /** Comma-separated project tags */
  tags: string;
  /** ISO date string for publication date */
  publishedAt: string;
}

/** Complete project data structure */
export interface Project {
  /** Unique project identifier for routing */
  slug: string;
  /** Project metadata */
  metadata: ProjectMetadata;
}

/** Project hover interaction handlers */
export interface ProjectHoverHandlers {
  /** Called when mouse enters project link */
  onProjectHover: (project: Project) => void;
  /** Called when mouse leaves project link */
  onProjectHoverEnd: () => void;
}

/** Project image display data */
export interface ProjectImageData {
  /** Image source URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Project tags string */
  tags: string;
  /** Project slug for routing */
  slug?: string;
}
