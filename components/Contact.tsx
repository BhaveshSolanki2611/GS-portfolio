'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Github, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'gracysingh0601@gmail.com',
    href: 'mailto:gracysingh0601@gmail.com',
    external: false,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 8595795022',
    href: 'tel:+918595795022',
    external: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/GracySingh2003',
    href: 'https://github.com/GracySingh2003',
    external: true,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'New Delhi, India',
    href: null,
    external: false,
  },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const inputClasses =
  'w-full bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:border-[#6366F1] focus:ring-1 focus:ring-[#6366F1] outline-none transition-all duration-200';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError(null);
  };

  const validate = (): string | null => {
    if (!formData.name.trim()) return 'Please enter your name.';
    if (!formData.email.trim()) return 'Please enter your email.';
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address.';
    if (!formData.subject.trim()) return 'Please enter a subject.';
    if (!formData.message.trim()) return 'Please enter a message.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/[0.07] rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-violet-500/[0.05] rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-sora, "Sora", sans-serif)' }}
          >
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <div className="mt-4 mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          {/* LEFT — Contact Info Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col gap-4"
          >
            {contactInfo.map((item) => {
              const Icon = item.icon;
              const content = (
                <motion.div
                  variants={itemVariants}
                  key={item.label}
                  className="group relative bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-xl p-4 flex items-center gap-4 transition-all duration-300 hover:bg-[#0D1220] hover:border-white/20 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)]"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-indigo-500/[0.04] to-violet-500/[0.04]" />

                  <div className="relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="relative">
                    <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                    <p className="text-white text-sm sm:text-base mt-0.5 break-all">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              );

              if (item.href) {
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? '_blank' : undefined}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return content;
            })}
          </motion.div>

          {/* RIGHT — Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 12,
                      delay: 0.2,
                    }}
                  >
                    <CheckCircle className="w-16 h-16 text-emerald-400 mb-4" />
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-white text-lg font-semibold text-center"
                  >
                    Thank you! I&apos;ll get back to you soon.
                  </motion.p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-[#0D1220]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col gap-4"
                  noValidate
                >
                  {/* Name */}
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />

                  {/* Email */}
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />

                  {/* Subject */}
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                  />

                  {/* Message */}
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />

                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-red-400 text-sm"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
