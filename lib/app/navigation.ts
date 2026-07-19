import {
  Activity,
  CalendarCheck2,
  Compass,
  HeartPulse,
  Home,
  Plane,
  Sparkles,
  UserCircle,
} from "lucide-react";

export const appNavigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Unified life overview",
  },
  {
    title: "Today",
    href: "/today",
    icon: CalendarCheck2,
    description: "Daily check-in and priorities",
  },
  {
    title: "Focus",
    href: "/focus",
    icon: Activity,
    description: "Planner for deep work",
  },
  {
    title: "Health",
    href: "/health",
    icon: HeartPulse,
    description: "Vegetarian wellness guidance",
  },
  {
    title: "Travel",
    href: "/travel",
    icon: Plane,
    description: "Budget-aware trip planning",
  },
  {
    title: "Coach",
    href: "/coach",
    icon: Sparkles,
    description: "Unified AI coach",
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
    description: "Preferences and account",
  },
] as const;

export const onboardingNavigation = {
  title: "Onboarding",
  href: "/onboarding",
  icon: Compass,
  description: "Personalize Lakshya AI",
} as const;
