import { ArrowRight } from "lucide-react";
import MasjidList from "./masjid-list";
import DashboardSummary from "./dashboard-pejuang-qura";
import { Button } from "./ui/button";
import DashboardSummaryItikaf from "./dashboard-itikaf";
import Link from "next/link";

interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
}

const Itikaf = () => {
  return (
    <section className="">
      <div className="container w-full flex flex-col gap-10 lg:px-10">
        <div className="lg:max-w-5xl">
        </div>
        <div>
          <DashboardSummaryItikaf />
          <div className="flex justify-center items-center">
            <Link href="/itikaf-akbar">
              <Button>
                Lihat Lebih Detail
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Itikaf };
