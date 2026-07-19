import type { LakshyaAIContext } from "@/lib/ai/context";

export function buildHealthPrompt({
  context,
  request,
}: {
  context: LakshyaAIContext;
  request: unknown;
}) {
  return `Create educational health coaching for the user's meals and lifestyle.

Visible safety requirements:
- Educational coaching only.
- Not a diagnosis or replacement for professional medical care.
- For diabetes, never recommend medication changes.
- Never claim a meal will control, reverse, or cure diabetes.

Prefer familiar, affordable regional vegetarian options when useful.

User context:
${JSON.stringify(context)}

Request input:
${JSON.stringify(request)}

Return only the structured health plan.`;
}

