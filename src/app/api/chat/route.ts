import { NextRequest, NextResponse } from "next/server";
import { openai, SYSTEM_PROMPT, TRAVEL_TOOLS } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import {
  searchActivitiesByText,
  searchActivitiesByCoordinates,
} from "@/lib/civitatis";
import { searchHotels } from "@/lib/booking";

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
          const result = await searchActivitiesByCoordinates(
            latitude,
            longitude
          );
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
    if (!process.env.OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY missing in environment");
      return NextResponse.json(
        { error: "OPENAI_API_KEY missing in server environment" },
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

    let conversationId = incomingConversationId as string | undefined;
    if (!conversationId) {
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
    }

    const lastMsg = messages[messages.length - 1];
    if (lastMsg) {
      await prisma.message.create({
        data: {
          conversationId,
          role: lastMsg.role || "user",
          content: lastMsg.content || "",
        },
      });
    }

    const model = process.env.OPENAI_MODEL || "gpt-4o";
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        let fullContent = "";
        try {
          let currentMessages = [
            { role: "system" as const, content: SYSTEM_PROMPT },
            ...messages,
          ];

          let loopCount = 0;
          const MAX_LOOPS = 5;

          while (loopCount < MAX_LOOPS) {
            loopCount++;
            const completion = await openai.chat.completions.create({
              model,
              messages: currentMessages,
              tools: TRAVEL_TOOLS,
              stream: true,
              temperature: 0.7,
              max_tokens: 2000,
            });

            let toolCalls: {
              id: string;
              name: string;
              arguments: string;
            }[] = [];
            let hasToolCalls = false;

            for await (const chunk of completion) {
              const delta = chunk.choices?.[0]?.delta;

              if (delta?.content) {
                fullContent += delta.content;
                controller.enqueue(
                  encoder.encode(
                    `data: ${JSON.stringify({ choices: [{ delta: { content: delta.content } }] })}\n\n`
                  )
                );
              }

              if (delta?.tool_calls) {
                hasToolCalls = true;
                for (const tc of delta.tool_calls) {
                  const idx = tc.index ?? 0;
                  if (!toolCalls[idx]) {
                    toolCalls[idx] = {
                      id: tc.id || "",
                      name: "",
                      arguments: "",
                    };
                  }
                  if (tc.id) toolCalls[idx].id = tc.id;
                  if (tc.function?.name)
                    toolCalls[idx].name = tc.function.name;
                  if (tc.function?.arguments)
                    toolCalls[idx].arguments += tc.function.arguments;
                }
              }

              if (chunk.choices?.[0]?.finish_reason === "stop" && !hasToolCalls) {
                break;
              }
            }

            if (!hasToolCalls || toolCalls.length === 0) break;

            interface ToolResult {
              role: "tool";
              tool_call_id: string;
              content: string;
            }
            const toolResults: ToolResult[] = [];

            for (const tc of toolCalls) {
              let args: Record<string, unknown> = {};
              try {
                args = JSON.parse(tc.arguments);
              } catch (e) {
                args = {};
              }

              const result = await executeTool(tc.name, args);

              toolResults.push({
                role: "tool",
                tool_call_id: tc.id,
                content: result,
              });
            }

            currentMessages = [
              ...currentMessages,
              {
                role: "assistant" as const,
                content: null,
                tool_calls: toolCalls.map((tc) => ({
                  id: tc.id,
                  type: "function" as const,
                  function: {
                    name: tc.name,
                    arguments: tc.arguments,
                  },
                })),
              },
              ...toolResults,
            ];
          }

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          await prisma.message.create({
            data: {
              conversationId,
              role: "assistant",
              content: fullContent,
            },
          });

          try {
            const hotelRegex = /```hotels\n([\s\S]*?)\n```/;
            const match = fullContent.match(hotelRegex);
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
            // ignore parse errors
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
    console.error("Chat API error:", error);
    const msg = (error as any)?.message || "Internal server error";
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? msg : "Internal server error" },
      { status: 500 }
    );
  }
}
