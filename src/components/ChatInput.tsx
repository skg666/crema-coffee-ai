"use client";

import { useRef, useEffect, type FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSubmit,
  isLoading,
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit(e as unknown as FormEvent<HTMLFormElement>);
      }
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-crema-200/60 bg-crema-50/80 pb-safe backdrop-blur-md">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-2xl items-end gap-2 px-4 py-3"
      >
        <textarea
          ref={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about coffee..."
          disabled={isLoading}
          rows={1}
          className="flex-1 resize-none rounded-xl border border-crema-200 bg-white px-4 py-2.5 text-sm text-crema-900 placeholder:text-crema-400 focus:border-crema-400 focus:outline-none focus:ring-2 focus:ring-crema-200 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-crema-700 text-crema-50 transition-all hover:bg-crema-800 disabled:opacity-40 disabled:hover:bg-crema-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
