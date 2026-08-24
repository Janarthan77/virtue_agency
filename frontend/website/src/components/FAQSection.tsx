"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const homeFAQs: FAQItem[] = [
  {
    q: "What types of events does Virtue IN manage?",
    a: "We manage a wide range of corporate events including conferences, product launches, annual days, day outings, destination events, gala dinners, brand activations, exhibitions, and more. From intimate boardroom meetings to large-scale multi-day conferences, we handle it all.",
  },
  {
    q: "How far in advance should I book Virtue IN for my event?",
    a: "We recommend reaching out at least 4–8 weeks before your event for standard corporate events, and 3–6 months in advance for large-scale conferences or destination events. However, we also handle last-minute bookings depending on availability.",
  },
  {
    q: "Do you manage events outside Chennai?",
    a: "Yes! We offer destination management and event planning services across India and internationally. We have an extensive vendor network that allows us to execute flawlessly in premier destinations.",
  },
  {
    q: "Can Virtue IN handle both the creative and logistics side?",
    a: "Absolutely. We are a full end-to-end agency — covering concept, creative design, décor, AV production, logistics, venue sourcing, artist management, and on-ground execution. You have one point of contact for everything.",
  },
  {
    q: "How do I get a quote for my event?",
    a: "Simply click the 'Plan Your Event' button or visit our Contact page and fill in your event details. Our team will reach out within 24 hours with a tailored proposal.",
  },
];

const aboutFAQs: FAQItem[] = [
  {
    q: "What makes Virtue IN different from other event companies?",
    a: "We combine creative excellence with operational precision. Our team brings together experienced event professionals, an extensive vendor network, and a personalised approach — meaning every event we deliver is uniquely crafted around your brand and objectives.",
  },
  {
    q: "How experienced is the Virtue IN team?",
    a: "Our core team has over 10 years of combined experience in corporate event management, having delivered 150+ events across various industries including FMCG, automotive, healthcare, finance, and entertainment.",
  },
  {
    q: "Can you work within our existing budget?",
    a: "Yes. We offer flexible engagement models — from full event management to partial coordination and consultancy. We work transparently within your budget to maximise value without compromising on quality.",
  },
  {
    q: "Do you provide post-event reports and analytics?",
    a: "Yes. For all managed events, we provide a comprehensive post-event report covering attendance, vendor performance, budget reconciliation, and key highlights to inform future planning.",
  },
  {
    q: "Is Virtue IN available for private and social events too?",
    a: "Our primary focus is corporate events, but we do take on select high-profile private and social events. Please contact us to discuss your requirements and we will advise accordingly.",
  },
];

interface FAQSectionProps {
  variant?: "home" | "about";
}

export function FAQSection({ variant = "home" }: FAQSectionProps) {
  const faqs = variant === "about" ? aboutFAQs : homeFAQs;
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section className="bg-[#0F172A] py-28 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FFFFFF]/6 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-[#FFB800]" />
            <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase">
              Got Questions?
            </p>
            <span className="w-10 h-[2px] bg-[#FFB800]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Frequently Asked <span className="text-[#FFB800]">Questions</span>
          </h2>
          <p className="text-gray-400 mt-4 text-base max-w-xl mx-auto leading-relaxed">
            Everything you need to know about working with Virtue IN Agency.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all duration-300"
                style={{
                  background: isOpen ? "rgba(255,255,255,0.07)" : "#1E293B",
                  borderColor: isOpen
                    ? "rgba(255,255,255,0.4)"
                    : "rgba(255,255,255,0.07)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                >
                  <span
                    className="font-bold text-base md:text-lg transition-colors duration-300"
                    style={{ color: isOpen ? "#fff" : "#cbd5e1" }}
                  >
                    {faq.q}
                  </span>
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      background: isOpen
                        ? "linear-gradient(135deg,#FFFFFF,#E2E8F0)"
                        : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {isOpen ? (
                      <Minus size={16} className="text-gray-900" />
                    ) : (
                      <Plus size={16} className="text-gray-400" />
                    )}
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? "300px" : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed px-6 pb-6">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <p className="text-gray-400 text-sm mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)",
              boxShadow: "0 8px 25px -8px rgba(255,255,255,0.5)",
            }}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}
