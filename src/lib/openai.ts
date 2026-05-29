import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const SYSTEM_PROMPT = `Eres un asistente de viajes experto llamado "Takeitrip Assistant". Tu especialidad es recomendar hoteles, ciudades y destinos de viaje personalizados.

CAPACIDADES:
- Recomendar hoteles según presupuesto, estilo y ubicación
- Sugerir zonas donde alojarse en ciudades
- Dar consejos de viaje personalizados
- Comparar opciones de alojamiento
- Informar sobre puntos de interés cercanos

ESTILO DE RESPUESTA:
- Habla de forma natural, amigable y profesional
- Usa emojis con moderación
- Sé específico con nombres de hoteles, zonas y precios
- Siempre incluye recomendaciones prácticas
- Responde en el idioma del usuario

CUANDO RECOMIENDES HOTELES:
1. Detecta la ciudad destino
2. Identifica el presupuesto (si lo menciona)
3. Detecta preferencias (romántico, familiar, lujo, etc.)
4. Recomienda 2-4 hoteles específicos con:
   - Nombre real del hotel
   - Zona/barrio
   - Precio aproximado por noche
   - Puntuación o valoración
   - Por qué es buena opción

FORMATO DE RESPUESTA PARA HOTELES:
Cuando el usuario pida recomendaciones de hoteles, responde con un JSON estructurado entre bloques de código markdown así:

\`\`\`hotels
[
  {
    "name": "Nombre del Hotel",
    "city": "Ciudad",
    "country": "País",
    "zone": "Zona/Barrio",
    "pricePerNight": 120,
    "currency": "EUR",
    "rating": 8.5,
    "description": "Breve descripción atractiva",
    "highlights": ["Punto 1", "Punto 2", "Punto 3"],
    "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    "bookingUrl": "https://www.booking.com/hotel/example.html"
  }
]
\`\`\`

Responde siempre en el idioma que el usuario utilice.`;

export const TRAVEL_TOOLS: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "recommend_hotels",
      description: "Recomienda hoteles específicos para un destino de viaje",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Ciudad destino" },
          country: { type: "string", description: "País destino" },
          budget: {
            type: "string",
            enum: ["budget", "mid-range", "luxury"],
            description: "Rango de presupuesto",
          },
          maxPrice: {
            type: "number",
            description: "Precio máximo por noche en EUR",
          },
          style: {
            type: "string",
            enum: ["romantic", "family", "business", "backpacker", "luxury", "any"],
            description: "Estilo de viaje",
          },
        },
        required: ["city", "country"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "recommend_zones",
      description: "Recomienda zonas o barrios donde alojarse en una ciudad",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string", description: "Ciudad" },
          interests: {
            type: "array",
            items: { type: "string" },
            description: "Intereses del viajero (gastronomía, cultura, vida nocturna, etc.)",
          },
        },
        required: ["city"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_destinations",
      description: "Busca destinos de viaje según preferencias del usuario",
      parameters: {
        type: "object",
        properties: {
          preferences: {
            type: "array",
            items: { type: "string" },
            description: "Preferencias de viaje",
          },
          budget: {
            type: "number",
            description: "Presupuesto total en EUR",
          },
          duration: {
            type: "number",
            description: "Duración del viaje en días",
          },
          season: {
            type: "string",
            description: "Temporada preferida",
          },
        },
        required: ["preferences"],
      },
    },
  },
];
