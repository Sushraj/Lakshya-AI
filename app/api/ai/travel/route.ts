import { NextResponse } from "next/server";

import { getLakshyaAIContext, getAuthenticatedSupabase, persistGeneratedPlan } from "@/lib/ai/context";
import { generateStructuredPlan } from "@/lib/ai/generate";
import { buildTravelPrompt } from "@/lib/ai/prompts/travel";
import { TravelPlanSchema } from "@/lib/ai/schemas/travel-plan";
import { TravelRequestSchema } from "@/lib/ai/schemas/requests";
import {
  checkRateLimit,
  errorResponse,
  financialScopeDisclaimer,
  validationErrorResponse,
} from "@/lib/ai/safety";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = TravelRequestSchema.safeParse(body);

    if (!input.success) {
      return validationErrorResponse(input.error);
    }

    const { supabase, userId } = await getAuthenticatedSupabase();

    if (!userId) {
      return errorResponse("Please sign in before generating travel guidance.", 401);
    }

    const rateLimit = checkRateLimit(`${userId}:travel`);

    if (!rateLimit.allowed) {
      return errorResponse(
        `Too many travel planning requests. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429,
      );
    }

    const context = await getLakshyaAIContext({
      supabase,
      userId,
      include: { financial: true, goals: true },
    });
    const plan = await generateStructuredPlan({
      schema: TravelPlanSchema,
      schemaName: "travel_plan",
      prompt: buildTravelPrompt({ context, request: input.data }),
    });
    const safePlan = {
      ...plan,
      scopeDisclaimer: plan.scopeDisclaimer || financialScopeDisclaimer,
    };
    const { error } = await persistGeneratedPlan({
      supabase,
      userId,
      type: "travel",
      input: input.data,
      output: safePlan,
    });

    if (error) {
      return errorResponse(`Travel plan generated but could not be saved: ${error.message}`, 500);
    }

    return NextResponse.json({ plan: safePlan });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Could not generate travel guidance.",
      500,
    );
  }
}

