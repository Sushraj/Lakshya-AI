import "server-only";

import type { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";

import { getOpenAIClient, getOpenAIModel } from "@/lib/ai/client";
import { lakshyaSystemPrompt } from "@/lib/ai/prompts/system";

export async function generateStructuredPlan<TSchema extends z.ZodType>({
  schema,
  schemaName,
  prompt,
}: {
  schema: TSchema;
  schemaName: string;
  prompt: string;
}): Promise<z.infer<TSchema>> {
  const response = await getOpenAIClient().responses.parse({
    model: getOpenAIModel(),
    instructions: lakshyaSystemPrompt,
    input: prompt,
    text: {
      format: zodTextFormat(schema, schemaName),
      verbosity: "low",
    },
  });

  const parsed = response.output_parsed;

  if (!parsed) {
    throw new Error("The model returned an empty structured response");
  }

  return schema.parse(parsed);
}

