import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mihir Patil | Portfolio",
  description: "Personal Portfolio",
  generator: "Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Fonts must be inside <head> */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Poppins:wght@600;800&display=swap"
        />
        <link rel="icon" href="/mihirM.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
