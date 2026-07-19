import { redirect } from "next/navigation";
import { Suspense } from "react";

import { AppSidebar } from "@/components/app/app-sidebar";
import { MobileNavigation } from "@/components/app/mobile-navigation";
import { createClient } from "@/lib/supabase/server";
import { hasEnvVars } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<AppLayoutFallback />}>
      <AuthenticatedAppLayout>{children}</AuthenticatedAppLayout>
    </Suspense>
  );
}

async function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!hasEnvVars) {
    redirect("/auth/login");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  const email =
    typeof data.claims.email === "string" ? data.claims.email : undefined;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppSidebar userEmail={email} />
      <main className="min-h-screen px-4 pb-24 pt-4 sm:px-6 lg:ml-72 lg:px-10 lg:pb-10 lg:pt-8">
        <div className="mx-auto w-full max-w-7xl">{children}</div>
      </main>
      <MobileNavigation />
    </div>
  );
}

function AppLayoutFallback() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 border-r border-border/80 bg-card/95 px-4 py-5 shadow-sm lg:flex lg:flex-col">
        <div className="flex items-center gap-3 px-2">
          <div className="size-11 rounded-2xl bg-muted" />
          <div>
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="mt-2 h-3 w-32 rounded bg-muted" />
          </div>
        </div>
        <div className="mt-8 space-y-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="h-11 rounded-2xl bg-muted/70" />
          ))}
        </div>
      </aside>
      <main className="min-h-screen px-4 pb-24 pt-4 sm:px-6 lg:ml-72 lg:px-10 lg:pb-10 lg:pt-8">
        <div className="mx-auto grid w-full max-w-7xl gap-4 md:grid-cols-2">
          <div className="h-44 rounded-3xl border border-border/80 bg-card" />
          <div className="h-44 rounded-3xl border border-border/80 bg-card" />
          <div className="h-72 rounded-3xl border border-border/80 bg-card md:col-span-2" />
        </div>
      </main>
    </div>
  );
}
