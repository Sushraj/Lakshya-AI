"use client";

import { useMemo, useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BadgeIndianRupee,
  CheckCircle2,
  HeartPulse,
  Loader2,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";

import {
  completeOnboarding,
  type OnboardingActionResult,
} from "@/app/(app)/onboarding/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  onboardingSchema,
  type OnboardingFieldName,
  type OnboardingFormValues,
} from "@/lib/onboarding/schema";
import { cn } from "@/lib/utils";

type Step = {
  title: string;
  description: string;
  icon: typeof UserRound;
  fields: OnboardingFieldName[];
};

const steps: Step[] = [
  {
    title: "Personal profile",
    description: "Basic context that helps Lakshya personalize your dashboard.",
    icon: UserRound,
    fields: [
      "name",
      "age",
      "city",
      "state",
      "occupation",
      "preferredLanguage",
    ],
  },
  {
    title: "Health and lifestyle",
    description:
      "Wellness inputs for safe, practical health-aware coaching.",
    icon: HeartPulse,
    fields: [
      "dietaryPreference",
      "regionalCuisine",
      "healthConditions",
      "allergies",
      "foodRestrictions",
      "injuries",
      "height",
      "weight",
      "fitnessGoal",
      "activityLevel",
    ],
  },
  {
    title: "Financial context",
    description:
      "High-level numbers only. Never enter bank credentials, card numbers, or account passwords.",
    icon: BadgeIndianRupee,
    fields: [
      "monthlyIncome",
      "fixedExpenses",
      "variableExpenses",
      "currentSavings",
      "emergencyFund",
      "monthlySavingsGoal",
    ],
  },
  {
    title: "Goals",
    description: "Define what progress should look like across your life.",
    icon: Target,
    fields: [
      "healthGoal",
      "professionalGoal",
      "financialGoal",
      "personalDevelopmentGoal",
    ],
  },
];

const defaultValues: Partial<OnboardingFormValues> = {
  preferredLanguage: "English",
  dietaryPreference: "Vegetarian",
  regionalCuisine: "Maharashtrian",
  activityLevel: "Moderately active",
};

const languages = ["English", "Marathi", "Hindi", "Kannada", "Tamil", "Telugu"];
const dietaryPreferences = [
  "Vegetarian",
  "Vegan",
  "Eggetarian",
  "Jain vegetarian",
  "No preference",
];
const cuisines = [
  "Maharashtrian",
  "North Indian",
  "South Indian",
  "Gujarati",
  "Bengali",
  "Mixed Indian",
  "Global vegetarian",
];
const activityLevels = [
  "Mostly sedentary",
  "Lightly active",
  "Moderately active",
  "Very active",
  "Athlete-level activity",
];
const fitnessGoals = [
  "Improve energy",
  "Build strength",
  "Lose fat safely",
  "Improve stamina",
  "Stay consistent",
  "General wellness",
];

