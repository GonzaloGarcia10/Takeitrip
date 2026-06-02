import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ExternalLink, ArrowLeft, MessageSquare } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { HotelList } from "./hotel-list";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

const cityNames: Record<string, string> = {
  paris: "París",
  roma: "Roma",
  bruselas: "Bruselas",
  tokio: "Tokio",
  "nueva-york": "Nueva York",
  barcelona: "Barcelona",
  seul: "Seúl",
  amsterdam: "Ámsterdam",
  londres: "Londres",
  berlin: "Berlín",
  praga: "Praga",
  viena: "Viena",
  lisboa: "Lisboa",
  atenas: "Atenas",
  estambul: "Estambul",
};

const cityDescriptions: Record<string, { content: string; faqs: { q: string; a: string }[] }> = {
  paris: {
    content: "París, la ciudad de la luz, es uno de los destinos más populares del mundo. Hoteles boutique en Le Marais, establecimientos de lujo cerca de la Torre Eiffel, y opciones para todos los presupuestos.",
    faqs: [
      { q: "¿Cuál es la mejor zona para alojarse en París?", a: "Le Marais, Saint-Germain-des-Prés y el Barrio Latino son las zonas más populares." },
      { q: "¿Cuánto cuesta un hotel en París?", a: "Los precios varían desde 80€ para económicos hasta 500€+ para lujo. La media está entre 120-200€." },
    ],
  },
  roma: {
    content: "Roma es una ciudad eterna llena de historia, arte y gastronomía. Los barrios de Monti, Trastevere y el Centro Histórico son ideales.",
    faqs: [
      { q: "¿Dónde dormir barato en Roma?", a: "Monti y Termini ofrecen hoteles a precios razonables bien conectados." },
      { q: "¿Es Roma cara para turistas?", a: "Moderada. Hoteles desde 70€ y restaurantes con menú desde 12€." },
    ],
  },
  bruselas: {
    content: "Bruselas combina arquitectura impresionante, gastronomía de clase mundial y una escena cultural vibrante. Grand Place y Barrio Europeo son imperdibles.",
    faqs: [
      { q: "¿Qué zona elegir en Bruselas?", a: "Grand Place y el Barrio Europeo son las mejores zonas." },
      { q: "¿Cuánto cuesta un hotel en Bruselas?", a: "Desde 80€ en temporada baja hasta 250€ en temporada alta." },
    ],
  },
  tokio: {
    content: "Tokio es una metrópoli donde la tradición milenaria se encuentra con la tecnología de vanguardia. Shinjuku, Shibuya y Asakusa ofrecen experiencias completamente distintas.",
    faqs: [
      { q: "¿Dónde alojarse en Tokio por primera vez?", a: "Shinjuku es ideal por su conexión de transporte y vida nocturna." },
      { q: "¿Cuánto cuesta un hotel en Tokio?", a: "Desde 60€ en hoteles cápsula hasta 300€+ en hoteles de lujo." },
    ],
  },
  barcelona: {
    content: "Barcelona ofrece la combinación perfecta de playa, cultura y vida nocturna. El Born, Eixample y Barceloneta son zonas imperdibles.",
    faqs: [
      { q: "¿Dónde alojarse en Barcelona?", a: "Eixample para elegancia, El Born para ambiente bohemio, Barceloneta para playa." },
      { q: "¿Es Barcelona cara para turistas?", a: "Moderada. Hoteles desde 70€, restaurantes con menú desde 12€." },
    ],
  },
};

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = cityNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `Hoteles en ${city} | Takeitrip`,
    description: `Descubre los mejores hoteles en ${city}. Recomendaciones personalizadas con IA, precios actualizados y enlaces de reserva.`,
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);

  const hotels = await prisma.hotel.findMany({
    where: {
      city: { contains: city, mode: "insensitive" },
      isActive: true,
    },
    orderBy: { rating: "desc" },
  });

  const cityInfo = cityDescriptions[slug] || {
    content: `${city} es un destino increíble con una gran variedad de hoteles. Nuestra IA puede ayudarte a encontrar el alojamiento perfecto.`,
    faqs: [],
  };

  const displayName = cityNames[slug] || city;

  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-purple-950/20 to-black" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/destinos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a destinos
        </Link>

        <div className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Hoteles en {displayName}
          </h1>
          <p className="max-w-3xl text-lg text-white/50">
            {cityInfo.content}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm text-white/40">
            <MapPin className="h-4 w-4" />
            {hotels.length} hoteles encontrados
          </div>
        </div>

        <HotelList hotels={hotels} displayName={displayName} cityInfo={cityInfo} />
      </div>
    </div>
  );
}