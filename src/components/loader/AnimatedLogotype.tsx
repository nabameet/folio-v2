import { motion } from "motion/react";
import { LOGOTYPE_SVG } from "@/constants/loading";

/**
 * Animated handwritten logotype with fill animation
 *
 * Displays the handwritten signature with CSS animation
 * that transitions from stroke-only to filled state
 */
export const AnimatedLogotype = () => {
  return (
    <motion.div key="logotype-loader" layoutId="logotype-handwritten">
      <svg
        className="w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={LOGOTYPE_SVG.VIEWBOX}
      >
        <path
          id="logotype"
          className="stroke-foreground fill-transparent stroke-1"
          d={LOGOTYPE_SVG.PATH}
        />
        <style jsx>
          {`
            @keyframes fill {
              50%,
              100% {
                fill: var(--foreground);
                stroke: transparent;
                opacity: 1;
              }
            }

            #logotype {
              animation: fill 3s 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            }
          `}
        </style>
      </svg>
    </motion.div>
  );
};
