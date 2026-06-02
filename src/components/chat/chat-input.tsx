"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Square } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isLoading) {
        onStop();
      } else {
        onSend();
      }
    }
  };

  return (
    <div className="relative mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
      <div className="relative flex items-end gap-3 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-2 transition-all focus-within:border-white/40">
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          className="min-h-[48px] max-h-[200px] flex-1 resize-none border-0 bg-transparent p-3 text-sm text-white placeholder:text-white/30 focus-visible:ring-0 focus-visible:ring-offset-0"
          rows={1}
        />
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          {isLoading ? (
            <button
              onClick={onStop}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg transition-all hover:shadow-red-500/25"
            >
              <Square className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onSend}
              disabled={!input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      </div>
      <p className="mt-3 text-center text-xs text-white/30">
        Presiona Enter para enviar, Shift+Enter para nueva línea
      </p>
    </div>
  );
}