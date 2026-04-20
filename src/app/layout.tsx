import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
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
  title: "ColdPing — Cold Emails That Actually Get Replies",
  description:
    "Paste a LinkedIn profile and get a hyper-personalized cold email in 3 seconds. Free. Powered by Gemini AI.",
  keywords:
    "cold email, AI email generator, LinkedIn personalization, outreach tool, sales automation",
  openGraph: {
    title: "ColdPing — Cold Emails That Actually Get Replies",
    description: "AI-powered cold email personalization. Free to start.",
    url: "https://coldping.vercel.app",
    siteName: "ColdPing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
