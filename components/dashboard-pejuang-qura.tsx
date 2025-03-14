"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  XAxis,
  Bar,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Users, Percent } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#22c55e", "#e2e8f0"];

export default function DashboardSummary() {
  const [eventStats, setEventStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const eventID = 1; // Bisa diganti sesuai kebutuhan

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

  if (loading) return <div className="text-center text-gray-500">Memuat data...</div>;
  if (!eventStats) return <div className="text-center text-red-500">Gagal memuat data</div>;

  const stats = [
    { icon: <Users className="text-green-600" />, title: "Total Peserta Hadir", value: `${eventStats.total_absen} dari ${eventStats.total_peserta}` },
    { icon: <Percent className="text-green-600" />, title: "Tingkat Kehadiran", value: `${eventStats.persen_hadir.toFixed(2)}%` },
  ];

  const barData = [
    { gender: "male", peserta: eventStats.total_male },
    { gender: "female", peserta: eventStats.total_female },
  ];

  const pieChartData = [
    { name: "Hadir", value: eventStats.total_absen },
    { name: "Absen", value: eventStats.total_peserta - eventStats.total_absen },
  ];

  const masjidBarData = eventStats.masjid_stats.map((masjid: any) => ({
    masjid: masjid.masjid_nama,
    male: masjid.male_count,
    female: masjid.female_count,
  }));

  const chartConfig: ChartConfig = {
    masjid: { label: "Masjid" },
    male: { label: "Pria", color: "hsl(var(--chart-1))" },
    female: { label: "Wanita", color: "hsl(var(--chart-2))" },
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="mb-3 text-xl text-center font-semibold md:mb-4 md:text-4xl lg:mb-6">
        Statistik Event Hari Ini dari Seluruh Masjid
      </h2>

      {/* Statistik */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 flex flex-col items-center text-center bg-white shadow-md rounded-2xl">
            {stat.icon}
            <CardHeader className="p-2">
              <CardTitle className="text-sm text-gray-600">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-semibold text-gray-900">{stat.value}</CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart - Jenis Kelamin */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-center">Jenis Kelamin Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="gender" />
                <Tooltip />
                <Bar dataKey="peserta" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart - Kehadiran */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-center">Kehadiran Hari Ini</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ResponsiveContainer width={250} height={250}>
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" outerRadius={80} fill="#22c55e" dataKey="value">
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart - Kehadiran di Tiap Masjid */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Kehadiran per Masjid</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              {/* Pastikan XAxis menampilkan nama masjid */}
              <XAxis 
                dataKey="masjid" 
                tick={{ fontSize: 10 }} 
                angle={-45} 
                textAnchor="end" 
                interval={0} 
              />
              <YAxis />
              <Tooltip
                cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-white p-2 rounded shadow-md text-xs border">
                        <strong>{data.masjid}</strong>
                        <div className="text-green-600">Laki-laki: {data.male}</div>
                        <div className="text-pink-600">Perempuan: {data.female}</div>
                      </div>
                    )
                  }
                  return null
                }}
              />

              <Bar dataKey="male" stackId="a" fill="#34D399" radius={[4, 4, 0, 0]} />
              <Bar dataKey="female" stackId="a" fill="#EC4899" radius={[0, 0, 4, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
