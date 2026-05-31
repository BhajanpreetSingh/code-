import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayfound - AI Travel Companion",
  description: "A premium AI-powered travel planning and experience engine."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
