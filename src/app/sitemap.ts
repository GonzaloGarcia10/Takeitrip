import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const BASE_URL = "https://takeitrip.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/chat`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/destinos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const destPages = destinations.map((d) => ({
    url: `${BASE_URL}/destinos/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: d.type === "country" ? 0.8 : 0.9,
  }));

  const hotelPages = destinations
    .filter((d) => d.type === "city")
    .map((d) => ({
      url: `${BASE_URL}/hoteles/${d.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...destPages, ...hotelPages];
}
