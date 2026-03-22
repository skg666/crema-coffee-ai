import { openai } from "@ai-sdk/openai";
import { streamText, type CoreMessage } from "ai";

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  });

  return result.toAIStreamResponse();
}