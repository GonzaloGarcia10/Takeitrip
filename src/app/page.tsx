"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  MessageSquare,
  Search,
  MapPin,
  Star,
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Globe,
  ChevronRight,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "50K+", label: "Hoteles" },
  { value: "12", label: "Destinos" },
  { value: "4.8", label: "Puntuación media" },
];

const features = [
  {
    icon: Sparkles,
    title: "IA Conversacional",
    description: "Pregunta en lenguaje natural y obtén recomendaciones precisas",
  },
  {
    icon: Search,
    title: "Datos Reales",
    description: "Precios y disponibilidad de Booking.com actualizados",
  },
  {
    icon: MapPin,
    title: "Zonas Verificadas",
    description: "Información práctica de cada barrio para que elijas mejor",
  },
  {
    icon: Zap,
    title: "Respuesta Inmediata",
    description: "Recibe recomendaciones en segundos, no minutos",
  },
];

const destinations = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    rating: 4.8,
    priceRange: "120€ - 220€",
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
    rating: 4.7,
    priceRange: "70€ - 180€",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
    rating: 4.6,
    priceRange: "80€ - 200€",
  },
  {
    name: "Londres",
    slug: "londres",
    country: "Reino Unido",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=400&fit=crop",
    rating: 4.7,
    priceRange: "120€ - 280€",
  },
];

const testimonials = [
  {
    name: "María García",
    content: "Encontré un hotel increíble en París. La IA entendió perfectamente lo que necesitaba.",
    rating: 5,
  },
  {
    name: "Carlos López",
    content: "Las recomendaciones de zonas me ahorraron mucho tiempo. Muy útil para planificar.",
    rating: 5,
  },
  {
    name: "Laura Fernández",
    content: "Respuesta instantánea y información actualizada.完美旅行策划工具。",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-black" />
      <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px'}} />

      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5"
              >
                <Sparkles className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-400">Asistente de hoteles con IA</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                Tu próximo hotel,
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  encontrado en segundos
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-10 text-lg text-white/60"
              >
                Dinos qué buscas y te recomendaremos hoteles reales con precios actualizados.
                <br />Sin formularios, sin registro, sin complicaciones.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col items-center gap-6"
              >
                <Link href="/chat" className="group">
                  <Button size="lg" className="h-14 px-10 text-base bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Empezar a buscar
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <div className="flex items-center gap-6 text-sm text-white/40">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    100% Gratuito
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Sin registro
                  </span>
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    Datos reales
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-8"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</div>
                  <div className="text-sm text-white/40">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How it works */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                ¿Cómo funciona?
              </h2>
              <p className="text-white/50">Tres pasos para encontrar tu hotel perfecto</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                { icon: MessageSquare, title: "Cuéntanos qué buscas", desc: "Presupuesto, zona preferida, tipo de alojamiento..." },
                { icon: Search, title: "La IA analiza opciones", desc: "Compara precios, ubicaciones y valoraciones de miles de hoteles" },
                { icon: MapPin, title: "Recibe recomendación", desc: "Hoteles adaptados a tus necesidades con enlace directo a Booking.com" },
              ].map((step, i) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="relative rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <step.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="relative py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                Por qué usar Takeitrip
              </h2>
              <p className="text-white/50">Tecnología inteligente al servicio de tu viaje</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-5"
                >
                  <feature.icon className="mb-3 h-6 w-6 text-blue-400" />
                  <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-white/50">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations */}
        <section className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/5 to-transparent" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                  Destinos populares
                </h2>
                <p className="text-white/50">Los destinos más buscados por nuestros usuarios</p>
              </div>
              <Link href="/destinos" className="hidden text-sm text-blue-400 hover:text-blue-300 sm:flex items-center gap-1">
                Ver todos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((dest, i) => (
                <motion.div
                  key={dest.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Link href={`/hoteles/${dest.slug}`} className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <Image
                        src={dest.image}
                        alt={`Hoteles en ${dest.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={i < 4}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex items-center gap-2 text-white/80 text-xs mb-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {dest.rating}
                          <span className="text-white/40">•</span>
                          {dest.country}
                        </div>
                        <h3 className="text-lg font-bold text-white">{dest.name}</h3>
                        <p className="text-sm text-white/60">{dest.priceRange}/noche</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link href="/destinos" className="text-sm text-blue-400 hover:text-blue-300 flex items-center justify-center gap-1">
                Ver todos los destinos
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative py-20">
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <h2 className="mb-2 text-2xl font-bold text-white sm:text-3xl">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="text-white/50">Miles de viajeros confían en Takeitrip</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/5 p-6"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mb-4 text-white/70">"{t.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm font-semibold">
                      {t.name.charAt(0)}
                    </div>
                    <span className="text-sm text-white/80 font-medium">{t.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative py-24">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />

          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
                ¿Listo para encontrar tu hotel ideal?
              </h2>
              <p className="mb-8 text-white/50">
                Nuestro asistente de IA está disponible 24/7 para ayudarte a planificar tu próximo viaje.
              </p>
              <Link href="/chat">
                <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chatear ahora
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}