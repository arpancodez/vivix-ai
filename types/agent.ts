export type AgentModel = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-3-opus' | 'claude-3-sonnet' | 'gemini-pro';

export interface AgentConfig {
  id: string;
  name: string;
  model: AgentModel;
  systemPrompt: string;
  temperature: number;
  maxTokens: number;
  provider: 'openai' | 'anthropic' | 'google';
  color: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: string;
  agentId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface StreamChunk {
  id: string;
  content: string;
  done: boolean;
}
