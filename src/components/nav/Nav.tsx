"use client";

import clsx from "clsx";
import { NavItem } from "@/types/nav";
import { Link } from "next-view-transitions";
import { BackButton } from "./BackButton";
import { WorkPlayToggle } from "./WorkPlayToggle";

interface NavProps {
  /** Navigation items to render */
  items?: NavItem[];
  /** Additional navigation content */
  children?: React.ReactNode;
  /** Whether info drawer is open */
  isInfoOpen: boolean;
}

/**
 * Main navigation component with responsive layout
 *
 * Renders fixed navigation bar with:
 * - Back button for navigation
 * - Dynamic navigation items (links or buttons)
 * - Additional children content (like WorkPlayToggle)
 * - Visual feedback for active states
 */
export const Nav = ({ items = [], isInfoOpen }: NavProps) => {
  return (
    <nav className="fixed z-50 flex w-full justify-between gap-12 p-8 md:p-12">
      <BackButton />
      <ul className="flex gap-12">
        {items.map((item, idx) =>
          item.type === "link" ? (
            <Link
              className=""
              key={idx}
              href={item.href}
              onClick={item.onClick}
            >
              {item.label}
            </Link>
          ) : (
            <button
              className={clsx("", isInfoOpen ? "italic" : "")}
              key={idx}
              onClick={item.onClick}
            >
              {item.label}
            </button>
          ),
        )}
        <WorkPlayToggle />
      </ul>
    </nav>
  );
};
