'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface Category {
  label: string;
  emoji: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    label: 'Languages & Query',
    emoji: '💻',
    skills: [
      { name: 'Python', icon: '🐍', color: '#3776AB' },
      { name: 'SQL', icon: '🗃️', color: '#F29111' },
    ],
  },
  {
    label: 'Data Analysis',
    emoji: '📊',
    skills: [
      { name: 'Pandas', icon: '🐼', color: '#150458' },
      { name: 'NumPy', icon: '🔢', color: '#4DABCF' },
      { name: 'EDA', icon: '🔍', color: '#6366F1' },
      { name: 'Data Cleaning & Wrangling', icon: '🧹', color: '#06B6D4' },
      { name: 'Statistical Analysis', icon: '📊', color: '#A855F7' },
      { name: 'Feature Engineering', icon: '⚙️', color: '#F59E0B' },
    ],
  },
  {
    label: 'Visualization & BI',
    emoji: '📈',
    skills: [
      { name: 'Power BI (DAX, Power Query)', icon: '📈', color: '#F2C811' },
      { name: 'Microsoft Excel', icon: '📗', color: '#217346' },
      { name: 'Pivot Tables', icon: '🔄', color: '#217346' },
      { name: 'Power Query', icon: '⚡', color: '#217346' },
      { name: 'XLOOKUP', icon: '🔎', color: '#217346' },
      { name: 'INDEX-MATCH', icon: '🎯', color: '#217346' },
      { name: 'Conditional Formatting', icon: '🎨', color: '#217346' },
    ],
  },
  {
    label: 'Database & Modeling',
    emoji: '🗄️',
    skills: [
      { name: 'MySQL', icon: '🐬', color: '#4479A1' },
      { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
      { name: 'Relational Schema Design', icon: '🗂️', color: '#6366F1' },
      { name: 'CRUD Operations', icon: '✏️', color: '#06B6D4' },
      { name: 'CTEs', icon: '🔗', color: '#A855F7' },
      { name: 'Joins & Subqueries', icon: '🔀', color: '#F59E0B' },
      { name: 'Window Functions', icon: '🪟', color: '#EF4444' },
    ],
  },
  {
    label: 'Tools & Platforms',
    emoji: '🛠️',
    skills: [
      { name: 'Jupyter Notebook', icon: '📓', color: '#F37626' },
      { name: 'Git', icon: '🌿', color: '#F05032' },
      { name: 'GitHub', icon: '🐙', color: '#8B5CF6' },
      { name: 'VS Code', icon: '💻', color: '#007ACC' },
      { name: 'WorldQuant Brain', icon: '🧠', color: '#06B6D4' },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-sora text-[#F1F5F9] mb-4">
            Technical Skills
          </h2>
          <div className="h-1 w-24 mx-auto rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
          <p className="mt-4 text-[#64748B] max-w-lg mx-auto">
            Tools and technologies I use to transform data into insights
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map((cat, index) => (
            <button
              key={cat.label}
              onClick={() => setActiveTab(index)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === index
                  ? 'text-white bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/40'
                  : 'text-[#64748B] bg-[#0D1220]/80 border border-white/[0.08] hover:text-[#F1F5F9] hover:border-white/20'
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.label}
              {/* Active gradient underline */}
              {activeTab === index && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute -bottom-px left-4 right-4 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skill Chips Grid */}
        <div className="min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
            >
              {categories[activeTab].skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={chipVariants}
                  className="group relative bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3.5 flex items-center gap-3 cursor-default transition-all duration-300 hover:border-white/25"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: `0 0 20px ${skill.color}30`,
                    borderColor: `${skill.color}40`,
                  }}
                >
                  {/* Colored accent dot */}
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 8px ${skill.color}66`,
                    }}
                  />
                  <span className="text-base shrink-0">{skill.icon}</span>
                  <span className="text-sm text-[#CBD5E1] group-hover:text-white transition-colors duration-300 font-medium">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom stat */}
        <motion.p
          className="text-center text-[#64748B] text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {categories.reduce((acc, cat) => acc + cat.skills.length, 0)}+ tools &amp; technologies across {categories.length} domains
        </motion.p>
      </div>
    </section>
  );
}
