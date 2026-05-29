"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare,
  Hotel,
  MapPin,
  Sparkles,
  Globe,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Plane,
  Compass,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Sparkles,
    title: "IA Avanzada",
    description: "Recomendaciones personalizadas usando GPT-4 para encontrar el hotel perfecto.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Hotel,
    title: "Hoteles Reales",
    description: "Accede a miles de hoteles con precios actualizados y enlaces de Booking.com.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: MapPin,
    title: "Zonas Recomendadas",
    description: "Descubre los mejores barrios y zonas para alojarte en cualquier ciudad.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Zap,
    title: "Respuesta Instantánea",
    description: "Obtén recomendaciones en tiempo real con streaming de respuestas.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Globe,
    title: "Cobertura Global",
    description: "Hoteles en más de 100 destinos alrededor del mundo.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Shield,
    title: "100% Gratuito",
    description: "Usa nuestro asistente sin costos. Gana dinero reservando hoteles.",
    color: "from-red-500 to-red-600",
  },
];

const popularDestinations = [
  { name: "París", slug: "paris", country: "Francia", emoji: "🗼", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop", rating: 4.8 },
  { name: "Roma", slug: "roma", country: "Italia", emoji: "🏛️", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=400&fit=crop", rating: 4.7 },
  { name: "Barcelona", slug: "barcelona", country: "España", emoji: "🏖️", image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&h=400&fit=crop", rating: 4.6 },
  { name: "Tokio", slug: "tokio", country: "Japón", emoji: "🏯", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop", rating: 4.9 },
  { name: "Nueva York", slug: "nueva-york", country: "EE.UU.", emoji: "🗽", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=400&fit=crop", rating: 4.7 },
  { name: "Lisboa", slug: "lisboa", country: "Portugal", emoji: "🚋", image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&h=400&fit=crop", rating: 4.6 },
];

const testimonials = [
  {
    name: "María García",
    role: "Viajera frecuente",
    content: "Encontré un hotel increíble en París por la mitad de precio. La IA entendió perfectamente lo que buscaba.",
    rating: 5,
  },
  {
    name: "Carlos López",
    role: "Nómada digital",
    content: "Excelente para planificar viajes. Las recomendaciones de zonas son muy útiles para elegir dónde alojarse.",
    rating: 5,
  },
  {
    name: "Ana Martín",
    role: "Familia viajera",
    content: "Me ayudó a encontrar hoteles familiares en Roma con todas las comodidades. Muy recomendable.",
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        {/* background grid removed */}
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
                <Sparkles className="h-4 w-4" />
                Potenciado por Takeitrip AI
              </div>
            </motion.div>

              <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
            >
              Encuentra tu próximo hotel con Takeitrip
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-gray-600 dark:text-gray-400"
            >
              Takeitrip usa IA conversacional para entender tus prioridades (presupuesto, zona, estilo) y ofrecer hoteles con enlaces de reserva.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <Link href="/chat">
                <Button size="lg" className="text-base">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Chatear con Takeitrip
                </Button>
              </Link>
              <Link href="/destinos">
                <Button variant="outline" size="lg" className="text-base">
                  <Globe className="mr-2 h-5 w-5" />
                  Ver destinos profesionales
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400"
            >
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Takeitrip - Recomendaciones personalizadas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hotel className="h-4 w-4" />
                  <span>Hoteles reales con enlaces de reserva</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Cobertura global: principales ciudades</span>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              ¿Por qué usar nuestro asistente?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Combinamos inteligencia artificial con las mejores ofertas de hoteles para darte recomendaciones personalizadas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div
                        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Destinos populares
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400">
              Explora los destinos más buscados por nuestros usuarios.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {popularDestinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link href={`/hoteles/${dest.slug}`}>
                  <div className="group relative h-72 overflow-hidden rounded-2xl">
                    <img
                      src={dest.image}
                      alt={`Hoteles en ${dest.name}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="mb-1 block text-2xl">{dest.emoji}</span>
                      <h3 className="text-xl font-bold">{dest.name}</h3>
                      <p className="text-sm text-gray-300">{dest.country}</p>
                      <div className="mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-200">{dest.rating}</span>
                      </div>
                    </div>
                    <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
              Lo que dicen nuestros usuarios
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
                        <span className="text-sm font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Compass className="mx-auto mb-6 h-12 w-12 text-white/80" />
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              ¿Listo para encontrar tu hotel ideal?
            </h2>
            <p className="mb-8 text-lg text-blue-100">
              Nuestro asistente de IA está disponible 24/7 para ayudarte a planificar tu próximo viaje.
            </p>
            <Link href="/chat">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
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
