import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from "@/utils/lenis";

import "./globals.css";

import { SITE_METADATA, SEO_KEYWORDS } from "@/constants/metadata";
import { SITE_CONTENT } from "@/constants/content";

import { LayoutClient } from "@/components/LayoutClient";
import { Loader } from "@/components/loader";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    template: SITE_METADATA.TITLE.TEMPLATE,
    default: SITE_METADATA.TITLE.DEFAULT,
  },
  description: SITE_METADATA.DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_METADATA.AUTHOR, url: SITE_METADATA.URL }],
  creator: SITE_METADATA.AUTHOR,
  publisher: SITE_METADATA.AUTHOR,
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(SITE_METADATA.URL),
  openGraph: {
    type: "website",
    url: SITE_METADATA.URL,
    title: SITE_METADATA.TITLE.DEFAULT,
    description: SITE_METADATA.DESCRIPTION,
    images: [{ url: SITE_METADATA.OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.TITLE.DEFAULT,
    description: SITE_METADATA.DESCRIPTION,
    site: "@" + SITE_METADATA.AUTHOR,
    creator: "@" + SITE_METADATA.AUTHOR,
    images: [SITE_METADATA.OG_IMAGE],
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
  icons: { icon: SITE_METADATA.FAVICON },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root layout with all data passed to components
 */
export default function RootLayout({ children }: RootLayoutProps) {
  // All data defined at page level
  const layoutData = {
    aboutText: SITE_CONTENT.ABOUT_TEXT,
    contactPrechorus: SITE_CONTENT.CONTACT_PRECHORUS,
    contactTitle: SITE_CONTENT.CONTACT_TITLE,
    email: SITE_CONTENT.EMAIL,
    xUsername: SITE_CONTENT.X_USERNAME,
    resumeUrl: SITE_CONTENT.RESUME_URL,
  };

  return (
    <ViewTransitions>
      <html lang="en">
        <ReactLenis root>
          <body
            className={`${ebGaramond.className} leading-tight tracking-tighter antialiased`}
          >
            <Loader>
              <LayoutClient {...layoutData}>{children}</LayoutClient>
            </Loader>
          </body>
        </ReactLenis>
      </html>
    </ViewTransitions>
  );
}
