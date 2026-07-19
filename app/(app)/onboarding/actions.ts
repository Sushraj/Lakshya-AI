"use server";

import { createClient } from "@/lib/supabase/server";
import {
  onboardingSchema,
  type OnboardingFormValues,
} from "@/lib/onboarding/schema";

export type OnboardingActionResult =
  | { success: true }
  | { success: false; message: string };

export async function completeOnboarding(
  values: OnboardingFormValues,
): Promise<OnboardingActionResult> {
  const parsed = onboardingSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the highlighted fields before continuing.",
    };
  }

  const supabase = await createClient();
  const { data: claimsData, error: authError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;

  if (authError || typeof userId !== "string") {
    return {
      success: false,
      message: "Your session expired. Please sign in again.",
    };
  }

  const data = parsed.data;

  const profile = {
    id: userId,
    name: data.name,
    age: data.age,
    city: data.city,
    state: data.state,
    occupation: data.occupation,
    preferred_language: data.preferredLanguage,
  };

  const healthProfile = {
    user_id: userId,
    dietary_preference: data.dietaryPreference,
    regional_cuisine: data.regionalCuisine,
    health_conditions: data.healthConditions,
    allergies: data.allergies,
    food_restrictions: data.foodRestrictions,
    injuries: data.injuries,
    height: data.height,
    weight: data.weight,
    fitness_goal: data.fitnessGoal,
    activity_level: data.activityLevel,
  };

  const financialProfile = {
    user_id: userId,
    monthly_income: data.monthlyIncome,
    fixed_expenses: data.fixedExpenses,
    variable_expenses: data.variableExpenses,
    current_savings: data.currentSavings,
    emergency_fund: data.emergencyFund,
    monthly_savings_goal: data.monthlySavingsGoal,
  };

  const goals = {
    user_id: userId,
    health_goal: data.healthGoal,
    professional_goal: data.professionalGoal,
    financial_goal: data.financialGoal,
    personal_development_goal: data.personalDevelopmentGoal,
  };

  const operations = [
    {
      label: "personal profile",
      query: supabase.from("profiles").upsert(profile, { onConflict: "id" }),
    },
    {
      label: "health profile",
      query: supabase
        .from("health_profiles")
        .upsert(healthProfile, { onConflict: "user_id" }),
    },
    {
      label: "financial profile",
      query: supabase
        .from("financial_profiles")
        .upsert(financialProfile, { onConflict: "user_id" }),
    },
    {
      label: "goals",
      query: supabase.from("goals").upsert(goals, { onConflict: "user_id" }),
    },
    {
      label: "onboarding status",
      query: supabase
        .from("profiles")
        .upsert(
          { ...profile, onboarding_completed: true },
          { onConflict: "id" },
        ),
    },
  ];

  for (const operation of operations) {
    const { error } = await operation.query;

    if (error) {
      return {
        success: false,
        message: `Could not save ${operation.label}: ${error.message}`,
      };
    }
  }

  return { success: true };
}

