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
  "Portfolio of Om Seth — AI Engineer & SDE. Building ML systems, full-stack apps, and competitive programming solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Om Seth — AI Engineer & SDE",
    template: "%s — Om Seth",
  },
  description: siteDescription,
  keywords: [
    "Om Seth",
    "AI Engineer",
    "SDE",
    "Machine Learning",
    "Full-Stack Developer",
    "Competitive Programming",
    "Portfolio",
  ],
  authors: [{ name: "Om Seth" }],
  creator: "Om Seth",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Om Seth — AI Engineer & SDE",
    description: siteDescription,
    siteName: "Om Seth Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Seth — AI Engineer & SDE",
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
