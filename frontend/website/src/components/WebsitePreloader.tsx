"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

/* ─── Letter-by-letter split helper ─── */
function SplitText({
  text,
  className,
  baseDelay = 0,
  stagger = 0.045,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
  stagger?: number;
}) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: baseDelay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

/* ─── Animated counter ─── */
function AnimatedCounter({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 0.15, ease: "easeOut" });
    const unsubscribe = rounded.on("change", setDisplay);
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, motionVal, rounded]);

  return <>{display}</>;
}

/* ─── Floating ambient particle ─── */
function Particle({
  x,
  y,
  size,
  delay,
  duration,
  opacity,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-[#FFB800] pointer-events-none"
      style={{ left: x, top: y, width: size, height: size }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, opacity, 0],
        scale: [0, 1, 0.6],
        y: [0, -40, -80],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatDelay: 1.5,
        ease: "easeOut",
      }}
    />
  );
}

/* ─── Rotating arc ring ─── */
function RotatingRing() {
  return (
    <motion.div
      className="absolute -inset-5 rounded-full pointer-events-none"
      style={{
        border: "1px solid transparent",
        borderTopColor: "rgba(255,184,0,0.5)",
        borderRightColor: "rgba(255,184,0,0.15)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
    />
  );
}

function RotatingRingReverse() {
  return (
    <motion.div
      className="absolute -inset-9 rounded-full pointer-events-none"
      style={{
        border: "1px solid transparent",
        borderBottomColor: "rgba(255,184,0,0.3)",
        borderLeftColor: "rgba(255,184,0,0.08)",
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
  );
}

/* ─── PARTICLES config ─── */
const PARTICLES = [
  { x: "10%", y: "70%", size: 3, delay: 0.2, duration: 3.5, opacity: 0.6 },
  { x: "20%", y: "55%", size: 2, delay: 1.1, duration: 4.0, opacity: 0.4 },
  { x: "80%", y: "65%", size: 4, delay: 0.5, duration: 3.2, opacity: 0.5 },
  { x: "88%", y: "40%", size: 2, delay: 1.8, duration: 4.5, opacity: 0.35 },
  { x: "50%", y: "80%", size: 3, delay: 0.8, duration: 3.8, opacity: 0.45 },
  { x: "35%", y: "20%", size: 2, delay: 2.0, duration: 4.2, opacity: 0.3 },
  { x: "65%", y: "18%", size: 3, delay: 0.3, duration: 3.6, opacity: 0.4 },
  { x: "5%",  y: "30%", size: 2, delay: 1.5, duration: 5.0, opacity: 0.25 },
  { x: "92%", y: "75%", size: 2, delay: 0.9, duration: 3.9, opacity: 0.3 },
  { x: "45%", y: "90%", size: 4, delay: 1.3, duration: 4.1, opacity: 0.5 },
];

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
export default function WebsitePreloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "done" | "exit">(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("virtue_preloader_seen")) {
      return "exit";
    }
    return "loading";
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("virtue_preloader_seen")) {
      setPhase("exit");
      return;
    }

    // Snappy, high-performance loading duration: ~750ms total
    const TOTAL = 750; // ms
    const TICK = 16;
    let elapsed = 0;

    intervalRef.current = setInterval(() => {
      elapsed += TICK;
      const t = Math.min(elapsed / TOTAL, 1);
      // Ease-in-out cubic: fast start, smooth middle, quick finish
      const eased =
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      const next = Math.round(eased * 100);
      setProgress(next);

      if (t >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        try {
          window.sessionStorage.setItem("virtue_preloader_seen", "true");
        } catch {}
        setTimeout(() => setPhase("done"), 50);
        setTimeout(() => setPhase("exit"), 180);
      }
    }, TICK);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const isVisible = phase !== "exit";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader-root"
          className="fixed inset-0 z-[99999] select-none pointer-events-auto overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* ── Deep dark background ── */}
          <div className="absolute inset-0 bg-[#07090F]" />

          {/* ── Radial vignette ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 0%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* ── Gold ambient glow center ── */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,184,0,0.12) 0%, rgba(255,184,0,0.04) 40%, transparent 70%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Cold blue top-left glow ── */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

          {/* ── Floating particles ── */}
          {PARTICLES.map((p, i) => (
            <Particle key={i} {...p} />
          ))}

          {/* ── Scan-line texture ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,184,0,0.013) 3px, rgba(255,184,0,0.013) 4px)",
            }}
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* ── Corner decorators ── */}
          {(["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"] as const).map(
            (pos, i) => (
              <motion.div
                key={i}
                className={`absolute ${pos} w-6 h-6 pointer-events-none`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    borderTop: i < 2 ? "1.5px solid rgba(255,184,0,0.5)" : "none",
                    borderBottom: i >= 2 ? "1.5px solid rgba(255,184,0,0.5)" : "none",
                    borderLeft: i % 2 === 0 ? "1.5px solid rgba(255,184,0,0.5)" : "none",
                    borderRight: i % 2 === 1 ? "1.5px solid rgba(255,184,0,0.5)" : "none",
                  }}
                />
              </motion.div>
            )
          )}

          {/* ═══════════════ CENTER CONTENT ═══════════════ */}
          <div className="relative z-20 flex flex-col items-center justify-center h-full px-6">

            {/* ── Logo mark ── */}
            <motion.div
              className="relative mb-10"
              initial={{ scale: 0.4, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <RotatingRing />
              <RotatingRingReverse />

              {/* Outer glow pulse */}
              <motion.div
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(255,184,0,0.25) 0%, transparent 70%)",
                }}
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Logo box */}
              <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-b from-[#1C2333] to-[#0D1120] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,184,0,0.15)] flex items-center justify-center overflow-hidden">
                {/* Inner shimmer sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)",
                  }}
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, delay: 0.8, repeat: Infinity, repeatDelay: 3 }}
                />
                <span className="text-4xl font-black text-white italic tracking-tighter z-10 select-none">
                  V
                </span>
                <motion.span
                  className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#FFB800]"
                  style={{ boxShadow: "0 0 10px #FFB800, 0 0 20px rgba(255,184,0,0.5)" }}
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 0.85, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>

            {/* ── Brand name — letter by letter ── */}
            <div className="mb-2 text-center overflow-hidden">
              <div className="flex items-center justify-center gap-0 text-3xl sm:text-4xl font-black tracking-tight leading-none">
                <SplitText text="V-RTUE" className="text-white" baseDelay={0.4} stagger={0.055} />
                <SplitText text=" IN" className="text-white ml-2" baseDelay={0.72} stagger={0.055} />
                <motion.span
                  className="text-[#FFB800] text-4xl sm:text-5xl leading-none ml-0.5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.4, type: "spring", stiffness: 400 }}
                  style={{ textShadow: "0 0 20px rgba(255,184,0,0.7)" }}
                >
                  .
                </motion.span>
              </div>
            </div>

            {/* ── Subtitle tagline ── */}
            <motion.p
              className="text-[10px] sm:text-[11px] font-bold italic tracking-[0.38em] uppercase mb-10"
              style={{ color: "rgba(255,184,0,0.55)" }}
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.38em" }}
              transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
            >
              Virtue IN Agency
            </motion.p>

            {/* ── Divider ── */}
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-transparent via-[#FFB800]/40 to-transparent mb-8"
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            />

            {/* ── Progress bar ── */}
            <motion.div
              className="flex flex-col items-center w-64 sm:w-72"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <div className="w-full h-[2px] bg-white/[0.06] rounded-full overflow-visible relative">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #D97706, #FFB800, #FDE68A)",
                    boxShadow: "0 0 14px rgba(255,184,0,0.8), 0 0 30px rgba(255,184,0,0.3)",
                  }}
                  transition={{ ease: "easeOut", duration: 0.08 }}
                />
                {/* Leading glow dot */}
                {progress > 0 && progress < 100 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#FFB800] -translate-x-1/2"
                    style={{
                      left: `${progress}%`,
                      boxShadow: "0 0 8px #FFB800, 0 0 20px rgba(255,184,0,0.6)",
                    }}
                    transition={{ ease: "easeOut", duration: 0.08 }}
                  />
                )}
              </div>

              <div className="w-full flex items-center justify-between mt-3 px-0.5">
                <span className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.22em] text-gray-500">
                  Loading Experience
                </span>
                <span
                  className="text-[12px] font-mono font-bold tabular-nums"
                  style={{ color: "#FFB800", textShadow: "0 0 8px rgba(255,184,0,0.5)" }}
                >
                  <AnimatedCounter value={progress} />%
                </span>
              </div>
            </motion.div>

            {/* ── Done flash ── */}
            <AnimatePresence>
              {phase === "done" && (
                <motion.div
                  key="done-flash"
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.12, 0] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background:
                      "radial-gradient(ellipse at center, #FFB800 0%, transparent 60%)",
                  }}
                />
              )}
            </AnimatePresence>
          </div>

          {/* ── Bottom tagline ── */}
          <motion.p
            className="absolute bottom-7 left-0 right-0 text-center text-[9px] sm:text-[10px] font-semibold tracking-[0.28em] text-gray-600 uppercase pointer-events-none"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            Extraordinary Corporate Experiences
          </motion.p>

          {/* ── Top gold bar ── */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#FFB800]/60 to-transparent pointer-events-none"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "40%", opacity: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
