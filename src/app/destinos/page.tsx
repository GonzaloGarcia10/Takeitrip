import type { Metadata } from "next";
import { DestinosClient } from "./DestinosClient";

export const metadata: Metadata = {
  title: "Blog de Viajes - Guías de Destinos | Takeitrip",
  description: "Descubre los mejores destinos con guías completas sobre qué ver, dónde comer y qué hacer en cada ciudad. Hoteles recomendados, itinerarios y consejos de viaje.",
  keywords: [
    "destinos viaje",
    "guías viaje",
    "blog viajes",
    "hoteles",
    "itinerarios",
    "consejos viaje",
    "ciudades europeas",
    "viajar barato",
    "planificar viaje",
    "destinos turísticos",
  ],
  alternates: {
    canonical: "/destinos",
  },
  openGraph: {
    title: "Blog de Viajes - Guías de Destinos | Takeitrip",
    description: "Descubre los mejores destinos con guías completas sobre qué ver, dónde comer y qué hacer en cada ciudad.",
    type: "website",
    locale: "es_ES",
    url: "https://takeitrip.es/destinos",
    siteName: "Takeitrip",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Blog de Viajes - Takeitrip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Viajes | Takeitrip",
    description: "Guías completas de destinos turísticos con recomendaciones de hoteles",
    images: ["/og-image.svg"],
  },
};

export default function DestinosPage() {
  return <DestinosClient />;
}