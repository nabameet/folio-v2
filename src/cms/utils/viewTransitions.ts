export type ImageSource = string | { src?: string } | unknown;

function normalizeImageSrc(source: ImageSource): string {
  if (typeof source === "string") return source;
  if (source && typeof source === "object" && "src" in (source as any)) {
    const value = (source as any).src;
    if (typeof value === "string") return value;
  }
  return String(source ?? "");
}

export function getProjectImageTransitionName(source: ImageSource): string {
  const raw = normalizeImageSrc(source);
  // Create a stable, CSS-safe key from the src
  const sanitized = raw
    .replace(/^https?:\/\//, "")
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "-");
  return `project-image-${sanitized}`;
}


