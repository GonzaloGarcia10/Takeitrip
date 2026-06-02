"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Star, Globe, ChevronRight, Home, MessageSquare } from "lucide-react";

interface Destination {
  name: string;
  slug: string;
  country: string;
  region: string;
  short: string;
  priceRange: string;
  image: string;
  badge?: string;
  rating: number;
  bestTime: string;
  avgFlightPrice?: string;
}

const destinations: Destination[] = [
  { name: "París", slug: "paris", country: "Francia", region: "Europa", short: "La ciudad de la luz", priceRange: "120€ - 220€", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop", badge: "Top", rating: 4.8, bestTime: "Abril - Junio", avgFlightPrice: "150€" },
  { name: "Roma", slug: "roma", country: "Italia", region: "Europa", short: "Historia milenaria", priceRange: "70€ - 180€", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop", badge: "Cultural", rating: 4.7, bestTime: "Marzo - Mayo", avgFlightPrice: "120€" },
  { name: "Barcelona", slug: "barcelona", country: "España", region: "Europa", short: "Playas y modernismo", priceRange: "80€ - 200€", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop", rating: 4.6, bestTime: "Mayo - Septiembre", avgFlightPrice: "80€" },
  { name: "Ámsterdam", slug: "amsterdam", country: "Países Bajos", region: "Europa", short: "Canales y museos", priceRange: "100€ - 200€", image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&h=800&fit=crop", rating: 4.5, bestTime: "Abril - Septiembre", avgFlightPrice: "100€" },
  { name: "Bruselas", slug: "bruselas", country: "Bélgica", region: "Europa", short: "Capital europea", priceRange: "80€ - 160€", image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=1200&h=800&fit=crop", rating: 4.4, bestTime: "Marzo - Octubre", avgFlightPrice: "90€" },
  { name: "Berlín", slug: "berlin", country: "Alemania", region: "Europa", short: "Historia y arte", priceRange: "70€ - 150€", image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&h=800&fit=crop", badge: "Emergente", rating: 4.5, bestTime: "Mayo - Septiembre", avgFlightPrice: "85€" },
  { name: "Viena", slug: "viena", country: "Austria", region: "Europa", short: "Música y palacios", priceRange: "90€ - 180€", image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop", rating: 4.6, bestTime: "Abril - Octubre", avgFlightPrice: "110€" },
  { name: "Praga", slug: "praga", country: "Chequia", region: "Europa", short: "Arquitectura gótica", priceRange: "50€ - 120€", image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop", badge: "Mejor Precio", rating: 4.5, bestTime: "Abril - Junio", avgFlightPrice: "70€" },
  { name: "Lisboa", slug: "lisboa", country: "Portugal", region: "Europa", short: "Tranvías y fado", priceRange: "60€ - 140€", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop", rating: 4.6, bestTime: "Marzo - Octubre", avgFlightPrice: "75€" },
  { name: "Tokio", slug: "tokio", country: "Japón", region: "Asia", short: "Tradición y futuro", priceRange: "80€ - 200€", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop", badge: "Top", rating: 4.9, bestTime: "Marzo - Mayo", avgFlightPrice: "600€" },
  { name: "Nueva York", slug: "nueva-york", country: "Estados Unidos", region: "América", short: "La ciudad que nunca duerme", priceRange: "150€ - 350€", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop", rating: 4.7, bestTime: "Abril - Junio", avgFlightPrice: "500€" },
  { name: "Londres", slug: "londres", country: "Reino Unido", region: "Europa", short: "Capital global", priceRange: "120€ - 280€", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop", rating: 4.7, bestTime: "Mayo - Septiembre", avgFlightPrice: "130€" },
];

const regions = [...new Set(destinations.map((d) => d.region))];

export default function DestinosPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/10 to-black" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white/70">Destinos</span>
        </nav>

        <header className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Guías de Destinos
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto max-w-2xl text-white/50"
          >
            Explora los destinos más populares y encuentra el hotel perfecto para tu viaje
          </motion.p>
        </header>

        {regions.map((region) => {
          const regionDestinations = destinations.filter((d) => d.region === region);
          return (
            <section key={region} className="mb-16">
              <header className="mb-8 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                  <Globe className="h-5 w-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">{region}</h2>
              </header>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regionDestinations.map((dest, index) => (
                  <motion.article
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/hoteles/${dest.slug}`} className="group block">
                      <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                        <div className="relative aspect-[16/10]">
                          <Image
                            src={dest.image}
                            alt={`Hoteles en ${dest.name}`}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                          {dest.badge && (
                            <div className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
                              {dest.badge}
                            </div>
                          )}

                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center gap-2 text-xs text-white/60 mb-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              {dest.rating}
                              <span className="text-white/30">•</span>
                              {dest.country}
                            </div>
                            <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                            <p className="text-sm text-white/60">{dest.short}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                          <div className="text-sm">
                            <span className="text-white/40">Desde </span>
                            <span className="font-semibold text-white">{dest.priceRange}</span>
                          </div>
                          <div className="flex items-center gap-1 text-blue-400">
                            <span className="text-sm">Ver hoteles</span>
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </section>
          );
        })}

        <section className="mt-16 rounded-2xl border border-white/10 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 p-8 text-center">
          <h2 className="mb-2 text-xl font-bold text-white">¿No encuentras tu destino?</h2>
          <p className="mb-6 text-white/50">Usa nuestro asistente de IA para encontrar hoteles en cualquier ciudad</p>
          <Link href="/chat" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-semibold text-white">
            <MessageSquare className="h-4 w-4" />
            Preguntar a la IA
          </Link>
        </section>
      </div>
    </div>
  );
}