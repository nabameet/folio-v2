"use client";

import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

/**
 * Work/Play navigation toggle
 *
 * Provides contextual navigation between work and play sections
 * Highlights current section with italic styling
 */
export const WorkPlayToggle = () => {
  const pathname = usePathname();
  const isWork =
    pathname === "/" || pathname === "/work" || pathname.startsWith("/work/");
  const isPlay = pathname === "/play";

  return (
    <div className="flex gap-2">
      <Link
        href="/"
        className={`relative inline-block ${isWork ? "italic" : ""}`}
      >
        work
      </Link>
      <span>/</span>
      <Link
        href="/play"
        className={`relative inline-block ${isPlay ? "italic" : ""}`}
      >
        play
      </Link>
    </div>
  );
};
