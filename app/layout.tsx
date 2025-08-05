import type { Metadata } from "next";
import {
  Libre_Baskerville,
  Lora,
  IBM_Plex_Mono,
  Figtree,
} from "next/font/google";
import "./globals.css";
import { MovieThemeProvider } from "@/components/movie-theme-provider";

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cinescape",
  description: "Discover your perfect film through the power of AI",
  generator: "Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${libreBaskerville.variable} ${lora.variable} ${ibmPlexMono.variable} ${figtree.variable}`}
        suppressHydrationWarning={true}
      >
        <MovieThemeProvider>{children}</MovieThemeProvider>
      </body>
    </html>
  );
}
