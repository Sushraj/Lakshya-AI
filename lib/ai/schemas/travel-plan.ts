import { z } from "zod";

export const TravelPlanSchema = z.object({
  explanation: z.string(),
  suggestedExpenseReductions: z.array(z.string()),
  alternativeDates: z.array(z.string()),
  alternativeNearbyDestinations: z.array(z.string()),
  savingsPlan: z.array(z.string()),
  travelChecklist: z.array(z.string()),
  scopeDisclaimer: z.string(),
});

export type TravelPlan = z.infer<typeof TravelPlanSchema>;

