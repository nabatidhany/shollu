"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, ArrowRight, TowerControl } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Badge } from "./ui/badge";
import LeaderboardMasjid from "./masjid-leaderboard";

export default function MasjidListSC({today}: any) {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Semua");
  const [masjidData, setMasjidData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // const today = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD
    fetch(`https://api.shollu.com/api/statistics-rekap-masjid?event_date=${today}`)
      .then((res) => res.json())
      .then((data) => {
        setMasjidData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch masjid data", err);
        setLoading(false);
      });
  }, [today]);

  const regions: string[] = ["Semua", ...new Set(masjidData.map((masjid) => masjid.masjid_regional))];

  const filteredMasjid = masjidData.filter((masjid) => {
    const matchesSearch =
      masjid.masjid_nama.toLowerCase().includes(search.toLowerCase()) ||
      masjid.masjid_alamat.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = selectedRegion === "Semua" || masjid.masjid_regional === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <section className="py-0">
      <div className="mb-4">
        <LeaderboardMasjid date={today} />
      </div>
      <div className="container px-0 md:px-8">
        <h1 className="mb-6 text-2xl font-semibold">Kehadiran per-Masjid {today}</h1>
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
          {regions.map((region, index) => (
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
          {loading && <p>Loading data masjid...</p>}
          {!loading && filteredMasjid.length === 0 && <p>Tidak ada masjid ditemukan.</p>}
          {filteredMasjid.map((masjid, index) => (
            <div key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-2">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    <TowerControl size={24} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{masjid.masjid_nama}</h3>
                    <p className="text-sm text-muted-foreground">{masjid.masjid_alamat}</p>
                    <p className="text-sm text-green-600 font-bold">
                      Jumlah Kehadiran: {masjid.total_count}
                    </p>
                    <div className="text-xs text-muted-foreground flex flex-wrap gap-2 mt-1">
                      <span>Subuh: {masjid.subuh_count}</span>
                      <span>Dzuhur: {masjid.dzuhur_count}</span>
                      <span>Ashar: {masjid.ashar_count}</span>
                      <span>Maghrib: {masjid.maghrib_count}</span>
                      <span>Isya: {masjid.isya_count}</span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" asChild>
                  <Link
                    href={`/detail-masjid/${masjid.masjid_id}`}
                    className="order-3 ml-auto w-fit gap-2 md:order-none"
                  >
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
