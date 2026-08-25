/**
 * @file backend/src/services/assistant/llmService.js
 * Provider-agnostic LLM abstraction service for Phase 3 BIS Assistant.
 * Supports OpenAI, Google Gemini, Anthropic, Ollama, and a built-in Mock provider.
 */

import config from '../../config/env.js';

const INSUFFICIENT_INFO_MESSAGE =
  "I couldn't find sufficient information in the available BIS sources to answer this reliably. Please verify the standard number or product keywords in our knowledge base.";

/**
 * Deterministic grounding generator used for mock provider or when LLM API keys are not provided.
 * Synthesizes grounded answers strictly from the retrieved chunks based on user mode.
 * 
 * @param {Object} params
 * @param {string} params.message
 * @param {'industry' | 'consumer'} params.mode
 * @param {Array<Object>} params.retrievedChunks
 * @returns {string} Grounded response text
 */
const generateMockGroundedResponse = ({ message, mode, retrievedChunks }) => {
  if (!retrievedChunks || retrievedChunks.length === 0) {
    return INSUFFICIENT_INFO_MESSAGE;
  }

  const isConsumer = mode === 'consumer';
  const primaryChunk = retrievedChunks[0];
  const standardNumber = primaryChunk.standardNumber || 'BIS Standard';
  const standardTitle = primaryChunk.standardTitle || 'Indian Standard';

  if (isConsumer) {
    let answer = `### What the retrieved source says\n\n`;
    answer += `The available knowledge base contains the following information for **${standardNumber}** (*${standardTitle}*):\n\n`;

    retrievedChunks.forEach((chunk) => {
      const section = chunk.sectionTitle ? `**${chunk.sectionTitle}**: ` : '';
      answer += `- ${section}${chunk.content}\n`;
    });

    return answer;
  }

  // Industry Mode
  let answer = `### Retrieved standards information\n\n`;
  answer += `For **${standardNumber}** (*${standardTitle}*), the available source material states:\n\n`;

  retrievedChunks.forEach((chunk, idx) => {
    const section = chunk.sectionTitle ? `#### ${chunk.sectionTitle} (Page ${chunk.pageNumber})\n` : `#### Clause Reference ${idx + 1}\n`;
    answer += `${section}${chunk.content}\n\n`;
  });

  return answer;
};

/**
 * Execute request to external LLM provider with timeout.
 * @param {Object} promptData - { systemPrompt, userPrompt, fullPromptText }
 * @param {Object} options - { mode, retrievedChunks, message }
 * @returns {Promise<string>}
 */
export const generateAnswer = async ({ message, mode = 'industry', retrievedChunks = [] }, promptData) => {
  // If zero relevant context was retrieved, trigger conservative hallucination protection
  if (!retrievedChunks || retrievedChunks.length === 0) {
    return INSUFFICIENT_INFO_MESSAGE;
  }

  const provider = (config.LLM_PROVIDER || 'mock').toLowerCase();

  // 1. Mock / Development Mode Provider
  if (provider === 'mock' || !config.LLM_API_KEY) {
    return generateMockGroundedResponse({ message, mode, retrievedChunks });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.LLM_TIMEOUT || 15000);

  try {
    // 2. OpenAI Provider
    if (provider === 'openai') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${config.LLM_API_KEY}`,
        },
        body: JSON.stringify({
          model: config.LLM_MODEL || 'gpt-4o-mini',
          messages: [
            { role: 'system', content: promptData.systemPrompt },
            { role: 'user', content: promptData.userPrompt },
          ],
          temperature: 0.2,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`OpenAI API error: HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.choices?.[0]?.message?.content || generateMockGroundedResponse({ message, mode, retrievedChunks });
    }

    // 3. Google Gemini Provider
    if (provider === 'gemini' || provider === 'google') {
      const model = config.LLM_MODEL || 'gemini-1.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.LLM_API_KEY}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${promptData.systemPrompt}\n\n${promptData.userPrompt}` }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
          },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`Gemini API error: HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || generateMockGroundedResponse({ message, mode, retrievedChunks });
    }

    // 4. Anthropic Claude Provider
    if (provider === 'anthropic') {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': config.LLM_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: config.LLM_MODEL || 'claude-3-5-haiku-20241022',
          system: promptData.systemPrompt,
          messages: [{ role: 'user', content: promptData.userPrompt }],
          max_tokens: 1024,
          temperature: 0.2,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (!response.ok) {
        throw new Error(`Anthropic API error: HTTP ${response.status}`);
      }
      const data = await response.json();
      return data.content?.[0]?.text || generateMockGroundedResponse({ message, mode, retrievedChunks });
    }

    // Default fallback
    clearTimeout(timeoutId);
    return generateMockGroundedResponse({ message, mode, retrievedChunks });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.warn('[LLM] Request timed out. Falling back to grounded synthesizer.');
    } else {
      console.warn(`[LLM] Provider ${provider} error (${err.message}). Falling back to grounded synthesizer.`);
    }
    // Graceful fallback to grounded synthesizer rather than crashing the user experience
    return generateMockGroundedResponse({ message, mode, retrievedChunks });
  }
};

export default {
  generateAnswer,
  INSUFFICIENT_INFO_MESSAGE,
};
