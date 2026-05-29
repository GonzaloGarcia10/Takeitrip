"use client";

import { useState, useCallback, useRef } from "react";
import type { Message, Hotel } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  const parseHotelsFromMessage = (content: string): Hotel[] => {
    const hotelRegex = /```hotels\n([\s\S]*?)\n```/;
    const match = content.match(hotelRegex);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return [];
      }
    }
    return [];
  };

  const sendMessage = useCallback(async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    abortControllerRef.current = new AbortController();

    try {

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      // If server returned JSON (error) instead of SSE stream, handle gracefully
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const err = await response.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(err?.error || "Server error");
      }

      if (!response.ok) throw new Error("Failed to get response");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content || "";
              if (content) {
                fullContent += content;
                setStreamingMessage(fullContent);
              }
            } catch {
              continue;
            }
          }
        }
      }

      const hotels = parseHotelsFromMessage(fullContent);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: fullContent,
        createdAt: new Date(),
        hotels,
      };

      setMessages((prev) => [...prev, assistantMessage]);
  } catch (error) {
      if ((error as Error).name === "AbortError") return;
      console.error("Chat error:", error);
      const errMsg = error instanceof Error ? error.message : "Lo siento, hubo un error al procesar tu mensaje.";
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        // Show a helpful error message (do not expose secrets)
        content: errMsg,
        createdAt: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setStreamingMessage("");
    }
  }, [input, messages, isLoading]);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setStreamingMessage("");
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setStreamingMessage("");
  }, []);

  return {
    messages,
    input,
    setInput,
    isLoading,
    streamingMessage,
    sendMessage,
    stopStreaming,
    clearMessages,
  };
}
