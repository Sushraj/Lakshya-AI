import { EmptyState } from "@/components/app/empty-state";
import { LoadingCard } from "@/components/app/loading-card";
import { MetricCard } from "@/components/app/metric-card";
import { PageHeader } from "@/components/app/page-header";
import { SectionHeading } from "@/components/app/section-heading";
import type { AppPageContent } from "@/lib/app/pages";

type AppPageProps = {
  content: AppPageContent;
};

export function AppPage({ content }: AppPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={content.title}
        description={content.description}
        eyebrow={content.eyebrow}
        icon={content.icon}
      />

      <section
        aria-label={`${content.title} metrics`}
        className="grid gap-4 md:grid-cols-3"
      >
        {content.metrics.map((metric) => (
          <MetricCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            detail={metric.detail}
          />
        ))}
      </section>

      <section className="space-y-4">
        <SectionHeading
          title={content.sectionTitle}
          description={content.sectionDescription}
        />
        <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
          <EmptyState
            title={content.emptyTitle}
            description={content.emptyDescription}
            icon={content.icon}
          />
          <LoadingCard />
        </div>
      </section>
    </div>
  );
}
