# Vivix AI - Multi-Agent Platform

A powerful multi-agent AI platform featuring real-time streaming responses, custom agent creation, and seamless integration with multiple AI providers.

## Features

- 🤖 **Multi-Agent System**: Create and manage multiple AI agents with different models and personalities
- ⚡ **Real-Time Streaming**: Get instant responses with streaming support for all providers
- 🎨 **Customizable Agents**: Configure system prompts, temperature, max tokens, and more
- 🔄 **Provider Support**: OpenAI (GPT-4, GPT-3.5), Anthropic (Claude 3), Google (Gemini Pro)
- 💬 **Interactive Chat**: Beautiful, responsive chat interface with message history
- 🎯 **Edge Runtime**: Powered by Next.js 15 edge functions for optimal performance
- 🎨 **Modern UI**: Built with React, TypeScript, Tailwind CSS, and Framer Motion

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **AI Providers**: OpenAI, Anthropic, Google Generative AI
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- API keys for at least one AI provider:
  - OpenAI API key
  - Anthropic API key
  - Google AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arpancodez/vivix-ai.git
cd vivix-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key
GOOGLE_API_KEY=your_google_api_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating an Agent

1. Click the "+" button in the sidebar
2. Fill in the agent details:
   - Name: Give your agent a unique name
   - Model: Choose from GPT-4, GPT-3.5, Claude 3, or Gemini Pro
   - System Prompt: Define the agent's behavior and personality
   - Temperature: Adjust creativity (0-2)
   - Max Tokens: Set response length (100-4000)
3. Click "Create Agent"

### Chatting with Agents

1. Select an agent from the sidebar
2. Type your message in the input field
3. Press Enter or click the send button
4. Watch as the AI responds in real-time with streaming

## Project Structure

```
vivix-ai/
├── app/
│   ├── api/
│   │   ├── agents/
│   │   │   └── route.ts       # Agent CRUD endpoints
│   │   └── chat/
│   │       └── route.ts       # Streaming chat endpoint
│   └── page.tsx              # Main application page
├── components/
│   ├── AgentBuilder.tsx      # Agent creation modal
│   ├── AgentCard.tsx         # Agent display card
│   └── ChatInterface.tsx     # Chat UI component
├── lib/
│   ├── agent-manager.ts      # Zustand store for agents
│   └── ai-providers.ts       # AI provider abstraction
├── types/
│   ├── agent.ts              # Agent-related types
│   └── api.ts                # API request/response types
└── package.json
```

## API Routes

### POST /api/chat

Stream chat responses from AI agents.

**Request Body:**
```json
{
  "agentId": "string",
  "message": "string",
  "conversationHistory": []
}
```

### GET /api/agents

Get all agents.

**Response:**
```json
{
  "agents": []
}
```

### POST /api/agents

Create a new agent.

**Request Body:**
```json
{
  "name": "string",
  "model": "string",
  "systemPrompt": "string",
  "temperature": 0.7,
  "maxTokens": 1000,
  "provider": "openai" | "anthropic" | "google"
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Author

**arpancodez**
- GitHub: [@arpancodez](https://github.com/arpancodez)

## Acknowledgments

- OpenAI for GPT models
- Anthropic for Claude models
- Google for Gemini models
- Vercel for Next.js and hosting platform

---

**Note**: This project requires valid API keys for the AI providers you wish to use. Make sure to keep your API keys secure and never commit them to version control.
