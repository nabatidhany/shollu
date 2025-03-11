import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shollu - Bersama Meraih Keberkahan: Hafalan, Itikaf, & Sholat Berjamaah",
  description:
    "Selamat datang di platform resmi untuk tiga program utama kami: Pejuang Quran, Pejuang Itikaf, dan Sholat Champion. Mari berkontribusi dalam memperbanyak amal ibadah dan mencatat perjalanan spiritual Anda dengan sistem modern berbasis QR Code.",
  keywords: [
    "Shollu",
    "Sholat Champion",
    "Pejuang Quran",
    "Pejuang Itikaf",
    "Itikaf",
    "Sumatera Barat",
  ],
  openGraph: {
    type: "website",
    siteName: "Shollu",
    locale: "en_US",
    url: "https://shollu.com",
    title: "Shollu - Bersama Meraih Keberkahan: Hafalan, Itikaf, & Sholat Berjamaah",
    description:
      "Selamat datang di platform resmi untuk tiga program utama kami: Pejuang Quran, Pejuang Itikaf, dan Sholat Champion. Mari berkontribusi dalam memperbanyak amal ibadah dan mencatat perjalanan spiritual Anda dengan sistem modern berbasis QR Code.",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "Shollu",
      },
    ],
  },
  authors: [
    {
      name: "Dhany Dwi Putra",
      url: "https://shollu.com",
    },
  ],
  creator: "Dhany Dwi Putra",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/favicon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
      sizes: "16x16",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon.png",
      sizes: "512x512",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
