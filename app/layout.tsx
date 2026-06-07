import type { Metadata, Viewport } from "next";
import { Sora, DM_Sans } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080B14",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://gracy-portfolio-fawn.vercel.app"),
  title: "Gracy Singh | Data Analyst Portfolio",
  description:
    "B.Tech ECE+AI/ML graduate from NSUT. Data Analyst specializing in SQL, Python, Power BI, and Excel. Available for data analytics roles.",
  keywords: [
    "data analyst",
    "SQL",
    "Power BI",
    "Python",
    "portfolio",
    "Gracy Singh",
    "data analytics",
    "business intelligence",
    "NSUT",
    "data visualization",
  ],
  authors: [{ name: "Gracy Singh" }],
  creator: "Gracy Singh",
  openGraph: {
    title: "Gracy Singh | Data Analyst Portfolio",
    description: "Turning raw data into strategic business insights.",
    url: "https://gracysingh.dev",
    siteName: "Gracy Singh Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Gracy Singh - Data Analyst Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gracy Singh | Data Analyst Portfolio",
    description: "Turning raw data into strategic business insights.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
