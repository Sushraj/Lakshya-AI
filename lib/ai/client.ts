import "server-only";

import OpenAI from "openai";

let openAIClient: OpenAI | null = null;

export function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  openAIClient ??= new OpenAI({ apiKey });

  return openAIClient;
}

export function getOpenAIModel() {
  return process.env.OPENAI_MODEL || "gpt-4.1-mini";
}

