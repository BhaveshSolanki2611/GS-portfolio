"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import RainbowCursor from "@/components/RainbowCursor";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

// Dynamic import for Three.js particle background (SSR-safe)
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading screen
    const timer = setTimeout(() => setIsLoading(false), 800);

    // Back to top button visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: "#080B14" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div className="flex flex-col items-center gap-6">
              {/* Logo */}
              <motion.div
                className="text-6xl md:text-8xl font-bold font-sora"
                style={{
                  background:
                    "linear-gradient(135deg, #6366F1, #06B6D4, #A855F7)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                GS
              </motion.div>

              {/* Loading bar */}
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #6366F1, #06B6D4, #A855F7)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.3, ease: "easeInOut" }}
                />
              </div>

              {/* Loading text */}
              <motion.p
                className="text-sm text-gray-500 tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading Portfolio
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rainbow Cursor Effect */}
      <RainbowCursor />

      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* About Section */}
        <About />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Skills Section */}
        <Skills />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Experience Section */}
        <Experience />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Projects Section */}
        <Projects />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Achievements Section */}
        <Achievements />

        {/* Section Divider */}
        <div className="section-divider" />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-shadow duration-300"
            style={{
              background: "linear-gradient(135deg, #6366F1, #A855F7)",
            }}
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
