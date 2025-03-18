import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowUpRight, PhoneCall } from "lucide-react";

const Logos07Page = () => {
  return (
    <div className="flex items-center justify-center px-6">
      <div className="overflow-hidden">
        <p className="text-center text-xl font-medium">
          Daftar Donatur Shollu se-Sumatera Barat
        </p>

        <div className="mt-5 max-w-screen-6xl space-y-3">
          <Marquee pauseOnHover className="[--duration:30s] [&_svg]:mr-10">
            <Image alt="sponsor" src={'/sponsor_space.svg'} width={200} height={120} />
          </Marquee>
          <Marquee
            pauseOnHover
            reverse
            className="[--duration:30s] [&_svg]:mr-10"
          >
            <Image alt="sponsor" src={'/sponsor_space.svg'} width={200} height={120} />
          </Marquee>
        </div>
        <div className="relative w-full justify-center items-center z-0 mt-8 flex flex-col sm:flex-row gap-4">
          <Link target="_blank" href="https://wa.me/6285215003995?text=Assalamualaikum%20Admin%20Kami tertarik untuk menjadi sponsor">
            <Button size="lg">
              <PhoneCall className="!h-5 !w-5" /> Jadi Sponsor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Logos07Page;
