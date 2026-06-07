'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Github, Linkedin, Mail, Download, ArrowRight } from 'lucide-react';

/* ─── Typewriter roles ─── */
const ROLES = [
  'Data Analyst',
  'SQL Expert',
  'Power BI Developer',
  'Python Enthusiast',
  'ML Graduate',
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 55;
const PAUSE_AFTER_TYPING = 1800;
const PAUSE_AFTER_DELETING = 400;

/* ─── Orbiting skill badges config ─── */
const ORBIT_SKILLS = [
  { label: 'SQL', icon: '🗃️', speed: 20, startOffset: 0 },
  { label: 'Python', icon: '🐍', speed: 28, startOffset: 90 },
  { label: 'Power BI', icon: '📊', speed: 24, startOffset: 180 },
  { label: 'Excel', icon: '📈', speed: 32, startOffset: 270 },
];

/* ─── Stats ─── */
const STATS = [
  { emoji: '📊', value: '10+', label: 'Projects' },
  { emoji: '🏆', value: '3', label: 'Certifications' },
  { emoji: '💼', value: '2', label: 'Internships' },
];

/* ─── Framer Motion Variants ─── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const slideInLeft = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', damping: 20, stiffness: 100 },
  },
};

const fadeInScale = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', damping: 18, stiffness: 80, delay: 0.4 },
  },
};

/* ═══════════════════════════════════════════════════════
   HERO COMPONENT
   ═══════════════════════════════════════════════════════ */
export default function Hero() {
  /* ── Typewriter state ── */
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting) {
      const next = currentRole.slice(0, displayText.length + 1);
      setDisplayText(next);

      if (next === currentRole) {
        setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING);
        return;
      }
    } else {
      const next = currentRole.slice(0, displayText.length - 1);
      setDisplayText(next);

      if (next === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
        setTimeout(() => {}, PAUSE_AFTER_DELETING);
        return;
      }
    }
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const speed = isDeleting ? DELETING_SPEED : TYPING_SPEED;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* ── Ambient Background Glows ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-15 blur-[100px]"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-[350px] h-[350px] rounded-full opacity-10 blur-[90px]"
          style={{
            background:
              'radial-gradient(circle, rgba(168,85,247,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:py-0">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* ════════════════════ LEFT COLUMN ════════════════════ */}
          <motion.div
            className="flex flex-col items-center text-center lg:items-start lg:text-left lg:max-w-[580px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* ── Greeting Badge ── */}
            <motion.div variants={slideInLeft}>
              <span className="inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-medium bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)] text-[#A5B4FC] backdrop-blur-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                👋 Available for Opportunities
              </span>
            </motion.div>

            {/* ── Name ── */}
            <motion.h1
              variants={slideInLeft}
              className="mt-6 text-5xl font-black leading-tight tracking-tight md:text-7xl lg:text-[5.25rem] font-sora"
            >
              <span
                className="inline-block bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                style={{
                  backgroundImage:
                    'linear-gradient(135deg, #818CF8 0%, #6366F1 20%, #06B6D4 50%, #A855F7 80%, #818CF8 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 4s ease infinite',
                  WebkitBackgroundClip: 'text',
                }}
              >
                Gracy Singh
              </span>
            </motion.h1>

            {/* ── Typewriter ── */}
            <motion.div
              variants={slideInLeft}
              className="mt-4 flex items-center gap-1 text-xl md:text-2xl font-medium text-[#94A3B8]"
            >
              <span className="text-[#64748B]">I&apos;m a&nbsp;</span>
              <span className="text-[#06B6D4]">{displayText}</span>
              <span
                className="inline-block w-[3px] h-6 md:h-7 bg-[#6366F1] rounded-sm"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </motion.div>

            {/* ── Tagline ── */}
            <motion.p
              variants={slideInLeft}
              className="mt-5 max-w-md text-base md:text-lg leading-relaxed text-[#64748B]"
            >
              Transforming raw data into strategic insights — one query at a
              time.
            </motion.p>

            {/* ── Stats Row ── */}
            <motion.div
              variants={slideInLeft}
              className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.12] bg-white/[0.07] px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/10"
                >
                  <span className="text-lg">{stat.emoji}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-white">
                      {stat.value}
                    </span>
                    <span className="text-sm text-[#94A3B8]">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div
              variants={slideInLeft}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              {/* Primary */}
              <Link
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/35"
                style={{
                  background:
                    'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #A855F7 100%)',
                }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>

              {/* Secondary — Download Resume */}
              <a
                href="/resume.pdf"
                download="Gracy_Singh_Resume.pdf"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-7 py-3.5 text-sm font-semibold text-[#CBD5E1] backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/40 hover:bg-white/[0.1] hover:text-white hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </motion.div>

            {/* ── Social Links ── */}
            <motion.div
              variants={slideInLeft}
              className="mt-8 flex items-center gap-4"
            >
              {[
                {
                  icon: Github,
                  href: 'https://github.com/GracySingh2003',
                  label: 'GitHub',
                },
                {
                  icon: Linkedin,
                  href: 'https://linkedin.com/in/gracysingh',
                  label: 'LinkedIn',
                },
                {
                  icon: Mail,
                  href: 'mailto:gracysingh0601@gmail.com',
                  label: 'Email',
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.15] bg-white/[0.06] text-[#94A3B8] backdrop-blur-sm transition-all duration-300 hover:border-[rgba(99,102,241,0.5)] hover:bg-[rgba(99,102,241,0.12)] hover:text-white hover:shadow-[0_0_24px_rgba(99,102,241,0.25)] hover:scale-110"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ════════════════════ RIGHT COLUMN — PROFILE ORB + ORBITING BADGES ════════════════════ */}
          <motion.div
            className="relative flex items-center justify-center"
            variants={fadeInScale}
            initial="hidden"
            animate="visible"
            style={{ width: '480px', height: '480px' }}
          >
            {/* Radial glow behind the orb */}
            <div
              className="absolute w-[480px] h-[480px] rounded-full opacity-40"
              style={{
                background:
                  'radial-gradient(circle, rgba(99,102,241,0.18) 0%, rgba(6,182,212,0.08) 40%, transparent 70%)',
              }}
            />

            {/* Rotating outer ring */}
            <div
              className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] rounded-full"
              style={{
                background:
                  'conic-gradient(from 0deg, #6366F1, #06B6D4, #A855F7, #6366F1)',
                animation: 'spinSlow 8s linear infinite',
                padding: '2px',
              }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{ background: '#080B14' }}
              />
            </div>

            {/* Second, larger rotating ring (reversed) */}
            <div
              className="absolute w-[330px] h-[330px] md:w-[370px] md:h-[370px] rounded-full opacity-40"
              style={{
                background:
                  'conic-gradient(from 180deg, transparent, #6366F1, transparent, #06B6D4, transparent)',
                animation: 'spinSlowReverse 12s linear infinite',
                padding: '1px',
              }}
            >
              <div
                className="h-full w-full rounded-full"
                style={{ background: '#080B14' }}
              />
            </div>

            {/* Profile image */}
            <div className="relative z-10 h-56 w-56 md:h-64 md:w-64 overflow-hidden rounded-full border-2 border-white/15 shadow-2xl shadow-indigo-500/10">
              <Image
                src="/profile.png"
                alt="Gracy Singh — Data Analyst"
                fill
                className="object-cover"
                style={{ objectPosition: 'center 15%' }}
                priority
                sizes="(max-width: 768px) 224px, 256px"
              />
              {/* Bottom fade overlay */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'linear-gradient(180deg, transparent 65%, rgba(8,11,20,0.35) 100%)',
                }}
              />
            </div>

            {/* ── Orbiting Skill Badges (rotate OUTSIDE the outer ring, hidden on mobile) ── */}
            {ORBIT_SKILLS.map((skill) => (
              <div
                key={skill.label}
                className="absolute inset-0 hidden lg:block"
                style={{
                  animation: `orbitSpin ${skill.speed}s linear infinite`,
                  animationDelay: `${-skill.startOffset / 360 * skill.speed}s`,
                }}
              >
                {/* Badge positioned at orbit radius from center */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) translateX(220px)',
                  }}
                >
                  <div
                    className="flex items-center gap-2 rounded-xl border border-white/25 bg-[#0D1220]/95 px-3.5 py-2 text-sm font-bold text-white backdrop-blur-xl whitespace-nowrap"
                    style={{
                      animation: `orbitCounterSpin ${skill.speed}s linear infinite`,
                      animationDelay: `${-skill.startOffset / 360 * skill.speed}s`,
                      boxShadow: '0 0 20px rgba(99,102,241,0.25), 0 4px 12px rgba(0,0,0,0.5)',
                    }}
                  >
                    <span className="text-base">{skill.icon}</span>
                    {skill.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase text-[#64748B]">
          Scroll
        </span>
        <div className="h-8 w-[1.5px] overflow-hidden rounded-full bg-white/10">
          <div
            className="h-3 w-full rounded-full bg-[#6366F1]"
            style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
          />
        </div>
      </motion.div>

      {/* ══════════════════════ INLINE KEYFRAMES ══════════════════════ */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spinSlowReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes scrollPulse {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(200%); }
          100% { transform: translateY(-100%); }
        }

        /* ── Orbit: the CONTAINER spins clockwise ── */
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Counter-rotate: keeps the BADGE text upright while orbiting ── */
        @keyframes orbitCounterSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
}
