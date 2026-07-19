import type { LakshyaAIContext } from "@/lib/ai/context";

export function buildFocusPrompt({
  context,
  request,
}: {
  context: LakshyaAIContext;
  request: unknown;
}) {
  return `Create a concise focus plan for today.

Use selected productivity ideas without claiming official endorsement:
- cue, action, reward, environment
- small repeatable actions
- protected deep-work blocks
- sleep, light, movement, and focus cycles
- one controlled difficult action

User context:
${JSON.stringify(context)}

Request input:
${JSON.stringify(request)}

Return only the structured plan.`;
}

