import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Destinos y Zonas Recomendadas | Takeitrip",
  description:
    "Explora destinos premium y descubre las mejores zonas para alojarte. Recomendaciones de hoteles y barrios por Takeitrip.",
  openGraph: {
    title: "Destinos y Zonas Recomendadas | Takeitrip",
    description:
      "Descubre las mejores zonas para alojarte y los hoteles recomendados por Takeitrip. Información práctica sobre barrios, precios y consejos de viaje.",
    type: "website",
  },
};

const destinations = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    short: "La ciudad del amor con barrios icónicos como Le Marais y Saint-Germain.",
    highlights: [
      "Hoteles boutique en Le Marais",
      "Zonas: Le Marais, Saint-Germain, Barrio Latino",
      "Precio medio por noche: 120€ - 220€",
    ],
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    short: "Historia, gastronomía y barrios con encanto como Trastevere y Monti.",
    highlights: [
      "Cerca del Coliseo y el centro histórico",
      "Zonas: Centro Histórico, Trastevere, Monti",
      "Precio medio por noche: 70€ - 180€",
    ],
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
  },
  {
    name: "Bruselas",
    slug: "bruselas",
    country: "Bélgica",
    short: "Capital europea con excelente conexión y barrios tranquilos cerca de la Grand Place.",
    highlights: [
      "Buena relación calidad-precio",
      "Zonas: Grand Place, Ixelles, Sablon",
      "Precio medio por noche: 80€ - 160€",
    ],
    image:
      "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=1200&h=800&fit=crop",
  },
  {
    name: "Tokio",
    slug: "tokio",
    country: "Japón",
    short: "Mezcla de tradición y modernidad—barrios como Shinjuku y Asakusa ofrecen experiencias distintas.",
    highlights: [
      "Zonas: Shinjuku, Shibuya, Asakusa",
      "Alternativas: hoteles cápsula y ryokans modernos",
      "Precio medio por noche: 80€ - 200€",
    ],
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
  },
  {
    name: "Nueva York",
    slug: "nueva-york",
    country: "Estados Unidos",
    short: "Capital cultural con barrios icónicos: Midtown, Chelsea y Lower Manhattan.",
    highlights: [
      "Zonas: Midtown, Chelsea, SoHo",
      "Precio medio por noche: 150€ - 350€",
      "Gran oferta de hoteles boutique y cadenas internacionales",
    ],
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    short: "Playas, arquitectura y barrios con gran vida cultural como El Born y Eixample.",
    highlights: [
      "Zonas: Eixample, El Born, Barceloneta",
      "Precio medio por noche: 80€ - 200€",
      "Excelente transporte y restaurantes de calidad",
    ],
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop",
  },
];

function StructuredData({ items }: { items: typeof destinations }) {
  const faq = [
    {
    question: "¿Cómo funciona Takeitrip?",
      answer:
        "Pregunta en lenguaje natural y Takeitrip recomienda hoteles y zonas según presupuesto y preferencias.",
    },
    {
      question: "¿Son reales los enlaces de reserva?",
      answer: "Sí. Usamos enlaces afiliados de Booking.com para monetizar las reservas.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  return (
    <script type="application/ld+json">{JSON.stringify(schema)}</script>
  );
}

export default function DestinosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <StructuredData items={destinations} />

      <div className="mb-12 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
          <MapPin className="h-4 w-4" />
          Explora destinos profesionales
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Destinos y Zonas Recomendadas
        </h1>
        <p className="mx-auto max-w-3xl text-gray-600 dark:text-gray-400">
          Seleccionamos y analizamos barrios, rango de precios y ventajas para que elijas la mejor zona y el hotel ideal con la ayuda de IA.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {destinations.map((dest, index) => (
          <div key={dest.slug} className="group rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="relative h-56 overflow-hidden rounded-t-2xl">
              <img src={dest.image} alt={`Imagen de ${dest.name}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-2xl font-bold">{dest.name}</h3>
                <p className="text-sm">{dest.country}</p>
              </div>
            </div>

              <div className="p-6">
              <p className="mb-4 text-gray-700 dark:text-gray-300">{dest.short}</p>
              <ul className="mb-4 list-inside list-disc text-sm text-gray-600 dark:text-gray-400">
                {dest.highlights.map((h, i) => (
                  <li key={`${dest.slug}-hl-${i}`}>{h}</li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <Link href={`/hoteles/${dest.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline">
                  Ver hoteles
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <span className="text-sm text-gray-500 dark:text-gray-400">Desde {getPriceFromHighlights(dest.highlights)} / noche</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPriceFromHighlights(highlights: string[]) {
  const found = highlights.find((h) => /\d+\s?€/.test(h));
  if (!found) return "—";
  // match ranges like "120€ - 220€" or single prices like "120€"
  const rangeMatch = found.match(/\d+\s?€\s?-\s?\d+\s?€/);
  if (rangeMatch) return rangeMatch[0].replace(/\s+/g, "");
  const singleMatch = found.match(/\d+\s?€/);
  return singleMatch ? singleMatch[0].replace(/\s+/g, "") : "—";
}
