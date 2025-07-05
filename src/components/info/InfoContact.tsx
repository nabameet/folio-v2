import Link from "next/link";

export default function InfoContact({
  email,
  xUsername,
  children,
}: {
  email: string;
  xUsername: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="">{children}</h1>
      <ul>
        <li className="">
          mail: &nbsp;&nbsp;
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="underline italic"
            href={"mailto:" + email}
          >
            {email}
          </Link>
        </li>
        <li className="">
          twt: &nbsp;&nbsp;
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="underline italic"
            href={"https://x.com/" + xUsername}
          >
            {xUsername}
          </Link>
        </li>
      </ul>
    </div>
  );
}
