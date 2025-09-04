import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { ReactLenis } from "@/utils/lenis";
import "./globals.css";
import { LayoutClient } from "@/components/LayoutClient";

const title = "nabameet - multi-disciplinary designer and creative developer";
const description =
  "i’m nabameet, a multidisciplinary designer. i blend eye candy with unconventional storytelling, experimentation (and sometimes a bit of code) to create identities that feel alive and built to thrive in the real world.";
const author = "nabameet";
const url = "https://nabameet.com";

export const metadata: Metadata = {
  title: title,
  description: description,

  keywords: [
    "brand designer",
    "graphic designer",
    "visual designer",
    "designer",
    "creative developer",
    "portfolio",
    "identity design",
    "branding",
    "react developer",
    "nextjs developer",
    "javascript",
    "typescript",
    "UI UX designer",
    "startup branding",
    "freelance designer",
    "web developer portfolio",
  ],
  authors: [{ name: author, url: url }],
  creator: author,
  publisher: author,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: url,
    siteName: title,
    title: title,
    description: description,
    images: [
      {
        url: "/og-image.jpg",
        secureUrl: "https://nabameet.com/og-image.jpg", // Apparently reqd since site uses HTTPS
        width: 1206,
        height: 636,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    site: "@" + author,
    creator: "@" + author,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
  },
};

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body
          className={`${ebGaramond.className} leading-tight tracking-tighter antialiased`}
        >
          <LayoutClient>{children}</LayoutClient>
        </body>
      </ReactLenis>
    </html>
  );
}
