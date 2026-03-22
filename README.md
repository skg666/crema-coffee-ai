# Crema - Specialty Coffee Sommelier

## What I Built
Crema is a specialized AI chatbot designed to act as a virtual coffee sommelier. Built using Next.js and Tailwind CSS v4, the application features a deeply customized chat interface with real-time streaming responses, conversation persistence, and a highly restrictive knowledge base. It is entirely frontend-driven, leveraging Puter.js for free OpenAI model access without requiring a dedicated Next.js API route or an OpenAI API key.

## Why I Picked This Topic
I chose a "Specialty Coffee Sommelier" for several reasons:

1. **Domain Restrictability**: Coffee has a rich but well-defined set of factual parameters (e.g., brew ratios, origins, temperatures). This made it an excellent candidate for demonstrating how to effectively domain-lock an LLM via strict guardrails in the system prompt, preventing it from functioning as a generic chatbot.
2. **Design Opportunities**: The coffee theme allowed me to experiment with a warm, elegant, and highly customized UI palette (espresso browns and soft creams) and custom typography (Playfair Display and Inter) that breaks away from the conventional "tech-blue" SaaS look.
3. **Engaging UX**: Specialty coffee is a topic where passion and precision meet, making the bot's interactions feel personal, educational, and engaging for the end user.

## Tech Stack
- **Framework**: Next.js 16 (App Router) with React 19.
- **Styling**: Tailwind CSS v4 for utility-first styling and Framer Motion for micro-interactions (e.g., the typing indicator and error toasts).
- **AI Integration**: `@heyputer/puter.js` to communicate directly with OpenAI models from the client, bypassing server-side API key management.
- **Icons & Markdown**: `lucide-react` for crisp SVG icons and `react-markdown` to safely render structured assistant responses.

## Key Architecture & Features
- **Client-Side State**: The entire state of the app (messages, streaming chunks, errors, and UI status) is elegantly handled in `app/page.tsx` via custom React hooks, completely replacing the heavy Vercel AI SDK wrappers.
- **Conversation Persistence**: An effect syncs the chat history to `localStorage`, so users don't lose their conversation upon refreshing the browser.
- **Mobile First & Safe Area**: The CSS strictly uses `dvh` (dynamic viewport height) and safe-area padding inset adjustments so the UI never breaks when the iOS keyboard slides up.
- **Knowledge Base Module**: The strict guardrails and core coffee facts that make "Crema" smart are encapsulated in `lib/knowledgeBase.ts`.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

*Note: Since this project uses Puter.js for client-side API calls, no `.env` or OpenAI API key is needed. Puter.js will prompt a zero-auth popup for bot protection on your first message.*
