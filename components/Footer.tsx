'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/GracySingh2003',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: Linkedin,
  },
  {
    label: 'Email',
    href: 'mailto:gracysingh0601@gmail.com',
    icon: Mail,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export default function Footer() {
  return (
    <footer className="relative bg-[#080B14]">
      {/* ── Gradient top border ──────────────────────────────────── */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* ── Top section: Logo + tagline + socials ──────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Logo + tagline */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block"
            >
              <span
                className="text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-sora), Sora, sans-serif',
                  background: 'linear-gradient(135deg, #6366F1, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                GS
              </span>
            </a>
            <p
              className="text-[#64748B] text-sm tracking-wide"
              style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
            >
              Turning Data Into Decisions
            </p>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] text-[#64748B] transition-all duration-300 hover:text-[#F1F5F9] hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.25)]"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── Navigation links ───────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className="relative group text-sm text-[#64748B] hover:text-[#F1F5F9] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 w-0 group-hover:w-full h-px bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300" />
            </a>
          ))}
        </motion.div>

        {/* ── Divider ────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8"
        />

        {/* ── Copyright ──────────────────────────────────────────── */}
        <motion.p
          variants={itemVariants}
          className="text-center text-xs text-[#64748B] tracking-wide"
          style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
        >
          © 2025 Gracy Singh. Crafted with{' '}
          <Heart
            size={12}
            className="inline-block mx-0.5 text-violet-500 fill-violet-500"
            style={{ verticalAlign: '-1px' }}
          />{' '}
          and data.
        </motion.p>
      </motion.div>

      {/* ── Subtle bottom glow ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[60px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(ellipse at center, #6366F1 0%, transparent 70%)',
        }}
      />
    </footer>
  );
}
