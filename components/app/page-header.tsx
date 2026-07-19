import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description: string;
  eyebrow?: string;
  icon?: LucideIcon;
  className?: string;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  icon: Icon,
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5 rounded-3xl border border-border/80 bg-card px-5 py-6 shadow-sm sm:px-7 lg:flex-row lg:items-center lg:justify-between",
        className,
      )}
    >
      <div className="max-w-3xl space-y-3">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            {description}
          </p>
        </div>
      </div>
      {Icon ? (
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
          <Icon className="size-7" aria-hidden="true" />
        </div>
      ) : null}
    </header>
  );
}
