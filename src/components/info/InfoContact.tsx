import Link from "next/link";
import { TwitterIcon } from "@/components/icons/TwitterIcon";

interface InfoContactProps {
  resumeUrl: string;
  xUsername: string;
}

/**
 * Contact content with external links
 */
export const InfoContact = ({ resumeUrl, xUsername }: InfoContactProps) => (
  <div className="flex flex-col gap-2">
    <ul>
      <li>
        find my&nbsp;
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="italic underline"
          href={resumeUrl}
        >
          resume
        </Link>
        &nbsp;here
      </li>
      <li className="flex items-center">
        and &nbsp;
        <TwitterIcon />
        &nbsp;
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="italic underline"
          href={`https://x.com/${xUsername}`}
        >
          @{xUsername}
        </Link>
      </li>
    </ul>
  </div>
);
