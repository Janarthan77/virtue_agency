'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  CalendarDays,
  Settings,
  Mic,
  ClipboardCheck,
  MapPin,
  Building,
  Palette,
  Music,
  Hammer,
  Store,
  Megaphone,
  Activity,
  Globe,
  PenTool,
  Radio,
  CheckCircle2,
} from 'lucide-react'

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const ACCENT_CYCLE = ['#FFFFFF', '#FFB800', '#CBD5E1', '#34d399', '#f472b6', '#60a5fa']

const SERVICES = [
  { num: '01', title: 'End to End Event Management',       desc: 'Comprehensive management from concept to execution for all types of events.',                                      icon: CalendarDays   },
  { num: '02', title: 'End to End Event Production',       desc: 'Full-scale technical and stage production, ensuring flawless audio, visual, and lighting.',                        icon: Settings       },
  { num: '03', title: 'Conference Management – MICE',      desc: 'Expert handling of Meetings, Incentives, Conferences, and Exhibitions.',                                           icon: Mic            },
  { num: '04', title: 'Event Planning & Operations',       desc: 'Strategic planning, logistics, and operational consulting to make your events seamless.',                          icon: ClipboardCheck  },
  { num: '05', title: 'Destination Management',            desc: 'Complete travel, logistics, and localized event planning across premier destinations.',                             icon: MapPin         },
  { num: '06', title: 'Venue Sourcing',                    desc: "Finding the perfect backdrop tailored to your event's scale, style, and unique requirements.",                     icon: Building       },
  { num: '07', title: 'Décor Hire & Styling',              desc: 'Creative set designs, floral arrangements, and thematic styling for immersive environments.',                      icon: Palette        },
  { num: '08', title: 'Entertainment & Artist Management', desc: 'Curating top-tier talent, bands, speakers, and artists for captivating performances.',                             icon: Music          },
  { num: '09', title: 'Custom Build Setups',               desc: 'Bespoke structural designs, custom staging, and immersive fabrications.',                                         icon: Hammer         },
  { num: '10', title: 'Exhibition – Stall Fabrication',    desc: 'Designing and building interactive exhibition stalls and corporate booths.',                                       icon: Store          },
  { num: '11', title: 'Signage',                           desc: 'High-quality, custom event signage and branding materials for impactful visibility.',                             icon: Megaphone      },
  { num: '12', title: 'BTL Activations',                   desc: 'Below-the-line marketing activations focused on direct, meaningful consumer engagement.',                          icon: Activity       },
  { num: '13', title: 'Public Relations & Media',          desc: "Strategic PR campaigns and comprehensive media management to amplify your event's reach.",                         icon: Globe          },
  { num: '14', title: 'Creative Design & Print Media',     desc: 'Exceptional graphic design and printing services for all your event collaterals.',                                 icon: PenTool        },
  { num: '15', title: 'ATL Management',                    desc: 'Above-the-line mass media advertising and large-scale brand awareness campaigns.',                                 icon: Radio          },
]

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery',   desc: 'We deep-dive into your vision, goals, and audience to build a solid strategic foundation.' },
  { num: '02', title: 'Planning',    desc: 'Every detail is mapped—timelines, budgets, vendors, and creative direction—before a single thing moves.' },
  { num: '03', title: 'Production',  desc: 'Our on-ground team brings the blueprint to life with flawless precision and energy.' },
  { num: '04', title: 'Delivery',    desc: 'We deliver an unforgettable experience, then debrief to ensure every benchmark is met.' },
]

const STATS = [
  { value: '15+', label: 'Services'      },
  { value: '150+', label: 'Events Delivered' },
  { value: '10+',  label: 'Years of Excellence' },
]

