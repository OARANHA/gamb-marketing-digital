import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gamb - Marketing Digital",
  description: "Agência de marketing digital especializada em transformar negócios através de estratégias digitais inovadoras. Desenvolvemos soluções personalizadas para sua empresa crescer online.",
  keywords: ["marketing digital", "Gamb", "SEO", "tráfego pago", "redes sociais", "web design", "Alvorada RS"],
  authors: [{ name: "Gamb Marketing Digital" }],
  openGraph: {
    title: "Gamb - Marketing Digital",
    description: "Agência de marketing digital especializada em transformar negócios através de estratégias digitais inovadoras",
    url: "https://gamb.com.br",
    siteName: "Gamb",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gamb - Marketing Digital",
    description: "Agência de marketing digital especializada em transformar negócios através de estratégias digitais inovadoras",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
