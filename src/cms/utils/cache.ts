import { cmsConfig } from "../config/content";
import { MDXContent } from "../types";
import { getMDXData } from "./mdx";

// src/cms/utils/cache.ts
let contentCache: MDXContent[] | null = null;

export function getCachedContent(): MDXContent[] {
  if (!contentCache) {
    contentCache = getMDXData(cmsConfig.contentDir);
  }
  return contentCache;
}
