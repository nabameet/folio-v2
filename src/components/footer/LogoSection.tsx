import { motion } from "motion/react";
import { FOOTER_CONSTANTS, FOOTER_SVG } from "@/constants/footer";

/**
 * Footer logo section with handwritten signature and copyright
 *
 * Displays animated handwritten logo and copyright symbol with year
 * Uses Framer Motion for layout animations between page transitions
 */
export const LogoSection: React.FC = () => (
  <span className="flex items-center gap-2">
    <motion.div layoutId={FOOTER_CONSTANTS.LOGO_LAYOUT_ID}>
      <svg
        className="h-3 sm:h-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={FOOTER_SVG.LOGO.viewBox}
      >
        <path
          id="logotype"
          className="stroke-foreground fill-foreground stroke-1"
          d={FOOTER_SVG.LOGO.path}
        />
      </svg>
    </motion.div>

    <span className="flex items-center gap-1">
      <svg
        className="size-2.5 sm:size-3"
        width="800"
        height="800"
        viewBox={FOOTER_SVG.COPYRIGHT.viewBox}
        xmlns="http://www.w3.org/2000/svg"
      >
        {FOOTER_SVG.COPYRIGHT.paths.map((path, index) => (
          <path key={index} d={path} />
        ))}
      </svg>
      {FOOTER_CONSTANTS.CURRENT_YEAR}
    </span>
  </span>
);
