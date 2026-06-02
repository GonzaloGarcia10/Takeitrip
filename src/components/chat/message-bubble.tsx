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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn("flex gap-3 py-4", isUser ? "bg-transparent" : "")}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isUser
            ? "bg-blue-500"
            : "bg-gradient-to-br from-blue-500 to-purple-500"
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>
      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-white/70">
            {isUser ? "Tú" : "Takeitrip AI"}
          </span>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert prose-p:text-white/60 prose-li:text-white/60 prose-strong:text-white prose-code:text-blue-400 prose-code:bg-white/10 prose-code:rounded prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-a:text-blue-400">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
        {!isUser && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            <span>{copied ? "Copiado" : "Copiar"}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}