"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Star, Globe, ChevronRight, Home } from "lucide-react";

interface Destination {
  name: string;
  slug: string;
  country: string;
  region: string;
  short: string;
  description: string;
  whatToSee: string[];
  gastronomy: string[];
  activities: string[];
  highlights: string[];
  priceRange: string;
  image: string;
  badge?: string;
  rating: number;
  bestTime: string;
  currency: string;
  avgFlightPrice?: string;
  keywords: string[];
}

const destinations: Destination[] = [
  {
    name: "París",
    slug: "paris",
    country: "Francia",
    region: "Europa",
    short: "La ciudad de la luz con barrios icónicos y gastronomía de primer nivel.",
    description: "París es la capital de Francia, conocida mundialmente como la Ciudad de la Luz. Con emblemáticos monumentos como la Torre Eiffel, el Museo del Louvre y la Catedral de Notre-Dame, la ciudad ofrece una combinación única de historia, arte, moda y gastronomía. Sus barrios clásicos como Le Marais, Saint-Germain-des-Prés y Montmartre ofrecen experiencias distintas para cada tipo de viajero.",
    whatToSee: ["Torre Eiffel y Campos de Marte", "Museo del Louvre y Museo d'Orsay", "Notre-Dame y Sainte-Chapelle", "Arco de Triunfo y Campos Elíseos", "Montmartre y Sacré-Cœur", "Palacio de Versalles"],
    gastronomy: ["Croissants y pâte à choux", "Quesos artesanales y wines", "Cafés de Montmartre", "Restaurantes Michelin en Le Marais", "Boulangeries tradicionales"],
    activities: ["Paseo en barco por el Sena", "Compra en Galerías Lafayette", "Espectáculo en Moulin Rouge", "Picnic en Jardín de Luxembourg", "Visitar mercadillos de antigüedades"],
    highlights: ["Le Marais", "Torre Eiffel", "Louvre"],
    priceRange: "120€ - 220€",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    badge: "Top",
    rating: 4.8,
    bestTime: "Abril - Junio",
    currency: "Euro (€)",
    avgFlightPrice: "150€",
    keywords: ["hoteles en París", "dónde dormir en París", "barrios de París", "hoteles baratos París", "hoteles románticos París"],
  },
  {
    name: "Roma",
    slug: "roma",
    country: "Italia",
    region: "Europa",
    short: "Historia milenaria, gastronomía auténtica y encanto mediterráneo.",
    description: "Roma, la Ciudad Eterna, es un museo al aire libre donde cada calle, plaza y edificio cuenta siglos de historia. Desde el Coliseo Romano hasta el Vaticano, pasando por la Fontana di Trevi y la escalinata de Piazza di Spagna, la ciudad ofrece experiencias únicas que combinan arte antiguo, arquitectura impresionante y una gastronomía mediterránea excepcional.",
    whatToSee: ["Coliseo y Foro Romano", "Ciudad del Vaticano y Capilla Sixtina", "Fontana di Trevi y Pantheon", "Plaza de España y Trastevere", "Castillo de Sant'Angelo", "Termas de Caracalla"],
    gastronomy: ["Pasta fresca y carbonara auténtica", "Pizza romana al taglio", "Gelato artesanal", "Supplì y fritti romanos", "Vino local y aperitivos"],
    activities: ["Visitar Vatican Museums con guía", "Clase de cocina italiana", "Tour de barrios históricos", "Paseo en Vespa", "Degustación de vinos romanos"],
    highlights: ["Centro Histórico", "Trastevere", "Vaticano"],
    priceRange: "70€ - 180€",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    badge: "Cultural",
    rating: 4.7,
    bestTime: "Marzo - Mayo",
    currency: "Euro (€)",
    avgFlightPrice: "120€",
    keywords: ["hoteles en Roma", "dónde dormir en Roma", "hoteles cerca del Coliseo", "hoteles Roma centro", "hoteles baratos Roma"],
  },
  {
    name: "Barcelona",
    slug: "barcelona",
    country: "España",
    region: "Europa",
    short: "Playas, arquitectura modernista y una escena gastronómica en auge.",
    description: "Barcelona es la joya del Mediterráneo, combinando playas urbanas con arquitectura modernista patrimonio de la humanidad. La ciudad de Gaudí ofrece desde la Sagrada Familia hasta el Park Güell, pasando por las calles del Barri Gòtic. Su escena gastronómica, beaches y vida nocturna la convierten en uno de los destinos más versátiles de Europa.",
    whatToSee: ["Sagrada Familia y Park Güell", "La Rambla y Barrio Gòtico", "Barceloneta y playas", "Casa Batlló y Pedrera", "Montjuïc y MNAC", "Camp Nou y barrio de Gràcia"],
    gastronomy: ["Tapas y paella", "Mercats como La Boqueria", "Chef Ferran Adrià", "Catadores y vermús", "Churros con chocolate"],
    activities: ["Ruta modernismo Gaudí", "Escenar beaches y chiringuitos", "Tour gastronómico del Born", "Noche en Poble Espanyol", "Visita a Montserrat"],
    highlights: ["Eixample", "Barceloneta", "Gaudí"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Mayo - Septiembre",
    currency: "Euro (€)",
    avgFlightPrice: "80€",
    keywords: ["hoteles en Barcelona", "dónde dormir en Barcelona", "hoteles playa Barcelona", "hoteles Barcelona centro", "hoteles baratos Barcelona"],
  },
  {
    name: "Ámsterdam",
    slug: "amsterdam",
    country: "Países Bajos",
    region: "Europa",
    short: "Canales, museos de clase mundial y una atmósfera única.",
    description: "Ámsterdam cautiva con sus icónicos canales del siglo XVII, arquitectura narrow houses y una escena cultural vibrante. La ciudad ofrece desde los masters del Rijksmuseum hasta el Barrio Rojo, pasando por molinos históricos en Zaanse Schans. Su ambiente tolerante, gastronomía internacional y diseño único la hacen fascinante.",
    whatToSee: ["Rijksmuseum y Van Gogh Museum", "Casa de Ana Frank", "Canales y wandering canals", "Jordaan y De Pijp", "Vondelpark y Amsterdam Noord", "Zaanse Schans windmills"],
    gastronomy: ["Poffertjes y stroopwafels", "Dutch cheese tasting", "Herring crudo", "Indonesian rijsttafel", "Craft beer breweries"],
    activities: ["Cruise por los canales", "Alquilar bicicleta", "Visitar coffee shops", "Tour de diseño y arquitectura", "Día en Marken y Volendam"],
    highlights: ["Canales", "Jordaan", "Museos"],
    priceRange: "100€ - 200€",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200&h=800&fit=crop",
    rating: 4.5,
    bestTime: "Abril - Septiembre",
    currency: "Euro (€)",
    avgFlightPrice: "100€",
    keywords: ["hoteles en Ámsterdam", "dónde dormir en Ámsterdam", "hoteles baratos Ámsterdam", "hoteles centro Ámsterdam"],
  },
  {
    name: "Bruselas",
    slug: "bruselas",
    country: "Bélgica",
    region: "Europa",
    short: "Capital europea con arquitectura impresionante y gastronomía de clase mundial.",
    description: "Bruselas es una ciudad que fusiona lo histórico con lo contemporáneo. Su Grand Place declarado Patrimonio de la Humanidad, los iconos del comic flamenco, su chocolates artesanales y cervezas trapistas la convierten en un destino único. Como capital de la UE, también ofrece una vibrante escena diplomática y culinaria.",
    whatToSee: ["Grand Place y Atomium", "Manneken Pis y Jeanneke Pis", "Museos Real y de los Cómics", "Sablon y Notre-Dame", "Atomium y Mini-Europe", "Barrio Europeo y Mont des Arts"],
    gastronomy: ["Chocolate artesanal", "Waffles y stroopwafels", "Cervezas trapistas", "Cuberduls y candy", "Mejillones con fries"],
    activities: ["Tour de chocolates", "Cata de cervezas belgas", "Explorar comics murals", "Visitar Atomium", "Gamberrada en brasseries"],
    highlights: ["Grand Place", "Chocolate", "Cerveza"],
    priceRange: "80€ - 160€",
    image: "https://images.unsplash.com/photo-1533387520709-752d83de3630?w=1200&h=800&fit=crop",
    rating: 4.4,
    bestTime: "Marzo - Octubre",
    currency: "Euro (€)",
    avgFlightPrice: "90€",
    keywords: ["hoteles en Bruselas", "dónde dormir en Bruselas", "hoteles baratos Bruselas", "hoteles centro Bruselas"],
  },
  {
    name: "Berlín",
    slug: "berlin",
    country: "Alemania",
    region: "Europa",
    short: "Historia contemporánea, escena artística underground y vida nocturna legendaria.",
    description: "Berlín es una metrópolis en constante transformación. Desde el Muro de Berlín hasta la isla de los Museos, la ciudad cuenta historias de división y reunificación. Su escena artística underground, clubs legendarios y gastronomía multicultural la hacen una de las capitales más vibrantes de Europa.",
    whatToSee: ["Brandenburger Tor y Reichstag", "East Side Gallery y Muro", "Museumsinsel y Alexanderplatz", "Checkpoint Charlie y Gendarmenmarkt", "Tiergarten y Kaufhaus des Westens", "Potsdamer Platz y Sony Center"],
    gastronomy: ["Currywurst y Döner", "Berliner Weisse", "Restaurantes turcos en Kreuzberg", "Craft beer en Prenzlauer Berg", "Markthalle Neun food hall"],
    activities: ["Visitar memorial del Muro", "Party en Berghain", "Tour de Street Art", "Explorar-antiguos bunkers", "Day trip a Potsdam"],
    highlights: ["Mitte", "Kreuzberg", "Historia"],
    priceRange: "70€ - 150€",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=1200&h=800&fit=crop",
    badge: "Emergente",
    rating: 4.5,
    bestTime: "Mayo - Septiembre",
    currency: "Euro (€)",
    avgFlightPrice: "85€",
    keywords: ["hoteles en Berlín", "dónde dormir en Berlín", "hoteles baratos Berlín", "hoteles centro Berlín"],
  },
  {
    name: "Viena",
    slug: "viena",
    country: "Austria",
    region: "Europa",
    short: "Música, palacios imperiales y la cultura del café vienés.",
    description: "Viena es la capital del vals, los waltz y la música clásica. Sus palacios imperiales como Schönbrunn y Hofburg, sus cafés históricos donde nacieron la literatura y el pensamiento, y su escena musical que incluye Mozart y Beethoven, hacen de la ciudad una experiencia única para los sentidos.",
    whatToSee: ["Palacio de Schönbrunn y Hofburg", "Ópera Estatal y Musikverein", "Belvedere y su jardín", "Rathaus y Parlamento", "Karlskirche y Peterskirche", "Naschmarkt y Secession"],
    gastronomy: ["Café vienés y Sachertorte", "Wiener Schnitzel", "Apfelstrudel y Kaiserschmarrn", "Wiener Melange", "Heuriger en vineyards de Grinzing"],
    activities: ["Concierto de Mozart", "Tour de Kaiserscaffés", "Degustación wines de Wachau", "Visita a zoológico Tiergarten", "Day spa en Therme"],
    highlights: ["Innere Stadt", "Schönbrunn", "Cafés"],
    priceRange: "90€ - 180€",
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Abril - Octubre",
    currency: "Euro (€)",
    avgFlightPrice: "110€",
    keywords: ["hoteles en Viena", "dónde dormir en Viena", "hoteles baratos Viena", "hoteles centro Viena"],
  },
  {
    name: "Praga",
    slug: "praga",
    country: "Chequia",
    region: "Europa",
    short: "Ciudad de las cien torres con arquitectura gótica y precios asequibles.",
    description: "Praga, la Ciudad de las Cien Torres, parece sacada de un cuento de hadas medieval. Su Ciudad Vieja con el Reloj Astronómico, el Puente Carlos con sus 30 estatuas de santos, y el Castillo de Praga dominando la colina ofrecen una experiencia visual inolvidable. Además, su cerveza artesanal y precios accesibles la hacen irresistible.",
    whatToSee: ["Castillo de Praga y Callejón del Oro", "Puente Carlos y Ciudad Vieja", "Reloj Astronómico y Plaza de la Ciudad Vieja", "Iglesia de San Nicolás en Malá Strana", "Casa Danzante y Petřín Hill", "Josefov y synagoga Pinkas"],
    gastronomy: ["Cerveza Pilsner Urquell", "Svíčková y guláš", "Trdelník y chimney cake", "Klubí diferencial local", "Malostranská cafe"],
    activities: ["Tour de cerveza artesanal", "Visitar vieja brewery", "Paseo por Petřín hill", "Concierto de blues en subterráneo", "Day trip a Český Krumlov"],
    highlights: ["Ciudad Vieja", "Puente Carlos", "Cerveza"],
    priceRange: "50€ - 120€",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1200&h=800&fit=crop",
    badge: "Mejor Precio",
    rating: 4.5,
    bestTime: "Abril - Junio",
    currency: "Corona checa (CZK)",
    avgFlightPrice: "70€",
    keywords: ["hoteles en Praga", "dónde dormir en Praga", "hoteles baratos Praga", "hoteles centro Praga"],
  },
  {
    name: "Lisboa",
    slug: "lisboa",
    country: "Portugal",
    region: "Europa",
    short: "Colinas, tranvías amarillos y una gastronomía mediterránea excepcional.",
    description: "Lisboa enamora con sus calles empedradas, el amarillo característico de sus tranvías, el fado resonando en Alfama y los pastéis de nata recién horneados en Belém. Construida sobre siete colinas, la ciudad ofrece vistas panorámicas desde miradores como el de Santa Catarina o el Castillo de São Jorge.",
    whatToSee: ["Castillo de São Jorge y Alfama", "Belém y Torre de Belém", "Praça do Comércio y Baixa", "Tranvía 28 y Barrio Alto", "Jerónimos Monastery y Padrão dos Descobrimentos", "LX Factory y Time Out Market"],
    gastronomy: ["Pastéis de Belém", "Bacalao a brás", "Ginjinha y Cherry liquor", "Francesinha", "Sea food fresco en mercados"],
    activities: ["Ride tram 28 through hills", "Sunset en Miradouro", "Fado night en Alfama", "Day trip a Sintra", "Surf en Costa de Estoril"],
    highlights: ["Alfama", "Baixa", "Fado"],
    priceRange: "60€ - 140€",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    rating: 4.6,
    bestTime: "Marzo - Octubre",
    currency: "Euro (€)",
    avgFlightPrice: "75€",
    keywords: ["hoteles en Lisboa", "dónde dormir en Lisboa", "hoteles baratos Lisboa", "hoteles centro Lisboa"],
  },
  {
    name: "Tokio",
    slug: "tokio",
    country: "Japón",
    region: "Asia",
    short: "Futuro y tradición se encuentran en una de las ciudades más fascinantes del mundo.",
    description: "Tokio es una metrópoli donde la tradición milenaria convive con la tecnología más puntera. Desde templos antiguos como Senso-ji en Asakusa hasta el neón de Shibuya, pasando por jardines zen y restaurantes con estrellas Michelin, Tokio ofrece experiencias que no se encuentran en ningún otro lugar del mundo.",
    whatToSee: ["Senso-ji y Asakusa Temple", "Shibuya Crossing y Scramble Square", "Templo Senso-ji y Santuario Meiji", "Tokyo Skytree y Observatories", "Tsukiji Outer Market", "Barrio de Akihabara"],
    gastronomy: ["Sushi en Toyosu Market", "Ramen en Shinjuku Golden Gai", "Kaiseki y alta cocina", "Izakayas en alleys", "Convenience store gastronomy"],
    activities: ["Explorar temples at sunrise", "Shopping en Ginza", "Karaoke in Shinjuku", "TeamLab exhibitions", "Day trip to Mount Fuji"],
    highlights: ["Shinjuku", "Asakusa", "Michelin"],
    priceRange: "80€ - 200€",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&h=800&fit=crop",
    badge: "Top",
    rating: 4.9,
    bestTime: "Marzo - Mayo",
    currency: "Yen (¥)",
    avgFlightPrice: "600€",
    keywords: ["hoteles en Tokio", "dónde dormir en Tokio", "hoteles baratos Tokio", "hoteles centro Tokio"],
  },
  {
    name: "Nueva York",
    slug: "nueva-york",
    country: "Estados Unidos",
    region: "América",
    short: "La ciudad que nunca duerme: rascacielos, Broadway y Central Park.",
    description: "Nueva York es un universo en una ciudad. Manhattan con sus icónicos skyscrapers, Central Park como oasis urbano, Broadway con sus shows de clase mundial, y boroughs con personalidad propia como Brooklyn, Queens y el Bronx. La ciudad que nunca duerme ofrece experiencias para todos los gustos y presupuestos.",
    whatToSee: ["Estatua de la Libertad y Ellis Island", "Empire State y Top of the Rock", "Central Park y Metropolitan Museum", "Times Square y Broadway", "Brooklyn Bridge y DUMBO", "High Line y Hudson Yards"],
    gastronomy: ["Pizza de Nueva York", "Hot dogs en cart", "Delis de barrio y pastrami", "Comida callejera multicultural", "Fine dining en Meatpacking"],
    activities: ["Show de Broadway", "Caminar por Brooklyn Bridge", "Picnic en Central Park", "Shopping en outlet Woodbury", "Helicopter tour sobre Manhattan"],
    highlights: ["Midtown", "Brooklyn", "Central Park"],
    priceRange: "150€ - 350€",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
    rating: 4.7,
    bestTime: "Abril - Junio",
    currency: "Dólar ($)",
    avgFlightPrice: "500€",
    keywords: ["hoteles en Nueva York", "dónde dormir en Nueva York", "hoteles baratos Nueva York", "hoteles Manhattan"],
  },
  {
    name: "Londres",
    slug: "londres",
    country: "Reino Unido",
    region: "Europa",
    short: "Capital global con museos gratuitos, teatro West End y parques reales.",
    description: "Londres es una de las ciudades más cosmopolitas del mundo, combinando historia milenaria con modernidad vibrante. Desde el Big Ben hasta Buckingham Palace, pasando por el Tower Bridge y el British Museum con sus collections globales, la capital británica ofrece una experiencia cultural sin igual con parques reales y una escena gastronómica en constante evolución.",
    whatToSee: ["Big Ben y Houses of Parliament", "Buckingham Palace y Westminster", "Tower Bridge y Tower of London", "British Museum y National Gallery", "Camden Town y Notting Hill", "Greenwich y Cutty Sark"],
    gastronomy: ["Fish and chips tradicional", "Afternoon tea en Dorchester", "Mercados de Borough y Brick Lane", "Curry houses en Brick Lane", "Pubs históricos y gastropubs"],
    activities: ["Musical en West End", "Walking tour por los barrios", "Visitar Harry Potter studios", "Crucero por el Támesis", "Day trip a Windsor y Stonehenge"],
    highlights: ["Westminster", "Covent Garden", "Museos"],
    priceRange: "120€ - 280€",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop",
    rating: 4.7,
    bestTime: "Mayo - Septiembre",
    currency: "Libra esterlina (£)",
    avgFlightPrice: "130€",
    keywords: ["hoteles en Londres", "dónde dormir en Londres", "hoteles baratos Londres", "hoteles centro Londres"],
  },
];

const regions = [...new Set(destinations.map((d) => d.region))];

function BreadcrumbSchema() {
  const items = [
    { name: "Inicio", item: "https://takeitrip.es" },
    { name: "Destinos", item: "https://takeitrip.es/destinos" },
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    })}} />
  );
}

