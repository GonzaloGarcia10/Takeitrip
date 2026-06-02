"use client";

import { motion } from "framer-motion";
import { MessageSquare, MapPin, Hotel, Compass, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const suggestions = [
  {
    icon: Hotel,
    text: "Busco un hotel barato en Bruselas",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: MapPin,
    text: "Hoteles románticos en París",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Compass,
    text: "Tengo 700€ para viajar 5 días",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Sparkles,
    text: "Qué zona me recomiendas en Roma",
    color: "from-green-500 to-emerald-500",
  },
];

interface ChatWelcomeProps {
  onSuggestion: (text: string) => void;
}

export function ChatWelcome({ onSuggestion }: ChatWelcomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.3 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl shadow-purple-500/30"
        >
          <MessageSquare className="h-12 w-12 text-white" />
        </motion.div>
        
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Hola, soy tu asistente de viajes
        </h2>
        <p className="mb-10 max-w-lg text-lg text-white/50">
          Pregúntame sobre hoteles, destinos o planes de viaje. Usaré IA para darte recomendaciones personalizadas.
        </p>
        
        <div className="flex gap-4 justify-center mb-12">
          <Link
            href="/destinos"
            className="flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-white/5 hover:text-white hover:border-white/30"
          >
            <MapPin className="h-4 w-4" />
            Ver destinos
          </Link>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-3xl"
      >
        <p className="mb-4 text-center text-sm text-white/30 uppercase tracking-wider">
          Prueba con algo como
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {suggestions.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <motion.button
                key={suggestion.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                onClick={() => onSuggestion(suggestion.text)}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-left transition-all hover:border-white/20 hover:bg-white/10"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${suggestion.color} shadow-lg`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="flex-1 text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                  {suggestion.text}
                </span>
                <ArrowRight className="h-4 w-4 text-white/30 transition-all group-hover:translate-x-1 group-hover:text-white/50" />
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}