"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import { loginAdmin } from "@/lib/auth";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const res = loginAdmin(email, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setError(res.error || "Invalid credentials.");
        setLoading(false);
      }
    }, 400);
  };

  const handleAutoFill = () => {
    setEmail("admin@virtuein.agency");
    setPassword("VirtueIN@2025");
    setError(null);
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-4 selection:bg-amber-100 selection:text-amber-900 relative overflow-hidden">
      {/* Background Soft Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white border border-slate-200/90 rounded-2xl shadow-xl p-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-900 text-white font-bold text-lg mb-3 shadow-md">
            V
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            V-RTUE <span className="text-amber-600">IN.</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">
            Admin Suite • Executive Gateway
          </p>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Official Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@virtuein.agency"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Lead Dashboard"}
            {!loading && <ArrowRight size={15} />}
          </button>
        </form>

        {/* Demo Auto-fill Helper */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col items-center gap-2">
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-xs font-medium text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/80 px-3.5 py-1.5 rounded-lg border border-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles size={13} className="text-amber-600" />
            <span>Auto-fill Demo Credentials</span>
          </button>

          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors mt-2"
          >
            ← Back to Public Website
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
