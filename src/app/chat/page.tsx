"use client";

import { useChat } from "@/hooks/useChat";
import { MessageBubble } from "@/components/chat/message-bubble";
import { ChatInput } from "@/components/chat/chat-input";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";

const ChatWelcome = dynamic(
  () => import("@/components/chat/chat-welcome").then((mod) => mod.ChatWelcome),
  { ssr: false }
);

const TypingIndicator = dynamic(
  () => import("@/components/chat/typing-indicator").then((mod) => mod.TypingIndicator),
  { ssr: false }
);

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