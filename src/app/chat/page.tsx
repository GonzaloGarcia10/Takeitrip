"use client";

import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { Button } from "@/components/ui/button";
import { Trash2, Plane } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Link from "next/link";

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
      {/* Header */}
      <div className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="relative mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
            >
              <Plane className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-white">
                Takeitrip Assistant
              </h1>
              <p className="text-sm text-white/50">
                Asistente de viajes con IA
              </p>
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

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && !streamingMessage ? (
          <ChatWelcome onSuggestion={(text) => sendMessage(text)} />
        ) : (
          <div className="mx-auto max-w-4xl">
            <div className="px-4 py-8 sm:px-6">
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

      {/* Input */}
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