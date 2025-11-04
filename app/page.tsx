'use client';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useAgentStore } from '@/lib/agent-manager';
import { AgentCard } from '@/components/AgentCard';
import { ChatInterface } from '@/components/ChatInterface';
import { AgentBuilder } from '@/components/AgentBuilder';

export default function Home() {
  const { agents, activeAgentId, setActiveAgent, removeAgent } = useAgentStore();
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);

  const activeAgent = agents.find((a) => a.id === activeAgentId);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">Vivix AI - Multi-Agent Platform</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Sidebar */}
          <div className="col-span-3 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Agents</h2>
              <button
                onClick={() => setIsBuilderOpen(true)}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                <Plus size={20} />
              </button>
            </div>
            <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-280px)]">
              {agents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  isActive={agent.id === activeAgentId}
                  onClick={() => setActiveAgent(agent.id)}
                  onDelete={() => removeAgent(agent.id)}
                />
              ))}
              {agents.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No agents yet. Create one to get started!
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-9 border rounded-lg bg-card">
            <ChatInterface agent={activeAgent} />
          </div>
        </div>
      </div>

      <AgentBuilder isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
    </div>
  );
}
