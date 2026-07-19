import { AppPage } from "@/components/app/app-page";
import { pageContent } from "@/lib/app/pages";

export default function DashboardPage() {
  return <AppPage content={pageContent.dashboard} />;
}
