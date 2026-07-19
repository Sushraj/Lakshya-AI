import { NextResponse } from "next/server";

import { getLakshyaAIContext, getAuthenticatedSupabase, persistGeneratedPlan } from "@/lib/ai/context";
import { generateStructuredPlan } from "@/lib/ai/generate";
import { buildCoachPrompt } from "@/lib/ai/prompts/coach";
import { CoachResponseSchema } from "@/lib/ai/schemas/coach-response";
import { CoachRequestSchema } from "@/lib/ai/schemas/requests";
import {
  checkRateLimit,
  errorResponse,
  validationErrorResponse,
} from "@/lib/ai/safety";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = CoachRequestSchema.safeParse(body);

    if (!input.success) {
      return validationErrorResponse(input.error);
    }

    const { supabase, userId } = await getAuthenticatedSupabase();

    if (!userId) {
      return errorResponse("Please sign in before using the coach.", 401);
    }

    const rateLimit = checkRateLimit(`${userId}:coach`);

    if (!rateLimit.allowed) {
      return errorResponse(
        `Too many coach requests. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429,
      );
    }

    const context = await getLakshyaAIContext({
      supabase,
      userId,
      include: {
        health: true,
        financial: true,
        goals: true,
        todayCheckIn: true,
      },
    });
    const plan = await generateStructuredPlan({
      schema: CoachResponseSchema,
      schemaName: "coach_response",
      prompt: buildCoachPrompt({ context, request: input.data }),
    });
    const { error } = await persistGeneratedPlan({
      supabase,
      userId,
      type: "coach",
      input: input.data,
      output: plan,
    });

    if (error) {
      return errorResponse(`Coach response generated but could not be saved: ${error.message}`, 500);
    }

    return NextResponse.json({ response: plan });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Could not generate coach response.",
      500,
    );
  }
}

