"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || mobileMenuOpen
          ? "bg-[#0F172A]/95 backdrop-blur-md border-b border-white/[0.08] py-4 shadow-lg"
          : "bg-transparent py-6"
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container mx-auto px-5 md:px-12 flex justify-between items-center max-w-7xl">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <Image
              src="/logo.png"
              alt="Virtue IN"
              width={160}
              height={39}
              className="h-8 md:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-colors duration-200 relative group ${pathname === link.href
                  ? "text-[#FFB800]"
                  : "text-gray-300 hover:text-white"
                  }`}
              >
                {link.name}
                {/* Active underline */}
                <span
                  className={`absolute bottom-[0px] left-0 h-[2px] bg-[#FFB800] transition-all duration-300 w-full origin-left ${pathname === link.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full text-gray-900 font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_20px_-6px_rgba(255,255,255,0.5)]"
              style={{ background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)" }}
            >
              PLAN YOUR EVENT
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl border border-white/10 text-white hover:border-[#FFFFFF]/50 transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:hidden fixed inset-0 z-40 bg-[#0F172A]/98 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10"
          >
            {/* Nav links */}
            <div className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 border-b border-white/[0.06] text-2xl font-black tracking-tight transition-colors duration-200 ${pathname === link.href ? "text-[#FFB800]" : "text-white"
                      }`}
                  >
                    {link.name}
                    {pathname === link.href && (
                      <span className="w-2 h-2 rounded-full bg-[#FFB800]" />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* CTA + contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mt-8 flex flex-col gap-4"
            >
              <Link
                href="/contact"
                className="w-full py-4 rounded-2xl text-gray-900 font-black text-lg text-center transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg,#FFFFFF,#E2E8F0)" }}
              >
                PLAN YOUR EVENT
              </Link>
              <div className="flex justify-center gap-6 pt-2">
                <a href="tel:+917401030000" className="text-gray-500 text-sm hover:text-white transition-colors">
                  +91 74010 30000
                </a>
                <span className="text-gray-700">·</span>
                <a href="mailto:plan@virtuein.agency" className="text-gray-500 text-sm hover:text-white transition-colors">
                  plan@virtuein.agency
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
