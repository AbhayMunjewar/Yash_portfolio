import type { Metadata } from "next";
import { Syne, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Yash | Freelance Video Editor & Motion Graphics Artist",
  description: "I Transform Raw Footage Into Cinematic Stories. High-end video editing, motion design, color grading, and commercial ads that convert.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full select-none scroll-smooth">
      <body className={`${syne.variable} ${outfit.variable} bg-[#030306] text-[#f3f4f6] font-outfit min-h-full flex flex-col antialiased`}>
        <SmoothScroll>
          <Cursor />
          <div className="relative z-10 flex flex-col flex-1">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
