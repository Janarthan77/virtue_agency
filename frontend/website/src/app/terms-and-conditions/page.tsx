"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Scale, FileText, CheckCircle2, ArrowLeft, Mail, Phone, MapPin, Calendar, AlertTriangle, ShieldCheck, Clock } from "lucide-react";

export default function TermsAndConditionsPage() {
  const sections = [
    { id: "definitions", title: "1. Definitions & Engagement" },
    { id: "payments", title: "2. Retainers & Payment Milestones" },
    { id: "production-approvals", title: "3. Deliverables & Sign-offs" },
    { id: "cancellations", title: "4. Cancellation & Rescheduling" },
    { id: "force-majeure", title: "5. Force Majeure & Weather" },
    { id: "licenses-safety", title: "6. Licenses, Permits & Safety" },
    { id: "intellectual-property", title: "7. Intellectual Property" },
    { id: "liability", title: "8. Limitation of Liability" },
    { id: "jurisdiction", title: "9. Governing Law & Arbitration" },
    { id: "notices", title: "10. Contact & Official Notices" },
  ];

  return (
    <main className="min-h-screen bg-[#0F172A] text-gray-300 pt-32 pb-24 font-sans selection:bg-[#FFB800] selection:text-[#0F172A]">
      
      {/* ── Background Glow ────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#FFB800]/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[350px] bg-white/[0.03] blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* ── Top Breadcrumb & Return ──────────────────────────────────── */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-[#FFB800] transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Return to Home</span>
          </Link>
        </div>

        {/* ── Page Header ─────────────────────────────────────────────── */}
        <div className="max-w-4xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 text-[#FFB800] text-xs font-bold uppercase tracking-widest mb-5">
            <Scale size={14} />
            <span>Commercial Agreement & Governance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Terms & <span className="text-[#FFB800]">Conditions</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            These Terms & Conditions govern all corporate event planning, MICE services, exhibition fabrications, technical production, and consulting engagements executed by Virtue IN Agency.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#FFB800]" />
              Last Revised: March 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Standard Commercial Production Terms</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Chennai Jurisdiction</span>
          </div>
        </div>

        {/* ── Main Layout: Sidebar Navigation + Content ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-[#1E293B]/80 border border-white/[0.08] backdrop-blur-xl shadow-xl">
              <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FileText size={15} className="text-[#FFB800]" />
                Agreement Sections
              </h3>
              <nav className="flex flex-col space-y-2">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:translate-x-1 transition-all py-1.5 px-2 rounded-lg hover:bg-white/[0.04] block"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contract Support Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/[0.08]">
              <h4 className="text-white font-bold text-sm mb-2">Custom Corporate Master SLA?</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Enterprise accounts requiring custom Master Service Agreements (MSAs) or specialized vendor onboarding terms may contact our legal desk.
              </p>
              <a
                href="mailto:plan@virtuein.agency"
                className="inline-flex items-center gap-2 text-xs font-bold text-[#FFB800] hover:underline"
              >
                <Mail size={13} />
                <span>plan@virtuein.agency</span>
              </a>
            </div>
          </aside>

          {/* Legal Body Copy */}
          <div className="lg:col-span-8 space-y-12 leading-relaxed text-sm sm:text-base">

            {/* Section 1 */}
            <section id="definitions" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                1. Definitions & Engagement Protocol
              </h2>
              <p className="mb-4">
                In this Agreement, <strong>&ldquo;Virtue IN&rdquo;</strong> refers to Virtue IN Agency, having its principal operations in Chennai, India. <strong>&ldquo;Client&rdquo;</strong> refers to the corporate entity, company, or authorized individual commissioning event management or technical production.
              </p>
              <p>
                An engagement becomes legally binding upon mutual execution of a formal Event Scope of Work (SOW), Quotation, or written email confirmation accompanied by the required advance booking retainer.
              </p>
            </section>

            {/* Section 2 */}
            <section id="payments" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                2. Retainers & Payment Milestones
              </h2>
              <p className="mb-4">
                Due to advance commitments required for premier 5-star venues, bespoke carpentry fabrication, imported line-array audio gear, and celebrity artist lock-ins, payments follow a milestone schedule:
              </p>

              <div className="space-y-3 my-6">
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#FFB800] font-black uppercase tracking-wider">Milestone 1 • Confirmation</span>
                    <h4 className="text-white font-bold text-sm mt-0.5">Booking Advance & Date Lock</h4>
                  </div>
                  <span className="text-lg font-black text-white px-3 py-1 rounded-xl bg-white/[0.05]">50%</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#FFB800] font-black uppercase tracking-wider">Milestone 2 • 7 Days Prior to Move-In</span>
                    <h4 className="text-white font-bold text-sm mt-0.5">Fabrication & Production Materialization</h4>
                  </div>
                  <span className="text-lg font-black text-white px-3 py-1 rounded-xl bg-white/[0.05]">40%</span>
                </div>
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.06] flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#FFB800] font-black uppercase tracking-wider">Milestone 3 • Post-Event Handover</span>
                    <h4 className="text-white font-bold text-sm mt-0.5">Final Settlement & Reconciliations</h4>
                  </div>
                  <span className="text-lg font-black text-white px-3 py-1 rounded-xl bg-white/[0.05]">10%</span>
                </div>
              </div>

              <p className="text-xs text-gray-400">
                * All invoices are subject to applicable GST (Goods and Services Tax). Overdue payments past scheduled move-in deadlines may result in technical setup suspension.
              </p>
            </section>

            {/* Section 3 */}
            <section id="production-approvals" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                3. Deliverables & Client Approvals
              </h2>
              <p className="mb-4">
                To maintain razor-sharp operational timelines:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFB800] shrink-0 mt-1" />
                  <span><strong>3D Architectural Renders & Stage Layouts:</strong> Written approval is required minimum 7 business days prior to event move-in to commence CNC metal and timber fabrication.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFB800] shrink-0 mt-1" />
                  <span><strong>Collateral & Print Graphics:</strong> High-resolution vector assets (logos, sponsor banners, LED video loops) must be delivered to our media desk as per technical rider specifications.</span>
                </li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="cancellations" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                4. Cancellation & Rescheduling Policy
              </h2>
              
              <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-6 flex items-start gap-4">
                <AlertTriangle size={22} className="text-amber-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">Cancellation Protocol</h4>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Notice of cancellation must be communicated in writing by the authorized signatory. Non-recoverable costs incurred with external suppliers will be deducted from any refund calculations.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-300">
                <li>• <strong>30+ Days Prior:</strong> Booking advance is refundable less a 15% administrative fee and any irreversible third-party commitments.</li>
                <li>• <strong>15 to 29 Days Prior:</strong> 50% of the total project value becomes payable to cover material procurement and crew reservation.</li>
                <li>• <strong>Within 14 Days of Move-In:</strong> 100% of the project value is payable as all structural materials, venue bookings, and sound gear will have been deployed.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="force-majeure" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                5. Force Majeure & Inclement Weather
              </h2>
              <p className="mb-4">
                Neither party shall be held liable for failure or delay in performance caused by acts beyond reasonable control, including but not limited to severe cyclones, extreme flooding, government state mourning orders, regional utility blackouts, or civil disruptions.
              </p>
              <p>
                In such occurrences, Virtue IN will work collaboratively with the Client to reschedule the event to an alternate mutually viable date within 90 days, transferring all salvageable vendor credits.
              </p>
            </section>

            {/* Section 6 */}
            <section id="licenses-safety" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                6. Licenses, Permits & Safety Compliance
              </h2>
              <p className="mb-4">
                Virtue IN coordinates local municipal clearances, fire safety certifications, electrical load sanitization, and police performance permits where contracted under the Scope of Work.
              </p>
              <p>
                For proprietary corporate music performances or commercial broadcast screenings, the Client is responsible for facilitating statutory copyright clearances (e.g., IPRS / PPL) unless bundled in the turnkey contract.
              </p>
            </section>

            {/* Section 7 */}
            <section id="intellectual-property" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                7. Intellectual Property & Custom Setups
              </h2>
              <p className="mb-4">
                All customized concepts, stage rigging drawings, event logos, and creative themes developed by Virtue IN remain the intellectual property of Virtue IN until final contract balance settlement, upon which full event usage rights transfer to the Client.
              </p>
              <p>
                Proprietary formats created and owned by Virtue IN (e.g., <em>Madarase Fashion Talent Hunt</em>, <em>Eat Pray Love Festivals</em>) remain the exclusive property of Virtue IN Agency.
              </p>
            </section>

            {/* Section 8 */}
            <section id="liability" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                8. Limitation of Liability
              </h2>
              <p className="mb-4">
                Virtue IN maintains standard public liability protocols and enforces rigorous rigging safety checks. To the maximum extent permitted by applicable law, Virtue IN&apos;s total aggregate liability arising out of any engagement shall be capped at the management fee portion received under the relevant Statement of Work.
              </p>
            </section>

            {/* Section 9 */}
            <section id="jurisdiction" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                9. Governing Law & Arbitration
              </h2>
              <p className="mb-4">
                This Agreement shall be governed, interpreted, and construed exclusively in accordance with the laws of the Republic of India.
              </p>
              <p>
                Any dispute, claim, or controversy arising out of this engagement that cannot be amicably settled within 30 days shall be resolved by arbitration in Chennai, Tamil Nadu, under the Arbitration and Conciliation Act, 1996, and subject to the exclusive jurisdiction of the competent Courts in Chennai.
              </p>
            </section>

            {/* Section 10 */}
            <section id="notices" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                10. Contact & Official Notices
              </h2>
              <p className="mb-6">
                All formal commercial communications and legal notices should be addressed to:
              </p>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-3">
                <h3 className="text-white font-black text-base uppercase tracking-wider">Virtue IN Agency</h3>
                <p className="text-sm text-gray-300">Operations Desk • Attention: Sathish Ringesan</p>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <MapPin size={16} className="text-[#FFB800] shrink-0" />
                  <span>28, Judge Jambulingam Road, Mylapore, Chennai – 600 004, Tamil Nadu, India</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={16} className="text-[#FFB800] shrink-0" />
                  <span>+91 74010 30000 / +91 98843 98514</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail size={16} className="text-[#FFB800] shrink-0" />
                  <span>plan@virtuein.agency | sathish@virtueinagency.com</span>
                </div>
              </div>
            </section>

          </div>
        </div>

      </div>
    </main>
  );
}
