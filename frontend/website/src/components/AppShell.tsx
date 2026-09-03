"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";
import WebsitePreloader from "@/components/WebsitePreloader";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <WebsitePreloader />
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ClientProviders>
  );
}
