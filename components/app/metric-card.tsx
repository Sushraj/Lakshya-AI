import { cn } from "@/lib/utils";

type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  className?: string;
};

export function MetricCard({
  label,
  value,
  detail,
  className,
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-border/80 bg-card p-5 shadow-sm",
        className,
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-normal text-foreground">
        {value}
      </p>
      <p className="mt-2 text-sm leading-5 text-muted-foreground">{detail}</p>
    </article>
  );
}
