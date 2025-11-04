import { create } from 'zustand';
import { AgentConfig } from '@/types/agent';
import { nanoid } from 'nanoid';

interface AgentStore {
  agents: AgentConfig[];
  activeAgentId: string | null;
  addAgent: (agent: Omit<AgentConfig, 'id' | 'createdAt'>) => void;
  removeAgent: (id: string) => void;
  setActiveAgent: (id: string) => void;
  getActiveAgent: () => AgentConfig | undefined;
}

export const useAgentStore = create<AgentStore>((set, get) => ({
  agents: [],
  activeAgentId: null,
  
  addAgent: (agent) => {
    const newAgent: AgentConfig = {
      ...agent,
      id: nanoid(),
      createdAt: new Date(),
    };
    set((state) => ({
      agents: [...state.agents, newAgent],
      activeAgentId: newAgent.id,
    }));
  },
  
  removeAgent: (id) => {
    set((state) => ({
      agents: state.agents.filter((a) => a.id !== id),
      activeAgentId: state.activeAgentId === id ? null : state.activeAgentId,
    }));
  },
  
  setActiveAgent: (id) => {
    set({ activeAgentId: id });
  },
  
  getActiveAgent: () => {
    const state = get();
    return state.agents.find((a) => a.id === state.activeAgentId);
  },
}));
