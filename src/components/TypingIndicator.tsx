"use client";

import { motion } from "framer-motion";
import BotAvatar from "./BotAvatar";

export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <BotAvatar />
      <div className="flex gap-1.5 rounded-2xl bg-crema-100 px-4 py-3">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-crema-400"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
