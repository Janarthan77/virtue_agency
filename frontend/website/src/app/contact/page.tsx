"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Info, ExternalLink, ArrowRight, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, RefreshCw } from "lucide-react";
import { submitEnquiry, fetchLiveSettings, EnquiryInput, CompanySettings } from "@/lib/api";

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

  // Dynamic live company settings
  const [settings, setSettings] = useState<CompanySettings>({
    phone: "+91 74010 30000",
    email: "plan@virtuein.agency",
    address_line1: "28, Judge Jambulingam Road,",
    address_line2: "Mylapore, Chennai – 600 004",
    city_state_pin: "Tamil Nadu, India",
    working_hours_mon_sat: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
    working_hours_sun: "Sunday: By Appointment",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin",
  });

  useEffect(() => {
    fetchLiveSettings().then((data) => {
      if (data) setSettings((prev) => ({ ...prev, ...data }));
    });
  }, []);

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

      {/* ══ INFO CARDS (DYNAMIC FROM BACKEND / ADMIN CMS) ════ */}
      <div className="container mx-auto px-6 max-w-7xl mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: MapPin,
              label: "Office Address",
              lines: [
                settings.address_line1 || "28, Judge Jambulingam Road,",
                settings.address_line2 || "Mylapore, Chennai – 600 004",
                settings.city_state_pin || "Tamil Nadu, India",
              ],
              color: "#FFFFFF",
            },
            {
              icon: Phone,
              label: "Call & Email",
              lines: [
                settings.phone || "+91 74010 30000",
                settings.email || "plan@virtuein.agency",
              ],
              color: "#FFB800",
            },
            {
              icon: Clock,
              label: "Working Hours",
              lines: [
                settings.working_hours_mon_sat || "Monday – Saturday: 9:00 AM – 7:00 PM IST",
                settings.working_hours_sun || "Sunday: By Appointment",
              ],
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
                    <p className="text-gray-400 text-xs">{settings.company_name || "Virtue IN Agency"}, Mylapore</p>
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
                    src={settings.map_embed_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin"}
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
                    { Icon: Phone, label: "Call Us", value: settings.phone || "+91 74010 30000", color: "#FFFFFF" },
                    { Icon: Mail, label: "Email Us", value: settings.email || "plan@virtuein.agency", color: "#FFB800" },
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
                    className="py-12 flex flex-col items-center text-center gap-6"
                  >
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-[#FFB800]/10 border border-[#FFB800]/30 flex items-center justify-center">
                        <CheckCircle2 size={48} className="text-[#FFB800]" />
                      </div>
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB800] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FFB800]"></span>
                      </span>
                    </div>

                    <div className="max-w-md">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
                        <Sparkles size={13} /> Enquiry Received &amp; Logged in Admin
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
                        Thank You, {formData.name || "Valued Client"}!
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-2">
                        Your event brief for <span className="text-[#FFB800] font-semibold">{formData.event_type || "your project"}</span> has been transmitted directly to our executive production team.
                      </p>
                      {successInfo?.email && (
                        <p className="text-xs text-gray-500">
                          A confirmation reference will be sent to <span className="text-gray-300 font-mono">{successInfo.email}</span>.
                        </p>
                      )}
                    </div>

                    <div className="w-full bg-[#0F172A] border border-white/[0.08] rounded-xl p-4 text-left text-xs space-y-1.5 max-w-md">
                      <p className="text-gray-500 font-bold uppercase tracking-wider text-[10px]">Next Steps:</p>
                      <p className="text-gray-300">1. Production Producer reviews venue &amp; requirements.</p>
                      <p className="text-gray-300">2. Custom proposal &amp; initial quote prepared within 24 hours.</p>
                      <p className="text-gray-300">3. Strategy call scheduled at your convenience.</p>
                    </div>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/[0.1] text-gray-300 hover:text-white text-xs font-bold transition-all"
                    >
                      <RefreshCw size={13} /> Submit Another Enquiry
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                        <h2 className="text-2xl font-black text-white">Event Enquiry Form</h2>
                      </div>
                      <p className="text-gray-400 text-xs">Fill out the details below to receive a personalized proposal.</p>
                    </div>

                    {errorMessage && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Your Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Anand Kumar"
                          required
                          className={inputCls}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Work Email *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="anand@company.com"
                          required
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Company */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Contact Phone *</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            name="country_code"
                            value={formData.country_code}
                            onChange={handleChange}
                            placeholder="+91"
                            className="w-20 bg-[#0F172A] border border-white/[0.09] rounded-xl px-3 py-3.5 text-gray-200 text-sm font-medium text-center focus:outline-none focus:ring-2 focus:ring-[#FFB800]/50"
                          />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="98401 23456"
                            required
                            className={inputCls}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={labelCls}>Company / Organization</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="e.g. TVS Motor Company"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 3: Event Type & Preferred Venue */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Event Category *</label>
                        <select
                          name="event_type"
                          value={formData.event_type}
                          onChange={handleChange}
                          required
                          className={inputCls}
                        >
                          <option value="">Select Category</option>
                          <option value="Corporate Annual Summit">Corporate Annual Summit</option>
                          <option value="Product Launch & Gala">Product Launch &amp; Gala</option>
                          <option value="MICE Conference">MICE &amp; Conference</option>
                          <option value="Exhibition & Stall Design">Exhibition &amp; Stall Design</option>
                          <option value="Automotive & Brand Experience">Automotive &amp; Brand Experience</option>
                          <option value="Entertainment & Concert">Entertainment &amp; Concert</option>
                          <option value="Other Bespoke Production">Other Bespoke Production</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelCls}>Preferred City / Venue</label>
                        <input
                          type="text"
                          name="venue"
                          value={formData.venue}
                          onChange={handleChange}
                          placeholder="e.g. Chennai, ITC Grand Chola"
                          className={inputCls}
                        />
                      </div>
                    </div>

                    {/* Row 4: Team Size & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelCls}>Expected Guests</label>
                        <select
                          name="team_size"
                          value={formData.team_size}
                          onChange={handleChange}
                          className={inputCls}
                        >
                          <option value="">Estimated Attendance</option>
                          <option value="50 – 100 Guests">50 – 100 Guests</option>
                          <option value="101 – 300 Guests">101 – 300 Guests</option>
                          <option value="301 – 600 Guests">301 – 600 Guests</option>
                          <option value="600+ Large Production">600+ Large Production</option>
                        </select>
                      </div>

                      <div>
                        <label className={labelCls}>Approximate Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className={inputCls}
                        >
                          <option value="">Select Range</option>
                          <option value="₹3L – ₹5L">₹3L – ₹5L</option>
                          <option value="₹5L – ₹10L">₹5L – ₹10L</option>
                          <option value="₹10L – ₹25L">₹10L – ₹25L</option>
                          <option value="₹25L+ Signature Scale">₹25L+ Signature Scale</option>
                          <option value="Flexible / To be planned">Flexible / To be planned</option>
                        </select>
                      </div>
                    </div>

                    {/* Row 5: Preferred Date */}
                    <div>
                      <label className={labelCls}>Target Event Date (or Month)</label>
                      <input
                        type="date"
                        name="preferred_date"
                        value={formData.preferred_date}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-[#FFFFFF] to-[#E2E8F0] hover:from-white hover:to-white text-[#0F172A] font-black text-sm uppercase tracking-[0.2em] py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_45px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={18} className="animate-spin text-[#0F172A]" />
                          <span>Dispatching Enquiry...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Event Brief</span>
                          <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-gray-500 text-center">
                      🔒 Your details are kept strictly confidential. We usually respond within 24 hours.
                    </p>

                  </form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

        </div>
      </div>

    </div>
  );
}
