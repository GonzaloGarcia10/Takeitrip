import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/chat`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/destinos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const destinations = [
    "paris", "roma", "bruselas", "tokio", "nueva-york",
    "barcelona", "seul", "amsterdam", "londres", "berlin",
    "praga", "viena", "lisboa", "atenas", "estambul",
  ];

  const destinationPages = destinations.map((dest) => ({
    url: `${BASE_URL}/hoteles/${dest}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  let hotelPages: { url: string; lastModified: Date; changeFrequency: "monthly"; priority: number }[] = [];
  try {
    const hotels = await prisma.hotel.findMany({
      where: { isActive: true },
      select: { slug: true },
      take: 100,
    });
    hotelPages = hotels.map((hotel) => ({
      url: `${BASE_URL}/hotel/${hotel.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    // Prisma not connected, skip dynamic pages
  }

  return [...staticPages, ...destinationPages, ...hotelPages];
}
