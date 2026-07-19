import { z } from "zod";

const requiredText = (field: string) =>
  z
    .string()
    .trim()
    .min(1, `${field} is required`)
    .max(500, `${field} must be 500 characters or fewer`);

const goalText = (field: string) =>
  z
    .string()
    .trim()
    .min(10, `${field} should be at least 10 characters`)
    .max(700, `${field} must be 700 characters or fewer`);

const moneyAmount = (field: string) =>
  z
    .number({ error: `${field} is required` })
    .min(0, `${field} cannot be negative`)
    .max(1_000_000_000, `${field} is too large`);

export const onboardingSchema = z.object({
  name: requiredText("Name").max(120, "Name must be 120 characters or fewer"),
  age: z
    .number({ error: "Age is required" })
    .int("Age must be a whole number")
    .min(13, "Age must be at least 13")
    .max(120, "Age must be 120 or below"),
  city: requiredText("City").max(120, "City must be 120 characters or fewer"),
  state: requiredText("State").max(
    120,
    "State must be 120 characters or fewer",
  ),
  occupation: requiredText("Occupation").max(
    160,
    "Occupation must be 160 characters or fewer",
  ),
  preferredLanguage: requiredText("Preferred language"),
  dietaryPreference: requiredText("Dietary preference"),
  regionalCuisine: requiredText("Regional cuisine"),
  healthConditions: requiredText("Health conditions"),
  allergies: requiredText("Allergies"),
  foodRestrictions: requiredText("Food restrictions"),
  injuries: requiredText("Injuries"),
  height: z
    .number({ error: "Height is required" })
    .min(50, "Height must be at least 50 cm")
    .max(260, "Height must be 260 cm or below"),
  weight: z
    .number({ error: "Weight is required" })
    .min(20, "Weight must be at least 20 kg")
    .max(300, "Weight must be 300 kg or below"),
  fitnessGoal: requiredText("Fitness goal"),
  activityLevel: requiredText("Activity level"),
  monthlyIncome: moneyAmount("Monthly income"),
  fixedExpenses: moneyAmount("Fixed expenses"),
  variableExpenses: moneyAmount("Variable expenses"),
  currentSavings: moneyAmount("Current savings"),
  emergencyFund: moneyAmount("Emergency fund"),
  monthlySavingsGoal: moneyAmount("Monthly savings goal"),
  healthGoal: goalText("Health goal"),
  professionalGoal: goalText("Professional goal"),
  financialGoal: goalText("Financial goal"),
  personalDevelopmentGoal: goalText("Personal development goal"),
});

export type OnboardingFormValues = z.infer<typeof onboardingSchema>;
export type OnboardingFieldName = keyof OnboardingFormValues;
