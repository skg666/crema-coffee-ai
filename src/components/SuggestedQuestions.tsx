"use client";

import { motion } from "framer-motion";

interface SuggestedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export default function SuggestedQuestions({
  questions,
  onSelect,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {questions.map((q, i) => (
        <motion.button
          key={q}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
          onClick={() => onSelect(q)}
          className="rounded-full border border-crema-200 bg-white px-4 py-2 text-sm text-crema-700 shadow-sm transition-all hover:border-crema-300 hover:bg-crema-50 hover:shadow-md"
        >
          {q}
        </motion.button>
      ))}
    </div>
  );
}
