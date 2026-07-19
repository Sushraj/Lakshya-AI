import { z } from "zod";

export const FocusRequestSchema = z.object({
  date: z.string().optional(),
  energyScore: z.number().min(1).max(10).optional(),
  availableMinutes: z.number().int().min(15).max(720).optional(),
  priorities: z.array(z.string().min(1).max(160)).max(5).optional(),
  scheduleNotes: z.string().max(1000).optional(),
  currentObstacle: z.string().max(500).optional(),
});

export const HealthRequestSchema = z.object({
  dietType: z.string().max(120).optional(),
  regionalCuisine: z.string().max(120).optional(),
  healthConditions: z.string().max(500).optional(),
  foodAllergies: z.string().max(500).optional(),
  foodRestrictions: z.string().max(500).optional(),
  medicationsNote: z.string().max(500).optional(),
  activity: z.string().max(500).optional(),
  goal: z.string().max(500).optional(),
  mealsConsumed: z.string().min(1).max(1000),
  sleep: z.string().max(200).optional(),
  energy: z.string().max(200).optional(),
});

export const TravelRequestSchema = z.object({
  destination: z.string().min(1).max(160),
  startingCity: z.string().min(1).max(160),
  numberOfTravellers: z.number().int().min(1).max(20),
  travelDates: z.string().min(1).max(240),
  estimatedTransport: z.number().min(0),
  estimatedAccommodation: z.number().min(0),
  estimatedFood: z.number().min(0),
  estimatedActivities: z.number().min(0),
  contingency: z.number().min(0),
  affordability: z.object({
    totalEstimatedCost: z.number(),
    safeAvailableBudget: z.number(),
    difference: z.number(),
    affordabilityVerdict: z.enum(["SAFE", "CAUTION", "DELAY"]),
    monthlyDisposableIncome: z.number().optional(),
    protectedSavings: z.number().optional(),
    affordabilityRatio: z.number().optional(),
    reasons: z.array(z.string()).optional(),
  }),
});

export const CoachRequestSchema = z.object({
  message: z.string().min(1).max(1500),
  relatedPlanType: z.enum(["focus", "health", "travel", "general"]).optional(),
});

export type FocusRequest = z.infer<typeof FocusRequestSchema>;
export type HealthRequest = z.infer<typeof HealthRequestSchema>;
export type TravelRequest = z.infer<typeof TravelRequestSchema>;
export type CoachRequest = z.infer<typeof CoachRequestSchema>;

