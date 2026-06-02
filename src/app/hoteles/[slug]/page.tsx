import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Star, ExternalLink, ArrowLeft, MessageSquare, Wifi, Coffee, Car } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";

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
        {/* Back Button */}
        <Link
          href="/destinos"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a destinos
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
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
        </motion.div>

        {/* Hotels Grid */}
        {hotels.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((hotel, index) => (
              <motion.article
                key={hotel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={hotel.imageUrl}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {hotel.rating}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-2 text-lg font-bold text-white">{hotel.name}</h3>
                  <p className="mb-3 flex items-center gap-1.5 text-sm text-white/50">
                    <MapPin className="h-3.5 w-3.5" />
                    {hotel.zone}, {hotel.city}
                  </p>
                  <p className="mb-5 line-clamp-2 text-sm text-white/40">{hotel.description}</p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <span className="text-2xl font-bold text-white">€{hotel.pricePerNight}</span>
                      <span className="text-sm text-white/40"> / noche</span>
                    </div>
                    <a
                      href={hotel.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25"
                    >
                      Reservar
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
              <MapPin className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              No se encontraron hoteles
            </h3>
            <p className="mb-6 text-white/50">
              Prueba a preguntar a nuestro asistente de IA para obtener recomendaciones personalizadas.
            </p>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <MessageSquare className="mr-2 h-4 w-4" />
                Preguntar a la IA
              </Button>
            </Link>
          </div>
        )}

        {/* FAQ Section */}
        {cityInfo.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-white">
              Preguntas frecuentes sobre {displayName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {cityInfo.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                  <p className="text-sm text-white/50">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            ¿Necesitas más recomendaciones?
          </h2>
          <p className="mb-6 text-white/60">
            Nuestro asistente de IA puede ayudarte a encontrar el hotel perfecto según tus necesidades.
          </p>
          <Link href="/chat">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chatear con la IA
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}