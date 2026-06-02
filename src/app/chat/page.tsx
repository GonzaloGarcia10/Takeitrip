"use client";

import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { Button } from "@/components/ui/button";
import { Trash2, Plane, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ChatPage() {
  const {
    messages,
    input,
    setInput,
    isLoading,
    streamingMessage,
    sendMessage,
    stopStreaming,
    clearMessages,
  } = useChat();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, streamingMessage]);

  return (
    <div className="flex h-[calc(100vh-64px)] flex-col bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-purple-950/10 to-black" />

      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-white">Takeitrip AI</h1>
              <p className="text-xs text-white/40">Asistente de búsqueda de hoteles</p>
            </div>
          </div>
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearMessages}
              className="text-white/50 hover:text-white hover:bg-white/10"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Nueva conversación
            </Button>
          )}
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && !streamingMessage ? (
          <ChatWelcome onSuggestion={(text) => sendMessage(text)} />
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="px-4 py-6 sm:px-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {streamingMessage && (
                <MessageBubble
                  message={{
                    id: "streaming",
                    role: "assistant",
                    content: streamingMessage,
                    createdAt: new Date(),
                  }}
                />
              )}
              {isLoading && !streamingMessage && <TypingIndicator />}
            </div>
          </div>
        )}
      </div>

      <div className="relative border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={() => sendMessage()}
          onStop={stopStreaming}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}