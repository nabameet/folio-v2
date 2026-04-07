"use client";

import clsx from "clsx";
import { NavItem } from "@/types/nav";
import { Link } from "next-view-transitions";
import { BackButton } from "./BackButton";
import { WorkPlayToggle } from "./WorkPlayToggle";
import { useThemeToggle } from "@/hooks/useThemeToggle";
import { Logomark } from "@/components/logo";

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
  const { effectiveTheme, toggle } = useThemeToggle();

  return (
    <nav className="fixed z-50 w-full p-8 md:p-12">
      <Link
        href="/"
        aria-label="Home"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Logomark className="size-20" />
      </Link>

      <div className="flex w-full items-center justify-between">
        <BackButton />

        <ul className="flex items-end gap-12">
          <button
            type="button"
            aria-label="Toggle dark/light mode"
            onClick={toggle}
            className={clsx(
              "size-1.5 bg-foreground mb-1",
            )}
          />
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
      </div>
    </nav>
  );
};
