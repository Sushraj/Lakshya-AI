import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: LucideIcon;
  className?: string;
};

export function EmptyState({
  title,
  description,
  icon: Icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-64 flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/70 p-8 text-center",
        className,
      )}
    >
      {Icon ? (
        <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary">
          <Icon className="size-6" aria-hidden="true" />
        </div>
      ) : null}
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
