const BOOKING_API_URL =
  process.env.BOOKING_API_URL ||
  "https://demandapi-sandbox.booking.com/3.1";

function getBookingHeaders() {
  const apiKey = process.env.BOOKING_API_KEY;
  const affiliateId = process.env.BOOKING_AFFILIATE_ID;
  if (!apiKey || !affiliateId)
    throw new Error("BOOKING_API_KEY or BOOKING_AFFILIATE_ID not configured");
  return {
    "X-Affiliate-Id": affiliateId,
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export interface BookingHotel {
  id: number;
  name: string;
  city: string;
  country: string;
  address?: string;
  rating?: number;
  reviewScore?: number;
  reviewCount?: number;
  price?: number;
  currency?: string;
  imageUrl?: string;
  checkin?: string;
  checkout?: string;
  stars?: number;
  roomType?: string;
  boardType?: string;
  isFreeCancellation?: boolean;
}

export interface BookingSearchResult {
  hotels: BookingHotel[];
  total: number;
}

export async function searchHotels(params: {
  city: string;
  checkin: string;
  checkout: string;
  adults?: number;
  rooms?: number;
  currency?: string;
}): Promise<BookingSearchResult> {
  const { city, checkin, checkout, adults = 2, rooms = 1, currency = "EUR" } = params;

  const res = await fetch(`${BOOKING_API_URL}/accommodations/search`, {
    method: "POST",
    headers: getBookingHeaders(),
    body: JSON.stringify({
      city,
      booker: { country: "es", platform: "web" },
      checkin,
      checkout,
      guests: { number_of_rooms: rooms, number_of_adults: adults },
      currency,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Booking API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const accommodations = data?.accommodations || data?.search_results || [];

  const hotels: BookingHotel[] = accommodations.map((acc: Record<string, unknown>) => ({
    id: acc.id as number,
    name: acc.name as string,
    city: (acc.city_name as string) || city,
    country: (acc.countrycode as string) || "",
    address: acc.address as string,
    rating: acc.rating as number,
    reviewScore: acc.review_score as number,
    reviewCount: acc.review_count as number,
    price: acc.min_price as number,
    currency: (acc.currency_code as string) || currency,
    imageUrl: (acc.main_photo_url as string) || (acc.photo_urls as string[])?.[0],
    stars: acc.stars as number,
    isFreeCancellation: acc.is_free_cancellation as boolean,
  }));

  return { hotels, total: hotels.length };
}

export async function getHotelDetails(
  accommodationId: number,
  checkin: string,
  checkout: string,
  adults = 2,
  rooms = 1
): Promise<BookingHotel | null> {
  const res = await fetch(`${BOOKING_API_URL}/accommodations/details`, {
    method: "POST",
    headers: getBookingHeaders(),
    body: JSON.stringify({
      accommodation: accommodationId,
      booker: { country: "es", platform: "web" },
      checkin,
      checkout,
      guests: { number_of_rooms: rooms, number_of_adults: adults },
    }),
  });

  if (!res.ok) return null;
  const data = await res.json();
  const acc = data?.accommodation || data;
  if (!acc) return null;

  return {
    id: acc.id,
    name: acc.name,
    city: acc.city_name,
    country: acc.countrycode,
    address: acc.address,
    rating: acc.rating,
    reviewScore: acc.review_score,
    reviewCount: acc.review_count,
    price: acc.min_price,
    currency: acc.currency_code,
    imageUrl: acc.main_photo_url,
    stars: acc.stars,
    isFreeCancellation: acc.is_free_cancellation,
  };
}
