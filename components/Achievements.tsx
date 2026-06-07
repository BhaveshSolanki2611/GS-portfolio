'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    icon: '🥇',
    title: 'HackerRank SQL Gold Badge',
    description:
      'Awarded to top performers — demonstrating mastery of complex SQL queries, joins, subqueries, and window functions.',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.15)',
  },
  {
    icon: '🏢',
    title: 'Deloitte Data Analytics Simulation',
    description:
      "Completed Deloitte Australia's Data Analytics Virtual Experience on Forage — data cleaning, visualization, and stakeholder reporting.",
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: '📜',
    title: 'Power BI, SQL & Python Certifications',
    description:
      'Earned industry certifications across Power BI Desktop, SQL for Data Science, and Python for Data Analysis.',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.15)',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 max-w-6xl mx-auto px-4">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-500/[0.05] rounded-full blur-[100px]" />
      </div>

      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center mb-16"
      >
        <h2
          className="text-4xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: 'var(--font-sora, "Sora", sans-serif)' }}
        >
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
            Achievements &amp; Certifications
          </span>
        </h2>
        <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500" />
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
        className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="group relative bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            style={{
              boxShadow: 'none',
            }}
            whileHover={{
              y: -4,
              boxShadow: `0 8px 40px ${item.glowColor}`,
            }}
          >
            {/* Colored accent line at top */}
            <div
              className="absolute top-0 left-6 right-6 h-[2px] rounded-full"
              style={{ backgroundColor: item.accentColor }}
            />

            {/* Icon */}
            <div className="mt-2 mb-5 text-5xl">{item.icon}</div>

            {/* Title */}
            <h3
              className="text-lg font-bold text-white leading-tight mb-3"
              style={{ fontFamily: 'var(--font-sora, "Sora", sans-serif)' }}
            >
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 leading-relaxed">
              {item.description}
            </p>

            {/* Bottom accent dot */}
            <div className="mt-5 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: item.accentColor }}
              />
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Verified
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