function DestinationsCollectionSchema() {
  const items = destinations.map((dest, index) => ({
    "@type": "TouristDestination",
    name: `Hoteles en ${dest.name}`,
    description: dest.short,
    url: `https://takeitrip.es/hoteles/${dest.slug}`,
    image: dest.image,
    geo: {
      "@type": "Place",
      name: dest.name,
      address: {
        "@type": "PostalAddress",
        addressCountry: dest.country,
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: dest.rating,
      bestRating: "5",
    },
  }));

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Guías de Destinos de Viaje | Takeitrip",
      description: "Descubre los mejores destinos para tu próximo viaje con guías completas sobre qué ver, dónde comer, actividades y hoteles recomendados en cada ciudad.",
      url: "https://takeitrip.es/destinos",
      publisher: {
        "@type": "Organization",
        name: "Takeitrip",
        url: "https://takeitrip.es",
        logo: "https://takeitrip.es/logo.png",
      },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item,
        })),
      },
    })}} />
  );
}

function FAQSchema() {
  const faqs = [
    {
      "@type": "Question",
      name: "¿Cómo funciona el asistente de viajes de Takeitrip?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Solo pregúntanos en lenguaje natural qué buscas (presupuesto, zona, tipo de hotel) y te recomendaremos opciones con precios reales y enlaces de reserva directa a Booking.com.",
      },
    },
    {
      "@type": "Question",
      name: "¿Son fiables las recomendaciones de hoteles?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Usamos datos reales de Booking.com con precios actualizados y enlaces directos de reserva. Las valoraciones son de usuarios reales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuántos destinos cubre Takeitrip?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Actualmente tenemos guías detalladas de 12 destinos principales en Europa, Asia y América, con información sobre zonas, precios y hoteles.",
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
  ];

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs,
    })}} />
  );
}

