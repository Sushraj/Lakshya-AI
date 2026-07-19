import { z } from "zod";

export const CoachResponseSchema = z.object({
  category: z.enum(["focus", "health", "travel", "general"]),
  summary: z.string(),
  nextAction: z.string(),
  rationale: z.string(),
  missingInformation: z.array(z.string()),
  suggestedDraftGoal: z.string(),
  reminderSuggestion: z.string(),
  safetyDisclaimer: z.string(),
});

export type CoachResponse = z.infer<typeof CoachResponseSchema>;

