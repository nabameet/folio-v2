// Auto-generated image manifest
// Generated on: 2025-08-28T15:04:47.907Z
// Total images: 34

export const ALL_IMAGES: readonly string[] = [
  "/public/filmlandscape.jpg",
  "/public/glass.svg",
  "/public/logo.svg",
  "/public/noise.svg",
  "/public/project-images/cynics-calcutta/page-1.webp",
  "/public/project-images/cynics-calcutta/page-2.webp",
  "/public/project-images/cynics-calcutta/page-3.webp",
  "/public/project-images/cynics-calcutta/title.webp",
  "/public/project-images/faekbank/1.png",
  "/public/project-images/faekbank/10-1.png",
  "/public/project-images/faekbank/10-2.png",
  "/public/project-images/faekbank/11.png",
  "/public/project-images/faekbank/12.png",
  "/public/project-images/faekbank/13.png",
  "/public/project-images/faekbank/14.png",
  "/public/project-images/faekbank/2.png",
  "/public/project-images/faekbank/3-1.png",
  "/public/project-images/faekbank/3-2.png",
  "/public/project-images/faekbank/4.png",
  "/public/project-images/faekbank/5.png",
  "/public/project-images/faekbank/6.png",
  "/public/project-images/faekbank/7-1.png",
  "/public/project-images/faekbank/7-2.png",
  "/public/project-images/faekbank/8.png",
  "/public/project-images/faekbank/9.png",
  "/public/project-images/young-founder-summit/bento.png",
  "/public/project-images/young-founder-summit/billboard.png",
  "/public/project-images/young-founder-summit/cards.png",
  "/public/project-images/young-founder-summit/event.png",
  "/public/project-images/young-founder-summit/hero.png",
  "/public/project-images/young-founder-summit/logo-variant-1.png",
  "/public/project-images/young-founder-summit/logo-variant.png",
  "/public/project-images/young-founder-summit/logo.png",
  "/public/project-images/young-founder-summit/paper.png"
] as const;

export const IMAGE_CATEGORIES = {
  hero: ALL_IMAGES.filter(img => img.includes('/hero/')),
  projects: ALL_IMAGES.filter(img => img.includes('/projects/')),
  gallery: ALL_IMAGES.filter(img => img.includes('/gallery/')),
  icons: ALL_IMAGES.filter(img => img.includes('/icons/')),
  backgrounds: ALL_IMAGES.filter(img => img.includes('/bg/') || img.includes('/backgrounds/')),
} as const;

export const CRITICAL_IMAGES = [
  ...IMAGE_CATEGORIES.hero,
  // Add other critical images here
].filter(Boolean) as string[];

export const NON_CRITICAL_IMAGES = ALL_IMAGES.filter(
  img => !CRITICAL_IMAGES.includes(img)
) as string[];

export type ImagePath = typeof ALL_IMAGES[number];
