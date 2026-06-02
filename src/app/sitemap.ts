import type { MetadataRoute } from "next";

const BASE_URL = "https://takeitrip.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE_URL}/chat`, lastModified: new Date(), changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${BASE_URL}/destinos`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
  ];

  const destinations = [
    "paris", "roma", "bruselas", "tokio", "nueva-york",
    "barcelona", "amsterdam", "londres", "berlin",
    "praga", "viena", "lisboa",
  ];

  const destinationPages = destinations.map((dest) => ({
    url: `${BASE_URL}/hoteles/${dest}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...destinationPages];
}