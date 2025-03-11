import { ArrowRight } from "lucide-react";
import MasjidList from "./masjid-list";
import DashboardSummary from "./dashboard-pejuang-qura";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface Feature73Props {
  heading?: string;
  description?: string;
  linkUrl?: string;
  linkText?: string;
  features?: Feature[];
}

const PejuangQuran = ({
  heading = "Pejuang Quran",
  description = "Pejuang Quran adalah program khusus untuk anak-anak yang ingin memperbanyak hafalan Al-Qur'an di masjid.Dengan pencatatan berbasis QR Code, setiap hafalan yang disetorkan akan tercatat dengan rapi.",
  linkUrl = "https://www.shadcnblocks.com",
  linkText = "Book a demo",
  features = [
    {
      id: "feature-1",
      title: "Modern Design",
      description:
        "Clean and intuitive interface built with the latest design principles. Optimized for the best user experience.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-1.svg",
    },
    {
      id: "feature-2",
      title: "Responsive Layout",
      description:
        "Fully responsive design that works seamlessly across all devices and screen sizes. Perfect for any platform.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-2.svg",
    },
    {
      id: "feature-3",
      title: "Easy Integration",
      description:
        "Simple integration process with comprehensive documentation and dedicated support team.",
      image: "https://www.shadcnblocks.com/images/block/placeholder-3.svg",
    },
  ],
}: Feature73Props) => {
  return (
    <section className="">
      <div className="container w-full flex flex-col gap-10 lg:px-10">
        <div className="lg:max-w-5xl">
          {/* <h2 className="mb-3 text-xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {heading}
          </h2>
          <p className="text-muted-foreground lg:text-lg">{description}</p> */}
          {/* <a
            href={linkUrl}
            className="group flex items-center text-xs font-medium md:text-base lg:text-lg"
          >
            {linkText}
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </a> */}
        </div>
        <div>
          <MasjidList />
          <hr className="my-10" />
          <DashboardSummary />
        </div>
      </div>
    </section>
  );
};

export { PejuangQuran };
