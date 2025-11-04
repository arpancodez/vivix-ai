import { NextRequest } from 'next/server';
import { AIProviderFactory } from '@/lib/ai-providers';
import { ChatRequest } from '@/types/api';
import { useAgentStore } from '@/lib/agent-manager';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { agentId, message, conversationHistory }: ChatRequest = await req.json();

    // Get agent configuration
    const agents = useAgentStore.getState().agents;
    const agent = agents.find(a => a.id === agentId);

    if (!agent) {
      return new Response(
        JSON.stringify({ error: 'Agent not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Prepare messages for AI provider
    const messages = [
      ...conversationHistory.map(m => ({
        role: m.role,
        content: m.content,
      })),
      { role: 'user', content: message },
    ];

    // Create streaming response
    const stream = await AIProviderFactory.createStream(agent, messages);

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
