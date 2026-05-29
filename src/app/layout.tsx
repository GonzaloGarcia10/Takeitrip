import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
    "Tu asistente de viajes inteligente. Recomendaciones personalizadas de hoteles con inteligencia artificial y enlaces de Booking.com.",
  keywords: [
    "hoteles",
    "viajes",
    "inteligencia artificial",
    "booking",
    "alojamiento",
    "recomendaciones",
    "travel assistant",
  ],
  authors: [{ name: "Takeitrip" }],
  creator: "Takeitrip",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Takeitrip",
    title: "Takeitrip - Recomendaciones de Hoteles con IA",
    description:
      "Tu asistente de viajes inteligente. Recomendaciones personalizadas de hoteles con inteligencia artificial.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Takeitrip",
    description: "Recomendaciones de hoteles con inteligencia artificial",
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
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
