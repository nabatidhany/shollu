"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CircleCheck, CircleHelp } from "lucide-react";
import { useState } from "react";
import { PejuangQuran } from "./pejuang-quran";
import { Itikaf } from "./itikaf";
import Link from "next/link";
import CollectionList from "./collection-list";
import StatistikEvent from "./statistik-event";

const tooltipContent = {
  styles: "Choose from a variety of styles to suit your preferences.",
  filters: "Choose from a variety of filters to enhance your portraits.",
  credits: "Use these credits to retouch your portraits.",
};

const YEARLY_DISCOUNT = 20;
const plans = [
  {
    name: "Starter",
    price: 20,
    description:
      "Get 20 AI-generated portraits with 2 unique styles and filters.",
    features: [
      { title: "5 hours turnaround time" },
      { title: "20 AI portraits" },
      { title: "Choice of 2 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 2 filters", tooltip: tooltipContent.filters },
      { title: "2 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 20 portraits in 5 hours",
  },
  {
    name: "Advanced",
    price: 40,
    isRecommended: true,
    description:
      "Get 50 AI-generated portraits with 5 unique styles and filters.",
    features: [
      { title: "3 hours turnaround time" },
      { title: "50 AI portraits" },
      { title: "Choice of 5 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 5 filters", tooltip: tooltipContent.filters },
      { title: "5 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 50 portraits in 3 hours",
    isPopular: true,
  },
  {
    name: "Premium",
    price: 80,
    description:
      "Get 100 AI-generated portraits with 10 unique styles and filters.",
    features: [
      { title: "1-hour turnaround time" },
      { title: "100 AI portraits" },
      { title: "Choice of 10 styles", tooltip: tooltipContent.styles },
      { title: "Choice of 10 filters", tooltip: tooltipContent.filters },
      { title: "10 retouch credits", tooltip: tooltipContent.credits },
    ],
    buttonText: "Get 100 portraits in 1 hour",
  },
];

const EventSummaries = () => {
  const [selectedBillingPeriod, setSelectedBillingPeriod] = useState("sholat-champion");

  return (
    <div
      id="ringkasan-event"
      className="flex flex-col items-center justify-center py-12 xs:py-10 px-6"
    >
      <h1 className="text-3xl xs:text-4xl md:text-5xl font-bold text-center tracking-tight">
        Ringkasan Event
      </h1>
      <div>
        <Tabs
          value={selectedBillingPeriod}
          onValueChange={setSelectedBillingPeriod}
          className="mt-8"
        >
          <TabsList className="h-11 px-1.5 rounded-full bg-primary/5">
            <TabsTrigger value="itikaf-akbar" className="py-1.5 rounded-full">
              Smart I'tikaf
            </TabsTrigger>
            <TabsTrigger value="sholat-champion" className="py-1.5 rounded-full">
              Sholat Champions
            </TabsTrigger>
            <TabsTrigger value="pejuang-quran" className="py-1.5 rounded-full">
              Pejuang Qur'an
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {
        selectedBillingPeriod === "pejuang-quran" && (
          <PejuangQuran />
        )
      }
      {
        selectedBillingPeriod === "itikaf-akbar" && (
          <Itikaf />
        )
      }
      {
        selectedBillingPeriod === "sholat-champion" && (
          <div className="mt-0 w-full lg:max-w-3xl">
            {/* <h2 className="text-2xl font-bold">Sholat Champion</h2> */}
            {/* <CollectionList /> */}
            <div className='px-5'>
              <StatistikEvent id_event={3} />
            </div>
            <div className="flex justify-center items-center mt-5">
              <Link href="/sholat-champions">
                <Button>
                  Lihat Lebih Detail
                </Button>
              </Link>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default EventSummaries;
