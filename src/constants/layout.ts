export const LAYOUT_CONSTANTS = {
  /** Maximum screen width for responsive breakpoints */
  MAX_SCREEN_WIDTH: 1500,

  /** SVG placeholder for empty images */
  IMAGE_PLACEHOLDER:
    "data:image/svg+xml,%3csvg width='640' height='320' xmlns='http://www.w3.org/2000/svg'%3e%3c/svg%3e",

  /** Default image dimensions */
  DEFAULT_IMAGE_WIDTH: 640,
  DEFAULT_IMAGE_HEIGHT: 320,

  /** Animation timing in milliseconds */
  HOVER_TRANSITION_DURATION: 500,
} as const;
