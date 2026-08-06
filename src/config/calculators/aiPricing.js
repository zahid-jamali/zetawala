/**
 * Approximate public API prices (USD per 1M tokens).
 * Estimates only — update when provider rates change.
 */

export const aiProviders = [
  {
    id: 'openai',
    label: 'OpenAI',
    models: [
      { id: 'gpt-4o', label: 'GPT-4o', inputPer1M: 2.5, outputPer1M: 10 },
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini', inputPer1M: 0.15, outputPer1M: 0.6 },
      { id: 'gpt-4.1', label: 'GPT-4.1', inputPer1M: 2, outputPer1M: 8 },
      { id: 'o3-mini', label: 'o3-mini', inputPer1M: 1.1, outputPer1M: 4.4 },
    ],
  },
  {
    id: 'anthropic',
    label: 'Anthropic',
    models: [
      { id: 'claude-sonnet-4', label: 'Claude Sonnet 4', inputPer1M: 3, outputPer1M: 15 },
      { id: 'claude-haiku', label: 'Claude 3.5 Haiku', inputPer1M: 0.8, outputPer1M: 4 },
      { id: 'claude-opus', label: 'Claude Opus 4', inputPer1M: 15, outputPer1M: 75 },
    ],
  },
  {
    id: 'google',
    label: 'Google Gemini',
    models: [
      { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', inputPer1M: 0.1, outputPer1M: 0.4 },
      { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', inputPer1M: 1.25, outputPer1M: 10 },
      { id: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash', inputPer1M: 0.075, outputPer1M: 0.3 },
    ],
  },
  {
    id: 'deepseek',
    label: 'DeepSeek',
    models: [
      { id: 'deepseek-chat', label: 'DeepSeek Chat (V3)', inputPer1M: 0.27, outputPer1M: 1.1 },
      { id: 'deepseek-reasoner', label: 'DeepSeek Reasoner (R1)', inputPer1M: 0.55, outputPer1M: 2.19 },
    ],
  },
  {
    id: 'custom',
    label: 'Custom rates',
    models: [
      { id: 'custom', label: 'Custom model', inputPer1M: 1, outputPer1M: 3 },
    ],
  },
];

export function findAiModel(providerId, modelId) {
  const provider = aiProviders.find((p) => p.id === providerId);
  if (!provider) return null;
  return provider.models.find((m) => m.id === modelId) || provider.models[0];
}
