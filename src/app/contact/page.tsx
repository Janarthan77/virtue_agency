"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Info, ExternalLink, ArrowRight, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { submitEnquiry, EnquiryInput } from "@/lib/api";

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
  "w-full bg-[#0F172A] border border-white/[0.09] rounded-xl px-4 py-3.5 text-gray-200 placeholder-gray-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50 focus:border-[#FFB800]/60 transition-all duration-300";

const labelCls = "block text-[11px] font-black text-gray-400 uppercase tracking-[0.15em] mb-2";

const initialFormState: EnquiryInput = {
  name: "",
  email: "",
  country_code: "+91",
  phone: "",
  company: "",
  venue: "",
  event_type: "",
  team_size: "",
  budget: "",
  preferred_date: "",
  source: "",
};

export default function Contact() {
  const [formData, setFormData] = useState<EnquiryInput>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{ id?: string; email?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const response = await submitEnquiry(formData);

      if (response.success) {
        setSubmitted(true);
        setSuccessInfo({
          id: response.enquiry?.id,
          email: formData.email,
        });
      } else {
        setErrorMessage(response.error || "Failed to submit enquiry. Please try again or call us directly.");
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormState);
    setSubmitted(false);
    setSuccessInfo(null);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#0F172A]">

      {/* ══ HERO ════════════════════════════════════════════ */}
      <div className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[500px] rounded-full bg-[#FFFFFF]/8 blur-[130px] pointer-events-none" />
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
              color: "#FFFFFF",
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
              color: "#CBD5E1",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group bg-[#1E293B] border border-white/[0.07] rounded-2xl p-6 flex items-start gap-5 hover:border-[#FFFFFF]/35 hover:shadow-[0_16px_40px_-12px_rgba(255,255,255,0.2)] transition-all duration-400 relative overflow-hidden">
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
              <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl overflow-hidden shadow-xl">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.18em] text-[#FFFFFF] uppercase mb-0.5">Find Us On Map</p>
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
              <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl p-6 shadow-xl">
                <p className="text-[10px] font-black tracking-[0.18em] text-[#FFB800] uppercase mb-6">Quick Contact</p>
                <div className="space-y-5">
                  {[
                    { Icon: Phone, label: "Call Us", value: "+91 74010 30000", color: "#FFFFFF" },
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
            <div className="bg-[#1E293B] border border-white/[0.07] rounded-2xl p-8 md:p-10 relative overflow-hidden shadow-2xl">
              {/* Gold gradient top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: "linear-gradient(90deg, #FFFFFF, #FFB800, #FFFFFF)" }} />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 relative"
                      style={{ background: "linear-gradient(135deg, rgba(255,184,0,0.2), rgba(255,255,255,0.05))", border: "1px solid rgba(255,184,0,0.4)" }}>
                      <CheckCircle2 size={40} className="text-[#FFB800]" />
                    </div>

                    <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30 mb-3">
                      Enquiry Logged &amp; Verified
                    </span>

                    <h3 className="text-3xl font-black text-white mb-3">
                      Thank You, {formData.name || "Client"}!
                    </h3>

                    <p className="text-gray-300 max-w-md text-sm leading-relaxed mb-6">
                      Your event enquiry has been routed directly to our lead producers. An automated confirmation summary has been dispatched to <strong className="text-white">{successInfo?.email}</strong> via Resend.
                    </p>

                    <div className="w-full max-w-md bg-[#0F172A] border border-white/[0.08] rounded-xl p-4 mb-8 text-left text-xs space-y-2">
                      <div className="flex justify-between text-gray-400">
                        <span>Event Type:</span>
                        <span className="text-white font-bold">{formData.event_type || "N/A"}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Company:</span>
                        <span className="text-white font-bold">{formData.company || "N/A"}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Location:</span>
                        <span className="text-white font-bold">{formData.venue || "N/A"}</span>
                      </div>
                      {formData.budget && (
                        <div className="flex justify-between text-gray-400">
                          <span>Budget:</span>
                          <span className="text-[#FFB800] font-bold">{formData.budget}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-white/15 text-gray-300 font-bold text-xs hover:bg-white/5 transition-colors"
                      >
                        <RefreshCw size={14} /> Submit Another Enquiry
                      </button>
                      <a
                        href="tel:+917401030000"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#FFB800] text-gray-950 font-black text-xs hover:bg-[#FFC72C] transition-all shadow-lg"
                      >
                        <Phone size={14} /> Call +91 74010 30000
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-[#FFB800]" />
                      <span className="text-xs font-bold text-[#FFB800] uppercase tracking-widest">Tailored Proposals</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-white mb-1">
                      Free Event Budget Consultation
                    </h2>
                    <p className="text-gray-400 text-sm mb-8">Fields marked <span className="text-[#FFB800]">*</span> are required.</p>

                    {errorMessage && (
                      <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-400 text-sm">
                        <AlertCircle size={18} className="shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Submission Error</p>
                          <p className="text-xs text-red-300/80">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">

                      {/* Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>Your Name <span className="text-[#FFB800]">*</span></label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            className={inputCls}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Official Email <span className="text-[#FFB800]">*</span></label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@domain.com"
                            className={inputCls}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Phone Number <span className="text-[#FFB800]">*</span></label>
                          <div className="flex">
                            <select
                              name="country_code"
                              value={formData.country_code}
                              onChange={handleChange}
                              disabled={isSubmitting}
                              className="bg-[#0F172A] border border-white/[0.09] border-r-0 rounded-l-xl px-3 py-3.5 text-gray-300 text-sm focus:outline-none"
                            >
                              <option value="+91">+91</option>
                              <option value="+1">+1</option>
                              <option value="+44">+44</option>
                              <option value="+971">+971</option>
                              <option value="+65">+65</option>
                            </select>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="74010 30000"
                              className={`${inputCls} rounded-l-none`}
                              required
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>Company Name <span className="text-[#FFB800]">*</span></label>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Acme Corp"
                            className={inputCls}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Location / Venue <span className="text-[#FFB800]">*</span></label>
                          <input
                            type="text"
                            name="venue"
                            value={formData.venue}
                            onChange={handleChange}
                            placeholder="Chennai / Bangalore"
                            className={inputCls}
                            required
                            disabled={isSubmitting}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Type of Event <span className="text-[#FFB800]">*</span></label>
                          <select
                            name="event_type"
                            value={formData.event_type}
                            onChange={handleChange}
                            className={inputCls}
                            required
                            disabled={isSubmitting}
                          >
                            <option value="" disabled>Select event type...</option>
                            <option value="Corporate Annual Summit">Corporate Annual Summit</option>
                            <option value="Product Launch & Gala">Product Launch &amp; Gala</option>
                            <option value="MICE Conference">MICE Conference</option>
                            <option value="Entertainment & Concert">Entertainment &amp; Concert</option>
                            <option value="Destination Luxury Event">Destination Luxury Event</option>
                            <option value="Awards & Fashion Night">Awards &amp; Fashion Night</option>
                          </select>
                        </div>
                      </div>

                      {/* Info banner */}
                      <div className="flex gap-3 bg-[#FFFFFF]/5 border border-[#FFFFFF]/10 rounded-xl p-4 text-sm text-gray-300">
                        <Info size={16} className="text-[#FFB800] shrink-0 mt-0.5" />
                        <p>The more details you share, the more curated and personalized we can make the proposal.</p>
                      </div>

                      {/* Divider */}
                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/[0.07]" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="bg-[#1E293B] px-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                            Optional Details
                          </span>
                        </div>
                      </div>

                      {/* Row 3 — Optional */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={labelCls}>Team Size</label>
                          <select
                            name="team_size"
                            value={formData.team_size}
                            onChange={handleChange}
                            className={inputCls}
                            disabled={isSubmitting}
                          >
                            <option value="">Select size...</option>
                            <option value="Up to 50">Up to 50</option>
                            <option value="51 – 100">51 – 100</option>
                            <option value="101 – 200">101 – 200</option>
                            <option value="200+">200+</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Budget</label>
                          <select
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className={inputCls}
                            disabled={isSubmitting}
                          >
                            <option value="">Select budget...</option>
                            <option value="₹50K – ₹2L">₹50K – ₹2L</option>
                            <option value="₹2L – ₹5L">₹2L – ₹5L</option>
                            <option value="₹5L – ₹10L">₹5L – ₹10L</option>
                            <option value="₹10L+">₹10L+</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelCls}>Preferred Date</label>
                          <input
                            type="date"
                            name="preferred_date"
                            value={formData.preferred_date}
                            onChange={handleChange}
                            className={inputCls}
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>

                      {/* How did you hear */}
                      <div>
                        <label className={labelCls}>How did you hear about us?</label>
                        <input
                          type="text"
                          name="source"
                          value={formData.source}
                          onChange={handleChange}
                          placeholder="Google / LinkedIn / Referral / Word of mouth"
                          className={inputCls}
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-gray-900 font-black text-base tracking-wide transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_16px_40px_-10px_rgba(255,255,255,0.4)] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                        style={{ background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)" }}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin text-gray-900" />
                            Connecting to Virtue IN Server...
                          </>
                        ) : (
                          <>
                            Get Free Consultation <ArrowRight size={18} />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[11px] text-gray-500 mt-2">
                        By submitting, you agree to receive email confirmation and proposal communication from Virtue IN Agency.
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

        </div>
      </div>

    </div>
  );
}
