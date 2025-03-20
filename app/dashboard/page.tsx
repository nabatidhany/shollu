"use client"
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const eventOptions = [
  { id: 1, name: "Pejuang Qur'an" },
  { id: 2, name: "Smart I'Tikaf" },
  { id: 3, name: "Sholat Champions" },
];

export default function RegistrantChart() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedEvent, setSelectedEvent] = useState(2);
  const [eventDate, setEventDate] = useState(today);
  const [masjidStats, setMasjidStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.shollu.com/api/dashboard?event_id=${selectedEvent}&event_date=${eventDate}`);
        const data = await response.json();
        setMasjidStats(data.masjid_stats || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedEvent, eventDate]);

  return (
    <div className="mt-24 min-h-screen py-8 max-w-6xl px-2 lg:px-0 mx-auto flex flex-col">
      <h1 className="font-bold text-3xl mb-5">Dashboard</h1>
      <div className="flex gap-4 mb-4 justify-end">
        <Select value={selectedEvent.toString()} onValueChange={(value) => setSelectedEvent(Number(value))}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Pilih Event" />
          </SelectTrigger>
          <SelectContent>
            {eventOptions.map((event) => (
              <SelectItem key={event.id} value={event.id.toString()}>
                {event.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="w-64"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Registrasi per Masjid</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-scroll">
          <ResponsiveContainer width="100%" height={masjidStats.length * 40}>
            <BarChart 
              data={masjidStats} 
              layout="vertical" 
              margin={{ left: 20, right: 30 }}
              barCategoryGap="20%">
              <XAxis type="number" allowDecimals={false} />
              <YAxis type="category" dataKey="masjid_nama" width={200} interval={0} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1E1E1E", color: "#FFFFFF" }}
                itemStyle={{ color: "#FFFFFF" }}
              />
              <Bar dataKey="total_count" fill="#4F46E5" barSize={30} label={{ position: "right" }} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
