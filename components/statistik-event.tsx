"use client"

import MasjidListNew from "./masjid-list-new"
import DashboardSummaryItikaf from "./dashboard-itikaf"
import { useEffect, useState } from "react";
import axios from "axios";
import MasjidList from "./masjid-list";
import { Badge } from "./ui/badge";
export default function StatistikEvent({id_event, isHome}: any) {
  const [eventStats, setEventStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const eventID = id_event; // Bisa diganti sesuai kebutuhan

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`https://api.shollu.com/api/statistics-event?event_id=${eventID}`);
        setEventStats(res.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [eventID]);
  return (
    <>
      {
        isHome && (

          <section className="mb-6">
            <div className="container px-auto max-w-6xl bg-[#094641] text-white px-5 py-5 rounded-lg flex flex-col justify-center items-center animate-pulse-border">
              <Badge className="bg-red-600">Live Report</Badge>
              <h1 className="mt-2 text-2xl font-bold">TOP 10 LEADERBOARD</h1>
              <Badge className="bg-yellow-600 mt-2">Smart Itikaf 2025</Badge>
              <div className="mt-4 max-w-6xl mx-auto">
                {eventStats?.masjid_stats?.slice(0, 10).map((itm: any, idx: number) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2 rounded-lg mb-2 shadow-md border
                      ${idx === 0 ? "bg-yellow-500 text-black font-bold border-yellow-600 scale-105 animate-pulse-border" : ""}
                      ${idx === 1 ? "bg-blue-950 text-white border-yellow-400" : ""}
                      ${idx === 2 ? "bg-blue-950 text-white border-yellow-500" : ""}
                      ${idx > 2 ? "bg-white text-black border-gray-200" : ""}
                    `}
                  >
                    <span className="text-md font-semibold w-8">{idx + 1}.</span>
                    <span className="flex-1 text-left text-md break-words">{itm.masjid_nama}</span>
                    <span className="text-md font-bold w-16 text-right">{itm.total_count}</span>
                  </div>
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
