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
    full_name: data.name,
    age: data.age,
    city: data.city,
    state: data.state,
    occupation: data.occupation,
    preferred_language: data.preferredLanguage,
    onboarding_completed: true,
  };

  const healthProfile = {
    user_id: userId,
    dietary_preference: data.dietaryPreference,
    regional_cuisine: data.regionalCuisine,
    allergies: data.allergies,
    food_restrictions: data.foodRestrictions,
    injuries: data.injuries,
    height_cm: data.height,
    weight_kg: data.weight,
    fitness_goal: data.fitnessGoal,
    activity_level: data.activityLevel,
  };

  const financialProfile = {
    user_id: userId,
    monthly_income: data.monthlyIncome,
    monthly_fixed_expenses: data.fixedExpenses,
    monthly_variable_expenses: data.variableExpenses,
    current_savings: data.currentSavings,
    emergency_fund: data.emergencyFund,
    monthly_savings_goal: data.monthlySavingsGoal,
    currency: "INR",
  };

  const goals = [
    { user_id: userId, category: "health", title: data.healthGoal, status: "active" },
    {
      user_id: userId,
      category: "professional",
      title: data.professionalGoal,
      status: "active",
    },
    {
      user_id: userId,
      category: "financial",
      title: data.financialGoal,
      status: "active",
    },
    {
      user_id: userId,
      category: "personal_development",
      title: data.personalDevelopmentGoal,
      status: "active",
    },
  ];

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

  const goalCategories = goals.map((goal) => goal.category);
  const { error: deleteGoalsError } = await supabase
    .from("goals")
    .delete()
    .eq("user_id", userId)
    .in("category", goalCategories);

  if (deleteGoalsError) {
    return {
      success: false,
      message: `Could not refresh goals: ${deleteGoalsError.message}`,
    };
  }

  const { error: insertGoalsError } = await supabase.from("goals").insert(goals);

  if (insertGoalsError) {
    return {
      success: false,
      message: `Could not save goals: ${insertGoalsError.message}`,
    };
  }

  return { success: true };
}
