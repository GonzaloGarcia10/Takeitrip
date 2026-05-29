import { NextRequest, NextResponse } from "next/server";
import { openai, SYSTEM_PROMPT } from "@/lib/openai";
import { prisma } from "@/lib/prisma";

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

    // Persist conversation (create if not provided)
    let conversationId = incomingConversationId as string | undefined;
    if (!conversationId) {
      const created = await prisma.conversation.create({
        data: {
          title:
            title || (messages[messages.length - 1]?.content || "Nueva conversación").slice(0, 120),
        },
      });
      conversationId = created.id;
    }

    // Save the user's last message to DB
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

    // Call OpenAI with streaming
    const model = process.env.OPENAI_MODEL || "gpt-4o";
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 2000,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullContent = "";
        try {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content || "";
            if (content) {
              fullContent += content;
              controller.enqueue(
                encoder.encode(
                  `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`
                )
              );
            }
          }

          // Signal done
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          // Save assistant message to DB
          await prisma.message.create({
            data: {
              conversationId,
              role: "assistant",
              content: fullContent,
            },
          });

          // Try to parse hotels JSON block and save a search record
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
            // ignore
            console.warn("No se pudo parsear hotels JSON", e);
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
    // In development return the real error message to help debugging
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? msg : "Internal server error" },
      { status: 500 }
    );
  }
}
