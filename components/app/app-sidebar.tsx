"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoutButton } from "@/components/logout-button";
import { appNavigation, onboardingNavigation } from "@/lib/app/navigation";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  userEmail?: string;
};

export function AppSidebar({ userEmail }: AppSidebarProps) {
  const pathname = usePathname();
  const OnboardingIcon = onboardingNavigation.icon;

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-border/80 bg-card/95 px-4 py-5 shadow-sm lg:flex lg:flex-col">
      <Link href="/dashboard" className="flex items-center gap-3 px-2">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <span className="text-base font-semibold">L</span>
        </div>
        <div>
          <p className="text-base font-semibold leading-5 text-foreground">
            Lakshya AI
          </p>
          <p className="text-xs text-muted-foreground">Personal life copilot</p>
        </div>
      </Link>

      <nav aria-label="Primary navigation" className="mt-8 space-y-1">
        {appNavigation.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                isActive && "bg-primary/10 text-primary ring-1 ring-primary/15",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-5 rounded-3xl border border-border/80 bg-secondary/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Setup
        </p>
        <Link
          href={onboardingNavigation.href}
          className="mt-3 flex items-start gap-3 rounded-2xl text-sm text-foreground"
        >
          <OnboardingIcon
            className="mt-0.5 size-5 text-primary"
            aria-hidden="true"
          />
          <span>
            <span className="block font-medium">
              {onboardingNavigation.title}
            </span>
            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
              {onboardingNavigation.description}
            </span>
          </span>
        </Link>
      </div>

      <div className="mt-auto rounded-3xl border border-border/80 bg-background p-4">
        <p className="text-xs font-medium text-muted-foreground">Signed in as</p>
        <p className="mt-1 truncate text-sm font-medium text-foreground">
          {userEmail ?? "Authenticated user"}
        </p>
        <LogoutButton />
      </div>
    </aside>
  );
}
