export type ImageSource = string | { src?: string } | unknown;

function normalizeImageSrc(source: ImageSource): string {
  if (typeof source === "string") return source;

  if (isSrcObject(source)) {
    const value = source.src;
    if (typeof value === "string") return value;
  }

  return String(source ?? "");
}

// Type guard for objects with optional src
function isSrcObject(obj: unknown): obj is { src?: string } {
  return typeof obj === "object" && obj !== null && "src" in obj;
}

export function getProjectImageTransitionName(source: ImageSource): string {
  const raw = normalizeImageSrc(source);

  const sanitized = raw
    .replace(/^https?:\/\//, "")
    .replace(/\//g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "-");

  return `project-image-${sanitized}`;
}
