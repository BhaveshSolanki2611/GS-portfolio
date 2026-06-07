'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { projects, type Project } from '@/lib/projects';

/* ──────────────────────────────────────────────
   Category → SVG fallback icon mapping
   ────────────────────────────────────────────── */
const categoryIcons: Record<string, React.ReactNode> = {
  'Power BI': (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="12" width="4" height="9" rx="1" />
      <rect x="10" y="7" width="4" height="14" rx="1" />
      <rect x="17" y="3" width="4" height="18" rx="1" />
    </svg>
  ),
  SQL: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  Python: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
      <line x1="14" y1="4" x2="10" y2="20" />
    </svg>
  ),
  Excel: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <line x1="3" y1="15" x2="21" y2="15" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
};

/* ──────────────────────────────────────────────
   Filter tabs
   ────────────────────────────────────────────── */
const filters = ['All', 'SQL', 'Python', 'Power BI', 'Excel'] as const;
type FilterType = (typeof filters)[number];

/* ──────────────────────────────────────────────
   3-D Tilt hook
   ────────────────────────────────────────────── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
    transition: 'transform 0.45s cubic-bezier(.03,.98,.52,.99)',
  });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 8;
    const rotateX = ((midY - y) / midY) * 8;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      transition: 'transform 0.1s ease-out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.45s cubic-bezier(.03,.98,.52,.99)',
    });
  }, []);

  return { ref, style, handleMove, handleLeave };
}

/* ──────────────────────────────────────────────
   Project Card
   ────────────────────────────────────────────── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [imgError, setImgError] = useState(false);
  const { ref, style, handleMove, handleLeave } = useTilt();
  const [hovered, setHovered] = useState(false);

  const primaryCategory = project.category[0] as keyof typeof categoryIcons;
  const fallbackIcon = categoryIcons[primaryCategory] ?? categoryIcons['Python'];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.35 },
        y: { duration: 0.4, delay: index * 0.06 },
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        handleLeave();
        setHovered(false);
      }}
      onMouseEnter={() => setHovered(true)}
      style={{
        ...style,
        boxShadow: hovered
          ? `0 0 30px ${project.color}25, 0 0 60px ${project.color}10, inset 0 0 0 1px ${project.color}30`
          : 'none',
      }}
      className="group relative rounded-2xl overflow-hidden bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 flex flex-col will-change-transform hover:border-white/20 transition-colors duration-300"
    >
      {/* ── Image / Fallback ── */}
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        {imgError ? (
          <div
            className="flex flex-col items-center justify-center h-full w-full gap-3"
            style={{
              background: `linear-gradient(135deg, ${project.color}30, ${project.color}10)`,
            }}
          >
            <span className="text-white/60">{fallbackIcon}</span>
            <span className="text-sm font-semibold text-white/50 text-center px-4 leading-tight">
              {project.title}
            </span>
          </div>
        ) : (
          <>
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImgError(true)}
            />
            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080B14] via-transparent to-transparent opacity-60" />
          </>
        )}

        {/* colour accent bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="text-xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)] leading-tight">
          {project.title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300 font-medium tracking-wide"
            >
              {t}
            </span>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium mt-2 transition-colors duration-200"
          style={{ color: project.color }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#F1F5F9')}
          onMouseLeave={(e) => (e.currentTarget.style.color = project.color)}
        >
          View on GitHub
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Hover glow ring (decorative) */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl"
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{
          border: `1px solid ${project.color}40`,
        }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────
   Projects Section
   ────────────────────────────────────────────── */
export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category.includes(activeFilter));

  return (
    <section
      id="projects"
      className="relative py-28 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      {/* ── Background decorative blobs ── */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-20 -right-40 w-[500px] h-[500px] rounded-full bg-violet-500/[0.04] blur-[120px]" />
      </div>

      {/* ── Section Heading ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-[family-name:var(--font-heading)]">
          Featured Projects
        </h2>
        <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
        <p className="mt-5 text-[var(--text-muted)] max-w-xl mx-auto text-base">
          A curated collection of data analytics projects spanning SQL,
          Python, Power&nbsp;BI, and Excel.
        </p>
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {filters.map((f) => {
          const isActive = f === activeFilter;
          return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`
                px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
                ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20'
                    : 'bg-[#0D1220]/80 text-gray-400 border border-white/10 hover:text-white hover:bg-[#0D1220] hover:border-white/20'
                }
              `}
            >
              {f}
            </button>
          );
        })}
      </motion.div>

      {/* ── Project Cards Grid ── */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* ── Empty state ── */}
      <AnimatePresence>
        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-gray-500 mt-16 text-lg"
          >
            No projects found for this category.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
