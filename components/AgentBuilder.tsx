'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useAgentStore } from '@/lib/agent-manager';
import { AgentModel } from '@/types/agent';

interface AgentBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const models: { value: AgentModel; label: string; provider: 'openai' | 'anthropic' | 'google' }[] = [
  { value: 'gpt-4', label: 'GPT-4', provider: 'openai' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo', provider: 'openai' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus', provider: 'anthropic' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet', provider: 'anthropic' },
  { value: 'gemini-pro', label: 'Gemini Pro', provider: 'google' },
];

export function AgentBuilder({ isOpen, onClose }: AgentBuilderProps) {
  const { addAgent } = useAgentStore();
  const [formData, setFormData] = useState({
    name: '',
    model: 'gpt-4' as AgentModel,
    systemPrompt: '',
    temperature: 0.7,
    maxTokens: 1000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedModel = models.find((m) => m.value === formData.model);
    if (!selectedModel) return;

    addAgent({
      name: formData.name,
      model: formData.model,
      systemPrompt: formData.systemPrompt,
      temperature: formData.temperature,
      maxTokens: formData.maxTokens,
      provider: selectedModel.provider,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    });

    setFormData({
      name: '',
      model: 'gpt-4',
      systemPrompt: '',
      temperature: 0.7,
      maxTokens: 1000,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Create New Agent</h2>
                <button onClick={onClose} className="p-2 hover:bg-muted rounded">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Model</label>
                  <select
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value as AgentModel })}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    {models.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">System Prompt</label>
                  <textarea
                    value={formData.systemPrompt}
                    onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg h-32"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Temperature: {formData.temperature}</label>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={formData.temperature}
                      onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Max Tokens</label>
                    <input
                      type="number"
                      value={formData.maxTokens}
                      onChange={(e) => setFormData({ ...formData, maxTokens: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg"
                      min="100"
                      max="4000"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
                    Create Agent
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
