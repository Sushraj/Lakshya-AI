"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNavigation } from "@/lib/app/navigation";
import { cn } from "@/lib/utils";

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Mobile primary navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/80 bg-card/95 px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-7 gap-1">
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
                "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl px-1 text-[0.68rem] font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground",
                isActive && "bg-primary/10 text-primary",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              <span className="max-w-full truncate">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
