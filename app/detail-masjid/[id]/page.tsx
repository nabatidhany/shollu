"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const masjidDetail:any = {
  name: "Masjid Al-Ikhlas",
  image: "https://images.unsplash.com/photo-1572880420415-4ec18a1f0db5?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  events: ["Pejuang Quran", "Sholat Champion"],
  absensi: {
    "Pejuang Quran": [
      { name: "Ali", date: "2025-03-10", time: "05:30", status: true },
      { name: "Budi", date: "2025-03-10", time: "-", status: false },
    ],
    "Sholat Champion": [
      { name: "Citra", date: "2025-03-10", time: "06:00", status: true },
      { name: "Dewi", date: "2025-03-10", time: "-", status: false },
    ],
  },
};

export default function MasjidDetail() {
  const [selectedEvent, setSelectedEvent] = useState('Pejuang Quran');
  const [view, setView] = useState("daily");
  const [masjidProfile, setMasjidProfile] = useState<any>(null);
  const [events, setEvents] = useState<any>(['Pejuang Quran', 'Smart Itikaf', 'Sholat Champion']);

  const absensi = masjidDetail.absensi[selectedEvent] || [];
  const currentDate = new Date();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  useEffect(() => {
    fetch("https://api.shollu.com/api/get-masjid/1")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setMasjidProfile(data.data);
      })
      .catch((err) => console.error("Error fetching masjid data:", err));
  }, []);

  if (!masjidProfile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-full mx-auto">
      {/* Hero Section */}
      <div className="relative flex-col w-full h-64 pt-20 bg-[#0b685c] flex items-center justify-center text-center" style={{ background: `url(${masjidDetail.image}) no-repeat top`, backgroundSize: "cover"}}>
        <h1 className="text-white text-2xl font-bold">
          {masjidProfile.name}
        </h1>
        <p className="text-white/80">{masjidProfile.alamat}</p>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        {/* Pilihan Event */}
        <p className="mb-2">Pilihan Event:</p>
        <div className="flex gap-2 mb-4">
          {events.map((event:any, index:any) => (
            <Button key={index} variant={selectedEvent === event ? "default" : "outline"} onClick={() => setSelectedEvent(event)}>
              {event}
            </Button>
          ))}
        </div>

        {/* Pilihan Tampilan */}
        <p className="mb-2">Pilihan Waktu:</p>
        <div className="flex gap-2 mb-4">
          <Button variant={view === "daily" ? "default" : "outline"} onClick={() => setView("daily")}>
            Hari Ini
          </Button>
          <Button variant={view === "weekly" ? "default" : "outline"} onClick={() => setView("weekly")}>
            Mingguan
          </Button>
          <Button variant={view === "monthly" ? "default" : "outline"} onClick={() => setView("monthly")}>
            Bulanan
          </Button>
        </div>

        {/* Tabel Rekapan */}
        <div className="overflow-x-auto">
          <Table className="border border-gray-300">
            <TableHeader>
              <TableRow className="border border-gray-300">
                <TableHead className="border border-gray-300 sticky left-0 bg-white z-10">Nama</TableHead>
                {view === "daily" && <><TableHead className="border border-gray-300">Status</TableHead><TableHead className="border border-gray-300">Jam Absen</TableHead></>}
                {view === "weekly" && Array.from({ length: 7 }, (_, i) => <TableHead key={i} className="border border-gray-300">{i + 1}</TableHead>)}
                {view === "monthly" && Array.from({ length: daysInMonth }, (_, i) => <TableHead key={i} className="border border-gray-300">{i + 1}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {absensi.map((record:any, index:any) => (
                <TableRow key={index} className="border border-gray-300">
                  <TableCell className="border border-gray-300 sticky left-0 bg-white z-10">{record.name}</TableCell>
                  {view === "daily" && <><TableCell className="border border-gray-300">{record.status ? "✔" : "❌"}</TableCell><TableCell className="border border-gray-300">{record.time}</TableCell></>}
                  {view === "weekly" && Array.from({ length: 7 }, (_, i) => <TableCell key={i} className="border border-gray-300">{record.date.endsWith(`-${String(i + 1).padStart(2, '0')}`) ? (record.status ? "✔" : "❌") : "-"}</TableCell>)}
                  {view === "monthly" && Array.from({ length: daysInMonth }, (_, i) => <TableCell key={i} className="border border-gray-300">{record.date.endsWith(`-${String(i + 1).padStart(2, '0')}`) ? (record.status ? "✔" : "❌") : "-"}</TableCell>)}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}