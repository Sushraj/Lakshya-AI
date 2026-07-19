import type { LakshyaAIContext } from "@/lib/ai/context";

export function buildTravelPrompt({
  context,
  request,
}: {
  context: LakshyaAIContext;
  request: unknown;
}) {
  return `Explain a travel affordability result using only the deterministic calculations supplied by the application.

Do not perform financial arithmetic.
Do not describe the result as financial advice.
Protect emergency savings.
Do not book anything or imply external action has been taken.

User context:
${JSON.stringify(context)}

Request input, including deterministic affordability numbers:
${JSON.stringify(request)}

Return only the structured travel plan.`;
}

