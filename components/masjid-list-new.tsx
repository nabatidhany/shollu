"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, ArrowRight, TowerControl } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "./ui/badge";

export default function MasjidListNew({data}: any) {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Semua");

  const regions: any = ["Semua", ...new Set(data?.map((masjid: any) => masjid.masjid_regional))];
  // const [masjidList, setMasjidList] = useState<any>(data);

  const filteredMasjid = data?.filter((masjid: any) => {
    const matchesSearch =
      masjid.masjid_nama.toLowerCase().includes(search.toLowerCase()) ||
      masjid.masjid_alamat.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === "Semua" || masjid.masjid_regional === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section className="py-0">
      <div className="container px-0 md:px-8">
        <h1 className="mb-6 text-3xl font-semibold">Daftar Masjid Terhubung</h1>
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Cari masjid..."
            className="pl-10 w-full border-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Filter Regional */}
        <div className="mb-4 flex flex-wrap gap-2">
          {regions.map((region: any, index: any) => (
            <Badge
              key={index}
              variant={selectedRegion === region ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </Badge>
          ))}
        </div>
        <div className="flex flex-col">
          <Separator />
          {filteredMasjid.map((masjid: any, index:any) => (
            <div key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-2">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    <TowerControl size={24} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{masjid?.masjid_nama}</h3>
                    <p className="text-sm text-muted-foreground">{masjid?.masjid_alamat}</p>
                    <p className="text-sm text-green-600 font-bold">Jumlah Kehadiran Hari ini: {masjid?.total_count}</p>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link href={`/detail-masjid/${masjid.id}`} className="order-3 ml-auto w-fit gap-2 md:order-none">
                    <span>Lihat Rekapan</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <Separator />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
