import { AppPage } from "@/components/app/app-page";
import { pageContent } from "@/lib/app/pages";

export default function TodayPage() {
  return <AppPage content={pageContent.today} />;
}
