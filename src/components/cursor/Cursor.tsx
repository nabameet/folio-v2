"use client";

import { useCursorEffect } from "./useCursorEffect";

export const Cursor = () => {
  useCursorEffect();

  return (
    <div className="hide-on-touch">
      <div className="cursorFollower pointer-events-none fixed z-[9999] size-20 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(11,14,19,1),rgba(255,255,255,0)),url('/noise.svg')] mix-blend-difference [filter:contrast(130%)_brightness(1000%)_invert(100%)]" />
      <div className="cursorCustom bg-background dark:bg-foreground pointer-events-none fixed z-[9999] size-1 rounded-full mix-blend-difference" />
    </div>
  );
};
