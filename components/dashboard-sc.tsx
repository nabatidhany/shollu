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
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, Percent } from "lucide-react";

const COLORS = ["#22c55e", "#e2e8f0"];

export default function DashboardSummarySC({ date }: any) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const eventID = 2;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `https://api.shollu.com/api/statistics-absensi?tanggal=${date}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Gagal mengambil data statistik:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [date]);

  if (loading)
    return <div className="text-center text-gray-500">Memuat data...</div>;
  if (!data)
    return <div className="text-center text-red-500">Gagal memuat data</div>;

  // Ringkasan
  const stats = [
    {
      icon: <Users className="text-green-600" />,
      title: "Total Peserta Hadir",
      value: `${data.total_peserta_hadir} dari ${data.total_peserta_terdaftar}`,
    },
    {
      icon: <Percent className="text-green-600" />,
      title: "Tingkat Kehadiran",
      value: `${(
        (data.total_peserta_hadir / data.total_peserta_terdaftar) *
        100
      ).toFixed(2)}%`,
    },
  ];

  // Data gender
  const barData = [
    { gender: "Laki-laki", peserta: data.jumlah_pria },
    { gender: "Perempuan", peserta: data.jumlah_wanita },
  ];

  // Data pie chart kehadiran
  const pieChartData = [
    { name: "Hadir", value: data.total_peserta_hadir },
    {
      name: "Absen",
      value: data.total_peserta_terdaftar - data.total_peserta_hadir,
    },
  ];

  // Data per sholat untuk grafik dan tabel
  const sholatBarData = Object.entries(data.statistik_per_sholat).map(
    ([sholat, kategori]: [string, any]) => ({
      sholat,
      pelajar: kategori.pelajar,
      umum: kategori.umum,
    })
  );

  return (
    <div className="p-4 space-y-6">
      <h2 className="mb-3 text-xl text-center font-semibold md:mb-4 md:text-4xl lg:mb-6">
        Statistik Absensi Hari Ini
      </h2>

      {/* Ringkasan */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="p-4 flex flex-col items-center text-center bg-white shadow-md rounded-2xl"
          >
            {stat.icon}
            <CardHeader className="p-2">
              <CardTitle className="text-sm text-gray-600">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg font-semibold text-gray-900">
              {stat.value}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Jenis Kelamin & Kehadiran */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart - Jenis Kelamin */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-center">
              Jenis Kelamin Peserta
            </CardTitle>
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
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#22c55e"
                  dataKey="value"
                >
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

      {/* Grafik Bar Kehadiran per Sholat */}
      <Card>
        <CardHeader>
          <CardTitle>Statistik Kehadiran per Sholat</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sholatBarData}>
              <XAxis dataKey="sholat" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="pelajar" fill="#60A5FA" name="Pelajar" />
              <Bar dataKey="umum" fill="#FBBF24" name="Umum" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Tabel Detail Kehadiran per Sholat */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-lg md:text-xl">
            Detail Kehadiran per Waktu Sholat
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 font-semibold text-gray-700">
                    Waktu Sholat
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-blue-600">
                    Pelajar
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-yellow-600">
                    Umum
                  </th>
                  <th className="px-4 py-2 text-center font-semibold text-green-700">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sholatBarData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 capitalize">{item.sholat}</td>
                    <td className="px-4 py-2 text-center text-blue-500 font-medium">
                      {item.pelajar}
                    </td>
                    <td className="px-4 py-2 text-center text-yellow-500 font-medium">
                      {item.umum}
                    </td>
                    <td className="px-4 py-2 text-center text-green-700 font-semibold">
                      {item.pelajar + item.umum}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
