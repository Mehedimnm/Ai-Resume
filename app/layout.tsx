import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mehedihasanbd.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MNM AI Resume — Build AI-Powered Resumes & Cover Letters",
    template: "%s | MNM AI Resume",
  },
  description:
    "MNM AI Resume helps job seekers create professional, ATS-friendly resumes and tailored cover letters in minutes using artificial intelligence.",
  keywords: [
    "AI resume builder",
    "AI cover letter generator",
    "ATS resume",
    "resume maker",
    "MNM AI Resume",
    "job application",
  ],
  authors: [{ name: "MNM AI Resume" }],
  creator: "MNM AI Resume",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "MNM AI Resume — Build AI-Powered Resumes & Cover Letters",
    description:
      "Create professional, ATS-friendly resumes and tailored cover letters in minutes with AI.",
    siteName: "MNM AI Resume",
  },
  twitter: {
    card: "summary_large_image",
    title: "MNM AI Resume",
    description:
      "Create professional, ATS-friendly resumes and cover letters in minutes with AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col bg-white text-slate-900">
        <AuthProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
