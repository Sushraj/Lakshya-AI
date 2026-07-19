import { NextResponse } from "next/server";

import { getLakshyaAIContext, getAuthenticatedSupabase, persistGeneratedPlan } from "@/lib/ai/context";
import { generateStructuredPlan } from "@/lib/ai/generate";
import { buildHealthPrompt } from "@/lib/ai/prompts/health";
import { HealthPlanSchema } from "@/lib/ai/schemas/health-plan";
import { HealthRequestSchema } from "@/lib/ai/schemas/requests";
import {
  checkRateLimit,
  errorResponse,
  medicalScopeDisclaimer,
  validationErrorResponse,
} from "@/lib/ai/safety";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = HealthRequestSchema.safeParse(body);

    if (!input.success) {
      return validationErrorResponse(input.error);
    }

    const { supabase, userId } = await getAuthenticatedSupabase();

    if (!userId) {
      return errorResponse("Please sign in before generating health coaching.", 401);
    }

    const rateLimit = checkRateLimit(`${userId}:health`);

    if (!rateLimit.allowed) {
      return errorResponse(
        `Too many health coaching requests. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429,
      );
    }

    const context = await getLakshyaAIContext({
      supabase,
      userId,
      include: { health: true, goals: true, todayCheckIn: true },
    });
    const plan = await generateStructuredPlan({
      schema: HealthPlanSchema,
      schemaName: "health_plan",
      prompt: buildHealthPrompt({ context, request: input.data }),
    });
    const safePlan = {
      ...plan,
      safetyDisclaimer: plan.safetyDisclaimer || medicalScopeDisclaimer,
    };
    const { error } = await persistGeneratedPlan({
      supabase,
      userId,
      type: "health",
      input: input.data,
      output: safePlan,
    });

    if (error) {
      return errorResponse(`Health plan generated but could not be saved: ${error.message}`, 500);
    }

    return NextResponse.json({ plan: safePlan });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Could not generate health coaching.",
      500,
    );
  }
}

