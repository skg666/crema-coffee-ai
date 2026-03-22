import { openai } from "@ai-sdk/openai";
import { streamText, type CoreMessage, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/knowledgeBase";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const coreMessages: CoreMessage[] = messages.map((msg) => ({
    role: msg.role as 'system' | 'user' | 'assistant' | 'tool',
    content: msg.parts
      .filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join(""),
  }));

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: coreMessages,
  });

  return result.toUIMessageStreamResponse();
}