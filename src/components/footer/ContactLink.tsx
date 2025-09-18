import Link from "next/link";
import { FOOTER_CONSTANTS } from "@/constants/footer";

/**
 * Footer contact link component
 *
 * Renders email contact link with call-to-action text
 * Opens in new tab with proper security attributes
 */
export const ContactLink: React.FC = () => (
  <Link
    target="_blank"
    rel="noopener noreferrer"
    className="text-center italic underline"
    href={`mailto:${FOOTER_CONSTANTS.EMAIL}`}
  >
    {FOOTER_CONSTANTS.CTA_TEXT}
  </Link>
);
