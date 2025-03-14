"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, BookOpen, Trophy, Percent } from "lucide-react";

const stats = [
  { icon: <Users className="text-green-600" />, title: "Total Peserta Hadir", value: "75 dari 100" },
  { icon: <Percent className="text-green-600" />, title: "Tingkat Kehadiran", value: "85%" },
];

const barData = [
  { gender: "male", peserta: 15 },
  { gender: "female", peserta: 10 },
];

const pieChartData = [
  { name: "Hadir", value: 85 },
  { name: "Absen", value: 15 },
];

const COLORS = ["#22c55e", "#e2e8f0"];

export default function DashboardSummary() {
  return (
    <div className="p-4 space-y-6">
      <h2 className="mb-3 text-xl text-center font-semibold md:mb-4 md:text-4xl lg:mb-6">Statistik Event Hari Ini dari Seluruh Masjid </h2>
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
        {/* Bar Chart */}
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-center">Jenis Kelamin Peserta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="peserta" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
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

      {/* Tabel Kehadiran */}
      {/* <Card className="p-4">
        <CardHeader>
          <CardTitle className="text-center">Rekapan Kehadiran Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Kehadiran</TableHead>
                  <TableHead>Hafalan</TableHead>
                  <TableHead>Surah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.hadir}</TableCell>
                    <TableCell>{row.hafalan}</TableCell>
                    <TableCell>{row.surah}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
