'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ── Scroll detection for background + progress bar ───────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ── Intersection Observer for active section highlight ───────────
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Smooth scroll handler ────────────────────────────────────────
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      setMobileOpen(false);
    },
    []
  );

  // ── Framer Motion variants ──────────────────────────────────────
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: { duration: 0.35, ease: 'easeInOut', staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.25, ease: 'easeInOut' },
    },
  };

  const mobileLinkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.15 } },
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080B14]/80 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Logo ─────────────────────────────────────────────── */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="relative z-10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              className="text-2xl font-bold"
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
          </motion.a>

          {/* ── Desktop nav links ────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative group px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive ? 'text-[#6366F1]' : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                  }`}
                  style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
                >
                  {link.label}
                  {/* Underline slide-in effect */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}

            {/* ── Hire Me CTA ──────────────────────────────────── */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="ml-4 relative inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white rounded-full overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          </div>

          {/* ── Mobile hamburger button ──────────────────────────── */}
          <motion.button
            className="md:hidden relative z-10 p-2 text-[#F1F5F9] hover:text-[#6366F1] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* ── Mobile menu panel ─────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden overflow-hidden bg-[#0D1220]/95 backdrop-blur-xl border-t border-white/5"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    variants={mobileLinkVariants}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                      isActive
                        ? 'text-[#6366F1] bg-[rgba(99,102,241,0.1)]'
                        : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-white/5'
                    }`}
                    style={{ fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif' }}
                  >
                    {link.label}
                  </motion.a>
                );
              })}

              {/* Mobile Hire Me CTA */}
              <motion.a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                variants={mobileLinkVariants}
                className="block mt-3 text-center px-6 py-3 text-sm font-semibold text-white rounded-full transition-shadow duration-300 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                style={{
                  background: 'linear-gradient(135deg, #6366F1, #A855F7)',
                  fontFamily: 'var(--font-dm-sans), DM Sans, sans-serif',
                }}
              >
                Hire Me
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Scroll progress bar ───────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent">
        <motion.div
          className="h-full"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(90deg, #6366F1, #06B6D4, #A855F7)',
          }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </nav>
  );
}
