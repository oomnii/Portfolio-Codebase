import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";
import AnimatedBackground from "@/components/animated-background";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://omseth.vercel.app";
const siteDescription =
  "Portfolio of Om Seth, an AI data training specialist and software developer building NLP systems, full-stack applications, and self-hosted infrastructure.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Om Seth - AI/ML & Full-Stack Developer",
    template: "%s - Om Seth",
  },
  description: siteDescription,
  keywords: [
    "Om Seth",
    "AI ML Developer",
    "Full-Stack Developer",
    "Software Developer",
    "Natural Language Processing",
    "FastAPI",
    "React",
    "Machine Learning",
    "Competitive Programming",
    "Portfolio",
  ],
  authors: [{ name: "Om Seth" }],
  creator: "Om Seth",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Om Seth - AI/ML & Full-Stack Developer",
    description: siteDescription,
    siteName: "Om Seth Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Seth - AI/ML & Full-Stack Developer",
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AnimatedBackground />
          <Header />
          {/* pointer-events-none lets mouse hover/press reach the fixed 3D
              keyboard behind transparent sections; interactive children
              (buttons, links, footer, opaque sections) re-enable events. */}
          <div className="relative z-10 pointer-events-none">
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
