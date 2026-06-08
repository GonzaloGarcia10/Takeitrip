import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, ArrowLeft, MessageSquare, Eye, Utensils, Camera, Plane, Clock, MapPinned } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { HotelList } from "./hotel-list";
import { Button } from "@/components/ui/button";

interface HotelPageProps {
  params: Promise<{ slug: string }>;
}

const destinations: Record<string, {
  name: string;
  country: string;
  description: string;
  whatToSee: string[];
  gastronomy: string[];
  activities: string[];
  bestTime: string;
  avgFlightPrice: string;
  priceRange: string;
  image: string;
  faqs: { q: string; a: string }[];
}> = {
  paris: {
    name: "París",
    country: "Francia",
    description: "París es la capital de Francia, conocida mundialmente como la Ciudad de la Luz. Con emblemáticos monumentos como la Torre Eiffel, el Museo del Louvre y la Catedral de Notre-Dame, ofrece una combinación única de historia, arte, moda y gastronomía.",
    whatToSee: ["Torre Eiffel y Campos de Marte", "Museo del Louvre", "Notre-Dame y Sainte-Chapelle", "Arco de Triunfo y Campos Elíseos", "Montmartre y Sacré-Cœur", "Palacio de Versalles"],
    gastronomy: ["Croissants y pâtisserie francesa", "Quesos artesanales y vinos", "Cafés de Montmartre", "Restaurantes Michelin en Le Marais", "Boulangeries tradicionales"],
    activities: ["Paseo en barco por el Sena", "Compra en Galerías Lafayette", "Espectáculo en Moulin Rouge", "Picnic en Jardín de Luxembourg", "Visitar mercadillos de antigüedades"],
    bestTime: "Abril - Junio",
    avgFlightPrice: "150€",
    priceRange: "120€ - 220€",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Cuál es la mejor zona para alojarse en París?", a: "Le Marais para ambiente bohemio, Saint-Germain para elegancia, Champs-Élysées para lujo." },
      { q: "¿Cuánto cuesta un hotel en París?", a: "Los precios varían desde 80€ para económicos hasta 500€+ para lujo. La media está entre 120-200€." },
    ],
  },
  roma: {
    name: "Roma",
    country: "Italia",
    description: "Roma, la Ciudad Eterna, es un museo al aire libre donde cada calle cuenta siglos de historia. Desde el Coliseo Romano hasta el Vaticano, la ciudad ofrece experiencias únicas que combinan arte antiguo y gastronomía mediterránea.",
    whatToSee: ["Coliseo y Foro Romano", "Ciudad del Vaticano y Capilla Sixtina", "Fontana di Trevi y Pantheon", "Plaza de España y Trastevere", "Castillo de Sant'Angelo", "Termas de Caracalla"],
    gastronomy: ["Pasta fresca y carbonara auténtica", "Pizza romana al taglio", "Gelato artesanal", "Supplì y fritti romanos", "Vino local y aperitivos"],
    activities: ["Visitar Vatican Museums con guía", "Clase de cocina italiana", "Tour de barrios históricos", "Paseo en Vespa", "Degustación de vinos romanos"],
    bestTime: "Marzo - Mayo",
    avgFlightPrice: "120€",
    priceRange: "70€ - 180€",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde dormir barato en Roma?", a: "Monti y Termini ofrecen hoteles a precios razonables bien conectados." },
      { q: "¿Es Roma cara para turistas?", a: "Moderada. Hoteles desde 70€ y restaurantes con menú desde 12€." },
    ],
  },
  barcelona: {
    name: "Barcelona",
    country: "España",
    description: "Barcelona combina playas urbanas con arquitectura modernista. La ciudad de Gaudí ofrece desde la Sagrada Familia hasta el Park Güell. Su escena gastronómica, playas y vida nocturna la convierten en un destino versátil.",
    whatToSee: ["Sagrada Familia y Park Güell", "La Rambla y Barrio Gòtic", "Barceloneta y playas", "Casa Batlló y Pedrera", "Montjuïc y MNAC", "Camp Nou y Gràcia"],
    gastronomy: ["Tapas y paella", "Mercats como La Boqueria", "Chef Ferran Adrià", "Catadores y vermús", "Churros con chocolate"],
    activities: ["Ruta modernismo Gaudí", "Escenar beaches y chiringuitos", "Tour gastronómico del Born", "Noche en Poble Espanyol", "Visita a Montserrat"],
    bestTime: "Mayo - Septiembre",
    avgFlightPrice: "80€",
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Barcelona?", a: "Eixample para elegancia, El Born para ambiente bohemio, Barceloneta para playa." },
      { q: "¿Es Barcelona cara para turistas?", a: "Moderada. Hoteles desde 70€, restaurantes con menú desde 12€." },
    ],
  },
  amsterdam: {
    name: "Ámsterdam",
    country: "Países Bajos",
    description: "Ámsterdam cautiva con sus icónicos canales del siglo XVII, arquitectura narrow houses y una escena cultural vibrante. Ofrece desde los masters del Rijksmuseum hasta el Barrio Rojo.",
    whatToSee: ["Rijksmuseum y Van Gogh Museum", "Casa de Ana Frank", "Canales y wandering canals", "Jordaan y De Pijp", "Vondelpark y Amsterdam Noord", "Zaanse Schans windmills"],
    gastronomy: ["Poffertjes y stroopwafels", "Dutch cheese tasting", "Herring crudo", "Indonesian rijsttafel", "Craft beer breweries"],
    activities: ["Crucero por los canales", "Alquilar bicicleta", "Visitar coffee shops", "Tour de diseño y arquitectura", "Día en Marken y Volendam"],
    bestTime: "Abril - Septiembre",
    avgFlightPrice: "100€",
    priceRange: "100€ - 200€",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Cuál es la mejor zona para alojarse en Ámsterdam?", a: "El Centro Histórico para turismo, Jordaan para ambiente, De Pijp para vida nocturna." },
      { q: "¿Cuánto cuesta un hotel en Ámsterdam?", a: "Desde 90€ en temporada baja hasta 250€+ en temporada alta." },
    ],
  },
  bruselas: {
    name: "Bruselas",
    country: "Bélgica",
    description: "Bruselas fusiona lo histórico con lo contemporáneo. Su Grand Place declarado Patrimonio de la Humanidad, sus chocolates artesanales y cervezas trapistas la convierten en un destino único.",
    whatToSee: ["Grand Place y Atomium", "Manneken Pis y Jeanneke Pis", "Museos Real y de los Cómics", "Sablon y Notre-Dame", "Atomium y Mini-Europe", "Barrio Europeo y Mont des Arts"],
    gastronomy: ["Chocolate artesanal", "Waffles y stroopwafels", "Cervezas trapistas", "Cuberduls y candy", "Mejillones con fries"],
    activities: ["Tour de chocolates", "Cata de cervezas belgas", "Explorar comics murales", "Visitar Atomium", "Gamberrada en brasseries"],
    bestTime: "Marzo - Octubre",
    avgFlightPrice: "90€",
    priceRange: "80€ - 160€",
    image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Qué zona elegir en Bruselas?", a: "Grand Place y el Barrio Europeo son las mejores zonas." },
      { q: "¿Cuánto cuesta un hotel en Bruselas?", a: "Desde 80€ en temporada baja hasta 250€ en temporada alta." },
    ],
  },
  berlin: {
    name: "Berlín",
    country: "Alemania",
    description: "Berlín es una metrópolis en constante transformación. Desde el Muro de Berlín hasta la isla de los Museos, la ciudad cuenta historias de división y reunificación con una escena artística vibrante.",
    whatToSee: ["Brandenburger Tor y Reichstag", "East Side Gallery y Muro", "Museumsinsel y Alexanderplatz", "Checkpoint Charlie y Gendarmenmarkt", "Tiergarten y Kaufhaus", "Potsdamer Platz y Sony Center"],
    gastronomy: ["Currywurst y Döner", "Berliner Weisse", "Restaurantes turcos en Kreuzberg", "Craft beer en Prenzlauer Berg", "Markthalle Neun food hall"],
    activities: ["Visitar memorial del Muro", "Party en Berghain", "Tour de Street Art", "Explorar bunkers", "Day trip a Potsdam"],
    bestTime: "Mayo - Septiembre",
    avgFlightPrice: "85€",
    priceRange: "70€ - 150€",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Berlín?", a: "Mitte para turismo, Kreuzberg para vida nocturna, Prenzlauer Berg para familias." },
      { q: "¿Es Berlín cara para turistas?", a: "Relativamente económica para Europa. Hoteles desde 60€." },
    ],
  },
  viena: {
    name: "Viena",
    country: "Austria",
    description: "Viena es la capital del vals y la música clásica. Sus palacios imperiales como Schönbrunn y Hofburg, sus cafés históricos y su escena musical hacen de la ciudad una experiencia única.",
    whatToSee: ["Palacio de Schönbrunn y Hofburg", "Ópera Estatal y Musikverein", "Belvedere y su jardín", "Rathaus y Parlamento", "Karlskirche y Peterskirche", "Naschmarkt y Secession"],
    gastronomy: ["Café vienés y Sachertorte", "Wiener Schnitzel", "Apfelstrudel y Kaiserschmarrn", "Wiener Melange", "Heuriger en vineyards de Grinzing"],
    activities: ["Concierto de Mozart", "Tour de Kaisercáfés", "Degustación de vinos de Wachau", "Visita a zoológico Tiergarten", "Day spa en Therme"],
    bestTime: "Abril - Octubre",
    avgFlightPrice: "110€",
    priceRange: "90€ - 180€",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Viena?", a: "Innere Stadt para turismo, Leopoldstadt para ambiente moderno." },
      { q: "¿Cuánto cuesta un hotel en Viena?", a: "Desde 80€ en temporada baja hasta 300€+ en temporada alta." },
    ],
  },
  praga: {
    name: "Praga",
    country: "Chequia",
    description: "Praga, la Ciudad de las Cien Torres, parece sacada de un cuento medieval. Su Ciudad Vieja con el Reloj Astronómico, el Puente Carlos y el Castillo de Praga ofrecen una experiencia visual inolvidable.",
    whatToSee: ["Castillo de Praga y Callejón del Oro", "Puente Carlos y Ciudad Vieja", "Reloj Astronómico y Plaza", "Iglesia de San Nicolás en Malá Strana", "Casa Danzante y Petřín Hill", "Josefov y sinagoga Pinkas"],
    gastronomy: ["Cerveza Pilsner Urquell", "Svíčková y guláš", "Trdelník y chimney cake", "Klubí diferencial local", "Malostranská cafe"],
    activities: ["Tour de cerveza artesanal", "Visitar vieja brewery", "Paseo por Petřín hill", "Concierto de blues", "Day trip a Český Krumlov"],
    bestTime: "Abril - Junio",
    avgFlightPrice: "70€",
    priceRange: "50€ - 120€",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Praga?", a: "Ciudad Vieja para turismo, Malá Strana para ambiente romántico." },
      { q: "¿Es Praga cara para turistas?", a: "Muy económica. Hoteles desde 40€, comida desde 8€." },
    ],
  },
  lisboa: {
    name: "Lisboa",
    country: "Portugal",
    description: "Lisboa enamora con sus calles empedradas, tranvías amarillos, el fado en Alfama y los pastéis de nata de Belém. Construida sobre siete colinas, ofrece vistas panorámicas desde miradores únicos.",
    whatToSee: ["Castillo de São Jorge y Alfama", "Belém y Torre de Belém", "Praça do Comércio y Baixa", "Tranvía 28 y Barrio Alto", "Jerónimos y Padrão dos Descobrimentos", "LX Factory y Time Out Market"],
    gastronomy: ["Pastéis de Belém", "Bacalao a brás", "Ginjinha y Cherry liquor", "Francesinha", "Sea food fresco en mercados"],
    activities: ["Ride tranvía 28 por las colinas", "Sunset en Miradouro", "Noche de Fado en Alfama", "Day trip a Sintra", "Surf en Costa de Estoril"],
    bestTime: "Marzo - Octubre",
    avgFlightPrice: "75€",
    priceRange: "60€ - 140€",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Lisboa?", a: "Baixa para turismo, Alfama para ambiente, Bairro Alto para vida nocturna." },
      { q: "¿Cuánto cuesta un hotel en Lisboa?", a: "Desde 55€ en temporada baja hasta 200€ en temporada alta." },
    ],
  },
  tokio: {
    name: "Tokio",
    country: "Japón",
    description: "Tokio es una metrópoli donde la tradición milenaria convive con la tecnología más puntera. Desde templos antiguos como Senso-ji hasta el neón de Shibuya, ofrece experiencias únicas.",
    whatToSee: ["Senso-ji y Asakusa Temple", "Shibuya Crossing y Scramble Square", "Templo Senso-ji y Santuario Meiji", "Tokyo Skytree y Observatories", "Tsukiji Outer Market", "Barrio de Akihabara"],
    gastronomy: ["Sushi en Toyosu Market", "Ramen en Shinjuku Golden Gai", "Kaiseki y alta cocina", "Izakayas en alleys", "Convenience store gastronomy"],
    activities: ["Explorar templos al amanecer", "Shopping en Ginza", "Karaoke in Shinjuku", "TeamLab exhibitions", "Day trip to Mount Fuji"],
    bestTime: "Marzo - Mayo",
    avgFlightPrice: "600€",
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Tokio por primera vez?", a: "Shinjuku es ideal por su conexión de transporte y vida nocturna." },
      { q: "¿Cuánto cuesta un hotel en Tokio?", a: "Desde 60€ en hoteles cápsula hasta 300€+ en hoteles de lujo." },
    ],
  },
  "nueva-york": {
    name: "Nueva York",
    country: "Estados Unidos",
    description: "Nueva York es un universo en una ciudad. Manhattan con sus icónicos rascacielos, Central Park como oasis urbano, Broadway con sus shows de clase mundial ofrecen experiencias para todos.",
    whatToSee: ["Estatua de la Libertad y Ellis Island", "Empire State y Top of the Rock", "Central Park y Metropolitan Museum", "Times Square y Broadway", "Brooklyn Bridge y DUMBO", "High Line y Hudson Yards"],
    gastronomy: ["Pizza de Nueva York", "Hot dogs en cart", "Delis de barrio y pastrami", "Comida callejera multicultural", "Fine dining en Meatpacking"],
    activities: ["Show de Broadway", "Caminar por Brooklyn Bridge", "Picnic en Central Park", "Shopping en outlet Woodbury", "Helicopter tour sobre Manhattan"],
    bestTime: "Abril - Junio",
    avgFlightPrice: "500€",
    priceRange: "150€ - 350€",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Nueva York?", a: "Manhattan para turismo, Brooklyn para presupuesto y ambiente." },
      { q: "¿Es Nueva York cara para turistas?", a: "Muy cara. Hoteles desde 150€, comida desde 15$." },
    ],
  },
  londres: {
    name: "Londres",
    country: "Reino Unido",
    description: "Londres combina historia milenaria con modernidad vibrante. Desde el Big Ben hasta Buckingham Palace, pasando por el Tower Bridge y el British Museum, ofrece una experiencia cultural sin igual.",
    whatToSee: ["Big Ben y Houses of Parliament", "Buckingham Palace y Westminster", "Tower Bridge y Tower of London", "British Museum y National Gallery", "Camden Town y Notting Hill", "Greenwich y Cutty Sark"],
    gastronomy: ["Fish and chips tradicional", "Afternoon tea en Dorchester", "Mercados de Borough y Brick Lane", "Curry houses en Brick Lane", "Pubs históricos y gastropubs"],
    activities: ["Musical en West End", "Walking tour por los barrios", "Visitar Harry Potter studios", "Crucero por el Támesis", "Day trip a Windsor y Stonehenge"],
    bestTime: "Mayo - Septiembre",
    avgFlightPrice: "130€",
    priceRange: "120€ - 280€",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop",
    faqs: [
      { q: "¿Dónde alojarse en Londres?", a: "Westminster para turismo, Covent Garden para ambiente, Shoreditch para vida nocturna." },
      { q: "¿Cuánto cuesta un hotel en Londres?", a: "Desde 100€ en temporada baja hasta 400€+ en temporada alta." },
    ],
  },
};

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations[slug];
  const city = dest?.name || slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `Hoteles en ${city} | Takeitrip`,
    description: dest?.description || `Descubre los mejores hoteles en ${city}. Recomendaciones personalizadas con IA, precios actualizados y enlaces de reserva.`,
  };
}

