import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { AgentConfig } from '@/types/agent';

export class AIProviderFactory {
  static async createStream(
    agent: AgentConfig,
    messages: { role: string; content: string }[],
  ): Promise<ReadableStream<Uint8Array>> {
    const encoder = new TextEncoder();

    if (agent.provider === 'openai') {
      return this.createOpenAIStream(agent, messages, encoder);
    } else if (agent.provider === 'anthropic') {
      return this.createAnthropicStream(agent, messages, encoder);
    } else if (agent.provider === 'google') {
      return this.createGoogleStream(agent, messages, encoder);
    }

    throw new Error(`Unsupported provider: ${agent.provider}`);
  }

  private static async createOpenAIStream(
    agent: AgentConfig,
    messages: { role: string; content: string }[],
    encoder: TextEncoder,
  ): Promise<ReadableStream<Uint8Array>> {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const stream = await openai.chat.completions.create({
      model: agent.model,
      messages: [
        { role: 'system', content: agent.systemPrompt },
        ...messages,
      ] as any,
      temperature: agent.temperature,
      max_tokens: agent.maxTokens,
      stream: true,
    });

    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(JSON.stringify({ content }) + '\n'));
          }
        }
        controller.close();
      },
    });
  }

  private static async createAnthropicStream(
    agent: AgentConfig,
    messages: { role: string; content: string }[],
    encoder: TextEncoder,
  ): Promise<ReadableStream<Uint8Array>> {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const stream = await anthropic.messages.create({
      model: agent.model,
      max_tokens: agent.maxTokens,
      temperature: agent.temperature,
      system: agent.systemPrompt,
      messages: messages as any,
      stream: true,
    });

    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
            const content = chunk.delta.text;
            controller.enqueue(encoder.encode(JSON.stringify({ content }) + '\n'));
          }
        }
        controller.close();
      },
    });
  }

  private static async createGoogleStream(
    agent: AgentConfig,
    messages: { role: string; content: string }[],
    encoder: TextEncoder,
  ): Promise<ReadableStream<Uint8Array>> {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
    const model = genAI.getGenerativeModel({ model: agent.model });

    const chat = model.startChat({
      history: messages.slice(0, -1).map((m) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        temperature: agent.temperature,
        maxOutputTokens: agent.maxTokens,
      },
    });

    const result = await chat.sendMessageStream(messages[messages.length - 1].content);

    return new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const content = chunk.text();
          if (content) {
            controller.enqueue(encoder.encode(JSON.stringify({ content }) + '\n'));
          }
        }
        controller.close();
      },
    });
  }
}
