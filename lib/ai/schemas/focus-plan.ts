import { z } from "zod";

export const FocusPlanSchema = z.object({
  date: z.string(),
  primaryOutcome: z.string(),
  energyStrategy: z.string(),
  priorities: z
    .array(
      z.object({
        title: z.string(),
        reason: z.string(),
        durationMinutes: z.number(),
        difficulty: z.enum(["easy", "moderate", "hard"]),
      }),
    )
    .min(1)
    .max(3),
  deepWorkBlocks: z.array(
    z.object({
      title: z.string(),
      startTime: z.string(),
      durationMinutes: z.number(),
      preparation: z.string(),
    }),
  ),
  habitActions: z.array(
    z.object({
      habit: z.string(),
      cue: z.string(),
      action: z.string(),
      reward: z.string(),
    }),
  ),
  hardThingChallenge: z.string(),
  eveningReflection: z.array(z.string()),
});

export type FocusPlan = z.infer<typeof FocusPlanSchema>;

