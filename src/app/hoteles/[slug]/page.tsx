import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MapPin, Star, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

const cityNames: Record<string, string> = {
  paris: "París",
  roma: "Roma",
  bruselas: "Bruselas",
  tokio: "Tokio",
  "nueva-york": "Nueva York",
  barcelona: "Barcelona",
  seul: "Seúl",
  amsterdam: "Ámsterdam",
  londres: "Londres",
  berlin: "Berlín",
  praga: "Praga",
  viena: "Viena",
  lisboa: "Lisboa",
  atenas: "Atenas",
  estambul: "Estambul",
};

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = cityNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `Hoteles en ${city}`,
    description: `Descubre los mejores hoteles en ${city}. Recomendaciones personalizadas con inteligencia artificial, precios actualizados y enlaces de reserva.`,
    openGraph: {
      title: `Hoteles en ${city} | Takeitrip`,
      description: `Encuentra hoteles recomendados en ${city} con precios actualizados y enlaces de reserva directa.`,
      type: "website",
    },
    alternates: {
      canonical: `/hoteles/${slug}`,
    },
  };
}

const cityDescriptions: Record<string, { content: string; faqs: { q: string; a: string }[] }> = {
  paris: {
    content: "París, la ciudad de la luz, es uno de los destinos más populares del mundo. Desde hoteles boutique en Le Marais hasta establecimientos de lujo cerca de la Torre Eiffel, encontrarás opciones para todos los presupuestos y estilos.",
    faqs: [
      { q: "¿Cuál es la mejor zona para alojarse en París?", a: "Le Marais, Saint-Germain-des-Prés y el Barrio Latino son las zonas más populares por su ubicación céntrica y ambiente." },
      { q: "¿Cuánto cuesta un hotel en París?", a: "Los precios varían desde 80€ para hoteles económicos hasta 500€+ para hoteles de lujo. La media está entre 120-200€ por noche." },
      { q: "¿Cuál es la mejor época para visitar París?", a: "Primavera (abril-junio) y otoño (septiembre-octubre) ofrecen el mejor clima y menos aglomeraciones." },
    ],
  },
  roma: {
    content: "Roma es una ciudad eterna llena de historia, arte y gastronomía. Los barrios de Monti, Trastevere y el Centro Histórico son ideales para alojarse y explorar los monumentos más icónicos.",
    faqs: [
      { q: "¿Dónde dormir barato en Roma?", a: "Monti y Termini ofrecen hoteles a precios razonables bien conectados con el transporte público." },
      { q: "¿Es Roma cara para turistas?", a: "Roma puede ser moderada. Hoteles desde 70€ y restaurantes con menú del día desde 12€." },
      { q: "¿Cuántos días se necesitan en Roma?", a: "Mínimo 3-4 días para ver lo esencial. Una semana ideal para explorar con calma." },
    ],
  },
  bruselas: {
    content: "Bruselas combina arquitectura impresionante, gastronomía de clase mundial y una escena cultural vibrante. La Grand Place y el Barrio Europeo son zonas imperdibles.",
    faqs: [
      { q: "¿Qué zona elegir en Bruselas?", a: "Grand Place y el Barrio Europeo son las mejores zonas. Ixelles ofrece buena relación calidad-precio." },
      { q: "¿Cuánto cuesta un hotel en Bruselas?", a: "Desde 80€ en temporada baja hasta 250€ en temporada alta o eventos especiales." },
      { q: "¿Vale la pena visitar Bruselas?", a: "Absolutamente. Es una ciudad con mucho que ofrecer, desde la Grand Place hasta los museos de cómic." },
    ],
  },
  tokio: {
    content: "Tokio es una metrópoli donde la tradición milenaria se encuentra con la tecnología de vanguardia. Shinjuku, Shibuya y Asakusa ofrecen experiencias completamente distintas en una misma ciudad.",
    faqs: [
      { q: "¿Dónde alojarse en Tokio por primera vez?", a: "Shinjuku es ideal por su conexión de transporte y vida nocturna. Shibuya para jóvenes y Asakusa para ambiente tradicional." },
      { q: "¿Cuánto cuesta un hotel en Tokio?", a: "Desde 60€ en hoteles cápsula hasta 300€+ en hoteles de lujo. La media está entre 80-150€." },
      { q: "¿Cuál es la mejor época para ir a Tokio?", a: "Primavera (marzo-mayo) para los cerezos en flor y otoño (octubre-noviembre) para los colores otoñales." },
    ],
  },
  "nueva-york": {
    content: "Nueva York es la ciudad que nunca duerme. Manhattan, Brooklyn y Queens ofrecen una experiencia cultural, gastronómica y de entretenimiento sin igual en el mundo.",
    faqs: [
      { q: "¿Qué barrio elegir en Nueva York?", a: "Midtown para turismo, SoHo para compras, Chelsea para arte, y Brooklyn para una experiencia más local y auténtica." },
      { q: "¿Cuánto cuesta un hotel en Nueva York?", a: "Los precios son elevados. Desde 120€ en hoteles pequeños hasta 500€+ en Manhattan. Brooklyn es más accesible." },
      { q: "¿Cuántos días se necesitan en Nueva York?", a: "Mínimo 5-7 días para ver lo esencial. Cada barrio requiere al menos medio día de exploración." },
    ],
  },
  barcelona: {
    content: "Barcelona ofrece la combinación perfecta de playa, cultura y vida nocturna. El Born, Eixample y Barceloneta son zonas imperdibles con una gastronomía excepcional.",
    faqs: [
      { q: "¿Dónde alojarse en Barcelona?", a: "Eixample para elegancia, El Born para ambiente bohemio, Barceloneta para playa, y Gràcia para vida local." },
      { q: "¿Es Barcelona cara para turistas?", a: "Moderada. Hoteles desde 70€, restaurantes con menú del día desde 12€, y transporte público asequible." },
      { q: "¿Cuál es la mejor época para visitar Barcelona?", a: "Primavera (abril-junio) y otoño (septiembre-octubre). El verano es muy caluroso y concurrido." },
    ],
  },
  amsterdam: {
    content: "Ámsterdam cautiva con sus canales, casas estrechas y una atmósfera única y tolerante. El Museo Van Gogh, el Rijksmuseum y el Barrio Rojo son parte de su encanto.",
    faqs: [
      { q: "¿Dónde alojarse en Ámsterdam?", a: "El centro canalístico para turismo, Jordaan para ambiente local, De Pijp para gastronomía, y Amsterdam Noord para vanguardia." },
      { q: "¿Cuánto cuesta un hotel en Ámsterdam?", a: "Desde 90€ en temporada baja hasta 250€ en temporada alta. Es una ciudad relativamente cara." },
      { q: "¿Cuál es la mejor época para visitar Ámsterdam?", a: "Primavera (abril-mayo) para los tulipanes, y verano para los festivales y terrazas al aire libre." },
    ],
  },
  berlin: {
    content: "Berlín es una ciudad en constante transformación. El Muro de Berlín, Kreuzberg y la escena de clubes la hacen única en Europa. Historia, arte y diversión se encuentran en cada esquina.",
    faqs: [
      { q: "¿Dónde alojarse en Berlín?", a: "Mitte para turismo, Kreuzberg para vida nocturna, Prenzlauer Berg para ambiente familiar, y Friedrichshain para alternativo." },
      { q: "¿Cuánto cuesta un hotel en Berlín?", a: "Más asequible que otras capitales europeas. Desde 50€ hasta 150€ la media." },
      { q: "¿Cuál es la mejor época para visitar Berlín?", a: "Mayo-septiembre para el mejor clima. La Semana de la Cultura en agosto es imperdible." },
    ],
  },
  viena: {
    content: "Viena irradia elegancia con sus palacios, museos y cafés históricos. La Ópera Estatal, el Palacio de Schönbrunn y el Barrio Museum son esenciales en cualquier visita.",
    faqs: [
      { q: "¿Dónde alojarse en Viena?", a: "Innere Stadt para lujo, Neubau para arte contemporáneo, y Spittelberg para ambiente bohemio." },
      { q: "¿Cuánto cuesta un hotel en Viena?", a: "Desde 70€ en pensiones hasta 250€ en hoteles de categoría. Buena relación calidad-precio." },
      { q: "¿Cuál es la mejor época para visitar Viena?", a: "Abril-octubre. El Consejo de Invierno (diciembre) tiene los mercados navideños más famosos de Europa." },
    ],
  },
  praga: {
    content: "Praga parece sacada de un cuento de hadas con su Ciudad Vieja, el Puente Carlos y la cerveza artesanal. Es uno de los destinos europeos con mejor relación calidad-precio.",
    faqs: [
      { q: "¿Dónde alojarse en Praga?", a: "Ciudad Vieja para turismo, Žižkov para ambiente local, Vinohrady para elegancia, y Letná para vistas panorámicas." },
      { q: "¿Cuánto cuesta un hotel en Praga?", a: "Muy asequible. Desde 40€ hasta 120€ la media. Excelente relación calidad-precio." },
      { q: "¿Cuál es la mejor época para visitar Praga?", a: "Primavera (abril-junio) y otoño (septiembre-octubre). Evita agosto por las aglomeraciones." },
    ],
  },
  lisboa: {
    content: "Lisboa enamora con sus calles empedradas, fado y pastéis de nata. Alfama, Bairro Alto y Belém son zonas que no puedes perderte con una gastronomía mediterránea excepcional.",
    faqs: [
      { q: "¿Dónde alojarse en Lisboa?", a: "Alfama para tradición, Baixa para comodidad, Bairro Alto para vida nocturna, y Príncipe Real para tendencia." },
      { q: "¿Cuánto cuesta un hotel en Lisboa?", a: "Desde 50€ hasta 150€. Una de las capitales europeas más asequibles." },
      { q: "¿Cuál es la mejor época para visitar Lisboa?", a: "Marzo-octubre. Junio tiene las Festas de Lisboa con marchas populares." },
    ],
  },
  atenas: {
    content: "Atenas es la cuna de la civilización occidental donde ruinas milenarias se mezclan con vida mediterránea. La Acrópolis, Plaka y los mercados de Monastiraki son imperdibles.",
    faqs: [
      { q: "¿Dónde alojarse en Atenas?", a: "Plaka para turismo, Monastiraki para ambiente alternativo, Syntagma para comodidad, y Kolonaki para elegancia." },
      { q: "¿Cuánto cuesta un hotel en Atenas?", a: "Muy asequible. Desde 40€ hasta 130€. Excelente destino con presupuesto moderado." },
      { q: "¿Cuál es la mejor época para visitar Atenas?", a: "Abril-octubre. La primavera y otoño tienen el mejor clima sin el calor extremo del verano." },
    ],
  },
  estambul: {
    content: "Estambul es una fusión única de culturas entre Europa y Asia. La Mezquita Azul, el Gran Bazar y el Bósforo crean una experiencia inolvidable llena de sabores orientales.",
    faqs: [
      { q: "¿Dónde alojarse en Estambul?", a: "Sultanahmet para historia, Beyoğlu para cultura, Kadıköy para vida local, y Beşiktaş para gastronomía." },
      { q: "¿Cuánto cuesta un hotel en Estambul?", a: "Muy económico. Desde 30€ hasta 100€. Una de las ciudades más baratas de su categoría." },
      { q: "¿Cuál es la mejor época para visitar Estambul?", a: "Abril-mayo y septiembre-noviembre. El verano es caluroso y el invierno frío." },
    ],
  },
  londres: {
    content: "Londres es una de las ciudades más dinámicas del mundo. Desde Buckingham hasta Shoreditch, cada barrio tiene personalidad propia con museos gratuitos y vida cultural vibrante.",
    faqs: [
      { q: "¿Dónde alojarse en Londres?", a: "Westminster para turismo, Covent Garden para comodidad, Shoreditch para tendencia, y Camden para alternativo." },
      { q: "¿Cuánto cuesta un hotel en Londres?", a: "Es una ciudad cara. Desde 100€ hasta 300€+. Considera hoteles en zonas periféricas bien conectadas." },
      { q: "¿Cuál es la mejor época para visitar Londres?", a: "Mayo-septiembre para el mejor clima. Junio-julio para los festivales de verano." },
    ],
  },
  seul: {
    content: "Seúl combina tradición milenaria con tecnología de vanguardia. Los palacios de Gyeongbokgung, Gangnam y la escena K-pop y K-food la hacen un destino fascinante.",
    faqs: [
      { q: "¿Dónde alojarse en Seúl?", a: "Myeongdong para compras, Gangnam para lujo, Hongdae para vida nocturna, y Insadong para tradición." },
      { q: "¿Cuánto cuesta un hotel en Seúl?", a: "Desde 50€ hasta 150€. Buena relación calidad-precio comparado con otras capitales asiáticas." },
      { q: "¿Cuál es la mejor época para visitar Seúl?", a: "Primavera (abril-mayo) para los cerezos y otoño (septiembre-noviembre) para los colores otoñales." },
    ],
  },
};

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const city = slug.charAt(0).toUpperCase() + slug.slice(1);

  const hotels = await prisma.hotel.findMany({
    where: {
      city: { contains: city, mode: "insensitive" },
      isActive: true,
    },
    orderBy: { rating: "desc" },
  });

  const cityInfo = cityDescriptions[slug] || {
    content: `${city} es un destino increíble con una gran variedad de hoteles para todos los gustos y presupuestos. Nuestra IA puede ayudarte a encontrar el alojamiento perfecto.`,
    faqs: [],
  };

  const displayName = cityNames[slug] || city;

  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Hoteles en ${displayName}`,
    description: cityInfo.content,
    url: `https://takeitrip.com/hoteles/${slug}`,
    publisher: {
      "@type": "Organization",
      name: "Takeitrip",
      url: "https://takeitrip.com",
    },
  };

  const faqSchema = cityInfo.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityInfo.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  } : null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json">{JSON.stringify(hotelSchema)}</script>
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      {/* Breadcrumb */}
      <Link
        href="/destinos"
        className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 dark:text-gray-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a destinos
      </Link>

      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          Hoteles en {city}
        </h1>
        <p className="max-w-3xl text-gray-600 dark:text-gray-400">
          {cityInfo.content}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MapPin className="h-4 w-4" />
          {hotels.length} hoteles encontrados
        </div>
      </div>

      {/* Hotels Grid */}
      {hotels.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="group overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={hotel.imageUrl}
                  alt={hotel.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-3 left-3">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    {hotel.rating}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-5">
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {hotel.name}
                </h3>
                <p className="mb-2 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin className="h-3 w-3" />
                  {hotel.zone}, {hotel.city}
                </p>
                <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {hotel.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                  <div>
                    <span className="text-2xl font-bold text-blue-600">
                      €{hotel.pricePerNight}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400"> / noche</span>
                  </div>
                  <a
                    href={hotel.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-700"
                  >
                    Reservar
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-800 dark:bg-gray-900">
          <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            No se encontraron hoteles
          </h3>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            Prueba a preguntar a nuestro asistente de IA para obtener recomendaciones personalizadas.
          </p>
          <Link href="/chat">
            <Button>
              Preguntar a la IA
            </Button>
          </Link>
        </div>
      )}

      {/* FAQ Section */}
      {cityInfo.faqs.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
            Preguntas frecuentes sobre {city}
          </h2>
          <div className="space-y-4">
            {cityInfo.faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    {faq.q}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {faq.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
