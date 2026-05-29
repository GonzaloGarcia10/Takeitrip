import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Star, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `Hoteles en ${city}`,
    description: `Encuentra los mejores hoteles en ${city}. Recomendaciones personalizadas con inteligencia artificial.`,
  };
}

const cityDescriptions: Record<string, { content: string; faqs: { q: string; a: string }[] }> = {
  paris: {
    content: "París, la ciudad de la luz, es uno de los destinos más populares del mundo. Desde hoteles boutique en Le Marais hasta establecimientos de lujo cerca de la Torre Eiffel, encontrarás opciones para todos los presupuestos y estilos.",
    faqs: [
      { q: "¿Cuál es la mejor zona para alojarse en París?", a: "Le Marais, Saint-Germain-des-Prés y el Barrio Latino son las zonas más populares por su ubicación céntrica y ambiente." },
      { q: "¿Cuánto cuesta un hotel en París?", a: "Los precios varían desde 80€ para hoteles económicos hasta 500€+ para hoteles de lujo. La media está entre 120-200€ por noche." },
      { q: "¿Cuál es la mejor época para visitar París?", a: "Primavera (abril-junio) y otoño (septiembre-octubre) ofrecen el mejor clima y menos aglomeraciones." },
    ],
  },
  roma: {
    content: "Roma es una ciudad eterna llena de historia, arte y gastronomía. Los barrios de Monti, Trastevere y el Centro Histórico son ideales para alojarse y explorar los monumentos más icónicos.",
    faqs: [
      { q: "¿Dónde dormir barato en Roma?", a: "Monti y Termini ofrecen hoteles a precios razonables bien conectados con el transporte público." },
      { q: "¿Es Roma cara para turistas?", a: "Roma puede ser moderada. Hoteles desde 70€ y restaurantes con menú del día desde 12€." },
      { q: "¿Cuántos días se necesitan en Roma?", a: "Mínimo 3-4 días para ver lo esencial. Una semana ideal para explorar con calma." },
    ],
  },
  bruselas: {
    content: "Bruselas combina arquitectura impresionante, gastronomía de clase mundial y una escena cultural vibrante. La Grand Place y el Barrio Europeo son zonas imperdibles.",
    faqs: [
      { q: "¿Qué zona elegir en Bruselas?", a: "Grand Place y el Barrio Europeo son las mejores zonas. Ixelles ofrece buena relación calidad-precio." },
      { q: "¿Cuánto cuesta un hotel en Bruselas?", a: "Desde 80€ en temporada baja hasta 250€ en temporada alta o eventos especiales." },
      { q: "¿Vale la pena visitar Bruselas?", a: "Absolutamente. Es una ciudad con mucho que ofrecer, desde la Grand Place hasta los museos de cómic." },
    ],
  },
};

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
    content: `${city} es un destino increíble con una gran variedad de hoteles para todos los gustos y presupuestos. Nuestra IA puede ayudarte a encontrar el alojamiento perfecto.`,
    faqs: [],
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link
        href="/destinos"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a destinos
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Hoteles en {city}
        </h1>
        <p className="max-w-3xl text-gray-600 dark:text-gray-400">
          {cityInfo.content}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          {hotels.length} hoteles encontrados
        </div>
      </div>

      {/* Hotels Grid */}
      {hotels.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {hotel.name}
                </h3>
                <p className="mb-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3" />
                  {hotel.zone}, {hotel.city}
                </p>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {hotel.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      €{hotel.pricePerNight}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> / noche</span>
                  </div>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700"
                  >
                    Reservar
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No se encontraron hoteles
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Prueba a preguntar a nuestro asistente de IA para obtener recomendaciones personalizadas.
          </p>
          <Link href="/chat">
            <Button>
              Preguntar a la IA
            </Button>
          </Link>
        </div>
      )}

      {/* FAQ Section */}
      {cityInfo.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Preguntas frecuentes sobre {city}
          </h2>
          <div className="space-y-4">
            {cityInfo.faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
