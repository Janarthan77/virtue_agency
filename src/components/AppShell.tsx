"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <div className="min-h-screen w-full bg-[#F8FAFC] text-slate-800">{children}</div>;
  }

  return (
    <ClientProviders>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </ClientProviders>
  );
}
