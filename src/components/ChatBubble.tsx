"use client";

import { motion } from "framer-motion";
import Markdown from "react-markdown";
import BotAvatar from "./BotAvatar";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && <BotAvatar />}

      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-crema-700 text-crema-50"
            : "bg-crema-100 text-crema-900"
        }`}
      >
        {isUser ? (
          <p>{content}</p>
        ) : (
          <Markdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              ul: ({ children }) => (
                <ul className="mb-2 list-disc pl-4 last:mb-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 list-decimal pl-4 last:mb-0">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-1">{children}</li>,
              h3: ({ children }) => (
                <h3 className="mb-1 mt-2 font-serif font-semibold">{children}</h3>
              ),
            }}
          >
            {content}
          </Markdown>
        )}
      </div>
    </motion.div>
  );
}
