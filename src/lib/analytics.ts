"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function GA4Script() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID);

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return null;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}

export const GA_EVENTS = {
  CHAT_START: "chat_start",
  SEARCH_CITY: "search_city",
  HOTEL_VIEWED: "hotel_viewed",
  BOOKING_CLICK: "booking_click",
} as const;