"use client";

import { useState, useCallback, useRef } from "react";
import type { Message, Hotel } from "@/types";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef("");
  const messagesRef = useRef<Message[]>([]);
  const pendingRef = useRef(false);

  const parseHotels = (content: string): Hotel[] => {
    const m = content.match(/```hotels\n([\s\S]*?)\n```/);
    if (!m) return [];
    try { return JSON.parse(m[1]); } catch { return []; }
  };

  const sendMessage = useCallback(async (messageText?: string) => {
    const text = (messageText ?? inputRef.current).trim();
    if (!text || pendingRef.current) return;
    pendingRef.current = true;

    const userMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: text,
      createdAt: new Date(),
    };

    messagesRef.current = [...messagesRef.current, userMessage];
    setMessages(messagesRef.current);
    setInput("");
    setIsLoading(true);
    setStreamingMessage("");

    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messagesRef.current.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
        signal: abortControllerRef.current.signal,
      });

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error || "Server error");
      }
      if (!response.ok) throw new Error("Failed");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const c = JSON.parse(data).choices?.[0]?.delta?.content || "";
            if (c) { fullContent += c; setStreamingMessage(fullContent); }
          } catch { continue; }
        }
      }

      const assistantMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: fullContent,
        createdAt: new Date(),
        hotels: parseHotels(fullContent),
      };

      messagesRef.current = [...messagesRef.current, assistantMessage];
      setMessages(messagesRef.current);
    } catch (error) {
      if ((error as Error).name === "AbortError") return;
      const errMsg = error instanceof Error ? error.message : "Error al procesar el mensaje.";
      const errMessage: Message = {
        id: String(Date.now() + 1),
        role: "assistant",
        content: errMsg,
        createdAt: new Date(),
      };
      messagesRef.current = [...messagesRef.current, errMessage];
      setMessages(messagesRef.current);
    } finally {
      setIsLoading(false);
      setStreamingMessage("");
      pendingRef.current = false;
    }
  }, []);

  const stopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setStreamingMessage("");
    pendingRef.current = false;
  }, []);

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setMessages([]);
    setStreamingMessage("");
  }, []);

  return {
    messages,
    input,
    setInput: (val: string) => { inputRef.current = val; setInput(val); },
    isLoading,
    streamingMessage,
    sendMessage,
    stopStreaming,
    clearMessages,
  };
}