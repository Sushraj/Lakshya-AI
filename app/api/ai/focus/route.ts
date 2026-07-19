import { NextResponse } from "next/server";

import { getLakshyaAIContext, getAuthenticatedSupabase, persistGeneratedPlan } from "@/lib/ai/context";
import { generateStructuredPlan } from "@/lib/ai/generate";
import { buildFocusPrompt } from "@/lib/ai/prompts/focus";
import { FocusPlanSchema } from "@/lib/ai/schemas/focus-plan";
import { FocusRequestSchema } from "@/lib/ai/schemas/requests";
import {
  checkRateLimit,
  errorResponse,
  validationErrorResponse,
} from "@/lib/ai/safety";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = FocusRequestSchema.safeParse(body);

    if (!input.success) {
      return validationErrorResponse(input.error);
    }

    const { supabase, userId } = await getAuthenticatedSupabase();

    if (!userId) {
      return errorResponse("Please sign in before generating a focus plan.", 401);
    }

    const rateLimit = checkRateLimit(`${userId}:focus`);

    if (!rateLimit.allowed) {
      return errorResponse(
        `Too many focus plan requests. Try again in ${rateLimit.retryAfterSeconds} seconds.`,
        429,
      );
    }

    const context = await getLakshyaAIContext({
      supabase,
      userId,
      include: { goals: true, todayCheckIn: true },
    });
    const plan = await generateStructuredPlan({
      schema: FocusPlanSchema,
      schemaName: "focus_plan",
      prompt: buildFocusPrompt({ context, request: input.data }),
    });
    const { error } = await persistGeneratedPlan({
      supabase,
      userId,
      type: "focus",
      input: input.data,
      output: plan,
    });

    if (error) {
      return errorResponse(`Focus plan generated but could not be saved: ${error.message}`, 500);
    }

    return NextResponse.json({ plan });
  } catch (error) {
    return errorResponse(
      error instanceof Error ? error.message : "Could not generate focus plan.",
      500,
    );
  }
}

