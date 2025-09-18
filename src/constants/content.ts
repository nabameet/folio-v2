/** Site content constants */
export const SITE_CONTENT = {
  /** About section text */
  ABOUT_TEXT:
    "i'm nabameet, a visual designer. i blend eye candy with unconventional storytelling, experimentation (and sometimes a bit of code) to create identities that feel alive and built to thrive in the real world.",

  /** Contact pre-chorus text */
  CONTACT_PRECHORUS: "rather break the mold than play it safe?",

  /** Contact title text */
  CONTACT_TITLE: "i'm in. ",

  /** Contact email address */
  EMAIL: "hi@nabameet.com",

  /** X/Twitter username */
  X_USERNAME: "nabameet",

  /** Resume link URL */
  RESUME_URL:
    "https://drive.google.com/file/d/1xl1kf3Yy8zuH9WA-34UFecvcxLFxu9an/view?usp=drive_link",
} as const;

/** Animation timing constants */
export const ANIMATION_CONSTANTS = {
  /** Main content fade in duration */
  CONTENT_FADE_DURATION: 0.5,

  /** Content fade in delay */
  CONTENT_FADE_DELAY: 0.2,

  /** Drawer animation duration */
  DRAWER_DURATION: 0.6,

  /** Drawer content animation duration */
  DRAWER_CONTENT_DURATION: 0.5,

  /** Drawer animation easing */
  DRAWER_EASING: [0.77, 0, 0.175, 1] as const,
} as const;
