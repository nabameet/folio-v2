"use client";

import { SVGProps } from "react";
import { LOGOMARK_CONSTANTS, LOGOMARK_PATHS } from "@/constants/logomark";

/**
 * Main portfolio logomark component with abstract geometric design
 *
 * Renders a scalable vector logomark with five interconnected sections representing
 * different aspects of the portfolio (social, work, about, contact, personal touch)
 *
 * Features:
 * - Fully responsive and scalable
 * - Uses currentColor for theme integration
 * - Maintains aspect ratio across all screen sizes
 * - Optimized SVG paths for performance
 *
 * @param props - Standard SVG element props (className, style, etc.)
 *
 * @example
 * ```
 * // Full screen background logomark
 * <Logomark className="h-full w-full max-w-screen-2xl" />
 *
 * // Header logomark
 * <Logomark className="h-12 w-auto" />
 *
 * // With custom styling
 * <Logomark className="h-64 text-blue-500" style={{ opacity: 0.8 }} />
 * ```
 */
export const Logomark = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns={LOGOMARK_CONSTANTS.XMLNS}
      data-name={LOGOMARK_CONSTANTS.DATA_NAME}
      viewBox={LOGOMARK_CONSTANTS.VIEWBOX}
      fill="currentColor"
      stroke="none"
      strokeWidth={LOGOMARK_CONSTANTS.STROKE_WIDTH}
      role="img"
      aria-label="Portfolio"
      {...props}
    >
      <g
        className="origin-center"
        style={{ transform: `scale(${LOGOMARK_CONSTANTS.SCALE_FACTOR})` }}
      >
        {LOGOMARK_PATHS.map((pathData, index) => (
          <path key={index} d={pathData} aria-hidden="true" />
        ))}
      </g>
    </svg>
  );
};
