"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, MapPin, Hotel, Compass, Sparkles, ArrowRight, Globe, Zap, Shield, Star } from "lucide-react";
import Link from "next/link";

const quickSearches = [
  { icon: Hotel, text: "Hoteles baratos en Bruselas", query: "Busco un hotel barato en Bruselas centro" },
  { icon: MapPin, text: "Hoteles románticos en París", query: "Necesito un hotel romántico en París cerca del Louvre" },
  { icon: Compass, text: "Viaje 5 días con 700€", query: "Tengo 700 euros para viajar 5 días, dónde me recomiendas" },
  { icon: Sparkles, text: "Mejor zona en Roma", query: "Cuál es la mejor zona para alojarse en Roma" },
];

const features = [
  { icon: Zap, text: "Respuesta instantánea", desc: "Recomendaciones en segundos" },
  { icon: Shield, text: "100% Gratuito", desc: "Sin costes ocultos" },
  { icon: Globe, text: "100+ destinos", desc: "Cobertura global" },
];

interface ChatWelcomeProps {
  onSuggestion: (text: string) => void;
}

export function ChatWelcome({ onSuggestion }: ChatWelcomeProps) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <div className="text-center mb-12">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30"
          >
            <MessageSquare className="h-10 w-10 text-white" />
          </motion.div>
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Dónde te gustaría alojarte?
          </h2>
          <p className="text-lg text-white/50">
            Describe lo que buscas y te ayudaré a encontrar el hotel perfecto
          </p>
        </div>

        <div className="relative mb-8">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue.trim()) {
                onSuggestion(inputValue);
                setInputValue("");
              }
            }}
            placeholder="Ej: Hotel romántico en París, menos de 150€ la noche..."
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-6 py-5 pr-12 text-white placeholder:text-white/30 backdrop-blur-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <button
            onClick={() => {
              if (inputValue.trim()) {
                onSuggestion(inputValue);
                setInputValue("");
              }
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-all hover:scale-105"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-6">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-white/40">
              <feature.icon className="h-4 w-4" />
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="mb-4 text-center text-sm text-white/30 uppercase tracking-wider">
            O explora destinos populares
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { name: "París", slug: "paris", emoji: "🗼" },
              { name: "Roma", slug: "roma", emoji: "🏛️" },
              { name: "Barcelona", slug: "barcelona", emoji: "🏖️" },
              { name: "Tokio", slug: "tokio", emoji: "🏯" },
            ].map((dest) => (
              <Link
                key={dest.slug}
                href={`/hoteles/${dest.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10"
              >
                <span className="text-2xl">{dest.emoji}</span>
                <span className="text-sm font-medium text-white/80 group-hover:text-white">{dest.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8">
          <p className="mb-4 text-center text-sm text-white/30 uppercase tracking-wider">
            Búsquedas populares
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickSearches.map((search, i) => (
              <button
                key={i}
                onClick={() => onSuggestion(search.query)}
                className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <search.icon className="h-4 w-4" />
                <span>{search.text}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}