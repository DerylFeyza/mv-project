import type { Metadata, Viewport } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TaskNest",
    template: "%s | Tasknest",
  },
  description:
    "TaskNest is a service focusing on advertising and commisioning.",
  authors: {
    name: "LigmaTeam",
    url: "https://github.com/MFavianZaahir/mv-project",
  },
  creator: "LigmaTeam",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}