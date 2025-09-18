import Link from "next/link";
import { EmailIcon } from "@/components/icons/EmailIcon";

interface InfoAboutProps {
  aboutText: string;
  contactPrechorus: string;
  contactTitle: string;
  email: string;
}

/**
 * About section content with contact information
 *
 * Displays personal introduction and email contact with mail icon
 */
export const InfoAbout = ({
  aboutText,
  contactPrechorus,
  contactTitle,
  email,
}: InfoAboutProps) => (
  <div className="flex w-full flex-col gap-4 md:w-72 md:items-end">
    <p>{aboutText}</p>
    <p>
      {contactPrechorus}
      <br />
      <span className="flex items-center">
        {contactTitle}
        send a &nbsp;
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="italic underline"
          href={`mailto:${email}`}
        >
          {email}
        </Link>
        &nbsp;&nbsp;
        <EmailIcon />
      </span>
    </p>
  </div>
);