export function OnboardingWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<OnboardingActionResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    mode: "onTouched",
    defaultValues,
  });

  const stepErrors = useMemo(
    () =>
      step.fields.filter((field) => Boolean(form.formState.errors[field]))
        .length,
    [form.formState.errors, step.fields],
  );

  const goBack = () => {
    setResult(null);
    setCurrentStep((value) => Math.max(value - 1, 0));
  };

  const goNext = async () => {
    setResult(null);
    const isValid = await form.trigger(step.fields, { shouldFocus: true });

    if (isValid) {
      setCurrentStep((value) => Math.min(value + 1, steps.length - 1));
    }
  };

  const submit = form.handleSubmit((values) => {
    setResult(null);
    startTransition(async () => {
      const actionResult = await completeOnboarding(values);

      if (actionResult.success) {
        router.push("/dashboard");
        router.refresh();
        return;
      }

      setResult(actionResult);
    });
  });

  return (
    <div className="space-y-5">
      <Card className="border-border/80 shadow-sm">
        <CardHeader className="gap-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <step.icon className="size-6" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-2xl">{step.title}</CardTitle>
                <CardDescription className="mt-2 max-w-2xl leading-6">
                  {step.description}
                </CardDescription>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          <div className="space-y-3">
            <Progress value={progress} aria-label="Onboarding progress" />
            <div className="grid gap-2 sm:grid-cols-4">
              {steps.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === currentStep;
                const isDone = index < currentStep;

                return (
                  <div
                    key={item.title}
                    className={cn(
                      "flex items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-medium",
                      isActive &&
                        "border-primary/30 bg-primary/10 text-primary",
                      isDone &&
                        "border-primary/20 bg-card text-foreground",
                      !isActive &&
                        !isDone &&
                        "border-border bg-background text-muted-foreground",
                    )}
                  >
                    {isDone ? (
                      <CheckCircle2 className="size-4" aria-hidden="true" />
                    ) : (
                      <Icon className="size-4" aria-hidden="true" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardHeader>
      </Card>

      <form onSubmit={submit} className="space-y-5">
        {result && !result.success ? (
          <Alert variant="destructive">
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Could not complete onboarding</AlertTitle>
            <AlertDescription>{result.message}</AlertDescription>
          </Alert>
        ) : null}

        {stepErrors > 0 ? (
          <Alert>
            <AlertCircle aria-hidden="true" />
            <AlertTitle>Validation needed</AlertTitle>
            <AlertDescription>
              Fix {stepErrors} highlighted field{stepErrors === 1 ? "" : "s"}{" "}
              before continuing.
            </AlertDescription>
          </Alert>
        ) : null}

        <Card className="border-border/80 shadow-sm">
          <CardContent className="pt-[var(--card-spacing)]">
            {currentStep === 0 ? <PersonalStep form={form} /> : null}
            {currentStep === 1 ? <HealthStep form={form} /> : null}
            {currentStep === 2 ? <FinanceStep form={form} /> : null}
            {currentStep === 3 ? <GoalsStep form={form} /> : null}
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse gap-3 rounded-3xl border border-border/80 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl"
            onClick={goBack}
            disabled={currentStep === 0 || isPending}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back
          </Button>

          <div className="flex items-start gap-3 text-sm text-muted-foreground">
            <ShieldCheck
              className="mt-0.5 size-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>
              Do not enter bank credentials, card numbers, or account passwords.
            </span>
          </div>

          {currentStep === steps.length - 1 ? (
            <Button
              type="submit"
              className="h-11 rounded-xl"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Saving
                </>
              ) : (
                <>
                  Complete onboarding
                  <CheckCircle2 className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          ) : (
            <Button
              type="button"
              className="h-11 rounded-xl"
              onClick={goNext}
              disabled={isPending}
            >
              Continue
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function PersonalStep({
  form,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextField form={form} name="name" label="Name" placeholder="Aarav Shah" />
      <TextField
        form={form}
        name="age"
        label="Age"
        type="number"
        placeholder="28"
      />
      <TextField form={form} name="city" label="City" placeholder="Pune" />
      <TextField
        form={form}
        name="state"
        label="State"
        placeholder="Maharashtra"
      />
      <TextField
        form={form}
        name="occupation"
        label="Occupation"
        placeholder="Product manager"
      />
      <SelectField
        form={form}
        name="preferredLanguage"
        label="Preferred language"
        placeholder="Choose a language"
        options={languages}
      />
    </div>
  );
}

function HealthStep({
  form,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <SelectField
        form={form}
        name="dietaryPreference"
        label="Dietary preference"
        placeholder="Choose a preference"
        options={dietaryPreferences}
      />
      <SelectField
        form={form}
        name="regionalCuisine"
        label="Regional cuisine"
        placeholder="Choose a cuisine"
        options={cuisines}
      />
      <TextAreaField
        form={form}
        name="healthConditions"
        label="Health conditions"
        placeholder="Write None if not applicable"
      />
      <TextAreaField
        form={form}
        name="allergies"
        label="Allergies"
        placeholder="Write None if not applicable"
      />
      <TextAreaField
        form={form}
        name="foodRestrictions"
        label="Food restrictions"
        placeholder="Write None if not applicable"
      />
      <TextAreaField
        form={form}
        name="injuries"
        label="Injuries"
        placeholder="Write None if not applicable"
      />
      <TextField
        form={form}
        name="height"
        label="Height"
        type="number"
        placeholder="172"
        suffix="cm"
      />
      <TextField
        form={form}
        name="weight"
        label="Weight"
        type="number"
        placeholder="68"
        suffix="kg"
      />
      <SelectField
        form={form}
        name="fitnessGoal"
        label="Fitness goal"
        placeholder="Choose a goal"
        options={fitnessGoals}
      />
      <SelectField
        form={form}
        name="activityLevel"
        label="Activity level"
        placeholder="Choose an activity level"
        options={activityLevels}
      />
    </div>
  );
}

function FinanceStep({
  form,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
}) {
  return (
    <div className="space-y-5">
      <Alert>
        <ShieldCheck aria-hidden="true" />
        <AlertTitle>High-level financial context only</AlertTitle>
        <AlertDescription>
          Lakshya only needs approximate planning amounts. Never enter bank
          credentials, card numbers, account passwords, CVV, PINs, or OTPs.
        </AlertDescription>
      </Alert>
      <div className="grid gap-5 md:grid-cols-2">
        <MoneyField
          form={form}
          name="monthlyIncome"
          label="Monthly income"
          placeholder="120000"
        />
        <MoneyField
          form={form}
          name="fixedExpenses"
          label="Fixed expenses"
          placeholder="45000"
        />
        <MoneyField
          form={form}
          name="variableExpenses"
          label="Variable expenses"
          placeholder="25000"
        />
        <MoneyField
          form={form}
          name="currentSavings"
          label="Current savings"
          placeholder="300000"
        />
        <MoneyField
          form={form}
          name="emergencyFund"
          label="Emergency fund"
          placeholder="180000"
        />
        <MoneyField
          form={form}
          name="monthlySavingsGoal"
          label="Monthly savings goal"
          placeholder="30000"
        />
      </div>
    </div>
  );
}

function GoalsStep({
  form,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextAreaField
        form={form}
        name="healthGoal"
        label="Health goal"
        placeholder="Improve energy and build a consistent vegetarian meal routine."
      />
      <TextAreaField
        form={form}
        name="professionalGoal"
        label="Professional goal"
        placeholder="Create focused work blocks and make progress on a promotion plan."
      />
      <TextAreaField
        form={form}
        name="financialGoal"
        label="Financial goal"
        placeholder="Increase monthly savings while keeping travel realistic."
      />
      <TextAreaField
        form={form}
        name="personalDevelopmentGoal"
        label="Personal development goal"
        placeholder="Read consistently, reduce distraction, and maintain a daily reflection habit."
      />
    </div>
  );
}

function TextField({
  form,
  name,
  label,
  placeholder,
  type = "text",
  suffix,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
  name: OnboardingFieldName;
  label: string;
  placeholder: string;
  type?: "text" | "number";
  suffix?: string;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <Input
          id={name}
          type={type}
          inputMode={type === "number" ? "decimal" : undefined}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className={cn(suffix && "pr-14")}
          {...form.register(name, type === "number" ? { valueAsNumber: true } : {})}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
            {suffix}
          </span>
        ) : null}
      </div>
      <FieldError message={error} />
    </div>
  );
}

function MoneyField({
  form,
  name,
  label,
  placeholder,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
  name: OnboardingFieldName;
  label: string;
  placeholder: string;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground">
          ₹
        </span>
        <Input
          id={name}
          type="number"
          inputMode="decimal"
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          className="pl-8"
          {...form.register(name, { valueAsNumber: true })}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
}

function TextAreaField({
  form,
  name,
  label,
  placeholder,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
  name: OnboardingFieldName;
  label: string;
  placeholder: string;
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="min-h-28 resize-y"
        {...form.register(name)}
      />
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  form,
  name,
  label,
  placeholder,
  options,
}: {
  form: ReturnType<typeof useForm<OnboardingFormValues>>;
  name: OnboardingFieldName;
  label: string;
  placeholder: string;
  options: string[];
}) {
  const error = form.formState.errors[name]?.message;

  return (
    <div className="space-y-2">
      <Label htmlFor={name}>{label}</Label>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select
            value={typeof field.value === "string" ? field.value : undefined}
            onValueChange={field.onChange}
          >
            <SelectTrigger id={name} className="w-full" aria-invalid={Boolean(error)}>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="text-sm text-destructive">{message}</p>;
}

