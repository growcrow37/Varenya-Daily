// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { AdblockDetector } from "@/components/adblock-detector";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeProvider } from "next-themes";
const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const fontHeadline = Literata({
  subsets: ["latin"],
  variable: "--font-headline",
});

export const metadata: Metadata = {
  title: "Varenya Daily",
  description: "Your daily dose of insightful articles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "font-body bg-white text-gray-900",
          fontBody.className,
          fontHeadline.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AdblockDetector />
          <div className="relative flex min-h-dvh flex-col bg-white">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
          <GoogleAnalytics gaId="G-XXXXXXXXXX" />
        </ThemeProvider>
      </body>
    </html>
  );
}