import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const BASE_URL = "https://takeitrip.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const cities = destinations.filter((d) => d.type === "city");
  const countries = destinations.filter((d) => d.type === "country");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/chat`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/destinos`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const hotelPages: MetadataRoute.Sitemap = cities.map((d) => ({
    url: `${BASE_URL}/hoteles/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const destPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE_URL}/destinos/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: d.type === "city" ? 0.85 : 0.7,
  }));

  return [...staticPages, ...hotelPages, ...destPages];
}