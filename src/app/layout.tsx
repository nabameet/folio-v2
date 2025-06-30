// No more speaking. Best impact. Leave at bol

import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import { LayoutClient } from "@/components/LayoutClient";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "nabameet - designer / developer",
  description: "graphic design portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.className} tracking-tighter leading-tight antialiased`}
      >
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