/* ─── Animations ────────────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.55, ease: 'easeOut' } },
} as const

const stagger = {
  show: { transition: { staggerChildren: 0.08 } },
} as const

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function GoldEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <span style={{ display: 'block', width: 48, height: 2, background: 'linear-gradient(to right, transparent, #FFB800)' }} />
      <span style={{ color: '#FFB800', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
        {text}
      </span>
      <span style={{ display: 'block', width: 48, height: 2, background: 'linear-gradient(to left, transparent, #FFB800)' }} />
    </div>
  )
}

function ServiceCard({
  service,
  accentColor,
  index,
}: {
  service: (typeof SERVICES)[0]
  accentColor: string
  index: number
}) {
  const Icon = service.icon
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ scale: 1.02 }}
      style={{
        position: 'relative',
        background: '#1E293B',
        borderRadius: 20,
        border: '1px solid rgba(255,255,255,0.07)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        cursor: 'default',
      }}
      className="services-card group"
    >
      {/* top gradient accent line */}
      <span
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          borderRadius: '20px 20px 0 0',
          background: `linear-gradient(to right, ${accentColor}, ${accentColor}88)`,
        }}
      />

      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        {/* icon box */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `${accentColor}20`,
            border: `1px solid ${accentColor}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={22} style={{ color: accentColor }} />
        </div>

        {/* numbered badge */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: '#FFB800',
            background: 'rgba(255,184,0,0.1)',
            border: '1px solid rgba(255,184,0,0.25)',
            borderRadius: 8,
            padding: '3px 10px',
            letterSpacing: '0.1em',
            flexShrink: 0,
          }}
        >
          {service.num}
        </span>
      </div>

      {/* title */}
      <h3
        className="card-title"
        style={{
          fontSize: 17,
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.35,
          transition: 'color 0.25s',
        }}
      >
        {service.title}
      </h3>

      {/* description */}
      <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, flexGrow: 1 }}>
        {service.desc}
      </p>

      {/* cta link */}
      <Link
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 13,
          fontWeight: 700,
          color: accentColor,
          textDecoration: 'none',
          marginTop: 4,
          transition: 'gap 0.2s',
        }}
        className="card-cta"
      >
        Get in Touch <ArrowRight size={14} />
      </Link>

      <style jsx>{`
        .services-card:hover {
          border-color: rgba(255,255,255, 0.4) !important;
          box-shadow: 0 0 32px rgba(255,255,255, 0.18), 0 8px 40px rgba(0, 0, 0, 0.4) !important;
        }
        .services-card:hover .card-title {
          color: #FFB800 !important;
        }
        .services-card:hover .card-cta {
          gap: 10px !important;
        }
      `}</style>
    </motion.div>
  )
}

function ProcessCard({ step, index }: { step: (typeof PROCESS_STEPS)[0]; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      style={{
        flex: 1,
        minWidth: 0,
        background: 'rgba(15,23,42,0.6)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 20,
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '1rem',
      }}
    >
      {/* gradient circle */}
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFFFFF, #CBD5E1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 20,
          fontWeight: 900,
          color: '#0F172A',
          letterSpacing: '0.05em',
          boxShadow: '0 0 24px rgba(255,255,255,0.4)',
          flexShrink: 0,
        }}
      >
        {step.num}
      </div>

      <div>
        <h4 style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 8 }}>
          {step.title}
        </h4>
        <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.65 }}>{step.desc}</p>
      </div>
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function ServicesPage() {
  return (
    <main style={{ background: '#0F172A', color: '#fff', fontFamily: 'inherit', overflowX: 'hidden' }}>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          background: '#0F172A',
          paddingTop: '7rem',
          paddingBottom: '5rem',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* glow blobs */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: 700, height: 500,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden
          style={{
            position: 'absolute', bottom: 0, right: '-10%',
            width: 400, height: 400,
            background: 'radial-gradient(ellipse at center, rgba(255,184,0,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 780, margin: '0 auto', padding: '0 1.5rem' }}>

          <motion.div initial="hidden" animate="show" variants={stagger}>

            <motion.div variants={fadeUp}>
              <GoldEyebrow text="Our Expertise" />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                color: '#FFFFFF',
                marginBottom: '1.25rem',
              }}
            >
              Comprehensive Event{' '}
              <span style={{ color: '#FFB800' }}>Services</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#94a3b8',
                lineHeight: 1.75,
                maxWidth: 600,
                margin: '0 auto 3rem',
              }}
            >
              From intimate gatherings to grand-scale productions, Virtue Agency delivers
              end-to-end event solutions crafted with precision, creativity, and unmatched
              attention to detail.
            </motion.p>

            {/* stat row */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '2rem 4rem',
              }}
            >
              {STATS.map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                      fontWeight: 900,
                      background: 'linear-gradient(135deg, #FFB800, #ffd76b)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      lineHeight: 1.1,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4, letterSpacing: '0.08em', fontWeight: 600 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────────── */}
      <section style={{ background: '#0F172A', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {SERVICES.map((svc, i) => (
              <ServiceCard
                key={svc.num}
                service={svc}
                accentColor={ACCENT_CYCLE[i % ACCENT_CYCLE.length]}
                index={i}
              />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────────── */}
      <section style={{ background: '#1E293B', padding: '6rem 1.5rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* header */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <motion.div variants={fadeUp}>
              <GoldEyebrow text="Our Approach" />
            </motion.div>
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900,
                color: '#fff',
              }}
            >
              How We{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF, #CBD5E1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Work
              </span>
            </motion.h2>
          </motion.div>

          {/* steps */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            style={{
              display: 'flex',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {PROCESS_STEPS.map((step, i) => (
              <ProcessCard key={step.num} step={step} index={i} />
            ))}
          </motion.div>

        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#0F172A',
          padding: '6rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* glow */}
        <div
          aria-hidden
          style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 800, height: 400,
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <GoldEyebrow text="Let's Collaborate" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
                fontWeight: 900,
                color: '#fff',
                marginBottom: '1.25rem',
              }}
            >
              Ready to plan your{' '}
              <span style={{ color: '#FFB800' }}>next event?</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 16,
                color: '#94a3b8',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}
            >
              Let's turn your vision into an extraordinary experience. Our team is ready
              to craft something remarkable for you.
            </motion.p>

            <motion.div variants={fadeUp}>
              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'linear-gradient(135deg, #FFFFFF, #E2E8F0)',
                  color: '#0F172A',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '0.875rem 2.25rem',
                  borderRadius: 50,
                  textDecoration: 'none',
                  boxShadow: '0 0 32px rgba(255,255,255,0.35)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                className="cta-btn"
              >
                Plan Your Event <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <style jsx>{`
          .cta-btn:hover {
            transform: translateY(-2px) scale(1.04);
            box-shadow: 0 0 48px rgba(255,255,255, 0.55) !important;
          }
        `}</style>
      </section>

    </main>
  )
}
