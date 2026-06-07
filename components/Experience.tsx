'use client';

import { motion } from 'framer-motion';

const experiences = [
  {
    company: 'WorldQuant Brain',
    role: 'Research Consultant (Remote)',
    date: 'May 2025 – July 2025',
    emoji: '🧠',
    bullets: [
      'Built and simulated 100+ quantitative trading alphas using price/volume and cross-sectional data operators (rank, delay, ts_mean) across US equity markets.',
      'Submitted 10+ alphas through full simulation pipeline — Sharpe, Fitness, Turnover, Drawdown checks — iterating on signal logic to improve metrics and reduce correlation with existing alpha universe.',
    ],
    tags: ['Python', 'Quantitative Finance', 'Alpha Research', 'Data Operators'],
  },
  {
    company: 'TechnoData Analytics',
    role: 'Data Analytics ETL Intern',
    date: 'August 2025 – October 2025',
    emoji: '📊',
    bullets: [
      'Built ETL pipelines on superstore transactional data using Pandas — cleaned, transformed, and validated raw records for downstream business reporting.',
      'Developed Power BI dashboards monitoring sales and inventory KPIs; standardized datasets to streamline recurring reporting cycles.',
    ],
    tags: ['Python', 'Pandas', 'ETL', 'Power BI', 'SQL'],
  },
];

const tagColors = [
  'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
  'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
  'bg-violet-500/15 text-violet-300 border-violet-500/25',
  'bg-amber-500/15 text-amber-300 border-amber-500/25',
  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.03] blur-[120px]" />
        </div>

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-sora text-[#F1F5F9]">
            Professional Experience
          </h2>
          <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px bg-gradient-to-b from-indigo-500/60 via-cyan-400/40 to-violet-500/60" />

          {/* Glowing overlay on the line */}
          <div
            className="absolute top-0 bottom-0 left-4 md:left-1/2 w-px"
            style={{
              boxShadow: '0 0 8px rgba(99,102,241,0.3), 0 0 20px rgba(6,182,212,0.15)',
            }}
          />

          {experiences.map((exp, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={index}
                className={`relative mb-16 last:mb-0 md:flex ${
                  isEven ? 'md:flex-row-reverse' : 'md:flex-row'
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 z-10">
                  <div className="relative w-5 h-5">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
                    <div
                      className="absolute inset-0 rounded-full bg-indigo-500"
                      style={{
                        animation: 'timeline-pulse 2.5s ease-in-out infinite',
                      }}
                    />
                    {/* Inner white dot */}
                    <div className="absolute inset-[3px] rounded-full bg-[#080B14]" />
                    <div className="absolute inset-[5px] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                  </div>
                </div>

                {/* Spacer for the other side (desktop) */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 60 : -60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                >
                  <div className="group relative rounded-2xl border border-white/10 bg-[#0D1220]/80 backdrop-blur-xl p-6 transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_0_40px_rgba(99,102,241,0.1)] hover:-translate-y-1">
                    {/* Top accent line */}
                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                    {/* Corner glow on hover */}
                    <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

                    <div className="relative z-10">
                      {/* Company Name with emoji */}
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-2xl">{exp.emoji}</span>
                        <h3 className="text-xl font-bold font-sora bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                          {exp.company}
                        </h3>
                      </div>

                      {/* Role */}
                      <p className="text-[#F1F5F9] font-medium text-base mt-1">
                        {exp.role}
                      </p>

                      {/* Date */}
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-[#64748B]">
                        <span>📅</span>
                        {exp.date}
                      </p>

                      {/* Bullets */}
                      <ul className="mt-4 space-y-3">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-3 text-sm text-[#94A3B8] leading-relaxed">
                            <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400" />
                            {bullet}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags */}
                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`rounded-full border px-3 py-1 text-xs font-medium ${
                              tagColors[tIdx % tagColors.length]
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Inline keyframes for timeline pulse */}
        <style jsx>{`
          @keyframes timeline-pulse {
            0%,
            100% {
              box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.5);
            }
            50% {
              box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
