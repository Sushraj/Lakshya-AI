import "server-only";

import { createClient } from "@/lib/supabase/server";

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

export type LakshyaAIContext = {
  profile: Record<string, unknown> | null;
  healthProfile?: Record<string, unknown> | null;
  financialProfile?: Record<string, unknown> | null;
  goals?: Record<string, unknown> | null;
  todayCheckIn?: Record<string, unknown> | null;
};

export async function getAuthenticatedSupabase() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (error || typeof userId !== "string") {
    return { supabase, userId: null };
  }

  return { supabase, userId };
}

export async function getLakshyaAIContext({
  supabase,
  userId,
  include,
}: {
  supabase: SupabaseClient;
  userId: string;
  include: {
    health?: boolean;
    financial?: boolean;
    goals?: boolean;
    todayCheckIn?: boolean;
  };
}): Promise<LakshyaAIContext> {
  const [profile, healthProfile, financialProfile, goals, todayCheckIn] =
    await Promise.all([
      selectSingle(supabase, "profiles", "id", userId),
      include.health
        ? selectSingle(supabase, "health_profiles", "user_id", userId)
        : Promise.resolve(null),
      include.financial
        ? selectSingle(supabase, "financial_profiles", "user_id", userId)
        : Promise.resolve(null),
      include.goals
        ? selectSingle(supabase, "goals", "user_id", userId)
        : Promise.resolve(null),
      include.todayCheckIn
        ? selectSingle(supabase, "daily_checkins", "user_id", userId)
        : Promise.resolve(null),
    ]);

  return removeEmptyValues({
    profile,
    healthProfile,
    financialProfile,
    goals,
    todayCheckIn,
  }) as LakshyaAIContext;
}

export async function persistGeneratedPlan({
  supabase,
  userId,
  type,
  input,
  output,
}: {
  supabase: SupabaseClient;
  userId: string;
  type: "focus" | "health" | "travel" | "coach";
  input: unknown;
  output: unknown;
}) {
  return supabase.from("generated_plans").insert({
    user_id: userId,
    plan_type: type,
    input,
    output,
  });
}

async function selectSingle(
  supabase: SupabaseClient,
  table: string,
  column: string,
  value: string,
) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq(column, value)
    .maybeSingle();

  if (error) {
    return null;
  }

  return removeEmptyValues(data);
}

function removeEmptyValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(removeEmptyValues);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== null && item !== undefined && item !== "")
        .map(([key, item]) => [key, removeEmptyValues(item)]),
    );
  }

  return value;
}

