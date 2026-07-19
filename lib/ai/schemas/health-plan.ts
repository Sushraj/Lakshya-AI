import { z } from "zod";

export const HealthPlanSchema = z.object({
  mealAssessment: z.string(),
  whatWasGood: z.array(z.string()),
  whatNeedsImprovement: z.array(z.string()),
  betterPairing: z.string(),
  suggestedNextMeal: z.string(),
  hydrationAction: z.string(),
  movementAction: z.string(),
  questionsOrMissingInformation: z.array(z.string()),
  safetyDisclaimer: z.string(),
});

export type HealthPlan = z.infer<typeof HealthPlanSchema>;

