"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export const WorkPlayToggle = () => {
  const pathname = usePathname();
  const isWork =
    pathname === "/" || pathname === "/work" || pathname.startsWith("/work/");
  const isPlay = pathname === "/play";

  return (
    <div className="flex gap-2">
      <Link
        href="/"
        className={clsx(
          "relative inline-block",
          isWork
            ? "italic after:content-[''] after:absolute after:left-0 after:w-full after:h-0.25 after:bg-foreground after:pointer-events-none after:top-[60%]"
            : ""
        )}
      >
        work
      </Link>
      <span>/</span>
      <Link
        href="/play"
        className={clsx(
          "relative inline-block",
          isPlay
            ? "italic after:content-[''] after:absolute after:left-0 after:w-full after:h-0.25 after:bg-foreground after:pointer-events-none after:top-[60%]"
            : ""
        )}
      >
        play
      </Link>
    </div>
  );
};
