'use client';
import { motion } from 'framer-motion';
import { Brain, Trash2 } from 'lucide-react';
import { AgentConfig } from '@/types/agent';

interface AgentCardProps {
  agent: AgentConfig;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export function AgentCard({ agent, isActive, onClick, onDelete }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.02 }}
      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
        isActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary/50'
      }`}
      onClick={onClick}
      style={{ borderLeftColor: agent.color, borderLeftWidth: '4px' }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-md"
            style={{ backgroundColor: `${agent.color}20` }}
          >
            <Brain size={20} style={{ color: agent.color }} />
          </div>
          <div>
            <h3 className="font-semibold">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.model}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1 hover:bg-destructive/20 rounded"
        >
          <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
        </button>
      </div>
      <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
        {agent.systemPrompt}
      </p>
    </motion.div>
  );
}
