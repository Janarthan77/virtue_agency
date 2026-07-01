"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services"
    // hasDropdown: true
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-[#1E293B]/90 backdrop-blur-md border-b border-white/20 py-4 shadow-sm" : "bg-transparent py-6"
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? "text-white" : "text-white"}`}>
            VIRTUE <span className="text-accent">IN</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname === link.href
                  ? "text-accent"
                  : isScrolled
                    ? "text-gray-200 hover:text-accent"
                    : "text-white hover:text-accent"
                  }`}
              >
                {link.name}
                {/* {link.hasDropdown && <ChevronDown className="w-4 h-4" />} */}
              </Link>

              {/* Optional Mega Menu for Services could go here */}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/contact"
            className="px-6 py-2.5 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] text-white font-bold rounded-lg transition-all duration-300 transform hover:opacity-90"
          >
            PLAN YOUR EVENT
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`md:hidden transition-colors hover:text-accent ${isScrolled ? "text-white" : "text-white"}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#1E293B]/95 backdrop-blur-lg border-b border-white/20"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold ${pathname === link.href ? "text-accent" : "text-white"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-gradient-to-r from-[#6C3EF4] to-[#9D72FF] text-white font-bold rounded-lg"
              >
                PLAN YOUR EVENT
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
