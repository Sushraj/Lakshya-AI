import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarCheck2,
  CheckCircle2,
  Compass,
  HeartPulse,
  IndianRupee,
  Leaf,
  LockKeyhole,
  MapPinned,
  Plane,
  ShieldCheck,
  Sparkles,
  Target,
  WalletCards,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const connectedAreas = [
  { label: "Health", icon: HeartPulse },
  { label: "Finances", icon: WalletCards },
  { label: "Productivity", icon: Target },
  { label: "Habits", icon: CalendarCheck2 },
  { label: "Travel", icon: Plane },
];

const features = [
  {
    title: "Daily direction",
    description:
      "Start each day with a clear picture of priorities, energy, habits, and the next best action.",
    icon: Compass,
  },
  {
    title: "Health-aware coaching",
    description:
      "Get practical vegetarian wellness guidance that respects routine, context, and safety boundaries.",
    icon: Leaf,
  },
  {
    title: "Money-aware travel",
    description:
      "Compare trip ideas against budget realities, timing, tradeoffs, and everyday financial pressure.",
    icon: MapPinned,
  },
  {
    title: "Discipline and focus",
    description:
      "Turn scattered goals into realistic focus blocks, habit nudges, and calm accountability.",
    icon: Target,
  },
];

const steps = [
  {
    title: "Share your current context",
    description:
      "Add goals, routines, preferences, budget pressure, and the decisions you are trying to make.",
  },
  {
    title: "Lakshya connects the signals",
    description:
      "The app organizes health, finances, productivity, habits, and travel into one operating picture.",
  },
  {
    title: "Act on a grounded plan",
    description:
      "Use daily check-ins, focus planning, and coaching prompts to move with more intention.",
  },
];

const safetyItems = [
  "No medical diagnoses or medication recommendations.",
  "No investment recommendations or promises.",
  "Travel planning stays focused on budget guidance.",
  "Personal data is used to support your own planning context.",
];

