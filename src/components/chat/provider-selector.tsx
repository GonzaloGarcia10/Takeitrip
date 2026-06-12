"use client";

import React from "react";
import { Bot, Sparkles } from "lucide-react";
import type { ChatProvider } from "@/hooks/useChatProvider";

interface ProviderSelectorProps {
  provider: ChatProvider;
  onProviderChange: (provider: ChatProvider) => void;
  isLoading: boolean;
}

export function ProviderSelector({ provider, onProviderChange, isLoading }: ProviderSelectorProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border-t border-white/10">
      <span className="text-xs text-white/40">Modelo:</span>
      <div className="flex gap-2">
        <button
          onClick={() => onProviderChange("openai")}
          disabled={isLoading}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
            provider === "openai"
              ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
              : "bg-white/5 text-white/50 hover:bg-white/10 border border-transparent"
          }`}
        >
          <Bot className="h-3 w-3" />
          GPT-4o
        </button>
        <button
          onClick={() => onProviderChange("qdiv0")}
          disabled={isLoading}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs transition-colors ${
            provider === "qdiv0"
              ? "bg-purple-500/30 text-purple-300 border border-purple-500/50"
              : "bg-white/5 text-white/50 hover:bg-white/10 border border-transparent"
          }`}
        >
          <Sparkles className="h-3 w-3" />
          Qwen3 (Gratis)
        </button>
      </div>
    </div>
  );
}