import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fajri Alamsyah — Fullstack Developer",
    template: "%s | Fajri Alamsyah",
  },
  description: "Portofolio profesional Fajri Alamsyah, Fullstack Developer. Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.",
  keywords: [
    "Fajri Alamsyah",
    "Fullstack Developer",
    "Web Developer Indonesia",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ],
  authors: [{ name: "Fajri Alamsyah" }],
  creator: "Fajri Alamsyah",
  publisher: "Fajri Alamsyah",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Portofolio Fajri Alamsyah",
    title: "Fajri Alamsyah — Fullstack Developer",
    description: "Portofolio profesional Fajri Alamsyah, Fullstack Developer. Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fajri Alamsyah — Fullstack Developer",
    description: "Portofolio profesional Fajri Alamsyah, Fullstack Developer. Membangun aplikasi web yang berguna, rapi, dan mudah digunakan.",
    creator: "@fajrialamsyah",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={inter.variable}>
      <body id="top" className="bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col">
        {/* Aksesibilitas: Tautan pintas langsung ke konten utama untuk pengguna keyboard & screen reader */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-accent-primary focus:text-btn-text-primary focus:font-bold focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-white transition-transform"
        >
          Lanjut ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
