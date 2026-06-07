# Gracy Singh — Data Analyst Portfolio

A world-class, production-grade portfolio website built with **Next.js 14**, **Tailwind CSS**, **Framer Motion**, and **Three.js**.

## ✨ Features

- **3D Particle Background** — Interactive Three.js particle system
- **Smooth Animations** — Framer Motion scroll-triggered entrances, hover effects, and micro-interactions
- **Typewriter Effect** — Dynamic role cycling in the hero section
- **Orbiting Skill Badges** — CSS-animated badges orbiting the profile photo
- **Interactive Project Cards** — 3D tilt effect with category filtering
- **Glassmorphism UI** — Dark-mode glass cards with gradient accents
- **Working Contact Form** — Nodemailer-powered email via Next.js API route
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **SEO Optimized** — Open Graph, Twitter cards, structured metadata

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Custom CSS |
| Animations | Framer Motion |
| 3D Effects | Three.js (@react-three/fiber) |
| Icons | Lucide React |
| Email | Nodemailer |
| Language | TypeScript |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local
# Edit .env.local with your SMTP credentials

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages & layout
│   ├── api/contact/      # Contact form API endpoint
│   ├── globals.css        # Global styles & design system
│   ├── layout.tsx         # Root layout with fonts & metadata
│   ├── page.tsx           # Main page composition
│   └── icon.svg           # GS favicon
├── components/           # React components
│   ├── Hero.tsx           # Hero section with orb & typewriter
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills with tabbed categories
│   ├── Experience.tsx     # Timeline experience cards
│   ├── Projects.tsx       # Filterable project grid
│   ├── Achievements.tsx   # Achievement cards
│   ├── Contact.tsx        # Contact form
│   ├── Navbar.tsx         # Navigation bar
│   ├── Footer.tsx         # Footer
│   ├── ParticleBackground.tsx  # Three.js particles
│   └── RainbowCursor.tsx  # Custom cursor effect
├── lib/                  # Data & utilities
│   └── projects.ts        # Project data
└── public/               # Static assets
    ├── profile.png        # Profile photo
    ├── resume.pdf         # Downloadable resume
    └── projects/          # Project thumbnails
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by Gracy Singh
