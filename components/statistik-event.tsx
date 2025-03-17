"use client"

import MasjidListNew from "./masjid-list-new"
import DashboardSummaryItikaf from "./dashboard-itikaf"
import { useEffect, useState } from "react";
import axios from "axios";
import MasjidList from "./masjid-list";
export default function StatistikEvent({id_event}: any) {
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
      <section>
        <div id='rekapan' className='container mx-auto max-w-6xl px-8 lg:px-0'>
          {/* <MasjidListNew data={eventStats?.masjid_stats || []} /> */}
          <MasjidList event_id={id_event} />
          <hr className='my-8 border-t border-muted-2' />
          <DashboardSummaryItikaf data={eventStats} loading={loading} />
        </div>
      </section>
    </>
  )
}
