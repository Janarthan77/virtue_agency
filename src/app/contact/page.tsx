"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Info, ExternalLink, ArrowRight, Send } from "lucide-react";

/* ─── Reveal helper ─────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Input / Select shared styles ─────────────────────── */
const inputCls =
  "w-full bg-[#0F172A] border border-white/[0.09] rounded-xl px-4 py-3.5 text-gray-200 placeholder-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#6C3EF4]/50 focus:border-[#6C3EF4]/60 transition-all duration-300";

const labelCls = "block text-[11px] font-black text-gray-500 uppercase tracking-[0.15em] mb-2";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <div className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-[#6C3EF4]/8 blur-[130px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-[350px] h-[350px] rounded-full bg-[#FFB800]/5 blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="w-10 h-[2px] bg-[#FFB800]" />
              <p className="text-[#FFB800] font-bold text-sm tracking-[0.25em] uppercase">Get In Touch</p>
              <span className="w-10 h-[2px] bg-[#FFB800]" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
              Let&apos;s Create Something <br />
              <span className="text-[#FFB800]">Extraordinary</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
              Tell us about your event vision and we&apos;ll craft a tailored proposal within 24 hours.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══ INFO CARDS ══════════════════════════════════════ */}
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: MapPin,
              label: "Office Address",
              lines: ["28, Judge Jambulingam Road,", "Mylapore, Chennai – 600 004", "Tamil Nadu, India"],
              color: "#6C3EF4",
            },
            {
              icon: Phone,
              label: "Call & Email",
              lines: ["+91 74010 30000", "plan@virtuein.agency"],
              color: "#FFB800",
            },
            {
              icon: Clock,
              label: "Working Hours",
              lines: ["Monday – Saturday", "9:00 AM – 7:00 PM IST", "Sunday: By Appointment"],
              color: "#a78bfa",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group bg-[#1E293B] border border-white/[0.07] rounded-2xl p-6 flex items-start gap-5 hover:border-[#6C3EF4]/35 hover:shadow-[0_16px_40px_-12px_rgba(108,62,244,0.2)] transition-all duration-400 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}>
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] uppercase mb-2" style={{ color: item.color }}>
                      {item.label}
                    </p>
                    {item.lines.map((l, li) => (
                      <p key={li} className={`text-sm leading-relaxed ${li === 0 ? "text-white font-semibold" : "text-gray-400"}`}>
                        {l}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ══ MAIN CONTENT ════════════════════════════════════ */}
      <div className="container mx-auto px-6 max-w-7xl pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left — Map + Quick Contact (sticky) */}
          <div className="lg:col-span-2">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">

            {/* Map */}
            <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-black tracking-[0.18em] text-[#6C3EF4] uppercase mb-0.5">Find Us On Map</p>
                  <p className="text-gray-400 text-xs">Virtue IN Agency, Mylapore</p>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#FFB800] text-xs font-bold hover:underline"
                >
                  Open <ExternalLink size={11} />
                </a>
              </div>
              <div className="h-56 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Quick Contact */}
            <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl p-6">
              <p className="text-[10px] font-black tracking-[0.18em] text-[#FFB800] uppercase mb-6">Quick Contact</p>
              <div className="space-y-5">
                {[
                  { Icon: Phone, label: "Call Us", value: "+91 74010 30000", color: "#6C3EF4" },
                  { Icon: Mail, label: "Email Us", value: "plan@virtuein.agency", color: "#FFB800" },
                ].map(({ Icon, label, value, color }, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
                      <Icon size={17} style={{ color }} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-0.5">{label}</p>
                      <p className="text-white font-bold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          </div>

          {/* Right — Form */}
          <Reveal delay={0.2} className="lg:col-span-3">
            <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl p-8 md:p-10 relative overflow-hidden">
              {/* Purple top bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, #6C3EF4, #9D72FF, #FFB800)" }} />

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "linear-gradient(135deg,#6C3EF4,#9D72FF)" }}>
                    <Send size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">Message Sent!</h3>
                  <p className="text-gray-400 max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                    Free Event Budget Consultation
                  </h2>
                  <p className="text-gray-500 text-sm mb-8">Fields marked <span className="text-[#FFB800]">*</span> are required.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Your Name <span className="text-[#FFB800]">*</span></label>
                        <input type="text" placeholder="John Doe" className={inputCls} required />
                      </div>
                      <div>
                        <label className={labelCls}>Official Email <span className="text-[#FFB800]">*</span></label>
                        <input type="email" placeholder="example@domain.com" className={inputCls} required />
                      </div>
                      <div>
                        <label className={labelCls}>Phone Number <span className="text-[#FFB800]">*</span></label>
                        <div className="flex">
                          <select className="bg-[#0F172A] border border-white/[0.09] border-r-0 rounded-l-xl px-3 py-3.5 text-gray-300 text-sm focus:outline-none">
                            <option>+91</option>
                            <option>+1</option>
                          </select>
                          <input type="tel" placeholder="74010 30000" className={`${inputCls} rounded-l-none`} required />
                        </div>
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Company Name <span className="text-[#FFB800]">*</span></label>
                        <input type="text" placeholder="Acme Corp" className={inputCls} required />
                      </div>
                      <div>
                        <label className={labelCls}>Location / Venue <span className="text-[#FFB800]">*</span></label>
                        <input type="text" placeholder="Chennai / Bangalore" className={inputCls} required />
                      </div>
                      <div>
                        <label className={labelCls}>Type of Event <span className="text-[#FFB800]">*</span></label>
                        <select className={inputCls} required defaultValue="">
                          <option value="" disabled>Select event type...</option>
                          <option value="corporate">Corporate Event</option>
                          <option value="product_release">Product Release</option>
                          <option value="conference">Conference / MICE</option>
                          <option value="entertainment">Entertainment</option>
                          <option value="destination">Destination Event</option>
                        </select>
                      </div>
                    </div>

                    {/* Info banner */}
                    <div className="flex gap-3 bg-[#6C3EF4]/8 border border-[#6C3EF4]/20 rounded-xl p-4 text-sm text-gray-300">
                      <Info size={16} className="text-[#6C3EF4] shrink-0 mt-0.5" />
                      <p>The more details you share, the more curated and personalized we can make the package.</p>
                    </div>

                    {/* Divider */}
                    <div className="relative py-2">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/[0.07]" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="bg-[#1E293B] px-4 text-[10px] font-black text-gray-600 uppercase tracking-widest">
                          Optional Details
                        </span>
                      </div>
                    </div>

                    {/* Row 3 — Optional */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className={labelCls}>Team Size</label>
                        <select className={inputCls}>
                          <option value="">Select size...</option>
                          <option>Up to 50</option>
                          <option>51 – 100</option>
                          <option>101 – 200</option>
                          <option>200+</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Budget</label>
                        <select className={inputCls}>
                          <option value="">Select budget...</option>
                          <option>₹50K – ₹2L</option>
                          <option>₹2L – ₹5L</option>
                          <option>₹5L – ₹10L</option>
                          <option>₹10L+</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Preferred Date</label>
                        <input type="date" className={inputCls} />
                      </div>
                    </div>

                    {/* How did you hear */}
                    <div>
                      <label className={labelCls}>How did you hear about us?</label>
                      <input type="text" placeholder="Google / LinkedIn / Referral / Word of mouth" className={inputCls} />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white font-black text-base tracking-wide transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_16px_40px_-10px_rgba(108,62,244,0.5)]"
                      style={{ background: "linear-gradient(135deg,#6C3EF4,#9D72FF)" }}
                    >
                      Get Free Consultation <ArrowRight size={18} />
                    </button>

                    <p className="text-center text-[11px] text-gray-600 mt-2">
                      Protected by reCAPTCHA —{" "}
                      <a href="#" className="text-[#6C3EF4] hover:underline">Privacy Policy</a>
                      {" "}&amp;{" "}
                      <a href="#" className="text-[#6C3EF4] hover:underline">Terms of Service</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </Reveal>

        </div>
      </div>

    </div>
  );
}
