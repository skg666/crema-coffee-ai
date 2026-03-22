"use client";

import { Coffee, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  onReset: () => void;
  hasMessages: boolean;
}

export default function Header({ onReset, hasMessages }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 border-b border-crema-200/60 bg-crema-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Coffee className="h-5 w-5 text-crema-700" />
          <span className="font-serif text-lg font-semibold tracking-tight text-crema-900">
            Crema
          </span>
        </div>

        {hasMessages && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={onReset}
            aria-label="Reset conversation"
            className="rounded-lg p-2 text-crema-500 transition-colors hover:bg-crema-100 hover:text-crema-700"
          >
            <RotateCcw className="h-4 w-4" />
          </motion.button>
        )}
      </div>
    </header>
  );
}
