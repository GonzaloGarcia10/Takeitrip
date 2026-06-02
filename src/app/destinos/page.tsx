"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Star, Globe, Shield } from "lucide-react";

interface Destination {
  name: string;
  slug: string;
  country: string;
  region: string;
  short: string;
  description: string;
  highlights: string[];
  priceRange: string;
  image: string;
  badge?: string;
  rating: number;
  bestTime: string;
}

const destinations: Destination[] = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    region: "Europa",
    short: "La ciudad de la luz con barrios icónicos y gastronomía de primer nivel.",
    description: "París combina arte, historia y moda en cada esquina. Desde el Louvre hasta los cafés de Montmartre, cada barrio tiene su propio carácter.",
    highlights: ["Le Marais", "Torre Eiffel", "Gastronomía"],
    priceRange: "120€ - 220€",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    badge: "Top",
    rating: 4.8,
    bestTime: "Abril - Junio",
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    region: "Europa",
    short: "Historia milenaria, gastronomía auténtica y encanto mediterráneo.",
    description: "Roma es un museo al aire libre donde cada calle cuenta una historia. El Coliseo, el Vaticano y Trastevere son solo el comienzo.",
    highlights: ["Centro Histórico", "Trastevere", "Gastronomía"],
    priceRange: "70€ - 180€",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    badge: "Cultural",
    rating: 4.7,
    bestTime: "Marzo - Mayo",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    region: "Europa",
    short: "Playas, arquitectura modernista y una escena gastronómica en auge.",
    description: "Barcelona ofrece la combinación perfecta de playa, cultura y vida nocturna.",
    highlights: ["Eixample", "Barceloneta", "Gaudí"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    rating: 4.6,
    bestTime: "Mayo - Septiembre",
  },
  {
    name: "Ámsterdam",
    slug: "amsterdam",
    country: "Países Bajos",
    region: "Europa",
    short: "Canales, museos de clase mundial y una atmósfera única.",
    description: "Ámsterdam cautiva con sus canales, casas estrechas y una escena cultural vibrante.",
    highlights: ["Canales", "Jordaan", "Museos"],
    priceRange: "100€ - 200€",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    rating: 4.5,
    bestTime: "Abril - Septiembre",
  },
  {
    name: "Bruselas",
    slug: "bruselas",
    country: "Bélgica",
    region: "Europa",
    short: "Capital europea con arquitectura impresionante y gastronomía de clase mundial.",
    description: "Bruselas sorprende con su Grand Place, su chocolate artesanal y su cerveza.",
    highlights: ["Grand Place", "Chocolate", "Cerveza"],
    priceRange: "80€ - 160€",
    image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=800&h=600&fit=crop",
    rating: 4.4,
    bestTime: "Marzo - Octubre",
  },
  {
    name: "Berlín",
    slug: "berlin",
    country: "Alemania",
    region: "Europa",
    short: "Historia contemporánea, escena artística underground y vida nocturna legendaria.",
    description: "Berlín es una ciudad en constante transformación. El Muro, Kreuzberg y los clubes la hacen única.",
    highlights: ["Mitte", "Kreuzberg", "Historia"],
    priceRange: "70€ - 150€",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&h=600&fit=crop",
    badge: "Emergente",
    rating: 4.5,
    bestTime: "Mayo - Septiembre",
  },
  {
    name: "Viena",
    slug: "viena",
    country: "Austria",
    region: "Europa",
    short: "Música, palacios imperiales y la cultura del café vienés.",
    description: "Viena irradia elegancia con sus palacios, museos y cafés históricos.",
    highlights: ["Innere Stadt", "Schönbrunn", "Cafés"],
    priceRange: "90€ - 180€",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop",
    rating: 4.6,
    bestTime: "Abril - Octubre",
  },
  {
    name: "Praga",
    slug: "praga",
    country: "Chequia",
    region: "Europa",
    short: "Ciudad de las cien torres con arquitectura gótica y precios asequibles.",
    description: "Praga parece sacada de un cuento de hadas con su Ciudad Vieja y el Puente Carlos.",
    highlights: ["Ciudad Vieja", "Puente Carlos", "Cerveza"],
    priceRange: "50€ - 120€",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    badge: "Mejor Precio",
    rating: 4.5,
    bestTime: "Abril - Junio",
  },
  {
    name: "Lisboa",
    slug: "lisboa",
    country: "Portugal",
    region: "Europa",
    short: "Colinas, tranvías amarillos y una gastronomía mediterránea excepcional.",
    description: "Lisboa enamora con sus calles empedradas, fado y pastéis de nata.",
    highlights: ["Alfama", "Baixa", "Fado"],
    priceRange: "60€ - 140€",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    rating: 4.6,
    bestTime: "Marzo - Octubre",
  },
  {
    name: "Tokio",
    slug: "tokio",
    country: "Japón",
    region: "Asia",
    short: "Futuro y tradición se encuentran en una de las ciudades más fascinantes del mundo.",
    description: "Tokio deslumbra con sus templos, jardines, tecnología y gastronomía Michelin.",
    highlights: ["Shinjuku", "Asakusa", "Michelin"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    badge: "Top",
    rating: 4.9,
    bestTime: "Marzo - Mayo",
  },
  {
    name: "Nueva York",
    slug: "nueva-york",
    country: "Estados Unidos",
    region: "América",
    short: "La ciudad que nunca duerme: rascacielos, Broadway y Central Park.",
    description: "Nueva York es un universo en una ciudad. Manhattan, Brooklyn y Queens ofrecen experiencias únicas.",
    highlights: ["Midtown", "Brooklyn", "Central Park"],
    priceRange: "150€ - 350€",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    rating: 4.7,
    bestTime: "Abril - Junio",
  },
  {
    name: "Londres",
    slug: "londres",
    country: "Reino Unido",
    region: "Europa",
    short: "Capital global con museos gratuitos, teatro West End y parques reales.",
    description: "Londres es una de las ciudades más dinámicas del mundo. Cada barrio tiene personalidad propia.",
    highlights: ["Westminster", "Covent Garden", "Museos"],
    priceRange: "120€ - 280€",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    rating: 4.7,
    bestTime: "Mayo - Septiembre",
  },
];

