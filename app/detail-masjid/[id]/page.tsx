"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const eventsGlobal = [
  { id: 1, name: "Pejuang Qur'an" },
  { id: 2, name: "Smart I'tikaf" },
  { id: 3, name: "Sholat Champions" },
];

// Waktu sholat di Padang
const sholatTimes:any = {
  subuh: { jam: "04:50:00", min: "04:20:00", max: "05:20:00" },
  dzuhur: { jam: "12:15:00", min: "11:45:00", max: "12:45:00" },
  ashar: { jam: "15:30:00", min: "15:00:00", max: "16:00:00" },
  maghrib: { jam: "18:20:00", min: "17:50:00", max: "18:50:00" },
  isya: { jam: "19:30:00", min: "19:00:00", max: "20:00:00" },
};

export default function MasjidDetail() {
  const params = useParams();
  const masjidId = params.id;

  const [selectedEvent, setSelectedEvent] = useState<number>(1);
  const [selectedSholat, setSelectedSholat] = useState<string>("subuh");
  const [masjidProfile, setMasjidProfile] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [rekapanAbsen, setRekapanAbsen] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  

  useEffect(() => {
    fetch(`https://api.shollu.com/api/get-masjid/${masjidId}`)
      .then((res) => res.json())
      .then((data) => {
        setMasjidProfile(data.data);
      })
      .catch((err) => console.error("Error fetching masjid data:", err));
  }, []);

  useEffect(() => {
    if (selectedEvent && selectedDate) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      setLoading(true);

      let url = `https://api.shollu.com/api/rekap-absen/${masjidId}?id_event=${selectedEvent}&tanggal=${formattedDate}`;

      if (selectedEvent === 3) {
        const sholat = sholatTimes[selectedSholat];
        url += `&jam_min=${sholat.min}&jam_max=${sholat.max}`;
      }

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
  }, [selectedEvent, selectedDate, selectedSholat]);

  if (!masjidProfile) {
    return <div className="text-center mt-32">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto px-0">
      {/* Hero Section */}
      <div
        className="relative flex flex-col w-full h-64 pt-20 items-center justify-center text-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1572880420415-4ec18a1f0db5?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fA%3D%3D')`,
        }}
      >
        {/* Overlay Hitam */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Konten */}
        <div className="relative z-10 text-white">
          <h1 className="text-2xl font-bold">{masjidProfile.name}</h1>
          <p className="text-white/80">{masjidProfile.alamat}</p>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        {/* Pilihan Event */}
        <p className="mb-2 text-sm font-semibold">Pilih Event:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
          {eventsGlobal.map((event) => (
            <Button
              key={event.id}
              className="w-full"
              variant={selectedEvent === event.id ? "default" : "outline"}
              onClick={() => setSelectedEvent(event.id)}
            >
              {event.name}
            </Button>
          ))}
        </div>

        {/* Pilihan Tanggal */}
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
                onSelect={(date) => {
                  if (date) setSelectedDate(date);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Dropdown untuk Sholat hanya jika event ID = 3 */}
        {selectedEvent === 3 && (
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold">Pilih Sholat:</p>
            <Select value={selectedSholat} onValueChange={setSelectedSholat}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih Sholat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subuh">Subuh</SelectItem>
                <SelectItem value="dzuhur">Dzuhur</SelectItem>
                <SelectItem value="ashar">Ashar</SelectItem>
                <SelectItem value="maghrib">Maghrib</SelectItem>
                <SelectItem value="isya">Isya</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Tabel Rekapan */}
        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200 text-center text-black">#</TableHead>
                <TableHead className="bg-gray-200 text-black">Nama</TableHead>
                <TableHead className="bg-gray-200 text-black">Jam Absen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : rekapanAbsen.length > 0 ? (
                rekapanAbsen.map((record, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <TableCell className="py-2 px-4 text-center text-black">{index + 1}</TableCell>
                    <TableCell className="py-2 px-4 text-black">{record.fullname}</TableCell>
                    <TableCell className="py-2 px-4 text-black">{format(parseISO(record.jam), "HH:mm:ss")}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    Belum ada data absen
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
