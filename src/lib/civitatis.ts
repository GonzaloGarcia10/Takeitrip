const CIVITATIS_BASE_URL = "https://api.civitatis.com/v2";

function getCivitatisHeaders() {
  const apiKey = process.env.CIVITATIS_API_KEY;
  if (!apiKey) throw new Error("CIVITATIS_API_KEY not configured");
  return {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

export interface CivitatisActivity {
  id: string;
  name: string;
  shortDescription: string;
  description?: string;
  currency: string;
  cancellationPolicies?: { hours: number; penalty: number; type: string }[];
  rates?: {
    id: number;
    text: string;
    categories: {
      id: number;
      text: string;
      price: number;
      originalPrice?: number;
    }[];
  }[];
  score?: number;
  totalReviews?: number;
  images?: { url: string }[];
  destinationName?: string;
  countryName?: string;
  city?: string;
  isFreeTour?: boolean;
  hasDynamicPrice?: boolean;
}

export interface CivitatisSearchResult {
  activities: CivitatisActivity[];
  total: number;
}

export async function searchActivitiesByDestination(
  destinationId: number,
  language = "es"
): Promise<CivitatisSearchResult> {
  const res = await fetch(
    `${CIVITATIS_BASE_URL}/destinations/${destinationId}/activities?lang=${language}`,
    { headers: getCivitatisHeaders(), next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error(`Civitatis API error: ${res.status}`);
  const data = await res.json();
  return { activities: data || [], total: data?.length || 0 };
}

export async function searchActivitiesByText(
  query: string,
  language = "es"
): Promise<CivitatisSearchResult> {
  const res = await fetch(`${CIVITATIS_BASE_URL}/search`, {
    method: "POST",
    headers: getCivitatisHeaders(),
    body: JSON.stringify({ query, lang: language }),
  });
  if (!res.ok) throw new Error(`Civitatis API error: ${res.status}`);
  const data = await res.json();
  return { activities: data?.activities || [], total: data?.total || 0 };
}

export async function searchActivitiesByCoordinates(
  latitude: string,
  longitude: string,
  distance = "20",
  language = "es"
): Promise<CivitatisSearchResult> {
  const res = await fetch(`${CIVITATIS_BASE_URL}/findByCoord`, {
    method: "POST",
    headers: getCivitatisHeaders(),
    body: JSON.stringify({
      latitude,
      longitude,
      distance,
      lang: language,
    }),
  });
  if (!res.ok) throw new Error(`Civitatis API error: ${res.status}`);
  const data = await res.json();
  return { activities: data?.activities || [], total: data?.total || 0 };
}

export async function getActivityDetails(
  activityId: string,
  language = "es"
): Promise<CivitatisActivity> {
  const res = await fetch(
    `${CIVITATIS_BASE_URL}/activities/${activityId}?lang=${language}`,
    { headers: getCivitatisHeaders() }
  );
  if (!res.ok) throw new Error(`Civitatis API error: ${res.status}`);
  return res.json();
}

export async function getDestinations(language = "es") {
  const res = await fetch(
    `${CIVITATIS_BASE_URL}/destinations?lang=${language}`,
    { headers: getCivitatisHeaders(), next: { revalidate: 86400 } }
  );
  if (!res.ok) throw new Error(`Civitatis API error: ${res.status}`);
  return res.json();
}
