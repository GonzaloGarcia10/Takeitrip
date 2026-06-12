import { NextRequest, NextResponse } from "next/server";
import { createQdiv0Stream, Qdiv0Message } from "@/lib/qdiv0";
import { prisma } from "@/lib/prisma";
import {
  searchActivitiesByText,
  searchActivitiesByCoordinates,
} from "@/lib/civitatis";
import { searchHotels } from "@/lib/booking";

const SYSTEM_PROMPT = `Eres un asistente de viajes experto llamado "Takeitrip Assistant". Tu especialidad es recomendar hoteles, ciudades y destinos de viaje personalizados.

CAPACIDADES:
- Recomendar hoteles según presupuesto, estilo y ubicación
- Buscar hoteles disponibles en Booking.com con precios y disponibilidad real en tiempo
- Buscar actividades, tours y excursiones en Civitatis para cualquier destino
- Sugerir zonas donde alojarse en ciudades
- Dar consejos de viaje personalizados
- Comparar opciones de alojamiento
- Informar sobre puntos de interés cercanos
- Recomendar experiencias y actividades turísticas con precios y valoraciones

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

REGLAS DE HERRAMIENTAS:
Cuando el usuario pida buscar hoteles o actividades, debes responder con el formato exacto:

Para BUSCAR HOTELES usa:
@search_booking_hotels {"city": "nombre ciudad", "checkin": "YYYY-MM-DD", "checkout": "YYYY-MM-DD", "adults": 2, "rooms": 1}

Para BUSCAR ACTIVIDADES usa:
@search_civitatis_activities {"destination": "ciudad", "query": "tipo de actividad"}

Para RECOMENDAR ZONAS usa:
@recommend_zones {"city": "nombre ciudad", "interests": ["interes1", "interes2"]}

Responde siempre en el idioma que el usuario utilice.`;

async function executeTool(
  name: string,
  args: Record<string, unknown>
): Promise<string> {
  try {
    switch (name) {
      case "search_civitatis_activities": {
        const { destination, query, latitude, longitude } = args as {
          destination: string;
          query?: string;
          latitude?: string;
          longitude?: string;
        };
        if (latitude && longitude) {
          const result = await searchActivitiesByCoordinates(latitude, longitude);
          return JSON.stringify(result);
        }
        const searchText = query || `tours y actividades en ${destination}`;
        const result = await searchActivitiesByText(searchText);
        return JSON.stringify(result);
      }
      case "search_booking_hotels": {
        const { city, checkin, checkout, adults, rooms, currency } = args as {
          city: string;
          checkin: string;
          checkout: string;
          adults?: number;
          rooms?: number;
          currency?: string;
        };
        const result = await searchHotels({
          city,
          checkin,
          checkout,
          adults,
          rooms,
          currency,
        });
        return JSON.stringify(result);
      }
      default:
        return JSON.stringify({ error: `Tool ${name} not implemented` });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`Tool ${name} error:`, msg);
    return JSON.stringify({ error: msg });
  }
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.QDIV0_API_KEY) {
      console.error("QDIV0_API_KEY missing in environment");
      return NextResponse.json(
        { error: "QDIV0_API_KEY missing in server environment" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, conversationId: incomingConversationId, title } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const lastMsg = messages[messages.length - 1];
    if (lastMsg?.content) {
      const hasImageData = /\byimage\b|base64|data:image|https?:\/\/[^"'\s]+\.(jpg|jpeg|png|gif|webp)/i.test(lastMsg.content);
      if (hasImageData) {
        return NextResponse.json(
          { error: "Qwen3 no soporta imágenes. Usa GPT-4o para enviar fotos." },
          { status: 400 }
        );
      }
    }

    let conversationId = incomingConversationId as string | undefined;
    if (!conversationId) {
      try {
        const created = await prisma.conversation.create({
          data: {
            title:
              title ||
              (messages[messages.length - 1]?.content || "Nueva conversación").slice(
                0,
                120
              ),
          },
        });
        conversationId = created.id;
      } catch (dbErr) {
        console.warn("Database unavailable, using temp conversation ID");
        conversationId = `temp_${Date.now()}`;
      }
    }

    if (lastMsg) {
      try {
        await prisma.message.create({
          data: {
            conversationId,
            role: lastMsg.role || "user",
            content: lastMsg.content || "",
          },
        });
      } catch (dbErr) {
        console.warn("Database unavailable, skipping message save");
      }
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullContent = "";

        try {
          const chatMessages: Qdiv0Message[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          ];

          const toolCallRegex = /@(\w+)\s*(\{[^}]+\})/g;
          let hasToolCalls = false;
          let loopCount = 0;
          const MAX_LOOPS = 5;

          while (loopCount < MAX_LOOPS) {
            loopCount++;

            const response = await fetch("https://api.qdiv0.com/v1/chat/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.QDIV0_API_KEY}`,
              },
              body: JSON.stringify({
                model: "unsloth/qwen3.6-35b-a3b-mtp-gguf",
                messages: chatMessages,
                temperature: 0.7,
                max_tokens: 2000,
                stream: true,
              }),
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Qdiv0 API error: ${response.status} - ${errorText}`);
            }

            const reader = response.body?.getReader();
            if (!reader) throw new Error("No response body");

            let buffer = "";
            let finishReason = "";

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += new TextDecoder().decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                if (!line.startsWith("data: ")) continue;
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  finishReason = "stop";
                  break;
                }

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    fullContent += content;
                    controller.enqueue(
                      encoder.encode(
                        `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`
                      )
                    );
                  }
                } catch (e) {
                  // ignore parse errors
                }
              }

              if (finishReason === "stop") break;
            }

            const toolMatches = [...fullContent.matchAll(toolCallRegex)];

            if (toolMatches.length === 0) break;

            hasToolCalls = true;
            const toolResults: { role: "tool"; tool_call_id: string; content: string }[] = [];

            for (const match of toolMatches) {
              const toolName = match[1];
              const toolArgs = JSON.parse(match[2]);
              const result = await executeTool(toolName, toolArgs);

              toolResults.push({
                role: "tool",
                tool_call_id: `call_${Date.now()}_${Math.random().toString(36).slice(2)}`,
                content: result,
              });
            }

            chatMessages.push({
              role: "assistant",
              content: fullContent,
            });

            for (const tr of toolResults) {
              chatMessages.push(tr);
            }

            fullContent = "";
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          const cleanContent = fullContent.replace(toolCallRegex, "").trim();

          try {
            await prisma.message.create({
              data: {
                conversationId,
                role: "assistant",
                content: cleanContent,
              },
            });
          } catch (e) {
            console.warn("Database unavailable, skipping assistant message save");
          }

          try {
            const hotelRegex = /```hotels\n([\s\S]*?)\n```/;
            const match = cleanContent.match(hotelRegex);
            if (match) {
              const hotels = JSON.parse(match[1]);
              await prisma.search.create({
                data: {
                  query: lastMsg?.content || "",
                  city: hotels?.[0]?.city || null,
                  results: hotels || undefined,
                },
              });
            }
          } catch (e) {
            console.warn("Database unavailable, skipping hotel search save");
          }
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat Qdiv0 API error:", error);
    const msg = (error as any)?.message || "Internal server error";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? msg : "Internal server error" },
      { status: 500 }
    );
  }
}