import { useState, useCallback } from "react";
import { Project } from "@/types/project";

/**
 * Custom hook for managing project hover state
 *
 * Handles showing/hiding project preview images on hover
 * Provides memoized handlers to prevent unnecessary re-renders
 *
 * @returns Object containing current project state and hover handlers
 */
export function useProjectHover() {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [showImage, setShowImage] = useState(false);

  const handleProjectHover = useCallback((project: Project) => {
    setCurrentProject(project);
    setShowImage(true);
  }, []);

  const handleProjectHoverEnd = useCallback(() => {
    setShowImage(false);
  }, []);

  return {
    /** Currently hovered project or null */
    currentProject,
    /** Whether to show the preview image */
    showImage,
    /** Handler for project hover start */
    handleProjectHover,
    /** Handler for project hover end */
    handleProjectHoverEnd,
  };
}
