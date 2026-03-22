"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorToastProps {
  visible: boolean;
  onRetry: () => void;
}

export default function ErrorToast({ visible, onRetry }: ErrorToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mx-auto flex max-w-sm items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 shadow-lg"
        >
          <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
          <p className="flex-1 text-sm text-red-700">
            Whoops, spilled the beans.
          </p>
          <button
            onClick={onRetry}
            className="flex items-center gap-1.5 rounded-lg bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            <RefreshCw className="h-3 w-3" />
            Retry
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
