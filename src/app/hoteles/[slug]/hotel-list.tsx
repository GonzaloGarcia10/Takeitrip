"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Hotel {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  zone: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  description: string;
  highlights: string[];
  imageUrl: string;
  bookingUrl: string;
  isActive: boolean;
}

interface HotelListProps {
  hotels: Hotel[];
  displayName: string;
  cityInfo: {
    content: string;
    faqs: { q: string; a: string }[];
  };
}

export function HotelList({ hotels, displayName, cityInfo }: HotelListProps) {
  return (
    <>
      {hotels.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel, index) => (
            <motion.article
              key={hotel.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4">
                  <div className="flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-lg font-bold text-white">{hotel.name}</h3>
                <p className="mb-3 flex items-center gap-1.5 text-sm text-white/50">
                  <span className="text-xs">{hotel.zone}, {hotel.city}</span>
                </p>
                <p className="mb-5 line-clamp-2 text-sm text-white/40">{hotel.description}</p>

                <div className="flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <span className="text-2xl font-bold text-white">€{hotel.pricePerNight}</span>
                    <span className="text-sm text-white/40"> / noche</span>
                  </div>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25"
                  >
                    Reservar
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
            <span className="text-3xl">🔍</span>
          </div>
          <h3 className="mb-2 text-xl font-bold text-white">
            No se encontraron hoteles
          </h3>
          <p className="mb-6 text-white/50">
            Prueba a preguntar a nuestro asistente de IA para obtener recomendaciones personalizadas.
          </p>
          <Link href="/chat">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <MessageSquare className="mr-2 h-4 w-4" />
              Preguntar a la IA
            </Button>
          </Link>
        </div>
      )}

      {cityInfo.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-white">
            Preguntas frecuentes sobre {displayName}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {cityInfo.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="mb-2 font-semibold text-white">{faq.q}</h3>
                <p className="text-sm text-white/50">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">
          ¿Necesitas más recomendaciones?
        </h2>
        <p className="mb-6 text-white/60">
          Nuestro asistente de IA puede ayudarte a encontrar el hotel perfecto según tus necesidades.
        </p>
        <Link href="/chat">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <MessageSquare className="mr-2 h-4 w-4" />
            Chatear con la IA
          </Button>
        </Link>
      </section>
    </>
  );
}