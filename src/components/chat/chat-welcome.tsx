"use client";

import { motion } from "framer-motion";
import { MessageSquare, MapPin, Hotel, Compass, Sparkles } from "lucide-react";

const suggestions = [
  {
    icon: Hotel,
    text: "Busco un hotel barato en Bruselas",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: MapPin,
    text: "Hoteles románticos en París",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Compass,
    text: "Tengo 700€ para viajar 5 días",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Sparkles,
    text: "Qué zona me recomiendas en Roma",
    color: "from-orange-500 to-orange-600",
  },
];

interface ChatWelcomeProps {
  onSuggestion: (text: string) => void;
}

export function ChatWelcome({ onSuggestion }: ChatWelcomeProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
          <MessageSquare className="h-10 w-10 text-white" />
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Hola, soy tu asistente de viajes
        </h2>
        <p className="mb-8 max-w-md text-gray-600 dark:text-gray-400">
          Pregúntame sobre hoteles, destinos o planes de viaje. Usaré IA para darte recomendaciones personalizadas.
        </p>
      </motion.div>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <motion.button
              key={suggestion.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => onSuggestion(suggestion.text)}
              className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-blue-700"
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${suggestion.color} text-white`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 dark:text-gray-300 dark:group-hover:text-blue-400">
                {suggestion.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
