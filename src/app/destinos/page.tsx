"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import {
  MapPin, ArrowRight, Star, Globe, ChevronRight, Home, Clock,
  Eye, Search, ChevronLeft, Sparkles
} from "lucide-react";
import { destinations, continents } from "@/lib/destinations";

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

  const btn =
    "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white";

  const active =
    "inline-flex items-center justify-center rounded-lg bg-gray-900 px-3.5 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-950";

  const pageBtn =
    "inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white";

  return (
    <nav className="mt-12 flex items-center justify-center gap-1.5" aria-label="Paginación">
      <button type="button" disabled={current === 1} onClick={() => onChange(current - 1)} className={btn}>
        <ChevronLeft className="mr-1.5 h-4 w-4" />
        Anterior
      </button>

      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className="px-2 text-sm text-gray-400 dark:text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            className={p === current ? active : pageBtn}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button type="button" disabled={current === total} onClick={() => onChange(current + 1)} className={btn}>
        Siguiente
        <ChevronRight className="ml-1.5 h-4 w-4" />
      </button>
    </nav>
  );
}

function DestCard({ dest, priority }: { dest: typeof destinations[number]; priority: boolean }) {
  return (
    <Link href={`/destinos/${dest.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl bg-gray-50 dark:bg-gray-900 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-900/10">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          {dest.badge && (
            <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-900 backdrop-blur-sm">
              {dest.badge}
            </div>
          )}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl font-bold text-white">{dest.name}</h3>
            <p className="text-sm text-white/80">{dest.country}</p>
          </div>
        </div>
        <div className="p-5">
          <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{dest.description}</p>
          <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-yellow-400 text-yellow-400" /> {dest.rating}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {dest.readTime}</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
              Leer más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function DestinosPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return null;
    return destinations.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.country.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [search]);

  const isSearching = search.trim().length > 0;

  const totalPages = useMemo(() => {
    if (!filtered) return 0;
    return Math.ceil(filtered.length / ITEMS_PER_PAGE);
  }, [filtered]);

  const paginated = useMemo(() => {
    if (!filtered) return [];
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  const noResults = isSearching && filtered && filtered.length === 0;

  let imageIndex = 0;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
            <Home className="h-4 w-4" /> Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900 dark:text-gray-200">Blog de Viajes</span>
        </nav>

        <header className="mb-12 max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Globe className="h-3 w-3" /> Guía de Destinos
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          >
            Blog de Viajes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400"
          >
            Descubre los mejores destinos con guías completas sobre qué ver, dónde comer y qué hacer en cada ciudad.
          </motion.p>
        </header>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Buscar destinos, países, ciudades..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-blue-400"
            aria-label="Buscar destinos"
          />
          {search && (
            <button
              type="button"
              onClick={() => { setSearch(""); setPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>

        {noResults ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 rounded-2xl border border-gray-100 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              No encontramos &ldquo;{search}&rdquo;
            </h2>
            <p className="mb-6 text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              No tenemos una guía para ese destino todavía. Pregúntale a nuestro asistente de IA, te recomendará hoteles al instante.
            </p>
            <Link
              href={`/chat?q=${encodeURIComponent(search)}`}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Preguntar a la IA sobre {search}
            </Link>
          </motion.div>
        ) : isSearching ? (
          <>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {filtered!.length} resultado{filtered!.length !== 1 ? "s" : ""} para &ldquo;{search}&rdquo;
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginated.map((dest) => {
                const prio = imageIndex < 3;
                imageIndex++;
                return (
                  <motion.article
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <DestCard dest={dest} priority={prio} />
                  </motion.article>
                );
              })}
            </div>
            <Pagination current={page} total={totalPages} onChange={setPage} />
          </>
        ) : (
          continents.map((continent) => {
            const continentDests = destinations.filter((d) => d.continent === continent);
            return (
              <section key={continent} className="mb-16">
                <div className="mb-8 flex items-center gap-3">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{continent}</h2>
                  <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {continentDests.map((dest) => {
                    const prio = imageIndex < 3;
                    imageIndex++;
                    return (
                      <motion.article
                        key={dest.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0 }}
                      >
                        <DestCard dest={dest} priority={prio} />
                      </motion.article>
                    );
                  })}
                </div>
              </section>
            );
          })
        )}

        {!noResults && (
          <section className="mt-16 rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">¿Buscas algo específico?</h2>
            <p className="mb-6 text-blue-100">Nuestro asistente de IA puede ayudarte a encontrar el hotel perfecto</p>
            <Link href="/chat" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-blue-600 transition-transform hover:scale-105">
              <Eye className="h-4 w-4" />
              Hablar con la IA
            </Link>
          </section>
        )}
      </div>
    </div>
  );
}