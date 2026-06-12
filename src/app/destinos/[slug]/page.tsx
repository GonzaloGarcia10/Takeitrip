import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin, Star, Eye, Utensils, Camera, Plane, Clock,
  MessageSquare, ChevronRight, Home, ArrowRight, Building2
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { HotelList } from "@/app/hoteles/[slug]/hotel-list";
import { Button } from "@/components/ui/button";
import { destinations, getDestinationBySlug, getCitiesByCountry } from "@/lib/destinations";
import { notFound } from "next/navigation";

interface DestinationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return destinations.map((dest) => ({ slug: dest.slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) return { title: "Destino no encontrado" };

  return {
    title: dest.type === "country"
      ? `${dest.name}: Guía Completa de Viaje | Takeitrip`
      : `${dest.name}: Guía Completa ${dest.bestTime} | Takeitrip`,
    description: dest.description,
    keywords: dest.keywords,
    alternates: {
      canonical: `/destinos/${slug}`,
    },
    openGraph: {
      title: `Viajar a ${dest.name} | Takeitrip`,
      description: dest.short || dest.description,
      type: "article",
      locale: "es_ES",
      url: `https://takeitrip.es/destinos/${slug}`,
      images: [
        {
          url: dest.image,
          width: 1200,
          height: 800,
          alt: `Guía de viaje ${dest.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [dest.image],
    },
  };
}

function CountryPage({ dest }: { dest: NonNullable<ReturnType<typeof getDestinationBySlug>> }) {
  const cities = getCitiesByCountry(dest.slug);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Guía de viaje a ${dest.name}`,
            description: dest.description,
            image: dest.image,
            author: { "@type": "Organization", name: "Takeitrip" },
            publisher: { "@type": "Organization", name: "Takeitrip" },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
          }),
        }}
      />
      <article>
        <header className="relative">
          <div className="relative h-64 md:h-96">
            <Image src={dest.image} alt={dest.name} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center gap-1 hover:text-white"><Home className="h-4 w-4" /> Inicio</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/destinos" className="hover:text-white">Blog</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{dest.name}</span>
              </nav>
              <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                <MapPin className="h-4 w-4" /> {dest.continent}
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Guía de {dest.name}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {dest.rating}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {dest.readTime} de lectura</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{dest.description}</p>
          </div>

          <section className="mb-16">
            <h2 className="mb-8 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
              <Building2 className="h-6 w-6 text-blue-500" />
              Ciudades de {dest.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cities.map((city) => (
                <Link key={city.slug} href={`/destinos/${city.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image src={city.image} alt={city.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-bold text-white text-lg">{city.name}</h3>
                      <p className="text-xs text-white/80">{city.short}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {cities.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">Próximamente más ciudades.</p>
            )}
          </section>

          <section className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
              <Eye className="h-6 w-6 text-blue-500" /> Qué ver en {dest.name}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.whatToSee.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
              <Utensils className="h-6 w-6 text-orange-500" /> Gastronomía
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.gastronomy.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
              <Camera className="h-6 w-6 text-green-500" /> Actividades
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.activities.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">¿Necesitas ayuda para planificar?</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Nuestro asistente de IA puede recomendarte hoteles personalizados</p>
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
                <MessageSquare className="mr-2 h-4 w-4" /> Chatear ahora
              </Button>
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}

function CityPage({ dest }: { dest: NonNullable<ReturnType<typeof getDestinationBySlug>> }) {
  const isCountry = getDestinationBySlug(dest.parentSlug ?? "");
  const relatedDestinations = destinations
    .filter((d) => d.slug !== dest.slug && d.continent === dest.continent && d.type === "city")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${dest.name}: Guía Completa ${dest.bestTime}`,
            description: dest.description,
            image: dest.image,
            author: { "@type": "Organization", name: "Takeitrip" },
            publisher: { "@type": "Organization", name: "Takeitrip" },
            datePublished: new Date().toISOString(),
            dateModified: new Date().toISOString(),
          }),
        }}
      />
      <article>
        <header className="relative">
          <div className="relative h-64 md:h-96">
            <Image src={dest.image} alt={`${dest.name}, ${dest.country}`} fill sizes="100vw" className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          </div>
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-4xl px-4 pb-8 sm:px-6 lg:px-8">
              <nav className="mb-6 flex items-center gap-2 text-sm text-white/60" aria-label="Breadcrumb">
                <Link href="/" className="flex items-center gap-1 hover:text-white"><Home className="h-4 w-4" /> Inicio</Link>
                <ChevronRight className="h-4 w-4" />
                <Link href="/destinos" className="hover:text-white">Blog</Link>
                {isCountry && (<><ChevronRight className="h-4 w-4" /><Link href={`/destinos/${isCountry.slug}`} className="hover:text-white">{isCountry.name}</Link></>)}
                <ChevronRight className="h-4 w-4" />
                <span className="text-white">{dest.name}</span>
              </nav>
              <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
                <MapPin className="h-4 w-4" /> {dest.country} • {dest.continent}
              </div>
              <h1 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">Guía de {dest.name}</h1>
              <div className="mt-3 flex items-center gap-4 text-sm text-white/80">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> {dest.rating}</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {dest.readTime} de lectura</span>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-12 rounded-2xl border border-gray-100 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{dest.description}</p>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"><Plane className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-500 dark:text-gray-400">Vuelo desde</p><p className="font-semibold text-gray-900 dark:text-white">{dest.avgFlightPrice}</p></div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"><Clock className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-500 dark:text-gray-400">Mejor época</p><p className="font-semibold text-gray-900 dark:text-white">{dest.bestTime}</p></div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"><MapPin className="h-5 w-5" /></div>
              <div><p className="text-xs text-gray-500 dark:text-gray-400">Precio medio</p><p className="font-semibold text-gray-900 dark:text-white">{dest.priceRange}</p></div>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white"><Eye className="h-6 w-6 text-blue-500" /> Qué ver en {dest.name}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.whatToSee.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white"><Utensils className="h-6 w-6 text-orange-500" /> Gastronomía</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.gastronomy.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white"><Camera className="h-6 w-6 text-green-500" /> Actividades</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {dest.activities.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">{i + 1}</div>
                  <p className="text-gray-700 dark:text-gray-300">{item}</p>
                </div>
              ))}
            </div>
          </section>

          {relatedDestinations.length > 0 && (
            <section className="mb-12">
              <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">Otros destinos en {dest.continent}</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {relatedDestinations.map((related) => (
                  <Link key={related.slug} href={`/destinos/${related.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image src={related.image} alt={related.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <h3 className="font-bold text-white">{related.name}</h3>
                        <p className="text-xs text-white/80">{related.country}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-6 text-center dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">¿Necesitas ayuda para planificar?</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">Nuestro asistente de IA puede recomendarte hoteles personalizados</p>
            <Link href="/chat">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-500">
                <MessageSquare className="mr-2 h-4 w-4" /> Chatear ahora
              </Button>
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const dest = getDestinationBySlug(slug);
  if (!dest) notFound();

  if (dest.type === "country") return <CountryPage dest={dest} />;
  return <CityPage dest={dest} />;
}