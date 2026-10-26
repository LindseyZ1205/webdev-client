import type { Metadata } from "next";
import "./globals.css";
import "./ai-utilities.css";

export const metadata: Metadata = {
  title: "Yingzi Zhang | CS5610 Labs",
  description: "CS5610 Section 09 — HTML practice and Kambaz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
