"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart, Pie, Cell,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import MasjidList from "./masjidlist";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const COLORS = ["#0088FE", "#FF8042"];
const sholatList = ["subuh", "dzuhur", "ashar", "maghrib", "isya"];

export default function Dashboard() {
  const [tanggal, setTanggal] = useState("");
  const [fokusSholat, setFokusSholat] = useState(sholatList);
  const [todayData, setTodayData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let nowJakarta = dayjs().tz("Asia/Jakarta");
  //     if (nowJakarta.hour() < 3) {
  //       nowJakarta = nowJakarta.subtract(1, "day");
  //     }

  //     const todayStr = nowJakarta.format("YYYY-MM-DD");
  //     const yesterdayStr = nowJakarta.subtract(1, "day").format("YYYY-MM-DD");

  //     setTanggal(todayStr);

  //     try {
  //       const [todayRes, yestRes] = await Promise.all([
  //         axios.get(`https://api.shollu.com/api/statistics-absensi?tanggal=${todayStr}`),
  //         axios.get(`https://api.shollu.com/api/statistics-absensi?tanggal=${yesterdayStr}`)
  //       ]);

  //       setTodayData({ ...todayRes.data, tanggal: todayStr });
  //       setYesterdayData({ ...yestRes.data, tanggal: yesterdayStr });
  //     } catch (err) {
  //       console.error("Gagal mengambil data:", err);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    if (!tanggal) {
      let nowJakarta = dayjs().tz("Asia/Jakarta");
      if (nowJakarta.hour() < 3) {
        nowJakarta = nowJakarta.subtract(1, "day");
      }
      const todayStr = nowJakarta.format("YYYY-MM-DD");
      setTanggal(todayStr); // ini akan trigger useEffect kedua
    }
  }, []);

  useEffect(() => {
    if (tanggal) {
      fetchData(tanggal);
    }
  }, [tanggal]);



  const fetchData = async (tgl: any) => {
    const tglToday = dayjs.tz(tgl, "Asia/Jakarta").format("YYYY-MM-DD");
    const tglYesterday = dayjs.tz(tgl, "Asia/Jakarta").subtract(1, "day").format("YYYY-MM-DD");

    try {
      const [todayRes, yestRes] = await Promise.all([
        axios.get(`https://api.shollu.com/api/statistics-absensi?tanggal=${tglToday}`),
        axios.get(`https://api.shollu.com/api/statistics-absensi?tanggal=${tglYesterday}`)
      ]);

      setTodayData({ ...todayRes.data, tanggal: tglToday });
      setYesterdayData({ ...yestRes.data, tanggal: tglYesterday });
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  if (!todayData || !yesterdayData) return <p className="text-center mt-10">Loading...</p>;

  const hadirPie = [
    { name: "Hadir", value: todayData.total_peserta_hadir },
    { name: "Tidak Hadir", value: todayData.total_peserta_terdaftar - todayData.total_peserta_hadir },
  ];

  const genderBar = [
    { name: "Pria", value: todayData.jumlah_pria },
    { name: "Wanita", value: todayData.jumlah_wanita },
  ];

  const sholatBarData = sholatList.map(s => {
    const dataSholat = todayData.statistik_per_sholat?.[s] || { pelajar: 0, umum: 0 };
    return {
      name: s.charAt(0).toUpperCase() + s.slice(1),
      pelajar: dataSholat.pelajar,
      umum: dataSholat.umum,
      total: dataSholat.pelajar + dataSholat.umum
    };
  });

  const sholatCompareData = sholatList.map(s => {
    const todaySholat = todayData.statistik_per_sholat?.[s] || { pelajar: 0, umum: 0 };
    const yesterdaySholat = yesterdayData.statistik_per_sholat?.[s] || { pelajar: 0, umum: 0 };
    return {
      name: s.charAt(0).toUpperCase() + s.slice(1),
      today: todaySholat.pelajar + todaySholat.umum,
      yesterday: yesterdaySholat.pelajar + yesterdaySholat.umum
    };
  });

  const totalCompareData = [
    {
      name: "Total Hadir",
      today: todayData.total_peserta_hadir,
      yesterday: yesterdayData.total_peserta_hadir
    }
  ];

  const persentaseHadir = (
    (todayData.total_peserta_hadir / todayData.total_peserta_terdaftar) * 100
  ).toFixed(1);

  return (
    <div className="bg-gray-50 min-h-screen py-6 mt-2">
      <div className="container mx-auto max-w-6xl px-4 space-y-6">
        <h1 className="text-2xl font-bold text-center">Dashboard Absensi Sholat Champions</h1>

        {/* Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">Tanggal</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              className="border rounded px-2 py-1 w-full"
            />
          </div>
        </div>

        <MasjidList eventDate={tanggal} />

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-sm font-medium">Fokus Sholat</label>
            <select
              multiple
              value={fokusSholat}
              onChange={(e) =>
                setFokusSholat(Array.from(e.target.selectedOptions, (opt) => opt.value))
              }
              className="border rounded px-2 py-1 w-full h-32"
            >
              {sholatList.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Insight */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Peserta Hadir</p>
            <p className="text-xl font-bold">{todayData.total_peserta_hadir}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Peserta Terdaftar</p>
            <p className="text-xl font-bold">{todayData.total_peserta_terdaftar}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Persentase Kehadiran</p>
            <p className="text-xl font-bold">{persentaseHadir}%</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Semua Sholat</p>
            <p className="text-xl font-bold">
              {sholatBarData.reduce((a, c) => a + c.total, 0)}
            </p>
          </div>
        </div>

        {/* Pie & Gender Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Kehadiran vs Terdaftar</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={hadirPie} dataKey="value" nameKey="name" outerRadius={100} label>
                  {hadirPie.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Distribusi Gender</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={genderBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart Kehadiran Per Sholat */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Kehadiran Per Sholat (Hari Ini)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sholatBarData.filter(d => fokusSholat.includes(d.name.toLowerCase()))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pelajar" fill="#82ca9d" />
              <Bar dataKey="umum" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Tabel Kehadiran */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Tabel Kehadiran Per Sholat</h2>
          <div className="overflow-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-1">Sholat</th>
                  <th className="border px-2 py-1">Pelajar</th>
                  <th className="border px-2 py-1">Umum</th>
                  <th className="border px-2 py-1">Total</th>
                </tr>
              </thead>
              <tbody>
                {sholatBarData
                  .filter(d => fokusSholat.includes(d.name.toLowerCase()))
                  .map((row) => (
                    <tr key={row.name}>
                      <td className="border px-2 py-1">{row.name}</td>
                      <td className="border px-2 py-1">{row.pelajar}</td>
                      <td className="border px-2 py-1">{row.umum}</td>
                      <td className="border px-2 py-1">{row.total}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Perbandingan Kehadiran Total */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Perbandingan Total Kehadiran</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={totalCompareData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="today" fill="#8884d8" />
              <Bar dataKey="yesterday" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LineChart Perbandingan Sholat */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Perbandingan Kehadiran Per Sholat</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sholatCompareData.filter(d => fokusSholat.includes(d.name.toLowerCase()))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="today" stroke="#8884d8" />
              <Line type="monotone" dataKey="yesterday" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
