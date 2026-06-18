/**
 * Unified LLM layer.
 *
 * Order of preference:
 *   1. Google Gemini   (GEMINI_API_KEY)
 *   2. OpenAI-compatible (OPENAI_API_KEY)
 *   3. null -> caller falls back to the built-in deterministic generator.
 *
 * Always returns the raw text from the model (expected to be JSON). The caller
 * is responsible for parsing.
 */

import { callGemini } from "./gemini";

const SYSTEM_PROMPT =
  "You are a world-class professional resume and cover letter writer. " +
  "You always produce concise, ATS-friendly, achievement-focused content. " +
  "Respond with valid JSON only — no markdown, no commentary.";

export async function callLLM(prompt: string): Promise<string | null> {
  // 1) Gemini
  const gemini = await callGemini(prompt, {
    expectJson: true,
    system: SYSTEM_PROMPT,
  });
  if (gemini) return gemini;

  // 2) OpenAI-compatible
  const openai = await callOpenAI(prompt);
  if (openai) return openai;

  return null;
}

async function callOpenAI(prompt: string): Promise<string | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  try {
    const res = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const content: string | undefined = data?.choices?.[0]?.message?.content;
    return content ?? null;
  } catch {
    return null;
  }
}
