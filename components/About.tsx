'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

function AnimatedCGPA({ target = 7.53 }: { target?: number }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const duration = 2000;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(eased * target);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="text-2xl font-bold font-heading bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
      {value.toFixed(2)}
    </span>
  );
}

const quickFacts = [
  { icon: '📍', text: 'New Delhi, India' },
  { icon: '📧', text: 'gracysingh0601@gmail.com' },
  { icon: '📱', text: '+91 8595795022' },
  { icon: '🐙', text: 'github.com/GracySingh2003' },
];

export default function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.1) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-[var(--text-primary)] mb-4">
            About Me
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
        </motion.div>

        {/* Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* LEFT — Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="text-[#94A3B8] leading-relaxed text-lg">
              I&apos;m <span className="text-[var(--text-primary)] font-semibold">Gracy Singh</span>, a B.Tech graduate in Electronics, Communication &amp; AI/ML from{' '}
              <span className="text-indigo-400 font-medium">Netaji Subhas University of Technology (NSUT)</span>, Delhi.
              I specialize in turning complex datasets into clear, actionable business insights using SQL, Python, and Power BI.
              With hands-on experience at{' '}
              <span className="text-cyan-400 font-medium">WorldQuant Brain</span> and{' '}
              <span className="text-cyan-400 font-medium">TechnoData Analytics</span>, I bridge the gap between raw data and strategic decisions.
            </p>
          </motion.div>

          {/* RIGHT — Education Card + Quick Facts */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Education Card */}
            <div className="group relative bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] hover:border-white/20">
              {/* Subtle gradient accent line on top */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="flex items-start gap-4">
                <span className="text-3xl mt-1 shrink-0">🎓</span>
                <div className="space-y-2">
                  <h3 className="text-[var(--text-primary)] font-heading font-semibold text-lg">
                    Netaji Subhas University of Technology
                  </h3>
                  <p className="text-[#94A3B8] text-sm">
                    B.Tech — Electronics, Communication Engineering + AI/ML
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
                    <span>2021 – 2025</span>
                    <span className="text-white/20">|</span>
                    <span className="flex items-center gap-2">
                      CGPA: <AnimatedCGPA /> <span className="text-[var(--text-muted)]">/ 10</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Facts Pills */}
            <div className="flex flex-wrap gap-3">
              {quickFacts.map((fact, i) => (
                <motion.div
                  key={fact.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-2 bg-[#0D1220]/80 border border-white/10 rounded-full px-4 py-2 text-sm text-[#94A3B8] hover:bg-[#0D1220] hover:border-white/20 transition-all duration-300 cursor-default"
                >
                  <span>{fact.icon}</span>
                  <span>{fact.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
