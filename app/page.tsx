import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import EventSummaries from "@/components/summary-events";
import Testimonials from "@/components/testimonials";
import Stats01Page from "@/components/stats-01/stats-01";
export default function Home() {
  return (
    <>
      <Hero />
      <Stats01Page />
      <EventSummaries />
      <FAQ />
      <Testimonials />
      <CTABanner />
    </>
  );
}
