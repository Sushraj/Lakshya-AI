import "server-only";

import { NextResponse } from "next/server";
import { z } from "zod";

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 8;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string) {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS_PER_WINDOW - 1 };
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - current.count,
  };
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json(
    {
      error: message,
      fallback:
        "Lakshya could not generate a plan right now. Try again with a little more context.",
    },
    { status },
  );
}

export function validationErrorResponse(error: z.ZodError) {
  return NextResponse.json(
    {
      error: "Invalid request input",
      issues: error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    },
    { status: 422 },
  );
}

export const medicalScopeDisclaimer =
  "Educational coaching only. This is not a diagnosis or a replacement for professional medical care.";

export const financialScopeDisclaimer =
  "Budgeting guidance only. This is not financial advice, and deterministic calculations are supplied by the application.";

