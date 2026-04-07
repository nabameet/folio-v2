interface ProjectSnapshotTagsProps {
  /** Comma-separated tags string */
  tags: string;
  /** Visual size for different contexts */
  size?: "snapshot" | "grid";
  /** Max number of tags to render (rest collapsed into +N) */
  maxTags?: number;
  /** Additional wrapper classes */
  className?: string;
}

/**
 * Project tags display component
 *
 * Renders project tags as styled pill elements
 * Splits comma-separated tags and trims whitespace
 */
export const ProjectSnapshotTags: React.FC<ProjectSnapshotTagsProps> = ({
  tags,
  size = "snapshot",
  maxTags,
  className,
}) => {
  if (!tags) return null;

  const allTags = tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const visibleTags =
    typeof maxTags === "number" ? allTags.slice(0, maxTags) : allTags;
  const hiddenCount =
    typeof maxTags === "number" ? Math.max(0, allTags.length - maxTags) : 0;

  const tagClassName =
    size === "grid"
      ? "border-1.5 -mr-2 rounded-[100%] border pr-3 pl-9 text-xs lg:-mr-3 lg:pr-6 lg:pl-16 lg:text-sm"
      : "border-1.5 -mr-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-mr-4 lg:pr-8 lg:pl-20 lg:text-3xl";

  return (
    <div className={`flex flex-wrap ${className ?? ""}`.trim()}>
      {visibleTags.map((tag, idx) => (
        <span
          key={idx}
          className={tagClassName}
        >
          {tag}
        </span>
      ))}
      {hiddenCount > 0 ? (
        <span className={tagClassName}>+{hiddenCount}</span>
      ) : null}
    </div>
  );
};
