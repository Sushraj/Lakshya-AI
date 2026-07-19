import type { LucideIcon } from "lucide-react";
import {
  Activity,
  CalendarCheck2,
  Compass,
  HeartPulse,
  Plane,
  Sparkles,
  Target,
  UserCircle,
} from "lucide-react";

type Metric = {
  label: string;
  value: string;
  detail: string;
};

export type AppPageContent = {
  title: string;
  description: string;
  eyebrow: string;
  icon: LucideIcon;
  metrics: Metric[];
  sectionTitle: string;
  sectionDescription: string;
  emptyTitle: string;
  emptyDescription: string;
};

export const pageContent = {
  dashboard: {
    title: "Dashboard",
    description:
      "A single calm view for habits, health, focus, travel, and financial signals.",
    eyebrow: "Life overview",
    icon: Target,
    metrics: [
      { label: "Readiness", value: "72%", detail: "Waiting for check-in data" },
      { label: "Focus blocks", value: "3", detail: "Planned placeholders" },
      { label: "Weekly balance", value: "Good", detail: "No data connected yet" },
    ],
    sectionTitle: "Today's operating picture",
    sectionDescription:
      "This area will summarize the user's daily plan after onboarding and data setup.",
    emptyTitle: "No dashboard insights yet",
    emptyDescription:
      "Complete onboarding to generate personalized daily signals across the app.",
  },
  today: {
    title: "Today",
    description:
      "Daily check-in, intention setting, and practical nudges for the current day.",
    eyebrow: "Daily rhythm",
    icon: CalendarCheck2,
    metrics: [
      { label: "Mood", value: "Unset", detail: "Check-in pending" },
      { label: "Energy", value: "--", detail: "No entry yet" },
      { label: "Streak", value: "0", detail: "Starts after first check-in" },
    ],
    sectionTitle: "Daily check-in",
    sectionDescription:
      "The MVP will capture mood, energy, schedule pressure, meals, and priorities here.",
    emptyTitle: "No check-in submitted",
    emptyDescription:
      "A guided check-in form will appear here in the next feature pass.",
  },
  focus: {
    title: "Focus",
    description:
      "A structured focus planner for priorities, constraints, and deep work sessions.",
    eyebrow: "Productivity",
    icon: Activity,
    metrics: [
      { label: "Priority", value: "Unset", detail: "Planner pending" },
      { label: "Deep work", value: "0h", detail: "No blocks scheduled" },
      { label: "Context load", value: "Low", detail: "Placeholder state" },
    ],
    sectionTitle: "Focus plan",
    sectionDescription:
      "This page will turn user goals and calendar pressure into a practical plan.",
    emptyTitle: "No focus plan yet",
    emptyDescription:
      "Once AI features are added, this space will generate a realistic work plan.",
  },
  health: {
    title: "Health",
    description:
      "Marathi vegetarian wellness coaching with safe, non-diagnostic guidance.",
    eyebrow: "Wellness",
    icon: HeartPulse,
    metrics: [
      { label: "Meal rhythm", value: "Unset", detail: "No food data yet" },
      { label: "Hydration", value: "--", detail: "Tracking pending" },
      { label: "Movement", value: "0 min", detail: "No activity connected" },
    ],
    sectionTitle: "Health coach workspace",
    sectionDescription:
      "Future guidance will stay practical and avoid diagnoses or medication advice.",
    emptyTitle: "No health profile yet",
    emptyDescription:
      "Onboarding will collect dietary preferences and routine constraints first.",
  },
  travel: {
    title: "Travel",
    description:
      "Budget-aware travel planning for realistic trips and decision tradeoffs.",
    eyebrow: "Travel planning",
    icon: Plane,
    metrics: [
      { label: "Trip budget", value: "Unset", detail: "Budget input pending" },
      { label: "Saved plans", value: "0", detail: "No itineraries yet" },
      { label: "Confidence", value: "--", detail: "Needs preferences" },
    ],
    sectionTitle: "Travel planner",
    sectionDescription:
      "The MVP will compare destinations, budgets, timing, and constraints here.",
    emptyTitle: "No travel plan yet",
    emptyDescription:
      "Add preferences later to create money-aware travel recommendations.",
  },
  coach: {
    title: "Coach",
    description:
      "A unified coach surface for connecting goals, habits, health, focus, and travel.",
    eyebrow: "Unified guidance",
    icon: Sparkles,
    metrics: [
      { label: "Context", value: "Empty", detail: "No profile connected" },
      { label: "Actions", value: "0", detail: "No recommendations yet" },
      { label: "Tone", value: "Calm", detail: "Default experience" },
    ],
    sectionTitle: "Coach workspace",
    sectionDescription:
      "This will become the primary AI conversation once app data is available.",
    emptyTitle: "Coach is waiting for context",
    emptyDescription:
      "AI behavior is intentionally not implemented in this foundation pass.",
  },
  profile: {
    title: "Profile",
    description:
      "Account, preferences, personalization settings, and connected profile context.",
    eyebrow: "Personalization",
    icon: UserCircle,
    metrics: [
      { label: "Profile", value: "Draft", detail: "Setup not complete" },
      { label: "Preferences", value: "0", detail: "No saved inputs yet" },
      { label: "Integrations", value: "0", detail: "Future feature area" },
    ],
    sectionTitle: "Profile setup",
    sectionDescription:
      "User preferences and personalization controls will live here.",
    emptyTitle: "No profile details saved",
    emptyDescription:
      "Complete onboarding before profile-level personalization is available.",
  },
  onboarding: {
    title: "Onboarding",
    description:
      "Collect the minimum useful context needed to personalize Lakshya AI.",
    eyebrow: "Setup",
    icon: Compass,
    metrics: [
      { label: "Step", value: "1 of 4", detail: "Foundation placeholder" },
      { label: "Completion", value: "0%", detail: "No data saved yet" },
      { label: "Personalization", value: "Pending", detail: "Inputs required" },
    ],
    sectionTitle: "Personalization intake",
    sectionDescription:
      "The real onboarding flow will collect goals, schedule, diet, budget, and travel preferences.",
    emptyTitle: "Onboarding form not built yet",
    emptyDescription:
      "This placeholder reserves the route and visual structure for the MVP flow.",
  },
} satisfies Record<string, AppPageContent>;
