import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowLeft, MessageSquare, Eye, Utensils, Camera, Plane, Clock, MapPinned, ExternalLink, ArrowRight, Train, Lightbulb, Map, SunMedium, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDestinationBySlug, destinations as allDestinations } from "@/lib/destinations";
import { notFound } from "next/navigation";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

const BOOKING_AFFILIATE_ID = process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || "your-affiliate-id";

export async function generateStaticParams() {
  const cities = allDestinations.filter((d) => d.type === "city");
  return cities.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: "Destino no encontrado" };

  return {
    title: `Hoteles en ${dest.name}: ${dest.priceRange} | Takeitrip`,
    description: `Encuentra los mejores hoteles en ${dest.name}. ${dest.short} Precios desde ${dest.priceRange}. Recomendaciones personalizadas con IA y enlaces a Booking.com.`,
    keywords: [`hoteles en ${dest.name}`, `dónde dormir en ${dest.name}`, `reserva hotel ${dest.name}`, dest.country, dest.name],
    alternates: {
      canonical: `/hoteles/${slug}`,
    },
    openGraph: {
      title: `Hoteles en ${dest.name} | Takeitrip`,
      description: dest.short,
      type: "website",
      locale: "es_ES",
      url: `https://takeitrip.es/hoteles/${slug}`,
      images: [
        {
          url: dest.image,
          width: 1200,
          height: 800,
          alt: `Hoteles en ${dest.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [dest.image],
    },
  };
}

function RelatedDestinations({ current, continent }: { current: string; continent: string }) {
  const related = allDestinations
    .filter((d) => d.slug !== current && d.continent === continent && d.type === "city")
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 text-xl font-bold text-white">Otros destinos recomendados</h2>
      <div className="grid gap-6 sm:grid-cols-3">
        {related.map((r) => (
          <Link key={r.slug} href={`/hoteles/${r.slug}`} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image src={r.image} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <h3 className="font-bold text-white text-lg">{r.name}</h3>
                <p className="text-xs text-white/80">{r.country}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest || dest.type !== "city") notFound();

  const cityName = dest.name;
  const bookingUrl = `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(dest.name)}&aid=${BOOKING_AFFILIATE_ID}&label=takeitrip`;

  const related = allDestinations
    .filter((d) => d.slug !== slug && d.continent === dest.continent && d.type === "city")
    .slice(0, 3);

  return (
    <div className="relative min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Hoteles en ${cityName}: guía completa ${dest.bestTime}`,
            description: dest.description,
            image: dest.image,
            author: { "@type": "Organization", name: "Takeitrip" },
            publisher: { "@type": "Organization", name: "Takeitrip" },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
          }),
        }}
      />

      <div className="relative h-64 md:h-80">
        <Image
          src={dest.image}
          alt={`${cityName}, ${dest.country}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 -mt-20 z-10">
        <Link
          href="/destinos"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a destinos
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Hoteles en {cityName}
          </h1>
          <p className="flex items-center gap-2 text-white/50">
            <MapPinned className="h-4 w-4" />
            {dest.country} • {dest.continent}
          </p>
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            <div className="flex-1">
              <p className="text-white/70 leading-relaxed">{dest.description}</p>
            </div>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Ver precios en Booking
            </a>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Clock className="h-4 w-4 text-white/40" />
            <span className="text-sm text-white/60">Mejor época:</span>
            <span className="text-sm font-medium text-white">{dest.bestTime}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <Plane className="h-4 w-4 text-white/40" />
            <span className="text-sm text-white/60">Vuelo desde:</span>
            <span className="text-sm font-medium text-white">{dest.avgFlightPrice}</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
            <MapPin className="h-4 w-4 text-white/40" />
            <span className="text-sm text-white/60">Precio medio:</span>
            <span className="text-sm font-medium text-white">{dest.priceRange}</span>
          </div>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-blue-400">
              <Eye className="h-5 w-5" />
              <h2 className="font-semibold">Qué ver</h2>
            </div>
            <ul className="space-y-1.5">
              {dest.whatToSee.map((item, i) => (
                <li key={i} className="text-sm text-white/60">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-orange-400">
              <Utensils className="h-5 w-5" />
              <h2 className="font-semibold">Gastronomía</h2>
            </div>
            <ul className="space-y-1.5">
              {dest.gastronomy.map((item, i) => (
                <li key={i} className="text-sm text-white/60">{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-3 flex items-center gap-2 text-green-400">
              <Camera className="h-5 w-5" />
              <h2 className="font-semibold">Actividades</h2>
            </div>
            <ul className="space-y-1.5">
              {dest.activities.map((item, i) => (
                <li key={i} className="text-sm text-white/60">{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="mb-4 text-lg text-white/80">Encuentra los mejores hoteles en {cityName}</p>
          <p className="mb-6 text-sm text-white/40">
            Pregunta a nuestro asistente de IA y recibe recomendaciones personalizadas con precios reales de Booking.com para {cityName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                <MessageSquare className="mr-2 h-4 w-4" />
                Preguntar a la IA
              </Button>
            </Link>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" />
              Buscar en Booking
            </a>
          </div>
        </div>

        {dest.transport && (
          <section className="mb-12 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/30 dark:bg-blue-950/10">
            <h2 className="mb-4 flex items-center gap-3 text-xl font-bold text-white">
              <Train className="h-6 w-6 text-blue-400" /> Cómo moverse por {cityName}
            </h2>
            <p className="text-white/70 leading-relaxed">{dest.transport}</p>
            {dest.budget && (
              <div className="mt-4 flex items-start gap-3 rounded-xl bg-white/5 p-4 border border-white/10">
                <Wallet className="h-5 w-5 text-green-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Presupuesto estimado</p>
                  <p className="text-sm text-white/60">{dest.budget}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {dest.neighborhoods && dest.neighborhoods.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
              <Map className="h-6 w-6 text-purple-400" /> Mejores barrios para alojarse en {cityName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.neighborhoods.map((hood, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/20 text-xs font-bold text-purple-300">{i + 1}</span>
                    <h3 className="font-semibold text-white">{hood.name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-white/60 ml-8">{hood.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {dest.dayTrips && dest.dayTrips.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-white">
              <SunMedium className="h-6 w-6 text-yellow-400" /> Excursiones desde {cityName}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dest.dayTrips.map((trip, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-bold text-yellow-300">{i + 1}</span>
                  <p className="text-sm text-white/70">{trip}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {dest.travelTips && dest.travelTips.length > 0 && (
          <section className="mb-12 rounded-2xl border border-orange-500/20 bg-orange-950/10 p-6">
            <h2 className="mb-6 flex items-center gap-3 text-xl font-bold text-white">
              <Lightbulb className="h-6 w-6 text-orange-400" /> Consejos para viajar a {cityName}
            </h2>
            <ul className="space-y-3">
              {dest.travelTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-white/70">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/30 text-xs font-bold text-orange-300">{i + 1}</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Más destinos en {dest.continent}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link key={r.slug} href={`/hoteles/${r.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={r.image} alt={r.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-bold text-white text-lg">{r.name}</h3>
                      <p className="text-xs text-white/80">{r.country}</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm text-blue-400">
                    Ver hoteles <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mt-16 border-t border-white/10 pt-12">
          <h2 className="mb-6 text-2xl font-bold text-white">Preguntas frecuentes sobre {cityName}</h2>
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-medium text-white">¿Cuál es la mejor zona para alojarse en {cityName}?</h3>
              <p className="text-sm text-white/60">{dest.name} ofrece barrios para todos los gustos. Consulta con nuestra IA para recomendaciones personalizadas según tu presupuesto y preferencias.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-medium text-white">¿Cuánto cuesta un hotel en {cityName}?</h3>
              <p className="text-sm text-white/60">Los precios en {cityName} van desde {dest.priceRange} por noche, dependiendo de la temporada y la ubicación. La mejor época para viajar es {dest.bestTime}.</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 font-medium text-white">¿Cómo reservar un hotel en {cityName}?</h3>
              <p className="text-sm text-white/60">Usa nuestro asistente de IA para recibir recomendaciones personalizadas, luego reserva directamente en Booking.com con los mejores precios.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}