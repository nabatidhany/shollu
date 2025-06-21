"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format } from "date-fns";
import { CircleCheck, CircleX } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import EventView from "./collection";

const sholatTimes: any = {
  subuh: { jam: "04:50:00", min: "04:20:00", max: "05:20:00" },
  dzuhur: { jam: "12:15:00", min: "11:45:00", max: "12:45:00" },
  ashar: { jam: "15:30:00", min: "15:00:00", max: "16:00:00" },
  maghrib: { jam: "18:20:00", min: "17:50:00", max: "18:50:00" },
  isya: { jam: "19:30:00", min: "19:00:00", max: "20:00:00" },
};

export default function MasjidDetail() {
  const params = useParams();
  const masjidId = params.id;

  const [selectedView, setSelectedView] = useState<"MASJID" | "EVENT">("MASJID");
  const [selectedSholat, setSelectedSholat] = useState<string>("subuh");
  const [masjidProfile, setMasjidProfile] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [rekapanAbsen, setRekapanAbsen] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortMode, setSortMode] = useState<"JUMLAH" | "NAMA">("JUMLAH");

  useEffect(() => {
    fetch(`https://api.shollu.com/api/get-masjid/${masjidId}`)
      .then((res) => res.json())
      .then((data) => setMasjidProfile(data.data))
      .catch((err) => console.error("Error fetching masjid data:", err));
  }, []);

  useEffect(() => {
    if (selectedView === "MASJID" && selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setLoading(true);

      const sholat = sholatTimes[selectedSholat];
      const url = `https://api.shollu.com/api/rekap-absen-sholat/${masjidId}?tanggal=${formattedDate}&jam_min=${sholat.min}&jam_max=${sholat.max}`;

      fetch(url)
        .then(async (res) => {
          if (res.status === 404) {
            setRekapanAbsen([]);
            return;
          }
          const data = await res.json();
          setRekapanAbsen(data.data || []);
        })
        .catch((err) => console.error("Error fetching absensi data:", err))
        .finally(() => setLoading(false));
    }
  }, [selectedView, selectedDate, selectedSholat]);

  const getSortedData = () => {
    let data = [...rekapanAbsen];
    if (sortMode === "JUMLAH") {
      data.sort((a, b) => {
        const countA = Object.values(a.sholat || {}).filter((s: any) => s.status && s.inThisMasjid).length;
        const countB = Object.values(b.sholat || {}).filter((s: any) => s.status && s.inThisMasjid).length;
        return countB - countA; // Descending
      });
    } else if (sortMode === "NAMA") {
      data.sort((a, b) => {
        const nameA = (a.name || "").toLowerCase();
        const nameB = (b.name || "").toLowerCase();
        return nameA.localeCompare(nameB);
      });
    }
    return data;
  };

  if (!masjidProfile) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto px-0">
      <div
        className="relative flex flex-col w-full h-64 pt-20 items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://shollu.site/public/masjid/${masjidProfile.foto}')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-2xl font-bold">{masjidProfile.name}</h1>
          <p className="text-white/80">{masjidProfile.alamat}</p>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            className="w-full"
            variant={selectedView === "EVENT" ? "default" : "outline"}
            onClick={() => setSelectedView("EVENT")}
          >
            Event
          </Button>
          <Button
            className="w-full"
            variant={selectedView === "MASJID" ? "default" : "outline"}
            onClick={() => setSelectedView("MASJID")}
          >
            Masjid
          </Button>
        </div>

        {selectedView === "MASJID" && (
          <>
            <div className="mb-4">
              <p className="mb-2 text-sm font-semibold">Pilih Tanggal:</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "Pilih Tanggal"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 mb-4">
              <Button
                variant={sortMode === "JUMLAH" ? "default" : "outline"}
                onClick={() => setSortMode("JUMLAH")}
              >
                Sortir: Sholat Terbanyak
              </Button>
              <Button
                variant={sortMode === "NAMA" ? "default" : "outline"}
                onClick={() => setSortMode("NAMA")}
              >
                Sortir: Nama (A-Z)
              </Button>
            </div>

            <div className="overflow-x-auto">
              <Table className="w-full border border-gray-300">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">#</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead className="text-center">S</TableHead>
                    <TableHead className="text-center">D</TableHead>
                    <TableHead className="text-center">A</TableHead>
                    <TableHead className="text-center">M</TableHead>
                    <TableHead className="text-center">I</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">Memuat data...</TableCell>
                    </TableRow>
                  ) : getSortedData().length > 0 ? (
                    getSortedData().map((record, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center">{index + 1}</TableCell>
                        <TableCell>
                          {record.isHideName === 1
                            ? `${record.name.charAt(0)}${"*".repeat(record.name.length - 1)}`
                            : record.name}
                        </TableCell>
                        {["subuh", "dzuhur", "ashar", "maghrib", "isya"].map((sholat) => {
                          const s = record.sholat?.[sholat];
                          return (
                            <TableCell key={sholat} className="text-center">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span>
                                      {!s ? (
                                        <span className="text-gray-400">-</span>
                                      ) : s.status === false ? (
                                        <CircleX color="red" size={20} />
                                      ) : !s.inThisMasjid ? (
                                        <CircleCheck color="#A9A9A9" size={20} />
                                      ) : (
                                        <CircleCheck color="green" size={20} />
                                      )}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>
                                      {!s
                                        ? "Tidak absen"
                                        : s.status === false
                                        ? "Tidak Sah / Terlambat"
                                        : !s.inThisMasjid
                                        ? `Sholat di masjid ${s.masjidName}`
                                        : "Sah - Absen di masjid ini"}
                                    </p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">Belum ada data absen</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        )}

        {selectedView === "EVENT" && masjidId && (
          <div className="mt-2">
            <EventView masjidId={typeof masjidId === "string" ? masjidId : masjidId[0]} />
          </div>
        )}
      </div>
    </div>
  );
}
