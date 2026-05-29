"use client";

import { motion } from "framer-motion";
import { Star, MapPin, ExternalLink, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Hotel } from "@/types";

interface HotelCardProps {
  hotel: Hotel;
  index?: number;
}

export function HotelCard({ hotel, index = 0 }: HotelCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.image}
          alt={`${hotel.name} en ${hotel.city}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge variant="secondary" className="bg-white/90 text-gray-900 backdrop-blur-sm">
            <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
            {hotel.rating}
          </Badge>
        </div>
        <button className="absolute right-3 top-3 rounded-full bg-white/90 p-2 backdrop-blur-sm transition-colors hover:bg-white">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="p-5">
        <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
          {hotel.name}
        </h3>
        <div className="mb-3 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-3 w-3" />
          {hotel.zone}, {hotel.city}
        </div>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {hotel.description}
        </p>

        {hotel.highlights && hotel.highlights.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1">
            {hotel.highlights.map((highlight) => (
              <Badge key={highlight} variant="outline" className="text-xs">
                {highlight}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <div>
            <span className="text-2xl font-bold text-blue-600">€{hotel.pricePerNight}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400"> / noche</span>
          </div>
          <a
            href={hotel.bookingUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700"
            onClick={() => {
              if (typeof window !== "undefined") {
                fetch("/api/clicks", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    hotelName: hotel.name,
                    city: hotel.city,
                    url: hotel.bookingUrl,
                  }),
                });
              }
              }}
            >
              Reservar
              <ExternalLink className="h-3 w-3" />
            </a>
        </div>
      </div>
    </motion.div>
  );
}
