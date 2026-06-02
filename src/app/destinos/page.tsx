import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight, Star, TrendingUp, Globe, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Zonas y Guías de Destinos — Blog de viajes | Takeitrip",
  description:
    "Guías de zonas y destinos: barrios recomendados, precios medios y consejos prácticos para reservar hoteles. Contenido creado para ayudarte a elegir la mejor zona según tu plan de viaje.",
  keywords: [
    "destinos",
    "zonas",
    "guía de viajes",
    "hoteles",
    "barrios",
    "Takeitrip",
  ],
  openGraph: {
    title: "Zonas y Guías de Destinos | Takeitrip",
    description:
      "Guías detalladas sobre zonas y barrios para alojarte: precios, puntos de interés y recomendaciones de hoteles.",
    type: "website",
    images: [
      {
        url: "https://takeitrip.es/og/destinos.jpg",
        width: 1200,
        height: 630,
        alt: "Destinos y zonas recomendadas - Takeitrip",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zonas y Guías de Destinos | Takeitrip",
    description:
      "Guías y recomendaciones de zonas para alojarte: precios, barrios y hoteles.",
    images: ["https://takeitrip.es/og/destinos.jpg"],
  },
  alternates: {
    canonical: "https://takeitrip.es/destinos",
  },
};

interface Destination {
  name: string;
  slug: string;
  country: string;
  region: string;
  short: string;
  description: string;
  highlights: string[];
  priceRange: string;
  image: string;
  badge?: string;
  rating: number;
  bestTime: string;
}

const destinations: Destination[] = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    region: "Europa",
    short: "La ciudad de la luz con barrios icónicos y gastronomía de primer nivel.",
    description: "París combina arte, historia y moda en cada esquina. Desde el Louvre hasta los cafés de Montmartre, cada barrio tiene su propio carácter.",
    highlights: ["Hoteles boutique en Le Marais", "Cerca de la Torre Eiffel", "Gastronomía Michelin"],
    priceRange: "120€ - 220€",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    badge: "Top Destino",
    rating: 4.8,
    bestTime: "Abril - Junio",
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    region: "Europa",
    short: "Historia milenaria, gastronomía auténtica y encanto mediterráneo.",
    description: "Roma es un museo al aire libre donde cada calle cuenta una historia. El Coliseo, el Vaticano y Trastevere son solo el comienzo.",
    highlights: ["Centro Histórico", "Trastevere y Monti", "Gastronomía tradicional"],
    priceRange: "70€ - 180€",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    badge: "Cultural",
    rating: 4.7,
    bestTime: "Marzo - Mayo",
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    region: "Europa",
    short: "Playas, arquitectura modernista y una escena gastronómica en auge.",
    description: "Barcelona ofrece la combinación perfecta de playa, cultura y vida nocturna. El Born, Eixample y Barceloneta son zonas imperdibles.",
    highlights: ["Eixample y El Born", "Playa de Barceloneta", "Arquitectura Gaudí"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Mayo - Septiembre",
  },
  {
    name: "Ámsterdam",
    slug: "amsterdam",
    country: "Países Bajos",
    region: "Europa",
    short: "Canales, museos de clase mundial y una atmósfera única e tolerante.",
    description: "Ámsterdam cautura con sus canales, casas estrechas y una escena cultural vibrante. El Museo Van Gogh y el Barrio Rojo son iconos.",
    highlights: ["Centro y Canales", "Jordaan y De Pijp", "Museos imperdibles"],
    priceRange: "100€ - 200€",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&h=800&fit=crop",
    rating: 4.5,
    bestTime: "Abril - Septiembre",
  },
  {
    name: "Bruselas",
    slug: "bruselas",
    country: "Bélgica",
    region: "Europa",
    short: "Capital europea con arquitectura impresionante y gastronomía de clase mundial.",
    description: "Bruselas sorprende con su Grand Place, su chocolate artesanal y su cerveza de tradición centenaria. Ciudad cosmopolita y acogedora.",
    highlights: ["Grand Place", "Barrio Europeo", "Chocolate y cerveza"],
    priceRange: "80€ - 160€",
    image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=1200&h=800&fit=crop",
    rating: 4.4,
    bestTime: "Marzo - Octubre",
  },
  {
    name: "Berlín",
    slug: "berlin",
    country: "Alemania",
    region: "Europa",
    short: "Historia contemporánea, escena artística underground y vida nocturna legendaria.",
    description: "Berlín es una ciudad en constante transformación. El Muro de Berlín, Kreuzberg y la escena de clubes la hacen única en Europa.",
    highlights: ["Centro y Mitte", "Kreuzberg y Neukölln", "Museos e historia"],
    priceRange: "70€ - 150€",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&h=800&fit=crop",
    badge: "Emergente",
    rating: 4.5,
    bestTime: "Mayo - Septiembre",
  },
  {
    name: "Viena",
    slug: "viena",
    country: "Austria",
    region: "Europa",
    short: "Música, palacios imperiales y la cultura del café vienés.",
    description: "Viena irradia elegancia con sus palacios, museos y cafés históricos. La ópera, el Palacio de Schönbrunn y el Barrio Museum son esenciales.",
    highlights: ["Centro Innere Stadt", "Schönbrunn", "Cafés y música clásica"],
    priceRange: "90€ - 180€",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Abril - Octubre",
  },
  {
    name: "Praga",
    slug: "praga",
    country: "Chequia",
    region: "Europa",
    short: "Ciudad de las cien torres con arquitectura gótica y prices asequibles.",
    description: "Praga parece sacada de un cuento de hadas. Su Ciudad Vieja, el Puente Carlos y la cerveza artesanal la hacen un destino perfecto.",
    highlights: ["Ciudad Vieja", "Puente Carlos", "Cerveza artesanal"],
    priceRange: "50€ - 120€",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop",
    badge: "Mejor Precio",
    rating: 4.5,
    bestTime: "Abril - Junio",
  },
  {
    name: "Lisboa",
    slug: "lisboa",
    country: "Portugal",
    region: "Europa",
    short: "Colinas, tranvías amarillos y una gastronomía mediterránea excepcional.",
    description: "Lisboa enamora con sus calles empedradas, fado y pastéis de nata. Alfama, Bairro Alto y Belém son zonas que no puedes perderte.",
    highlights: ["Alfama y Baixa", "Belém y torre", "Fado y gastronomía"],
    priceRange: "60€ - 140€",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Marzo - Octubre",
  },
  {
    name: "Atenas",
    slug: "atenas",
    country: "Grecia",
    region: "Europa",
    short: "Cuna de la civilización occidental con ruinas milenarias y vida mediterránea.",
    description: "Atenas mezcla lo antiguo con lo moderno. La Acrópolis, Plaka y los mercados de Monastiraki te transportan a otra época.",
    highlights: ["Acrópolis y Plaka", "Monastiraki", "Gastronomía griega"],
    priceRange: "50€ - 130€",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
    rating: 4.4,
    bestTime: "Abril - Octubre",
  },
  {
    name: "Estambul",
    slug: "estambul",
    country: "Turquía",
    region: "Europa/Asia",
    short: "Puente entre Europa y Asia con mezquitas, bazares y sabores orientales.",
    description: "Estambul es una fusión única de culturas. La Mezquita Azul, el Gran Bazar y el Bósforo crean una experiencia inolvidable.",
    highlights: ["Sultanahmet", "Gran Bazar", "Paseo por el Bósforo"],
    priceRange: "40€ - 110€",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&h=800&fit=crop",
    badge: "Exótico",
    rating: 4.5,
    bestTime: "Abril - Mayo",
  },
  {
    name: "Londres",
    slug: "londres",
    country: "Reino Unido",
    region: "Europa",
    short: "Capital global con museos gratuitos, teatro West End y parques reales.",
    description: "Londres es una de las ciudades más dinámicas del mundo. Desde Buckingham hasta Shoreditch, cada barrio tiene personalidad propia.",
    highlights: ["Westminster y Covent Garden", "South Bank", "Museos gratuitos"],
    priceRange: "120€ - 280€",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop",
    rating: 4.7,
    bestTime: "Mayo - Septiembre",
  },
  {
    name: "Tokio",
    slug: "tokio",
    country: "Japón",
    region: "Asia",
    short: "Futuro y tradición se encuentran en una de las ciudades más fascinantes del mundo.",
    description: "Tokio deslumbra con sus templos, jardines, tecnología de vanguardia y gastronomía con más estrellas Michelin que cualquier otra ciudad.",
    highlights: ["Shinjuku y Shibuya", "Asakusa y templos", "Gastronomía Michelin"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    badge: "Top Destino",
    rating: 4.9,
    bestTime: "Marzo - Mayo",
  },
  {
    name: "Nueva York",
    slug: "nueva-york",
    country: "Estados Unidos",
    region: "América",
    short: "La ciudad que nunca duerme: rascacielos, Broadway y Central Park.",
    description: "Nueva York es un universo en una ciudad. Manhattan, Brooklyn y Queens ofrecen una experiencia cultural y gastronómica sin igual.",
    highlights: ["Midtown y Times Square", "Brooklyn", "Central Park y SoHo"],
    priceRange: "150€ - 350€",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
    rating: 4.7,
    bestTime: "Abril - Junio",
  },
  {
    name: "Seúl",
    slug: "seul",
    country: "Corea del Sur",
    region: "Asia",
    short: "K-culture, templos milenarios y una escena culinaria explosiva.",
    description: "Seúl combina tradición milenaria con tecnología de vanguardia. Los palacios de Gyeongbokgung y Gangnam son solo el comienzo.",
    highlights: ["Centro y Gangnam", "Insadong y Hongdae", "K-food y K-culture"],
    priceRange: "60€ - 150€",
    image: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1200&h=800&fit=crop",
    badge: "Emergente",
    rating: 4.6,
    bestTime: "Abril - Junio",
  },
];

const regions = [...new Set(destinations.map((d) => d.region))];

function StructuredData() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
          item: "https://takeitrip.es/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Destinos",
        item: "https://takeitrip.es/destinos",
      },
    ],
  };

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zonas y Guías de Destinos | Takeitrip",
    description:
      "Guías de zonas y barrios para alojarte: precios, puntos de interés y recomendaciones de hoteles.",
    url: "https://takeitrip.es/destinos",
    publisher: {
      "@type": "Organization",
      name: "Takeitrip",
      url: "https://takeitrip.es",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: destinations.map((dest, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "TouristDestination",
          name: dest.name,
          description: dest.short,
          url: `https://takeitrip.es/hoteles/${dest.slug}`,
        },
      })),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Cómo funciona Takeitrip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pregunta en lenguaje natural y Takeitrip recomienda hoteles y zonas según tu presupuesto y preferencias. Usa inteligencia artificial para entender lo que buscas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Son reales los enlaces de reserva?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. Usamos enlaces afiliados de Booking.com. El precio que ves es el precio real que pagarás al reservar.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuántos destinos tiene Takeitrip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Takeitrip cubre más de 15 ciudades principales en Europa, Asia y América, con hoteles verificados y recomendaciones personalizadas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Takeitrip es gratuito?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, el uso del asistente es 100% gratuito. Ganamos una comisión cuando reservas a través de nuestros enlaces, sin coste adicional para ti.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      <script type="application/ld+json">{JSON.stringify(collection)}</script>
      <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
    </>
  );
}

