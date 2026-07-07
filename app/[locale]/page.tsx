import FunnelFlow from "@/components/funnel/FunnelFlow";
import { getDictionary, Locale } from "@/app/i18n";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.locale);
  return <FunnelFlow dict={dict} />;
}
