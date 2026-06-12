import type { Metadata } from "next";
import { Suspense } from "react";
import { HomeClient } from "./HomeClient";

export const metadata: Metadata = {
  title: "Takeitrip - Recomendaciones de Hoteles con IA",
  description: "Tu asistente de viajes inteligente. Recomendaciones personalizadas de hoteles con inteligencia artificial y precios reales de Booking.com. Sin registro, 100% gratuito.",
  keywords: ["hoteles", "viajes", "inteligencia artificial", "booking.com", "alojamiento", "recomendaciones viaje", "asistente travel"],
  authors: [{ name: "Takeitrip" }],
  openGraph: {
    title: "Takeitrip - Recomendaciones de Hoteles con IA",
    description: "Encuentra tu hotel perfecto con nuestro asistente de IA. Precios reales de Booking.com, sin registro.",
    type: "website",
    locale: "es_ES",
    url: "https://takeitrip.es",
    siteName: "Takeitrip",
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
    title: "Takeitrip",
    description: "Encuentra tu hotel perfecto con nuestro asistente de IA",
    images: ["/og-image.svg"],
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <HomeClient />
    </Suspense>
  );
}