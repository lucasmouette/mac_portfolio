import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Mouette — UI/UX & Frontend Portfolio",
  description: "Computer Science & Design student based in Munich. Seeking roles in UI/UX Design, Frontend Development, and Product Management.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Lucas Mouette — UI/UX & Frontend Portfolio",
    description: "Computer Science & Design student based in Munich. Seeking roles in UI/UX Design, Frontend Development, and Product Management.",
    url: "https://lucasmouette.com",
    siteName: "Lucas Mouette Portfolio",
    images: [
      {
        url: "/lucas.png",
        width: 1200,
        height: 630,
        alt: "Lucas Mouette — UI/UX & Frontend Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased md:h-full overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
