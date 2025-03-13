"use client";
import { useEffect, useState } from "react";
import { Search, MapPin, ArrowRight, TowerControl } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const masjidList = [
  { name: "Masjid Al-Ikhlas", location: "Jakarta", events: ["Pejuang Quran", "Sholat Champion"] },
  { name: "Masjid An-Nur", location: "Bandung", events: ["Pejuang Itikaf"] },
  { name: "Masjid Al-Falah", location: "Surabaya", events: ["Sholat Champion"] },
  { name: "Masjid At-Taqwa", location: "Yogyakarta", events: ["Pejuang Quran", "Pejuang Itikaf"] },
];

export default function MasjidList(props: { event_id: number }) {
  const { event_id } = props;
  const [search, setSearch] = useState("");
  const [masjidList, setMasjidList] = useState<{ id: number; name: string; alamat: string }[]>([]);

  useEffect(() => {
      const fetchMasjid = async () => {
        try {
          const response = await fetch(`https://api.shollu.com/api/register-masjid/${event_id}`);
          const data = await response.json();
          if (response.ok) {
            setMasjidList(data.data);
          } else {
            console.error("Gagal mengambil daftar masjid:", data);
          }
        } catch (error) {
          console.error("Kesalahan jaringan:", error);
        }
      };
  
      fetchMasjid();
    }, []);

  const filteredMasjid = masjidList.filter(
    (masjid) =>
      masjid.name.toLowerCase().includes(search.toLowerCase()) ||
      masjid.alamat.toLowerCase().includes(search.toLowerCase())
  );

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
        <div className="flex flex-col">
          <Separator />
          {filteredMasjid.map((masjid, index) => (
            <div key={index}>
              <div className="grid items-center gap-4 px-4 py-5 md:grid-cols-2">
                <div className="order-2 flex items-center gap-2 md:order-none">
                  <span className="flex h-14 w-16 shrink-0 items-center justify-center rounded-md bg-muted">
                    <TowerControl size={24} />
                  </span>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold">{masjid.name}</h3>
                    <p className="text-sm text-muted-foreground">{masjid.alamat}</p>
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