export default async function HotelPage({ params }: HotelPageProps) {
  const { slug } = await params;
  const dest = destinations[slug];

  const cityName = dest?.name || slug.charAt(0).toUpperCase() + slug.slice(1);

  const hotels = await prisma.hotel.findMany({
    where: {
      city: { contains: cityName, mode: "insensitive" },
      isActive: true,
    },
    orderBy: { rating: "desc" },
  });

  return (
    <div className="relative min-h-screen bg-black">
      {dest && (
        <div className="relative h-64 md:h-80">
          <Image
            src={dest.image}
            alt={`${dest.name}, ${dest.country}`}
            fill
            sizes="100vw, (max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
        </div>
      )}

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <Link
          href="/destinos"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a destinos
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-white">
            Hoteles en {dest?.name || cityName}
          </h1>
          {dest && (
            <p className="flex items-center gap-2 text-white/50">
              <MapPinned className="h-4 w-4" />
              {dest.country}
            </p>
          )}
        </div>

        {dest && (
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/70">{dest.description}</p>
          </div>
        )}

        {dest && (
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-blue-400">
                <Eye className="h-5 w-5" />
                <h3 className="font-semibold">Qué ver</h3>
              </div>
              <ul className="space-y-1.5">
                {dest.whatToSee.map((item, i) => (
                  <li key={i} className="text-sm text-white/60">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-orange-400">
                <Utensils className="h-5 w-5" />
                <h3 className="font-semibold">Gastronomía</h3>
              </div>
              <ul className="space-y-1.5">
                {dest.gastronomy.map((item, i) => (
                  <li key={i} className="text-sm text-white/60">{item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="mb-3 flex items-center gap-2 text-green-400">
                <Camera className="h-5 w-5" />
                <h3 className="font-semibold">Actividades</h3>
              </div>
              <ul className="space-y-1.5">
                {dest.activities.map((item, i) => (
                  <li key={i} className="text-sm text-white/60">{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {dest && (
          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Clock className="h-4 w-4 text-white/40" />
              <span className="text-sm text-white/60">Mejor época:</span>
              <span className="text-sm font-medium text-white">{dest.bestTime}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <Plane className="h-4 w-4 text-white/40" />
              <span className="text-sm text-white/60">Vuelo desde:</span>
              <span className="text-sm font-medium text-white">{dest.avgFlightPrice}</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <MapPin className="h-4 w-4 text-white/40" />
              <span className="text-sm text-white/60">Precio medio:</span>
              <span className="text-sm font-medium text-white">{dest.priceRange}</span>
            </div>
          </div>
        )}

        {hotels.length > 0 ? (
          <HotelList hotels={hotels} displayName={dest?.name || cityName} cityInfo={{ content: dest?.description || "", faqs: dest?.faqs || [] }} />
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
            <p className="mb-4 text-white/60">No hay hoteles disponibles en estos momentos.</p>
            <p className="mb-6 text-sm text-white/40">Prueba preguntar al asistente de IA para obtener recomendaciones personalizadas.</p>
            <Link href="/chat">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                <MessageSquare className="mr-2 h-4 w-4" />
                Hablar con la IA
              </Button>
            </Link>
          </div>
        )}

        {dest && dest.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-xl font-bold text-white">Preguntas frecuentes</h2>
            <div className="space-y-4">
              {dest.faqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="mb-2 font-medium text-white">{faq.q}</h3>
                  <p className="text-sm text-white/60">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}