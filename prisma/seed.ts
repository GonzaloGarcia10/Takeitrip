import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const hotels = [
    {
      name: "Hôtel Le Marais",
      slug: "hotel-le-marais-paris",
      city: "París",
      country: "Francia",
      zone: "Le Marais, 4to arr.",
      pricePerNight: 180,
      currency: "EUR",
      rating: 8.7,
      description: "Elegante hotel boutique en el corazón de Le Marais, con habitaciones decoradas con gusto moderno y vistas a la ciudad.",
      highlights: ["Ubicación céntrica", "Desayuno incluido", "WiFi gratuito"],
      imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/fr/le-marais.html",
    },
    {
      name: "Rome Garden Hotel",
      slug: "rome-garden-hotel-roma",
      city: "Roma",
      country: "Italia",
      zone: "Monti",
      pricePerNight: 120,
      currency: "EUR",
      rating: 8.9,
      description: "Encantador hotel con jardín interior en el barrio Monti, a pasos del Coliseo y la Via dei Fori Imperiali.",
      highlights: ["Jardín interior", "Cerca del Coliseo", "Ambiente familiar"],
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/it/rome-garden.html",
    },
    {
      name: "Grand Hotel Brussels",
      slug: "grand-hotel-brussels-bruselas",
      city: "Bruselas",
      country: "Bélgica",
      zone: "Grand Place",
      pricePerNight: 155,
      currency: "EUR",
      rating: 8.4,
      description: "Hotel clásico a la Gran Plaza con habitaciones amplias y vistas espectaculares a la arquitectura gótica de Bruselas.",
      highlights: ["Vistas a Grand Place", "Spa", "Restaurante gourmet"],
      imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/be/grand-brussels.html",
    },
    {
      name: "Seoul Sky Residence",
      slug: "seoul-sky-residence-seul",
      city: "Seúl",
      country: "Corea del Sur",
      zone: "Gangnam",
      pricePerNight: 95,
      currency: "EUR",
      rating: 9.1,
      description: "Moderno apart-hotel en Gangnam con vistas panorámicas y todas las comodidades para una estancia perfecta.",
      highlights: ["Vistas panorámicas", "Gimnasio", "Cerca del metro"],
      imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/kr/seoul-sky.html",
    },
    {
      name: "Tokyo Sakura Inn",
      slug: "tokyo-sakura-inn-tokio",
      city: "Tokio",
      country: "Japón",
      zone: "Shinjuku",
      pricePerNight: 110,
      currency: "EUR",
      rating: 8.8,
      description: "Acogedor hotel japonés en Shinjuku con diseño minimalista y atención excepcional.",
      highlights: ["Diseño japonés", "Onsen", "Cerca de Shinjuku Station"],
      imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/jp/tokyo-sakura.html",
    },
    {
      name: "NYC Manhattan View",
      slug: "nyc-manhattan-view-nueva-york",
      city: "Nueva York",
      country: "Estados Unidos",
      zone: "Midtown Manhattan",
      pricePerNight: 250,
      currency: "EUR",
      rating: 8.6,
      description: "Hotel moderno en Midtown Manhattan con vistas icónicas de la ciudad que nunca duerme.",
      highlights: ["Vistas Manhattan", "Terraza", "Cerca de Times Square"],
      imageUrl: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop",
      bookingUrl: "https://www.booking.com/hotel/us/nyc-manhattan.html",
    },
  ];

  for (const hotel of hotels) {
    await prisma.hotel.upsert({
      where: { slug: hotel.slug },
      update: hotel,
      create: hotel,
    });
  }

  console.log(`Seeded ${hotels.length} hotels`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