function OrganizationSchema() {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Takeitrip",
      url: "https://takeitrip.es",
      logo: "https://takeitrip.es/logo.png",
      description: "Tu asistente de viajes con inteligencia artificial para encontrar hoteles perfectos.",
      sameAs: [
        "https://twitter.com/takeitrip",
        "https://instagram.com/takeitrip",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@takeitrip.es",
        contactType: "customer service",
      },
    })}} />
  );
}

function DestinationSchema({ dest }: { dest: Destination }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TouristDestination",
      name: `Guía de ${dest.name} | Takeitrip`,
      description: dest.description,
      url: `https://takeitrip.es/hoteles/${dest.slug}`,
      image: dest.image,
      keywords: dest.keywords.join(", "),
      geo: {
        "@type": "Place",
        name: dest.name,
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 48.8566,
          longitude: 2.3522,
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: dest.country,
        },
      },
      touristType: ["Cultural tourism", "City break", "Food tourism"],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: dest.rating,
        bestRating: "5",
        reviewCount: "500",
      },
    })}} />
  );
}

export default function DestinosPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <BreadcrumbSchema />
      <DestinationsCollectionSchema />
      <FAQSchema />
      <OrganizationSchema />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-purple-950/20 to-black" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 text-sm text-white/40" aria-label="Breadcrumb">
          <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
            <Home className="h-4 w-4" />
            Inicio
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-white/70">Destinos</span>
        </nav>

        <header className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
          >
            <Globe className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-white/70">{destinations.length} guías de destinos con SEO optimizado</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Guías de Destinos para Viajar Mejor
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-3xl text-lg text-white/60"
          >
            Cada guía incluye qué ver, dónde comer, actividades y hoteles recomendados. 
            Información actualizada y consejos de expertos para planificar tu próximo viaje.
          </motion.p>

          
        </header>

        {regions.map((region) => {
          const regionDestinations = destinations.filter((d) => d.region === region);
          return (
            <section key={region} className="mb-20" aria-labelledby={`region-${region}`}>
              <header className="mb-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 id={`region-${region}`} className="text-2xl font-bold text-white">{region}</h2>
                  <p className="text-sm text-white/40">{regionDestinations.length} destinos</p>
                </div>
              </header>

              <div className="space-y-8">
                {regionDestinations.map((dest) => (
                  <DestinationSchema key={dest.slug} dest={dest} />
                ))}
              </div>
            </section>
          );
        })}

        {regions.map((region) => {
          const regionDestinations = destinations.filter((d) => d.region === region);
          return (
            <section key={region} className="mb-20" aria-labelledby={`region-${region}`}>
              <header className="mb-10 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
                  <MapPin className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h2 id={`region-${region}`} className="text-2xl font-bold text-white">{region}</h2>
                  <p className="text-sm text-white/40">{regionDestinations.length} destinos</p>
                </div>
              </header>

              <div className="space-y-6">
                {regionDestinations.map((dest, index) => (
                  <motion.article
                    key={dest.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="group"
                  >
                    <Link href={`/hoteles/${dest.slug}`} className="block" aria-label={`Guía de hoteles en ${dest.name}`}>
                      <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all duration-500 hover:border-white/20 hover:bg-white/10">
                        <div className="grid gap-0 lg:grid-cols-2">
                          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[400px]">
                            <Image
                              src={dest.image}
                              alt={`Destino ${dest.name}: ${dest.highlights.slice(0, 2).join(", ")} - Guía completa de hoteles y qué ver`}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-cover"
                              loading={index < 3 ? "eager" : "lazy"}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                            
                            {dest.badge && (
                              <div className="absolute left-4 top-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5 text-xs font-bold text-white">
                                {dest.badge}
                              </div>
                            )}
                            
                            <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                              <div className="flex items-center gap-3 text-white">
                                <h3 className="text-2xl font-bold">{dest.name}</h3>
                                <div className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-sm">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  {dest.rating}
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-white/70">{dest.country}</p>
                            </div>
                          </div>

                          <div className="p-6 lg:p-8">
                            <header className="hidden lg:flex items-center gap-3 mb-4">
                              <h3 className="text-2xl font-bold text-white">{dest.name}</h3>
                              <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm text-white/80">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {dest.rating}
                              </div>
                              <span className="text-sm text-white/40">{dest.country}</span>
                            </header>

                            <p className="mb-6 text-sm leading-relaxed text-white/70">
                              {dest.description}
                            </p>

                            <p className="mb-4 text-sm leading-relaxed text-white/70">
                              {dest.short}
                            </p>

                            <footer className="flex flex-wrap items-center gap-4 border-t border-white/10 pt-6">
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/40">Precio medio:</span>
                                <span className="text-lg font-bold text-white">{dest.priceRange}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white/40">Mejor época:</span>
                                <span className="text-sm text-white/70">{dest.bestTime}</span>
                              </div>
                              {dest.avgFlightPrice && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-white/40">Vuelo desde:</span>
                                  <span className="text-sm text-white/70">{dest.avgFlightPrice}</span>
                                </div>
                              )}
                              <div className="ml-auto flex items-center gap-2 text-blue-400">
                                <span className="text-sm font-medium">Ver guía completa</span>
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                              </div>
                            </footer>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </section>
          );
        })}

        <aside className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
            ¿No encuentras tu destino?
          </h2>
          <p className="mb-8 text-white/60">
            Pregunta a nuestro asistente de IA y te ayudaremos a encontrar hoteles en cualquier ciudad del mundo.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-blue-500/25"
          >
            <MessageSquare className="h-4 w-4" />
            Preguntar a la IA
          </Link>
        </aside>

        <nav className="mt-16 flex flex-col items-center gap-4 text-sm text-white/40" aria-label="Navegación complementaria">
          <p>Explora más destinos:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {destinations.map((dest) => (
              <Link
                key={dest.slug}
                href={`/hoteles/${dest.slug}`}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 transition-all hover:bg-white/10 hover:text-white"
              >
                Hoteles en {dest.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}