"use client";

import { FadeIn } from "@/components/FadeIn";
import { MapPin, Phone, Mail, Clock, Info, ExternalLink } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-[#111111] min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">
              Let's Create Something <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF]">Extraordinary</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Tell us about your event vision and we'll craft a tailored proposal within 24 hours.
            </p>
          </FadeIn>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <FadeIn delay={0.1} className="bg-[#1E293B] rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <div className="bg-green-50 p-3 rounded-full text-green-600 shrink-0">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Office Address</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                28, Judge Jambulingam Road,<br/>
                Mylapore, Chennai - 600 004<br/>
                Tamil Nadu, India
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2} className="bg-[#1E293B] rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <div className="bg-orange-50 p-3 rounded-full text-orange-500 shrink-0">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Call & Email</h3>
              <p className="text-gray-100 font-bold mb-1">+91 74010 30000</p>
              <p className="text-gray-300 text-sm">plan@virtuein.agency</p>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.3} className="bg-[#1E293B] rounded-2xl p-6 flex items-start gap-4 shadow-lg">
            <div className="bg-blue-50 p-3 rounded-full text-blue-500 shrink-0">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="text-accent font-bold text-sm tracking-widest uppercase mb-2">Working Hours</h3>
              <p className="text-gray-100 font-medium text-sm mb-1">Monday - Saturday</p>
              <p className="text-gray-300 text-sm mb-1">9:00 AM - 7:00 PM IST</p>
              <p className="text-gray-400 text-xs">Sunday: By Appointment</p>
            </div>
          </FadeIn>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Left Column - Map & Quick Contact */}
          <div className="lg:col-span-4 space-y-6">
            <FadeIn delay={0.4} className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-lg border border-white/10 p-1">
               <div className="p-4 border-b border-white/10 flex justify-between items-center">
                  <div>
                    <h3 className="text-accent font-bold text-xs tracking-widest uppercase mb-1">Find Us On Map</h3>
                    <p className="text-gray-400 text-xs">Virtue IN Agency, Mylapore</p>
                  </div>
               </div>
               <div className="relative h-64 bg-[#1E293B] rounded-b-xl w-full">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.852445300305!2d80.2642874148231!3d13.044439090807693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52662c14041b31%3A0xc3b5e40882e3bc01!2sJudge%20Jambulingam%20Rd%2C%20Dr%20Radhakrishnan%20Salai%2C%20Mylapore%2C%20Chennai%2C%20Tamil%20Nadu%20600004!5e0!3m2!1sen!2sin!4v1682156434444!5m2!1sen!2sin" 
                   width="100%" 
                   height="100%" 
                   style={{ border: 0 }} 
                   allowFullScreen={true} 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   className="rounded-b-xl grayscale hover:grayscale-0 transition-all duration-500"
                 ></iframe>
               </div>
               <div className="p-3 flex justify-between items-center text-xs text-gray-400">
                  <span>Mylapore, Chennai - 600 004</span>
                  <a href="#" className="text-accent font-semibold flex items-center gap-1 hover:underline">
                    Open in Maps <ExternalLink size={12}/>
                  </a>
               </div>
            </FadeIn>

            <FadeIn delay={0.5} className="bg-[#1A1A1A] rounded-2xl p-6 shadow-xl border border-white/5">
              <h3 className="text-gray-400 font-bold text-xs tracking-widest uppercase mb-6">Quick Contact</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-[#1E293B]/5 p-3 rounded-xl text-orange-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase">Call Us</p>
                    <p className="text-white font-bold">+91 74010 30000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-[#1E293B]/5 p-3 rounded-xl text-accent">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1 uppercase">Email Us</p>
                    <p className="text-white font-bold">plan@virtuein.agency</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-8">
            <FadeIn delay={0.6} className="bg-[#1E293B] rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Decorative top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF]" />
              
              <h2 className="text-3xl font-bold text-white mb-2">Free Event Budget Consultation</h2>
              <p className="text-gray-400 text-sm mb-8">Fields marked * are required.</p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Name *</label>
                    <input type="text" placeholder="John Doe" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Official Email *</label>
                    <input type="email" placeholder="example@domain.com" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Phone Number *</label>
                    <div className="flex">
                      <select className="border border-white/20 rounded-l-lg px-2 py-3 text-gray-200 bg-[#0F172A] focus:outline-none">
                        <option>IN +91</option>
                        <option>US +1</option>
                      </select>
                      <input type="tel" placeholder="00000 00000" className="w-full border-y border-r border-white/20 rounded-r-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" required />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Company Name *</label>
                    <input type="text" placeholder="Acme Corp" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Location / Venue *</label>
                    <input type="text" placeholder="Chennai / Bangalore" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Type of Event *</label>
                    <select className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors appearance-none bg-[#1E293B]" required defaultValue="">
                      <option value="" disabled>Select event type...</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="product_release">Product Release</option>
                    </select>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3 text-sm text-gray-200">
                  <Info className="text-accent shrink-0 mt-0.5" size={18} />
                  <p>The more details you share, the more curated and personalized we can make the package.</p>
                </div>

                <div className="relative py-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-[#1E293B] px-4 text-xs font-bold text-gray-300 uppercase tracking-widest">Optional Details</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Team Size</label>
                    <select className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-[#1E293B]">
                      <option>30 / 50 / 100 / 200+</option>
                      <option>Up to 50</option>
                      <option>51 - 100</option>
                      <option>101 - 200</option>
                      <option>200+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Budget</label>
                    <select className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors bg-[#1E293B]">
                      <option>₹50K / ₹2L / ₹5L+</option>
                      <option>₹50K - ₹2L</option>
                      <option>₹2L - ₹5L</option>
                      <option>₹5L+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Preferred Date</label>
                    <input type="date" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">How did you hear about us?</label>
                  <input type="text" placeholder="Google / LinkedIn / Referral / Word of mouth" className="w-full border border-white/20 rounded-lg px-4 py-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors" />
                </div>

                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] text-white font-bold rounded-lg text-lg transition-all duration-300 transform hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-pink-500/25">
                  Get Free Consultation &rarr;
                </button>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Protected by reCAPTCHA — <a href="#" className="text-accent hover:underline">Privacy Policy</a> & <a href="#" className="text-accent hover:underline">Terms of Service</a>
                </p>
              </form>
            </FadeIn>
          </div>

        </div>
      </div>
    </div>
  );
}