export default function DestinosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <StructuredData />

      {/* Hero */}
      <div className="mb-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
          <Globe className="h-4 w-4" />
          {destinations.length} destinos disponibles
        </div>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
          Zonas y Guías de Destinos
        </h1>

        <div className="mx-auto mb-4 max-w-3xl text-sm text-gray-500 dark:text-gray-400">
          Publicado por <strong>Takeitrip Editorial</strong> • Última actualización: 01/06/2026
        </div>

        <p className="mx-auto mb-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400 prose">
          En esta guía tipo blog encontrarás análisis por zonas y barrios, rangos de precio orientativos y recomendaciones prácticas para elegir el hotel ideal según tu estilo de viaje. Usamos datos actualizados y procesos automáticos de IA para identificar las mejores áreas donde alojarte, desde barrios céntricos hasta zonas con mejor relación calidad-precio.
        </p>

        <p className="mx-auto max-w-3xl text-sm text-gray-500 dark:text-gray-400">
          <span className="mr-4"> <Shield className="inline h-4 w-4" /> Hoteles verificados</span>
          <span className="mr-4"> <TrendingUp className="inline h-4 w-4" /> Precios actualizados</span>
          <span> <Star className="inline h-4 w-4" /> Recomendaciones IA</span>
        </p>
      </div>

      {/* Region Filters */}
      {regions.map((region) => {
        const regionDestinations = destinations.filter((d) => d.region === region);
        return (
          <section key={region} className="mb-16">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Hoteles en {region}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {regionDestinations.length} destinos disponibles
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {regionDestinations.map((dest) => (
                <Link key={dest.slug} href={`/hoteles/${dest.slug}`} className="group block">
                  <article
                    itemScope
                    itemType="https://schema.org/TouristDestination"
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <meta itemProp="name" content={dest.name} />
                    <meta itemProp="url" content={`https://takeitrip.es/hoteles/${dest.slug}`} />
                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={dest.image}
                        alt={`Hoteles en ${dest.name}, ${dest.country}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2">
                          <h3 itemProp="name" className="text-xl font-bold">{dest.name}</h3>
                          {dest.badge && (
                            <span className="rounded-full bg-blue-500/90 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                              {dest.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-200">{dest.country}</p>
                      </div>
                      <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-medium text-gray-900 backdrop-blur-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {dest.rating}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p itemProp="description" className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {dest.short}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {dest.highlights.map((h, i) => (
                          <span
                            key={`${dest.slug}-hl-${i}`}
                            className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Precio medio</p>
                          <p className="text-lg font-bold text-blue-600">
                            {dest.priceRange} <span className="text-xs font-normal text-gray-500">/ noche</span>
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                          Ver hoteles
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>

                      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                        Mejor época: {dest.bestTime}
                      </p>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="mt-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-center sm:p-12">
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          ¿No encuentras tu destino?
        </h2>
        <p className="mb-6 text-blue-100">
          Nuestro asistente de IA puede ayudarte a encontrar hoteles en cualquier ciudad del mundo.
        </p>
        <Link
          href="/chat"
          className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-600 shadow-lg transition-colors hover:bg-gray-100"
        >
          Preguntar a la IA
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
