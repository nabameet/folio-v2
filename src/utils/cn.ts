import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with proper Tailwind CSS class merging
 * Handles conflicts and ensures proper specificity
 *
 * @param inputs - Class names, conditionals, or arrays to merge
 * @returns Merged class string with conflicts resolved
 *
 * @example
 * cn("px-2 py-1", "px-4", { "bg-red-500": isError })
 * // Returns: "py-1 px-4 bg-red-500" (if isError is true)
 *
 * @example
 * cn("bg-blue-500 text-white", { "bg-red-500": hasError, "opacity-50": isDisabled })
 * // Properly handles Tailwind class conflicts and conditionals
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
