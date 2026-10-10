import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import MarqueeSkeleton from "@/components/skeletons/MarqueeSkeleton";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="light" className={`${hindSiliguri.className}`}>
      <body className="bg-back_color min-h-screen flex flex-col">
        <Header />
        <Suspense fallback={<MarqueeSkeleton />}>
          <Marquee />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
