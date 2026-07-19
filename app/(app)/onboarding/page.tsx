import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { PageHeader } from "@/components/app/page-header";
import { Compass } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Personalization"
        title="Set up your Lakshya profile"
        description="Complete four focused steps so Lakshya can connect your health, money, focus, habits, and goals into a useful daily plan."
        icon={Compass}
      />
      <OnboardingWizard />
    </div>
  );
}
