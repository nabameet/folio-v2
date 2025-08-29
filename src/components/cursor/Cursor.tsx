"use client";

import { useCursorEffect } from "./useCursorEffect";

export const Cursor = () => {
  useCursorEffect();

  return (
    <>
      <div
        className="cursorFollower fixed pointer-events-none size-20 mix-blend-difference rounded-full z-[9999]
          bg-[radial-gradient(circle_at_50%_50%,rgba(3,2,0,1),rgba(255,255,255,0)),url('/noise.svg')]
          [filter:contrast(130%)_brightness(1000%)_invert(100%)]"
      />
      <div className="cursorCustom fixed size-1 bg-background mix-blend-difference rounded-full pointer-events-none z-[9999]" />
    </>
  );
};
