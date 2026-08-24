"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <ClientProviders>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ClientProviders>
  );
}
