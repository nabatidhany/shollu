import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Hero from "@/components/hero";
import EventSummaries from "@/components/summary-events";
import Testimonials from "@/components/testimonials";
import Stats01Page from "@/components/stats-01/stats-01";
import { StatistikItikaf } from "@/components/statistik-itikaf";
import Dashboard from "./new-sholat-champions/page";
export default function Home() {
  return (
    <>
      <Hero />
      <Dashboard />
      {/* <Stats01Page /> */}
      {/* <EventSummaries /> */}
      {/* <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StatistikItikaf />
      </div> */}
      {/* <FAQ /> */}
      <Testimonials />
      <CTABanner />
    </>
  );
}
