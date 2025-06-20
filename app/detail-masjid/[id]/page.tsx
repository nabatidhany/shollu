"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useParams } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { CircleCheck, CircleX } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { isMobile } from 'react-device-detect';



const eventsGlobal = [
  { id: 3, name: "Sholat Champions" },
];

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

  const [selectedEvent, setSelectedEvent] = useState<number>(3);
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

      let url = `https://api.shollu.com/api/rekap-absen-sholat/${masjidId}?&tanggal=${formattedDate}`;

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

  const downloadPDF = () => {
    const doc = new jsPDF();
    const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
    const fileName = `Rekap_Absensi_${masjidProfile?.name}_${formattedDate}.pdf`;

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(masjidProfile?.name, 105, 20, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const alamat = doc.splitTextToSize(masjidProfile?.alamat, 120);
    doc.text(alamat, 105, 32, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Rekap Absensi Event Sholat Champions - ${format(formattedDate, "dd MMMM yyyy")}`, 105, 26, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(20, 38, 190, 38);

    const tableColumn = ["#", "Nama", "Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"];
    const tableRows: any[] = [];

    let totalKehadiranSah = 0;

    rekapanAbsen.forEach((record, index) => {
      const sholatData = record.sholat || {};

      const renderIcon = (doc: jsPDF, sholat: string): { text: string; color: string } => {
        const s = sholatData[sholat];
        if (!s || s.status === false) return { text: "N", color: "#FF0000" }; // merah
        if (s.inThisMasjid === false) return { text: "Y", color: "#A9A9A9" }; // abu-abu
        totalKehadiranSah += 1;
        return { text: "Y", color: "#008000" }; // hijau
      };

      const row = [
        index + 1,
        record.isHideName === 1 ? `${record.name.charAt(0)}${'*'.repeat(record.name.length - 1)}` : record.name,
      ];

      ["subuh", "dzuhur", "ashar", "maghrib", "isya"].forEach((sholat) => {
        const { text, color } = renderIcon(doc, sholat);
        row.push({ content: text, styles: { textColor: color } });
      });

      tableRows.push(row);
    });

    autoTable(doc, {
      startY: 48,
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [6, 104, 91], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
      didDrawPage: function (data) {
        doc.setFontSize(10);
        doc.text("Generated via shollu.com", 105, doc.internal.pageSize.height - 10, { align: "center" });
        doc.addImage("/watermark.png", "PNG", 120, doc.internal.pageSize.height - 90, 120, 120, undefined, "FAST");
      },
      margin: { top: 48 },
    });

    doc.setFontSize(10);
    const finalY = (doc as any).lastAutoTable.finalY || 60;
    doc.text(`Total Peserta: ${rekapanAbsen.length}`, 20, finalY + 10);
    doc.text(`Total Kehadiran Sah di Semua Sholat: ${totalKehadiranSah}`, 20, finalY + 16);

    doc.save(fileName);
  };


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

        <Button onClick={downloadPDF} className="my-4 w-full">Download PDF</Button>

        <div className="overflow-x-auto">
          <Table className="w-full border border-gray-300">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200 text-center text-black">#</TableHead>
                <TableHead className="bg-gray-200 text-black">Nama</TableHead>
                <TableHead className="bg-gray-200 text-black text-center">S</TableHead>
                <TableHead className="bg-gray-200 text-black text-center">D</TableHead>
                <TableHead className="bg-gray-200 text-black text-center">A</TableHead>
                <TableHead className="bg-gray-200 text-black text-center">M</TableHead>
                <TableHead className="bg-gray-200 text-black text-center">I</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Memuat data...
                  </TableCell>
                </TableRow>
              ) : rekapanAbsen.length > 0 ? (
                <>
                  {rekapanAbsen.map((record, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                      <TableCell className="py-2 px-4 text-center text-black">{index + 1}</TableCell>
                      <TableCell className="py-2 px-4 text-black">
                        {record.isHideName === 1
                          ? `${record.name.charAt(0)}${"*".repeat(record.name.length - 1)}`
                          : record.name}
                      </TableCell>

                      {["subuh", "dzuhur", "ashar", "maghrib", "isya"].map((sholat) => {
                        const sholatRecord = record.sholat?.[sholat];
                        return (
                          <TableCell key={sholat} className="text-center">
                            <TooltipProvider>
                              <Tooltip>
                                {isMobile ? (
                                  <span onClick={() => alert(
                                    !sholatRecord
                                      ? "Tidak absen"
                                      : sholatRecord.status === false
                                      ? "Tidak Sah / Terlambat"
                                      : !sholatRecord.inThisMasjid
                                      ? `Sholat di masjid ${sholatRecord.masjidName}`
                                      : "Sah - Absen di masjid ini"
                                  )}>
                                    {!sholatRecord ? (
                                      <span className="text-gray-400 text-lg">-</span>
                                    ) : sholatRecord.status === false ? (
                                      <span className="text-red-500 text-lg"><CircleX color="red" size={23} /></span>
                                    ) : !sholatRecord.inThisMasjid ? (
                                      // <span className="text-gray-500 text-lg">✔️</span>
                                      <CircleCheck color="#A9A9A9" size={23} />
                                    ) : (
                                      // <span className="text-green-600 text-lg">✔️</span>
                                      <CircleCheck color="green" size={23} />
                                    )}
                                  </span>
                                ) : (
                                  <TooltipTrigger asChild>
                                    <span>
                                      {!sholatRecord ? (
                                        <span className="text-gray-400 text-lg">-</span>
                                      ) : sholatRecord.status === false ? (
                                        <span className="text-red-500 text-lg"><CircleX color="red" size={23} /></span>
                                      ) : !sholatRecord.inThisMasjid ? (
                                        // <span className="text-gray-500 text-lg">✔️</span>
                                        <CircleCheck color="#A9A9A9" size={23} />
                                      ) : (
                                        // <span className="text-green-600 text-lg">✔️</span>
                                        <CircleCheck color="green" size={23} />
                                      )}
                                    </span>
                                  </TooltipTrigger>
                                )}
                                <TooltipContent>
                                  <p>
                                    {!sholatRecord
                                      ? "Tidak absen"
                                      : sholatRecord.status === false
                                      ? "Tidak Sah / Terlambat"
                                      : !sholatRecord.inThisMasjid
                                      ? `Sholat di masjid ${sholatRecord.masjidName}`
                                      : "Sah - Absen di masjid ini"}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}

                  {/* Total row */}
                  <TableRow className="bg-yellow-100 font-semibold">
                    <TableCell colSpan={2} className="text-center">
                      Total Sah
                    </TableCell>
                    {["subuh", "dzuhur", "ashar", "maghrib", "isya"].map((sholat) => {
                      const total = rekapanAbsen.reduce((count, record) => {
                        const s = record.sholat?.[sholat];
                        return count + (s?.status === true && s?.inThisMasjid === true ? 1 : 0);
                      }, 0);
                      return (
                        <TableCell key={sholat} className="text-center text-green-700">
                          {total}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </>
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    Belum ada data absen
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>


        </div>
        <div className="mt-2 text-center text-sm text-gray-600">
          Total Kehadiran Sah di Semua Sholat:{" "}
          {
            rekapanAbsen.reduce((total, record) => {
              const countPerUser = Object.values(record.sholat || {}).filter(
                (s: any) => s.status === true && s.inThisMasjid === true
              ).length;
              return total + countPerUser;
            }, 0)
          }
        </div>
        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
          <p className="text-lg font-semibold">Total Peserta Absensi: {rekapanAbsen.length}</p>
        </div>
      </div>
    </div>
  );
}
