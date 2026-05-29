import { NextRequest, NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function GET(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ ok: false, error: "OPENAI_API_KEY not set" }, { status: 400 });
    }

    // Simple non-streaming test prompt
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o",
      messages: [
        { role: "system", content: "Eres un asistente que responde con 'pong' a 'ping'" },
        { role: "user", content: "ping" },
      ],
      max_tokens: 10,
      temperature: 0,
    });

    const text = completion.choices?.[0]?.message?.content || null;
    return NextResponse.json({ ok: true, text });
  } catch (error) {
    console.error("Chat test error:", error);
    return NextResponse.json({ ok: false, error: (error as any)?.message || String(error) }, { status: 500 });
  }
}
