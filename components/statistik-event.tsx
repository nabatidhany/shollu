"use client"

import MasjidListNew from "./masjid-list-new"
import DashboardSummaryItikaf from "./dashboard-itikaf"
import { useEffect, useState } from "react";
import axios from "axios";
import MasjidList from "./masjid-list";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { format } from "date-fns";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
};

export default function StatistikEvent({id_event, isHome}: any) {
  const [eventStats, setEventStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const eventID = id_event; // Bisa diganti sesuai kebutuhan
  const today = new Date().toISOString().split("T")[0];
  // Jika event_id = 2, gunakan Hari 1 - Hari 10 I'tikaf
  const itikafStartDate = new Date("2025-03-20"); // Hari 1 I'tikaf
  const itikafDays = Array.from({ length: 10 }, (_, i) => {
    const date = new Date(itikafStartDate);
    date.setDate(itikafStartDate.getDate() + i);
    return {
      label: `Hari ${i + 1} I'tikaf`, // Label Dropdown
      value: date.toISOString().split("T")[0], // Format YYYY-MM-DD
      formatted: formatDate(date.toISOString().split("T")[0]), // "20 Maret 2025"
    };
  });

  const defaultEventDate = eventID === 2 ? itikafDays[0].value : today;
  const [selectedDate, setSelectedDate] = useState(today);


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await axios.get(`https://api.shollu.com/api/statistics-event?event_id=${eventID}&event_date=${selectedDate}`);
  //       setEventStats(res.data);
  //     } catch (error) {
  //       console.error("Error fetching statistics:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchData();
  // }, [eventID, selectedDate]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://api.shollu.com/api/statistics-event?event_id=${eventID}&event_date=${selectedDate}`);
        setEventStats(res.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [eventID, selectedDate]);

  // Format tanggal yang dipilih
  const formattedDate = formatDate(selectedDate);
  const itikafDay = itikafDays.find((day) => day.value === selectedDate);
  return (
    <>
      <div className="flex items-center space-x-4 mb-7 mx-auto max-w-5xl px-8 lg:px-0 mt-4">
        {eventID === 2 ? (
          // Jika event Itikaf (event_id = 2), gunakan Select
          <Select value={selectedDate} onValueChange={(value) => setSelectedDate(value)}>
            <SelectTrigger className="w-full border p-2 rounded-md">
              <SelectValue placeholder="Pilih Hari I'tikaf" />
            </SelectTrigger>
            <SelectContent>
              {itikafDays.map((day) => (
                <SelectItem key={day.value} value={day.value}>
                  {day.label} - {day.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          // Event lain tetap gunakan input date
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border p-2 rounded-md w-full"
          />
        )}
      </div>
      {
        isHome && (eventID === 2) && (
          <section className="mb-6">
            <div className="container px-auto max-w-6xl bg-[#094641] text-white px-5 py-5 rounded-lg flex flex-col justify-center items-center animate-pulse-border">
              <Badge className="bg-red-600">Live Report</Badge>
              <h1 className="mt-2 text-2xl font-bold">TOP 10 LEADERBOARD</h1>
              <Badge className="bg-yellow-600 mt-2">
                {eventID === 2
                  ? `Smart Itikaf 2025 - ${itikafDay?.label} (${itikafDay?.formatted})`
                  : `Event Tanggal: ${formattedDate}`}
              </Badge>
              <div className="mt-4 max-w-6xl mx-auto">
                {eventStats?.masjid_stats?.slice(0, 10).map((itm: any, idx: number) => (
                  <Link key={idx} href={`/detail-masjid/${itm?.masjid_id}`}>
                    <div
                      className={`flex items-center justify-between p-2 rounded-lg mb-2 shadow-md border
                        ${idx === 0 ? "bg-yellow-500 text-black font-bold border-yellow-600 scale-105 animate-pulse-border-top" : ""}
                        ${idx === 1 ? "bg-blue-950 text-white border-yellow-400" : ""}
                        ${idx === 2 ? "bg-blue-950 text-white border-yellow-500" : ""}
                        ${idx > 2 ? "bg-white text-black border-gray-200" : ""}
                      `}
                    >
                      <span className="text-md font-semibold w-8">{idx + 1}.</span>
                      <span className="flex-1 text-left text-md break-words">{itm.masjid_nama}</span>
                      <span className="text-md font-bold w-16 text-right">{itm.total_count}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )
      }
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-1 lg:px-0'>
          {
            !isHome && (
              <MasjidListNew data={eventStats?.masjid_stats || []} />
            )
          }
          {/* <MasjidList event_id={id_event} /> */}
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummaryItikaf data={eventStats} loading={loading} />
        </div>
      </section>
    </>
  )
}
