"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  MapPin, ArrowRight, Star, Globe, ChevronRight, Home, Clock,
  Search, ChevronLeft, ExternalLink, MapPinned, Calendar
} from "lucide-react";
import { destinations, continents, type DestinationData } from "@/lib/destinations";

const BOOKING_AFFILIATE_ID = process.env.NEXT_PUBLIC_BOOKING_AFFILIATE_ID || "your-affiliate-id";

function getBookingLink(city: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, "-");
  return `https://www.booking.com/searchresults.html?ss=${citySlug}&aid=${BOOKING_AFFILIATE_ID}&label=takeitrip`;
}

const ITEMS_PER_PAGE = 12;

function Pagination({ current, total, onChange }: { current: number; total: number; onChange: (p: number) => void }) {
  if (total <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= current - 1 && i <= current + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  const baseBtn = "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white";
  const activeBtn = "inline-flex items-center justify-center rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-medium text-white";

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Paginación">
      <button type="button" disabled={current === 1} onClick={() => onChange(current - 1)} className={baseBtn}>
        <ChevronLeft className="mr-1.5 h-4 w-4" />
        Anterior
      </button>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400 dark:text-gray-500">...</span>
        ) : (
          <button key={p} type="button" onClick={() => onChange(p)} className={p === current ? activeBtn : baseBtn}>
            {p}
          </button>
        )
      )}
      <button type="button" disabled={current === total} onClick={() => onChange(current + 1)} className={baseBtn}>
        Siguiente
        <ChevronRight className="ml-1.5 h-4 w-4" />
      </button>
    </nav>
  );
}

function DestCard({ dest, priority }: { dest: DestinationData; priority: boolean }) {
  const isCity = dest.type === "city";
  const href = isCity ? `/hoteles/${dest.slug}` : `/destinos/${dest.slug}`;

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/10">
      <Link href={href} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={dest.image}
            alt={`Destino ${dest.name} - ${dest.country}`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {dest.badge && (
            <div className="absolute left-4 top-4 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              {dest.badge}
            </div>
          )}
          
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-xs text-white/80 mb-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span>{dest.rating}</span>
              <span className="text-white/40">•</span>
              <MapPinned className="h-3 w-3" />
              <span>{dest.country}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{dest.name}</h2>
            {isCity && (
              <p className="text-sm text-white/80">{dest.priceRange}/noche</p>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-5">
        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{dest.short || dest.description}</p>
        
        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {dest.readTime}
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {dest.bestTime}
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Link
            href={href}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:from-blue-700 hover:to-blue-800"
          >
            Ver guía
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href={getBookingLink(dest.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-700 transition hover:bg-green-100 dark:border-green-900 dark:bg-green-900/30 dark:text-green-400"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

function FeaturedDestinations() {
  const featured = destinations.filter((d) => d.badge && d.type === "city").slice(0, 4);
  
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Destinos Destacados</h2>
          <p className="text-gray-600 dark:text-gray-400">Los más populares entre nuestros viajeros</p>
        </div>
        <Link href="/hoteles/paris" className="hidden text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 sm:flex items-center gap-1">
          Ver todos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((dest, i) => (
          <motion.div
            key={dest.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <DestCard dest={dest} priority={i < 2} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContinentSection({ continent }: { continent: string }) {
  const continentDests = destinations.filter((d) => d.continent === continent && d.type === "city");
  if (continentDests.length === 0) return null;

  const countries = [...new Set(continentDests.map((d) => d.country))];

  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-3">
        <Globe className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{continent}</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">({continentDests.length} destinos)</span>
      </div>
      
      <div className="space-y-8">
        {countries.map((country) => {
          const countryDests = continentDests.filter((d) => d.country === country);
          return (
            <div key={country} className="relative">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{country}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">({countryDests.length} ciudades)</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {countryDests.map((dest, i) => (
                  <motion.div
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <DestCard dest={dest} priority={false} />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SearchResults({ query }: { query: string }) {
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [query]);

  if (filtered.length === 0) {
    return (
      <div className="py-16 text-center">
        <Search className="mx-auto mb-4 h-12 w-12 text-gray-300 dark:text-gray-600" />
        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Sin resultados</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No encontramos destinos para "{query}". Prueba con otro término.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {filtered.map((dest) => (
        <DestCard key={dest.slug} dest={dest} priority={false} />
      ))}
    </div>
  );
}

export function DestinosClient() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase().trim();
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [search]);

  const paginated = useMemo(() => {
    if (filtered) return [];
    const cities = destinations.filter((d) => d.type === "city");
    const start = (page - 1) * ITEMS_PER_PAGE;
    return cities.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const totalPages = Math.ceil(destinations.filter((d) => d.type === "city").length / ITEMS_PER_PAGE);
  const isSearching = search.trim().length > 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Home className="h-4 w-4" /> Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-200">Blog de Viajes</span>
        </nav>

        <header className="mb-12 max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Globe className="h-3 w-3" />
            Guía de Destinos
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Blog de Viajes
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Descubre los mejores destinos con guías completas sobre qué ver, dónde comer y qué hacer en cada ciudad.
          </p>
        </header>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Buscar destinos... (ej: París, Barcelona, Italia)"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-4 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500"
            aria-label="Buscar destinos"
          />
        </div>

        {isSearching ? (
          <SearchResults query={search} />
        ) : (
          <>
            <FeaturedDestinations />
            
            <section className="mb-16 rounded-2xl border border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 p-8 dark:border-gray-800 dark:from-blue-950/20 dark:to-purple-950/20">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Explora destinos por continente
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Encuentra el destino perfecto para tu próximo viaje
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {continents.map((continent) => (
                  <a
                    key={continent}
                    href={`#${continent.toLowerCase()}`}
                    className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    {continent}
                  </a>
                ))}
              </div>
            </section>

            <ContinentSection continent="Europa" />
            
            <section className="mb-16 rounded-2xl border border-orange-100 bg-orange-50 p-8 dark:border-orange-900/30 dark:bg-orange-950/10">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Explora Asia
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Desde Tokio hasta la Riviera mexicana
                </p>
              </div>
            </section>
            
            <ContinentSection continent="Asia" />
            <ContinentSection continent="América" />

            {totalPages > 1 && (
              <Pagination current={page} total={totalPages} onChange={setPage} />
            )}
          </>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Blog de Viajes - Takeitrip",
            description: "Descubre los mejores destinos con guías completas sobre qué ver, dónde comer y qué hacer en cada ciudad.",
            url: "https://takeitrip.es/destinos",
            publisher: {
              "@type": "Organization",
              name: "Takeitrip",
              url: "https://takeitrip.es",
            },
            mainEntity: {
              "@type": "ItemList",
              itemListElement: destinations.filter((d) => d.type === "city").slice(0, 20).map((dest, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: dest.name,
                url: `https://takeitrip.es/hoteles/${dest.slug}`,
                image: dest.image,
              })),
            },
          }),
        }}
      />
    </div>
  );
}