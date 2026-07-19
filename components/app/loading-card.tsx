import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

type LoadingCardProps = {
  className?: string;
};

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-border/80 bg-card p-5 shadow-sm",
        className,
      )}
    >
      <Skeleton className="h-4 w-28" />
      <Skeleton className="mt-5 h-9 w-24" />
      <Skeleton className="mt-4 h-4 w-full" />
      <Skeleton className="mt-2 h-4 w-2/3" />
    </div>
  );
}