const regions = [...new Set(destinations.map((d) => d.region))];

export default function DestinosPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-purple-950/20 to-black" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
          >
            <Globe className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-white/70">{destinations.length} destinos disponibles</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Zonas y Guías de Destinos
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-lg text-white/50"
          >
            Explora los mejores destinos para tu próximo viaje. Hoteles verificados, precios actualizados y recomendaciones de IA.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-6 text-sm text-white/40"
          >
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-400" /> Hoteles verificados
            </span>
            <span className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" /> Ratings reales
            </span>
          </motion.div>
        </div>

        {/* Destinations by Region */}
        {regions.map((region, regionIndex) => {
          const regionDestinations = destinations.filter((d) => d.region === region);
          return (
            <section key={region} className="mb-16">
              <div className="mb-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{region}</h2>
                  <p className="text-sm text-white/40">{regionDestinations.length} destinos</p>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {regionDestinations.map((dest, index) => (
                  <motion.div
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Link href={`/hoteles/${dest.slug}`} className="group block">
                      <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={dest.image}
                            alt={`Hoteles en ${dest.name}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          
                          {dest.badge && (
                            <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-3 py-1 text-xs font-semibold text-white">
                              {dest.badge}
                            </div>
                          )}
                          
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center gap-2 text-white">
                              <h3 className="text-xl font-bold">{dest.name}</h3>
                              <div className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-xs">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {dest.rating}
                              </div>
                            </div>
                            <p className="text-sm text-white/60">{dest.country}</p>
                          </div>
                        </div>

                        <div className="p-5">
                          <p className="mb-4 line-clamp-2 text-sm text-white/60">{dest.short}</p>
                          
                          <div className="mb-4 flex flex-wrap gap-2">
                            {dest.highlights.map((h, i) => (
                              <span
                                key={`${dest.slug}-hl-${i}`}
                                className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-white/40"
                              >
                                {h}
                              </span>
                            ))}
                          </div>

                          <div className="flex items-center justify-between border-t border-white/10 pt-4">
                            <div>
                              <p className="text-xs text-white/30">Precio medio</p>
                              <p className="text-lg font-bold text-white">{dest.priceRange}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-all group-hover:gap-3">
                              Ver hoteles
                              <ArrowRight className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>
          );
        })}

        {/* CTA */}
        <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            ¿No encuentras tu destino?
          </h2>
          <p className="mb-8 text-white/60">
            Nuestro asistente de IA puede ayudarte a encontrar hoteles en cualquier ciudad del mundo.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25"
          >
            Preguntar a la IA
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}