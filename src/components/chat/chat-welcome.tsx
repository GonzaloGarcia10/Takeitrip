"use client";

import { motion } from "framer-motion";
import { Sparkles, MapPin, Check, Hotel, Star, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";

const suggestions = [
  { icon: MapPin, label: "Hoteles en París centro", query: "Busco hotel en París centro, presupuesto 150€" },
  { icon: Hotel, label: "Hotel romántico", query: "Necesito un hotel romántico para fin de semana" },
  { icon: Star, label: "Mejor valorado", query: "Cuáles son los hoteles mejor valorados en Barcelona" },
  { icon: Clock, label: "5 días, 700€", query: "Tengo 700 euros para 5 días, qué me recomiendas" },
];

const popularDestinations = [
  { name: "París", slug: "paris" },
  { name: "Roma", slug: "roma" },
  { name: "Barcelona", slug: "barcelona" },
  { name: "Londres", slug: "londres" },
  { name: "Ámsterdam", slug: "amsterdam" },
  { name: "Berlín", slug: "berlin" },
];

const benefits = [
  { icon: Check, text: "Precios reales de Booking.com" },
  { icon: Check, text: "100% gratuito" },
  { icon: Check, text: "Sin registro" },
];

interface ChatWelcomeProps {
  onSuggestion: (text: string) => void;
}

export function ChatWelcome({ onSuggestion }: ChatWelcomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <div className="mb-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">
            Busca tu hotel ideal
          </h2>
          <p className="text-sm text-white/50">
            Escribe tu búsqueda abajo o selecciona una opción
          </p>
        </div>

        <div className="mb-8 flex flex-wrap justify-center gap-4">
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-white/40">
              <benefit.icon className="h-3.5 w-3.5 text-green-400" />
              <span>{benefit.text}</span>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <p className="mb-3 text-center text-xs font-medium text-white/30 uppercase tracking-wider">
            Sugerencias rápidas
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => onSuggestion(s.query)}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <s.icon className="h-4 w-4 shrink-0 text-blue-400" />
                {s.label}
                <ArrowRight className="ml-auto h-4 w-4 text-white/30" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-3 text-center text-xs font-medium text-white/30 uppercase tracking-wider">
            Destinos populares
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {popularDestinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/hoteles/${dest.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                {dest.name}
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}