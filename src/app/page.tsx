"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import type { UIMessage } from "ai";
import Header from "@/components/Header";
import ChatBubble from "@/components/ChatBubble";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import SuggestedQuestions from "@/components/SuggestedQuestions";
import ErrorToast from "@/components/ErrorToast";
import { SUGGESTED_QUESTIONS, SYSTEM_PROMPT } from "@/lib/knowledgeBase";
import { puter } from '@heyputer/puter.js';

const STORAGE_KEY = "crema-chat-history";

function getTextFromMessage(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<UIMessage[]>([]);
  const [status, setStatus] = useState<"ready" | "submitted" | "streaming" | "error">("ready");
  const [errorMSG, setErrorMSG] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages, hydrated]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  const handleReset = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const executeChat = async (newMessages: UIMessage[]) => {
    setStatus("submitted");
    setErrorMSG(null);

    const reqMsgs = [
      { role: "system", content: SYSTEM_PROMPT },
      ...newMessages.map((m) => ({
        role: m.role,
        content: getTextFromMessage(m),
      })),
    ];

    const assistantId = "msg-" + Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantId,
        role: "assistant",
        parts: [{ type: "text", text: "" }],
      },
    ]);

    try {
      setStatus("streaming");

      const streamRes = await puter.ai.chat(reqMsgs, { stream: true, model: 'gpt-4o-mini' });
      let fullText = "";

      if (streamRes && typeof streamRes[Symbol.asyncIterator] === "function") {
        for await (const chunk of streamRes) {
          const chunkText = typeof chunk === "string" ? chunk : (chunk as any)?.text || (chunk as any)?.message?.content || "";
          fullText += chunkText;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, parts: [{ type: "text", text: fullText }] }
                : msg
            )
          );
        }
      } else {
        const fallbackText = typeof streamRes === "string" ? streamRes : (streamRes as any)?.message?.content || (streamRes as any)?.message || JSON.stringify(streamRes);
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantId
              ? { ...msg, parts: [{ type: "text", text: fallbackText }] }
              : msg
          )
        );
      }

      setStatus("ready");
    } catch (err: unknown) {
      const error = err as Error;
      console.error(error);
      setErrorMSG(error.message || "An error occurred");
      setStatus("error");
      setMessages((prev) => prev.filter((m) => m.id !== assistantId));
    }
  };

  const sendMessage = (text: string) => {
    if (!text.trim() || status === "submitted" || status === "streaming") return;
    const newMsg: UIMessage = {
      id: "user-" + Date.now(),
      role: "user",
      parts: [{ type: "text", text }],
    };
    const nextMsgs = [...messages, newMsg];
    setMessages(nextMsgs);
    executeChat(nextMsgs);
  };

  const handleSuggestion = (question: string) => {
    sendMessage(question);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleRetry = () => {
    if (messages.length > 0) {
      executeChat(messages);
    }
  };

  const isEmpty = messages.length === 0;
  const isLoading = status === "submitted" || status === "streaming";
  const showTyping = status === "submitted";

  if (!hydrated) return null;

  return (
    <div className="flex h-dvh flex-col bg-crema-50">
      <Header onReset={handleReset} hasMessages={!isEmpty} />

      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-2xl px-4">
          {isEmpty ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center gap-6 py-24"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-crema-700 shadow-lg">
                <Coffee className="h-8 w-8 text-crema-50" />
              </div>

              <div className="text-center">
                <h1 className="font-serif text-3xl font-bold text-crema-900">
                  Welcome to Crema
                </h1>
                <p className="mt-2 text-crema-500">
                  Your specialty coffee sommelier. Ask me anything about beans,
                  brewing, and flavor.
                </p>
              </div>

              <SuggestedQuestions
                questions={SUGGESTED_QUESTIONS}
                onSelect={handleSuggestion}
              />
            </motion.div>
          ) : (
            <div className="space-y-6 py-6">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  role={msg.role as "user" | "assistant"}
                  content={getTextFromMessage(msg)}
                />
              ))}

              {showTyping && <TypingIndicator />}

              <ErrorToast visible={status === "error"} onRetry={handleRetry} />

              <div ref={scrollRef} aria-hidden />
            </div>
          )}
        </div>
      </main>

      <ChatInput
        value={input}
        onChange={setInput}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
