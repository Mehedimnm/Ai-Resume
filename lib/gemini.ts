/**
 * Google Gemini integration.
 *
 * Calls the Gemini generateContent REST API and returns the model's text
 * output. Tries the primary model first and falls back to other models if the
 * primary is rate-limited (429) or temporarily unavailable (503). Each model is
 * retried once on transient errors.
 */

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

function modelList(): string[] {
  const primary = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallbacks = (process.env.GEMINI_FALLBACK_MODELS || "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  return [primary, ...fallbacks];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function tryModel(
  model: string,
  apiKey: string,
  payload: Record<string, unknown>
): Promise<{ text: string | null; transient: boolean }> {
  const url = `${ENDPOINT}/${model}:generateContent`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });

    if (res.ok) {
      const data = await res.json();
      const text: string | undefined =
        data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text || "")
          .join("") || undefined;
      return { text: text ?? null, transient: false };
    }

    // 429 (rate limit) and 503 (overloaded) are transient — worth retry/fallback.
    const transient = res.status === 429 || res.status === 503;
    return { text: null, transient };
  } catch {
    // Network/timeout — treat as transient so we try a fallback model.
    return { text: null, transient: true };
  }
}

export async function callGemini(
  prompt: string,
  opts: { expectJson?: boolean; system?: string } = {}
): Promise<string | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const payload: Record<string, unknown> = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 2048,
      ...(opts.expectJson ? { responseMimeType: "application/json" } : {}),
    },
  };
  if (opts.system) {
    payload.systemInstruction = { parts: [{ text: opts.system }] };
  }

  for (const model of modelList()) {
    // Two attempts per model on transient errors.
    for (let attempt = 0; attempt < 2; attempt++) {
      const { text, transient } = await tryModel(model, apiKey, payload);
      if (text) return text;
      if (!transient) break; // permanent error for this model -> next model
      if (attempt === 0) await sleep(700);
    }
  }

  return null;
}

/** Strip markdown code fences and parse JSON safely. */
export function parseJsonLoose<T>(raw: string | null): T | null {
  if (!raw) return null;
  let text = raw.trim();
  if (text.startsWith("```")) {
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  }
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first !== -1 && last !== -1 && last > first) {
    text = text.slice(first, last + 1);
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}
