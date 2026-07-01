import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0F172A] pt-20 pb-10 border-t border-white/20 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold tracking-tighter text-white">
                VIRTUE <span className="text-accent">IN</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Crafting extraordinary corporate experiences. We exclusively specialize in corporate events and product releases.
            </p>
            <div className="flex gap-4">
              {['FB', 'X', 'IG', 'IN'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-gray-200 text-xs hover:border-accent hover:text-accent transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-accent font-semibold mb-6 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Our Portfolio', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-300 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                 <Link href="/contact" className="text-gray-300 hover:text-accent transition-colors text-sm">
                    Get a Quote
                 </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-accent font-semibold mb-6 text-sm tracking-widest uppercase">Our Services</h4>
            <ul className="space-y-3">
              {['Corporate Events', 'Product Releases', 'Conferences', 'Seminars'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-gray-300 hover:text-accent transition-colors text-sm">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent font-semibold mb-6 text-sm tracking-widest uppercase">Get In Touch</h4>
            <ul className="space-y-4">
              <li className="flex flex-col gap-1 text-gray-300 text-sm mb-4">
                <span className="font-bold text-white mb-1">SATHISH RINGESAN</span>
                <span className="flex items-center gap-3">
                  <Phone className="text-accent shrink-0" size={16} />
                  +91 - 9884398514
                </span>
                <span className="flex items-center gap-3 mt-2">
                  <Mail className="text-accent shrink-0" size={16} />
                  sathish@virtueinagency.com
                </span>
                <span className="flex items-center gap-3 mt-2">
                  <MapPin className="text-accent shrink-0" size={16} />
                  www.virtueinagency.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center mb-8">
           <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              Plan Your Event
           </Link>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Virtue IN. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="text-gray-400 hover:text-accent transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
