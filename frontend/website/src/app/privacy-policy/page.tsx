"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Lock, Eye, FileText, CheckCircle2, ArrowLeft, Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react";

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "overview", title: "1. Overview & Scope" },
    { id: "data-collection", title: "2. Information We Collect" },
    { id: "purpose", title: "3. How We Use Information" },
    { id: "nda-confidentiality", title: "4. Corporate Non-Disclosure (NDA)" },
    { id: "media-rights", title: "5. Photography & Media Protocol" },
    { id: "vendors", title: "6. Third-Party Vendors & Venues" },
    { id: "security", title: "7. Data Protection & Storage" },
    { id: "client-rights", title: "8. Your Legal Rights" },
    { id: "contact-officer", title: "9. Grievance Officer & Contact" },
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
            <Shield size={14} />
            <span>Legal & Privacy Compliance</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            Privacy <span className="text-[#FFB800]">Policy</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
            Virtue IN Agency (&ldquo;Virtue IN&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is deeply committed to maintaining the confidentiality, integrity, and security of all corporate client intelligence, executive contact details, and event attendee data entrusted to us.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#FFB800]" />
              Effective Date: March 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>DPDP Act (India) & Global Best Practices Aligned</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <span>Version 2.4</span>
          </div>
        </div>

        {/* ── Main Layout: Sidebar Navigation + Content ────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Table of Contents Sticky Sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-[#1E293B]/80 border border-white/[0.08] backdrop-blur-xl shadow-xl">
              <h3 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <FileText size={15} className="text-[#FFB800]" />
                Contents Navigation
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

            {/* Quick Contact Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-white/[0.08]">
              <h4 className="text-white font-bold text-sm mb-2">Have a Legal Inquiry?</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">
                Our compliance officer is ready to address NDA terms, data protection addendums, and security protocols.
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
            <section id="overview" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                1. Overview & Scope
              </h2>
              <p className="mb-4">
                This Privacy Policy applies to all services provided by <strong>Virtue IN Agency</strong>, including but not limited to corporate conferences, product launches, annual gala events, exhibition stall fabrications, and community sporting events.
              </p>
              <p>
                By engaging Virtue IN for event planning, production, or consulting, or by visiting our website at <span className="text-white font-semibold">www.virtueinagency.com</span>, you acknowledge the terms described in this Privacy Policy.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                2. Information We Collect
              </h2>
              <p className="mb-4">
                In our capacity as event managers and production directors, we may collect and process:
              </p>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFB800] shrink-0 mt-1" />
                  <span><strong>Corporate Client Data:</strong> Company name, authorized contact personnel, official email addresses, billing coordinates, tax IDs (GSTIN), and corporate headquarters.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFB800] shrink-0 mt-1" />
                  <span><strong>Event Specifications:</strong> Internal timelines, executive speaker rosters, confidential product launch details, guest headcount estimates, and venue specifications.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFB800] shrink-0 mt-1" />
                  <span><strong>Attendee & Delegate Information:</strong> Attendee registration records, dietary preferences, VIP seating protocols, and access badges required for secure MICE admissions.</span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="purpose" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                3. How We Use Your Information
              </h2>
              <p className="mb-4">
                We strictly utilize collected intelligence for the lawful execution of agreed event deliverables:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.05]">
                  <h4 className="text-white font-bold text-sm mb-1">Production Execution</h4>
                  <p className="text-xs text-gray-400">Coordinating stage mockups, badge printing, venue access, and catering counts.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.05]">
                  <h4 className="text-white font-bold text-sm mb-1">Official Permissions</h4>
                  <p className="text-xs text-gray-400">Submitting required applications for police licenses, fire safety, and municipal permits.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.05]">
                  <h4 className="text-white font-bold text-sm mb-1">Billing & Invoicing</h4>
                  <p className="text-xs text-gray-400">Generating milestone invoices, vendor payment receipts, and tax compliant billing.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#0F172A] border border-white/[0.05]">
                  <h4 className="text-white font-bold text-sm mb-1">Client Communications</h4>
                  <p className="text-xs text-gray-400">Providing technical riders, run-sheets, and 24/7 on-ground event coordination.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="nda-confidentiality" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                4. Corporate Non-Disclosure (NDA)
              </h2>
              <div className="p-6 rounded-2xl bg-[#FFB800]/5 border border-[#FFB800]/20 mb-6">
                <div className="flex items-center gap-2 text-[#FFB800] font-bold text-sm mb-2">
                  <Lock size={16} />
                  <span>Embargoed Launches & Proprietary Intellectual Property</span>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Virtue IN routinely executes unreleased vehicle launches, real estate unveilings, and proprietary corporate summits. All staff, technical crew, and subcontractors operate under strict, signed non-disclosure agreements prohibiting premature disclosure of photos, renders, or specifications.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="media-rights" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                5. Photography & Media Protocol
              </h2>
              <p className="mb-4">
                High-definition photography and multi-camera live video recording are intrinsic to our event production.
              </p>
              <p className="mb-4">
                Unless explicitly restricted in the Client Agreement, Virtue IN reserves the right to capture wide-angle crowd shots and stage production highlights solely for professional agency portfolio showcase and archival documentation.
              </p>
              <p>
                Corporate clients may designate &ldquo;Private / No-Media Zones&rdquo; (e.g., closed boardroom debates or VIP green rooms) which our media crews will strictly respect.
              </p>
            </section>

            {/* Section 6 */}
            <section id="vendors" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                6. Third-Party Vendors & Venues
              </h2>
              <p className="mb-4">
                To fulfill turnkey event production, we collaborate with vetted partners (5-star hotels, structural carpenters, line-array audio engineers, and lighting technicians).
              </p>
              <p>
                We only transmit the minimum logistical data necessary (such as room-block counts or dietary numbers) and never sell, lease, or monetize client data to external marketing aggregators.
              </p>
            </section>

            {/* Section 7 */}
            <section id="security" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                7. Data Protection & Storage
              </h2>
              <p className="mb-4">
                We implement robust technical and organizational measures to safeguard data against unauthorized access, alteration, disclosure, or destruction:
              </p>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Cloud storage backed by industry-standard encryption protocols (AES-256).</li>
                <li>• Strict role-based access limiting sensitive client files only to appointed event directors.</li>
                <li>• Regular purging of post-event attendee CSVs following project wrap-up reconciliations.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="client-rights" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                8. Your Legal Rights
              </h2>
              <p className="mb-4">
                In compliance with the Digital Personal Data Protection (DPDP) Act of India and international standards, clients and attendees hold the right to:
              </p>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Request a copy of personal information held by Virtue IN.</li>
                <li>• Request correction or amendment of inaccurate records.</li>
                <li>• Request deletion of non-statutory event contact records upon event conclusion.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section id="contact-officer" className="p-8 rounded-3xl bg-[#1E293B]/40 border border-white/[0.06]">
              <h2 className="text-2xl font-black text-white tracking-tight mb-4 flex items-center gap-3">
                <span className="w-8 h-[2px] bg-[#FFB800]" />
                9. Grievance Officer & Contact Information
              </h2>
              <p className="mb-6">
                For questions regarding this policy, data rights requests, or corporate compliance notices, please contact our appointed officer:
              </p>

              <div className="p-6 rounded-2xl bg-[#0F172A] border border-white/[0.08] space-y-3">
                <h3 className="text-white font-black text-base uppercase tracking-wider">Virtue IN Agency</h3>
                <p className="text-sm text-gray-300">Attention: Sathish Ringesan / Legal & Compliance Cell</p>
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
