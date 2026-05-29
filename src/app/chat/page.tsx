"use client";

import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2, Plane } from "lucide-react";
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
    <div className="flex h-[calc(100vh-64px)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
              Takeitrip Assistant
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Asistente de viajes inteligente
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearMessages}>
            <Trash2 className="mr-2 h-4 w-4" />
            Nueva conversación
          </Button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 && !streamingMessage ? (
          <ChatWelcome onSuggestion={(text) => sendMessage(text)} />
        ) : (
          <div className="mx-auto max-w-3xl">
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
        )}
      </div>

      {/* Input */}
      <ChatInput
        input={input}
        setInput={setInput}
        onSend={() => sendMessage()}
        onStop={stopStreaming}
        isLoading={isLoading}
      />
    </div>
  );
}
