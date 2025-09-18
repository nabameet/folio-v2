interface ProjectSnapshotTagsProps {
  /** Comma-separated tags string */
  tags: string;
}

/**
 * Project tags display component
 *
 * Renders project tags as styled pill elements
 * Splits comma-separated tags and trims whitespace
 */
export const ProjectSnapshotTags: React.FC<ProjectSnapshotTagsProps> = ({
  tags,
}) => {
  if (!tags) return null;

  return (
    <div className="mt-6 flex flex-wrap">
      {tags.split(",").map((tag, idx) => (
        <span
          key={idx}
          className="border-1.5 -mr-2 rounded-[100%] border pr-4 pl-12 text-xl lg:-mr-4 lg:pr-8 lg:pl-20 lg:text-3xl"
        >
          {tag.trim()}
        </span>
      ))}
    </div>
  );
};
