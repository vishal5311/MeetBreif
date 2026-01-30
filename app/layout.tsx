import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MeetBrief | Meeting Recaps Redefined",
  description: "Transform your meeting transcripts into engaging video recaps automatically.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className={cn(inter.className, "h-full bg-slate-50 text-slate-900 antialiased")}>
        {children}
      </body>
    </html>
  );
}
