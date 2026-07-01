import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Virtue IN Agency | Corporate Event Management",
  description: "Premium end-to-end corporate event & conference management solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body 
        className="min-h-full flex flex-col font-sans bg-primary text-text-light selection:bg-accent selection:text-primary overflow-x-hidden"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
