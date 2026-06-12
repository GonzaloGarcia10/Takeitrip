import type { MetadataRoute } from "next";
import { destinations } from "@/lib/destinations";

const BASE_URL = "https://takeitrip.es";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

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
    {
      url: `${BASE_URL}/hoteles/paris`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hoteles/roma`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hoteles/barcelona`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const destPages: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: `${BASE_URL}/destinos/${d.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: d.type === "city" ? 0.85 : 0.7,
  }));

  return [...staticPages, ...destPages];
}