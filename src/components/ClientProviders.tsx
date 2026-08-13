"use client";

import dynamic from "next/dynamic";

// ssr: false is only valid inside Client Components
const SmoothScroll = dynamic(() => import("@/components/SmoothScroll"), { ssr: false });
const ScrollToTop  = dynamic(() => import("@/components/ScrollToTop"),  { ssr: false });
const FloatingCTA  = dynamic(() => import("@/components/FloatingCTA"),  { ssr: false });

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollToTop />
      {children}
      <FloatingCTA />
    </SmoothScroll>
  );
}
