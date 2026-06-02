"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { User, Bot, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Message } from "@/types";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const [copied, setCopied] = React.useState(false);
  const isUser = message.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, type: "spring" }}
      className={cn("flex gap-4 py-6", isUser ? "bg-transparent" : "bg-gradient-to-r from-transparent via-white/5 to-transparent")}
    >
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          isUser 
            ? "bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/20" 
            : "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 shadow-lg shadow-purple-500/20"
        )}
      >
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-white" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">
            {isUser ? "Tú" : "Takeitrip Assistant"}
          </span>
          <span className="text-xs text-white/30">
            {new Date(message.createdAt).toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-white prose-p:text-white/70 prose-li:text-white/70 prose-strong:text-white prose-code:text-cyan-400 prose-code:bg-white/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {!isUser && (
          <button
            onClick={handleCopy}
            className="group flex items-center gap-1.5 text-xs text-white/30 transition-all hover:text-white/60"
          >
            <span className="transition-transform group-hover:scale-110">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </span>
            <span>{copied ? "Copiado" : "Copiar"}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}