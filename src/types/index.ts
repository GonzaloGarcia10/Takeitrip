export interface Hotel {
  id?: string;
  name: string;
  city: string;
  country: string;
  zone: string;
  pricePerNight: number;
  currency: string;
  rating: number;
  description: string;
  highlights: string[];
  image: string;
  bookingUrl: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
  hotels?: Hotel[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchParams {
  city: string;
  country?: string;
  budget?: string;
  maxPrice?: number;
  style?: string;
  checkIn?: string;
  checkOut?: string;
}

export interface SEOPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  content: string;
  city: string;
  country: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AffiliateClick {
  id: string;
  hotelName: string;
  city: string;
  userId?: string;
  timestamp: Date;
  url: string;
}
