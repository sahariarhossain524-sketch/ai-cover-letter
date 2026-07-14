# GTM Outreach Automator (AI Sales Assistant)

> **GTM Outreach Automator** is a production-grade AI product designed to instantly generate highly tailored text outputs for sales and marketing outreach. It streamlines the Go-To-Market workflow by ensuring every communication is personalized, professional, and optimized for conversion.

![GTM Outreach](https://via.placeholder.com/1200x600/0f172a/ffffff?text=GTM+Outreach+Automator)

## System Architecture

Built for scale and reliability, this application focuses on abstracting prompt engineering complexities away from the end-user.

### Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **AI Integration:** Google Gemini 2.5 Flash API
- **Styling:** Tailwind CSS + Lucide React
- **Architecture:** Client-side Custom Hooks (`useCoverLetterGenerator`) interfacing with secure Server-Side API Routes.

## Prompt Engineering & LLM Integration

The core value of this application lies in its highly structured Prompt Engineering architecture.

- **Dynamic Persona Injection:** The system acts as an "expert career coach and professional copywriter," adopting a tone that is confident, professional, and enthusiastic.
- **Context Synthesis:** The backend API (`/api/generate/route.ts`) securely cross-references the user's Resume with the Job Description to extract matching keywords and relevant experiences.
- **Hallucination Prevention:** Strict instruction sets force the LLM to output ONLY the final text without conversational filler, and placeholders are only left if the data is genuinely missing from the source context.
- **Decoupled Business Logic:** The client-side UI is completely decoupled from the fetching and state management logic via the `useCoverLetterGenerator` hook, allowing for easy testing and iteration.

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`

## Developed By

**Sahariar Hossain**  
*AI Product Engineer & Full-Stack Developer*  
Specializing in AI-native internal tools, intelligent automation, and LLM-powered operational software.