const demoMetrics: { label: string; value: string; icon: LucideIcon }[] = [
  { label: "Energy", value: "Steady", icon: HeartPulse },
  { label: "Budget", value: "Protected", icon: IndianRupee },
  { label: "Priority", value: "Deep work", icon: Target },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative border-b border-border/80">
        <div className="absolute inset-x-0 top-0 h-32 bg-secondary/50" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
          <nav
            className="flex items-center justify-between gap-3"
            aria-label="Public navigation"
          >
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
                <Sparkles className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-semibold leading-tight">
                  Lakshya AI
                </span>
                <span className="block text-xs text-muted-foreground">
                  Personal life copilot
                </span>
              </span>
            </Link>
            <div className="flex shrink-0 items-center gap-2">
              <Link
                href="/auth/login"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Login
              </Link>
              <Link
                href="/auth/sign-up"
                className={cn(buttonVariants({ size: "sm" }))}
              >
                Sign up
              </Link>
            </div>
          </nav>

          <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-14 lg:py-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm text-muted-foreground shadow-sm">
                <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
                Built for connected personal decisions
              </div>
              <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
                Your life has many goals. Lakshya helps you connect them.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                Lakshya connects health, finances, productivity, habits and
                travel decisions so your daily choices can support the bigger
                life you are trying to build.
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <Link
                  href="/auth/sign-up"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 rounded-xl px-4",
                  )}
                >
                  Start free
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#demo"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 rounded-xl px-4",
                  )}
                >
                  View demo
                </Link>
              </div>
            </div>

            <HeroIllustration />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8" aria-labelledby="connects">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">One connected view</p>
            <h2
              id="connects"
              className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
            >
              Decisions stop fighting each other when the context is shared.
            </h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {connectedAreas.map((area) => (
              <Card key={area.label} className="border-border/80 shadow-sm">
                <CardContent className="flex items-center gap-3 pt-[var(--card-spacing)]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-secondary text-primary">
                    <area.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-medium">{area.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card/55 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-primary">MVP features</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                Built for daily progress, not another noisy dashboard.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Each feature is designed to make planning more grounded, personal,
              and easier to act on.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/80 shadow-sm transition-colors hover:border-primary/35"
              >
                <CardHeader>
                  <span className="mb-4 grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </span>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="demo"
        className="px-4 py-14 sm:px-6 lg:px-8"
        aria-labelledby="demo-heading"
      >
        <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-medium text-primary">Demo preview</p>
            <h2
              id="demo-heading"
              className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl"
            >
              A calm operating picture for today&apos;s choices.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The first screen focuses on what matters now: energy, money,
              commitments, habits, and one realistic focus plan.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card p-3 shadow-sm">
            <div className="rounded-2xl border border-border/80 bg-background p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Today</p>
                  <p className="text-xl font-semibold">Direction snapshot</p>
                </div>
                <span className="rounded-full bg-accent/20 px-3 py-1 text-sm font-medium text-accent-foreground">
                  3 focus blocks
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {demoMetrics.map(({ label, value, icon: Icon }) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-border bg-card p-4"
                  >
                    <Icon className="size-5 text-primary" aria-hidden="true" />
                    <p className="mt-3 text-sm text-muted-foreground">{label}</p>
                    <p className="mt-1 font-semibold">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-border bg-secondary/50 p-4">
                <p className="text-sm font-medium">Suggested rhythm</p>
                <div className="mt-4 grid gap-3">
                  {[
                    "Finish one high-value task before messages.",
                    "Choose a simple vegetarian lunch before afternoon work.",
                    "Keep travel search within the weekend budget range.",
                  ].map((item) => (
                    <div key={item} className="flex gap-3 text-sm">
                      <CheckCircle2
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="leading-6 text-muted-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/45 px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-primary">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
              Three steps from scattered goals to daily direction.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-border/80 shadow-sm">
                <CardHeader>
                  <span className="grid size-10 place-items-center rounded-2xl bg-accent/20 text-sm font-semibold text-accent-foreground">
                    {index + 1}
                  </span>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription className="leading-6">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-7xl gap-6 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-10">
          <div>
            <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight">
              Privacy and safety stay part of the product.
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Lakshya is a planning copilot, not a doctor, financial advisor, or
              decision maker. It is designed to keep guidance practical,
              bounded, and transparent.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {safetyItems.map((item) => (
              <div
                key={item}
                className="flex gap-3 rounded-2xl border border-border bg-background p-4"
              >
                <LockKeyhole
                  className="mt-0.5 size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <p className="text-sm leading-6 text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8 md:flex-row md:items-center lg:p-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
              Connect today&apos;s effort to tomorrow&apos;s direction.
            </h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/80">
              Create your Lakshya profile and start shaping a calmer personal
              operating system.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 min-[420px]:w-auto min-[420px]:flex-row">
            <Link
              href="/auth/sign-up"
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-11 rounded-xl px-4",
              )}
            >
              Sign up
            </Link>
            <Link
              href="#demo"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-xl border-primary-foreground/40 bg-transparent px-4 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground",
              )}
            >
              View demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function HeroIllustration() {
  return (
    <div
      className="relative mx-auto w-full max-w-xl rounded-3xl border border-border bg-card p-4 shadow-sm sm:p-6"
      aria-hidden="true"
    >
      <div className="absolute -right-10 top-10 hidden h-24 w-24 rounded-[2rem] border border-primary/20 bg-secondary/70 sm:block" />
      <div className="absolute -bottom-8 left-10 hidden h-20 w-32 rounded-[2rem] border border-accent/30 bg-accent/10 sm:block" />
      <div className="relative rounded-3xl border border-border/80 bg-background p-4 sm:p-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <GoalNode label="Health" icon={HeartPulse} />
          <div className="h-px bg-border" />
          <GoalNode label="Money" icon={WalletCards} />
        </div>
        <div className="mx-auto my-3 h-10 w-px bg-border" />
        <div className="mx-auto grid size-28 place-items-center rounded-[2rem] border border-primary/30 bg-primary/10 text-center text-primary shadow-sm">
          <Sparkles className="size-7" />
          <span className="mt-1 text-sm font-semibold">Lakshya</span>
        </div>
        <div className="mx-auto my-3 h-10 w-px bg-border" />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <GoalNode label="Focus" icon={Target} />
          <div className="h-px bg-border" />
          <GoalNode label="Travel" icon={Plane} />
        </div>
        <div className="mt-4 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <span className="h-2 w-16 rounded-full bg-primary" />
            <span className="h-2 w-10 rounded-full bg-accent" />
            <span className="h-2 w-20 rounded-full bg-secondary" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">
            Connected daily plan
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Health rhythm, budget limits, focus energy, and travel goals in one
            calm view.
          </p>
        </div>
      </div>
    </div>
  );
}

function GoalNode({
  label,
  icon: Icon,
}: {
  label: string;
  icon: LucideIcon;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
      <Icon className="mx-auto size-5 text-primary" />
      <p className="mt-2 truncate text-xs font-medium text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
