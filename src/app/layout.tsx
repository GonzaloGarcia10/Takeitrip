import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ConsentBanner } from "@/components/consent-banner";
import { GA4Script } from "@/lib/analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Takeitrip - Recomendaciones de Hoteles con IA",
    template: "%s | Takeitrip",
  },
  description:
    "Tu asistente de viajes inteligente. Recomendaciones personalizadas de hoteles con inteligencia artificial y precios reales de Booking.com. Sin registro, 100% gratuito.",
  keywords: [
    "hoteles",
    "viajes",
    "inteligencia artificial",
    "booking.com",
    "alojamiento",
    "recomendaciones viaje",
    "asistente travel",
    "destinos turísticos",
    "hoteles baratos",
    "viajar barato",
  ],
  authors: [{ name: "Takeitrip" }],
  creator: "Takeitrip",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://takeitrip.es"),
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://takeitrip.es",
    siteName: "Takeitrip",
    title: "Takeitrip - Recomendaciones de Hoteles con IA",
    description:
      "Encuentra tu hotel perfecto con nuestro asistente de IA. Precios reales de Booking.com, sin registro.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Takeitrip - Asistente de viajes con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takeitrip - Recomendaciones de Hoteles con IA",
    description: "Encuentra tu hotel perfecto con nuestro asistente de IA.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code-placeholder",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-black font-sans text-white antialiased" suppressHydrationWarning>
        <GA4Script />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
