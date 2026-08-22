"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldCheck, AlertCircle, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { loginAdmin, isAuthenticated, DEFAULT_ADMIN_CREDENTIALS } from "@/lib/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect straight to /admin
  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/admin");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const result = loginAdmin(email, password);
      if (result.success) {
        router.push("/admin");
      } else {
        setError(result.error || "Invalid credentials.");
        setLoading(false);
      }
    }, 500);
  };

  const handleFillDemo = () => {
    setEmail(DEFAULT_ADMIN_CREDENTIALS.email);
    setPassword(DEFAULT_ADMIN_CREDENTIALS.password);
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex flex-col justify-between relative overflow-hidden text-slate-900 selection:bg-slate-900 selection:text-white antialiased">
      
      {/* Subtle clean background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Top Bar Navigation */}
      <header className="p-6 sm:p-8 flex items-center justify-between relative z-10">
        <Link href="/" className="flex items-center gap-2 group text-slate-500 hover:text-slate-950 transition-colors text-xs font-bold">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Virtue IN Website
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-black uppercase tracking-widest text-slate-500">
            Secure Executive Portal
          </span>
        </div>
      </header>

      {/* Center Auth Card (Pure White) */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden"
        >
          {/* Top Gold Accent Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3.5px]"
            style={{ background: "linear-gradient(90deg, #0F172A 0%, #D97706 50%, #0F172A 100%)" }}
          />

          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-black uppercase tracking-widest mb-4">
              <Sparkles size={12} className="text-amber-600" /> Producer Console
            </div>

            <div className="flex justify-center mb-2">
              <span className="text-3xl font-black tracking-tight text-slate-950 uppercase">
                V-RTUE <span className="text-amber-600">IN.</span>
              </span>
            </div>

            <h1 className="text-xl font-black text-slate-950">Executive Admin Portal</h1>
            <p className="text-slate-500 text-xs mt-1">
              Sign in to manage corporate enquiries, live leads &amp; Resend dispatch.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5"
            >
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2">
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@virtuein.agency"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-950 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-slate-950 transition-all font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-2">
                Secret Access Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-11 py-3 text-sm text-slate-950 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-slate-950 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-950 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Fill Demo */}
            <div className="flex items-center justify-between pt-1 pb-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-950">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-slate-950 focus:ring-slate-950"
                />
                Remember login
              </label>

              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
              >
                Auto-fill Demo
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-black text-sm text-white bg-slate-950 hover:bg-slate-900 flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-60 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin text-amber-400" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Admin Suite <ArrowRight size={16} className="text-amber-400" />
                </>
              )}
            </button>

          </form>

          {/* Security notice */}
          <div className="mt-7 pt-5 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
              <ShieldCheck size={14} className="text-emerald-600" /> End-to-end authenticated administrative suite
            </p>
          </div>

        </motion.div>
      </main>

      {/* Bottom Footer */}
      <footer className="p-6 text-center text-xs text-slate-400 relative z-10">
        © {new Date().getFullYear()} Virtue IN Agency. Restricted corporate administrative portal.
      </footer>

    </div>
  );
}
