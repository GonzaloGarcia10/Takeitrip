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
  Shield,
  Globe,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Sparkles,
    title: "IA Avanzada",
    description: "GPT para recomendaciones personalizadas",
    color: "text-blue-500",
  },
  {
    icon: Search,
    title: "Hoteles Reales",
    description: "Precios actualizados de Booking.com",
    color: "text-purple-500",
  },
  {
    icon: MapPin,
    title: "Zonas Recomendadas",
    description: "Los mejores barrios para tu estancia",
    color: "text-green-500",
  },
  {
    icon: Zap,
    title: "Respuesta Instantánea",
    description: "Streaming de respuestas en tiempo real",
    color: "text-orange-500",
  },
];

const destinations = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    emoji: "🗼",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop",
    rating: 4.8,
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    emoji: "🏛️",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop",
    rating: 4.7,
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    emoji: "🏖️",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop",
    rating: 4.6,
  },
  {
    name: "Tokio",
    slug: "tokio",
    country: "Japón",
    emoji: "🏯",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop",
    rating: 4.9,
  },
];

const testimonials = [
  {
    name: "María García",
    role: "Viajera frecuente",
    content: "Encontré un hotel increíble en París por la mitad de precio.",
    rating: 5,
  },
  {
    name: "Carlos López",
    role: "Nómada digital",
    content: "Las recomendaciones de zonas son muy útiles para elegir dónde alojarse.",
    rating: 5,
  },
  {
    name: "Ana Martín",
    role: "Familia viajera",
    content: "Me ayudó a encontrar hoteles familiares en Roma con todas las comodidades.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 opacity-40 dark:opacity-20" style={{backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px'}} />
        
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Copy */}
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400 mb-6 w-fit"
              >
                <Sparkles className="h-4 w-4" />
                Potenciado por IA
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
              >
                Encuentra tu próximo hotel perfecto
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 text-lg text-gray-600 dark:text-gray-400"
              >
                Takeitrip usa inteligencia artificial para entender tus prioridades y ofrecerte hoteles con precios reales y enlaces de reserva directa.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-col gap-4 sm:flex-row"
              >
                <Link href="/chat">
                  <Button size="lg" className="h-12 px-8 text-base">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Chatear ahora
                  </Button>
                </Link>
                <Link href="/destinos">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    Ver destinos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10 flex items-center gap-8"
              >
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">100% Gratuito</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sin registro</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">100+ destinos</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Feature List */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-3xl" />
              <div className="relative rounded-3xl border border-gray-200/50 bg-white/80 p-8 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-900/80">
                <div className="space-y-6">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex items-start gap-4"
                      >
                        <div className={`rounded-xl bg-gray-100 p-3 dark:bg-gray-800 ${feature.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Image Band */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-16 aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900"
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Globe className="mx-auto h-16 w-16 text-blue-500 dark:text-blue-400" />
                <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">Comienza tu búsqueda</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Encuentra hoteles en más de 100 destinos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Destinations Section */}
      <section className="bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Destinos populares
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Explora los destinos más buscados
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/hoteles/${dest.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                    <Image
                      src={dest.image}
                      alt={`Hoteles en ${dest.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      priority={index < 4}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <span className="text-2xl">{dest.emoji}</span>
                      <h3 className="font-bold">{dest.name}</h3>
                      <p className="text-xs text-gray-200">{dest.country}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-200">{dest.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/destinos">
              <Button variant="outline" size="lg">
                Ver todos los destinos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950"
              >
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                    <span className="font-semibold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              ¿Listo para encontrar tu hotel ideal?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Nuestro asistente de IA está disponible 24/7
            </p>
            <Link href="/chat" className="mt-8 inline-block">
              <Button size="lg" className="h-12 px-8 bg-white text-blue-600 hover:bg-gray-100">
                <MessageSquare className="mr-2 h-5 w-5" />
                Empezar ahora
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}