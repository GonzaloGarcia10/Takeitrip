"use client";

import React, { useRef, useEffect } from "react";
import { Send, Square } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  onStop: () => void;
  isLoading: boolean;
}

export function ChatInput({ input, setInput, onSend, onStop, isLoading }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isLoading) {
        onStop();
      } else if (input.trim()) {
        onSend();
      }
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-4">
      <div className="relative flex items-end gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors focus-within:border-white/20">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu búsqueda..."
          className="min-h-[52px] max-h-[150px] w-full flex-1 resize-none bg-transparent p-4 text-sm text-white placeholder:text-white/30 focus:outline-none"
          rows={1}
        />
        {isLoading ? (
          <button
            onClick={onStop}
            className="m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/80 text-white transition-colors hover:bg-red-500"
          >
            <Square className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={onSend}
            disabled={!input.trim()}
            className="m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white transition-transform hover:scale-105 disabled:opacity-30 disabled:hover:scale-100"
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}