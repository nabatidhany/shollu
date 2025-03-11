import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import EventSummaries from "@/components/summary-events";
import Testimonials from "@/components/testimonials";
import Stats01Page from "@/components/stats-01/stats-01";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="">
        <Hero />
        <Stats01Page />
        <EventSummaries />
        <FAQ />
        <Testimonials />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
