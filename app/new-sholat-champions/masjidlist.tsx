import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Link from "next/link";
import { ArrowRight } from "lucide-react";


export default function MasjidAccordion({ eventDate, setSelectedRegionalParent }: any) {
  const [masjidData, setMasjidData] = useState([]);
  const [regionalList, setRegionalList] = useState([]);
  const [selectedRegional, setSelectedRegional] = useState("Semua");

  useEffect(() => {
    axios
      .get(`https://api.shollu.com/api/statistics-rekap-masjid?event_date=${eventDate}`)
      .then((res) => {
        const sorted = res.data.sort((a, b) => b.total_count - a.total_count);
        setMasjidData(sorted);
        const regionals = Array.from(new Set(sorted.map(m => m.masjid_regional)));
        setRegionalList(regionals);
      });
  }, [eventDate]);

  const filteredMasjid = selectedRegional === "Semua"
    ? masjidData
    : masjidData.filter(m => m.masjid_regional === selectedRegional);

  return (
    <div className="space-y-4 bg-[#15803d] p-3 rounded-md">
      {/* Card info */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-500">Total Masjid Terhubung</p>
          <p className="text-2xl font-extrabold text-blue-700">{masjidData.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-gray-500">Total Sholat Seluruh Masjid</p>
          <p className="text-2xl font-extrabold text-green-700">
            {masjidData.reduce((acc, m) => acc + m.total_count, 0)}
          </p>
        </div>
      </div>

      {/* Chip regional */}
      <div className="flex gap-2 flex-wrap overflow-auto">
        <button
          onClick={() => {setSelectedRegional("Semua"); setSelectedRegionalParent('Semua')}}
          className={`px-3 py-1 rounded-full ${
            selectedRegional === "Semua"
              ? "bg-yellow-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          Semua Regional
        </button>
        {regionalList.map((r) => (
          <button
            key={r}
            onClick={() => {setSelectedRegional(r); setSelectedRegionalParent(r)}}
            className={`px-3 py-1 rounded-full ${
              selectedRegional === r
                ? "bg-yellow-600 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Accordion masjid */}
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-700">
          Daftar Masjid & Jumlah Sholat
        </h2>
        <ul className="space-y-2">
          {filteredMasjid.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada masjid di regional ini</p>
          ) : (
            filteredMasjid.map((m, index) => (
              <AccordionItem key={m.masjid_id} m={m} index={index} />
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

function AccordionItem({ m, index }) {
  const [open, setOpen] = useState(false);

  const rankStyle = (index) => {
    switch (index) {
      case 0:
        return "bg-yellow-100 border-yellow-400 text-yellow-700";
      case 1:
        return "bg-gray-100 border-gray-400 text-gray-700";
      case 2:
        return "bg-orange-100 border-orange-400 text-orange-700";
      default:
        return "bg-white border-gray-200 hover:bg-gray-50";
    }
  };

  const rankBadge = (index) => {
    switch (index) {
      case 0: return "🥇";
      case 1: return "🥈";
      case 2: return "🥉";
      default: return "";
    }
  };

	const sholatData = [
    { name: 'Subuh', count: m.subuh_count },
    { name: 'Dzuhur', count: m.dzuhur_count },
    { name: 'Ashar', count: m.ashar_count },
    { name: 'Maghrib', count: m.maghrib_count },
    { name: 'Isya', count: m.isya_count }
  ];

  return (
    <li className={`border ${rankStyle(index)} rounded-xl`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-3 text-left"
      >
        <div className="flex items-center gap-2">
          🕌 <span className="font-bold text-sm sm:text-base">{m.masjid_nama}</span>
          {rankBadge(index) && <span className="text-lg">{rankBadge(index)}</span>}
        </div>
        <div className="text-right">
          <p className="font-extrabold text-base sm:text-lg">{m.total_count}</p>
          <p className="text-xs text-gray-500">Total Sholat</p>
        </div>
      </button>
			<div className="w-full text-xs bg-green-500 rounded-b-lg text-white text-center">klik untuk info detail</div>
      {open && (
        <div className="bg-gray-50 p-3 border-t text-sm space-y-2">
          <p className="text-gray-600">{m.masjid_alamat}</p>
          <p className="text-gray-400 italic">Regional: {m.masjid_regional}</p>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sholatData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {/* Table Kehadiran Sholat */}
          <div className="overflow-auto">
            <table className="w-full text-xs border mt-2">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="border px-2 py-1 text-left">Sholat</th>
                  <th className="border px-2 py-1 text-right">Jumlah Hadir</th>
                </tr>
              </thead>
              <tbody>
                {sholatData.map((s) => (
                  <tr key={s.name}>
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1 text-right">{s.count}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-100">
                  <td className="border px-2 py-1">Total</td>
                  <td className="border px-2 py-1 text-right">
                    {sholatData.reduce((acc, s) => acc + s.count, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

					<Link
						href={`/detail-masjid/${m.masjid_id}`}
						className="order-3 ml-auto w-fit gap-2 md:order-none flex flex-row items-center"
					>
						<span>Lihat Rekapan</span>
						<ArrowRight className="h-4 w-4" />
					</Link>
        </div>
      )}
    </li>
  );
}
