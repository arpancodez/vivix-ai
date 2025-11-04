import { NextRequest, NextResponse } from 'next/server';
import { useAgentStore } from '@/lib/agent-manager';
import { CreateAgentRequest } from '@/types/api';

export async function GET() {
  try {
    const agents = useAgentStore.getState().agents;
    return NextResponse.json({ agents });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: CreateAgentRequest = await req.json();
    
    const { addAgent } = useAgentStore.getState();
    addAgent({
      name: body.name,
      model: body.model as any,
      systemPrompt: body.systemPrompt,
      temperature: body.temperature,
      maxTokens: body.maxTokens,
      provider: body.provider,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    });
    
    const agents = useAgentStore.getState().agents;
    const newAgent = agents[agents.length - 1];
    
    return NextResponse.json({ agent: newAgent }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create agent' },
      { status: 500 }
    );
  }
}
