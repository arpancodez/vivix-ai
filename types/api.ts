import { AgentConfig, ChatMessage } from './agent';

export interface ChatRequest {
  agentId: string;
  message: string;
  conversationHistory: ChatMessage[];
}

export interface ChatResponse {
  message: ChatMessage;
  error?: string;
}

export interface CreateAgentRequest {
  name: string;
  model: string;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  provider: 'openai' | 'anthropic' | 'google';
}
