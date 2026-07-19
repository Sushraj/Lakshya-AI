import type { LakshyaAIContext } from "@/lib/ai/context";

export function buildCoachPrompt({
  context,
  request,
}: {
  context: LakshyaAIContext;
  request: unknown;
}) {
  return `Classify the user request as focus, health, travel, or general, then provide a concise coaching response.

Allowed demo actions:
- Read stored context supplied in this prompt.
- Explain generated plans.
- Recommend one next action.
- Create a draft goal.
- Suggest a reminder.

Do not:
- Book travel.
- Transfer money.
- Change medications.
- Make purchases.
- Access a bank account.
- Perform arbitrary external actions.

User context:
${JSON.stringify(context)}

Request input:
${JSON.stringify(request)}

Return only the structured coach response.`;
}

