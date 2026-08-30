import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://docs.companyos.sh"),
  title: {
    default: "Company OS documentation",
    template: "%s | Company OS docs",
  },
  description:
    "Set up the Company OS web context ledger, install the open source framework, and connect agents through MCP.",
  applicationName: "Company OS documentation",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Company OS documentation",
    title: "Company OS documentation",
    description:
      "The practical guide to the Company OS web context ledger, open source framework, and MCP connection.",
    url: "https://docs.companyos.sh",
  },
  twitter: {
    card: "summary",
    title: "Company OS documentation",
    description:
      "Set up the context ledger, framework, and MCP connection for your company.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
