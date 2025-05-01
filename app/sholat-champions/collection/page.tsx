'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Sholat = 'subuh' | 'dzuhur' | 'ashar' | 'maghrib' | 'isya';

type AbsenData = {
  [date: string]: Record<Sholat, 'Y' | 'N'>;
};

type CollectionItem = {
  fullname: string;
  absen: AbsenData;
};

type ViewCollectionResponse = {
  data: CollectionItem[];
  dates: string[];
  sholat_tracked: Sholat[];
};

type CollectionMeta = {
  name: string;
  date_start: string;
  date_end: string;
  masjid: string[];
};

export default function ViewCollectionPage() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug') || '';

  const [periode, setPeriode] = useState<'harian' | 'mingguan' | 'bulanan' | 'koleksi'>('harian');
  const [startDate, setStartDate] = useState<any>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [collectionMeta, setCollectionMeta] = useState<CollectionMeta | null>(null);
  const [viewData, setViewData] = useState<ViewCollectionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fungsi untuk mengatur tanggal berdasarkan periode
  const updateDateRange = (periode: string, meta?: CollectionMeta) => {
    const today = new Date();
    let start: Date;
    let end: Date;

    switch (periode) {
      case 'harian':
        start = today;
        end = today;
        break;
      case 'mingguan':
        start = new Date(today);
        start.setDate(start.getDate() - 6);
        end = today;
        break;
      case 'bulanan':
        start = new Date(today);
        start.setDate(start.getDate() - 29);
        end = today;
        break;
      case 'koleksi':
        if (meta) {
          start = new Date(meta.date_start);
          end = new Date(meta.date_end);
        } else {
          start = today;
          end = today;
        }
        break;
      default:
        start = today;
        end = today;
    }

    setStartDate(start);
    setEndDate(end);
  };

  // Ambil data koleksi saat komponen dimuat
  useEffect(() => {
    const fetchCollectionMeta = async () => {
      try {
        const res = await fetch(`/api/collection/meta?slug=${slug}`);
        const data: CollectionMeta = await res.json();
        setCollectionMeta(data);
        updateDateRange(periode, data);
      } catch (error) {
        console.error('Gagal mengambil data koleksi:', error);
      }
    };

    fetchCollectionMeta();
  }, [slug]);

  // Ambil data kehadiran saat periode atau tanggal berubah
  useEffect(() => {
    if (!collectionMeta) return;

    const fetchViewData = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          slug,
          start_date: startDate.toISOString().split('T')[0],
          end_date: endDate.toISOString().split('T')[0],
        });
        const res = await fetch(`/api/collection/view?${params.toString()}`);
        const data: ViewCollectionResponse = await res.json();
        setViewData(data);
      } catch (error) {
        console.error('Gagal mengambil data kehadiran:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViewData();
  }, [slug, startDate, endDate, collectionMeta]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Laporan Kehadiran</h1>

      {/* Filter Periode */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Periode:</label>
        <select
          value={periode}
          onChange={(e) => {
            const selectedPeriode = e.target.value as 'harian' | 'mingguan' | 'bulanan' | 'koleksi';
            setPeriode(selectedPeriode);
            updateDateRange(selectedPeriode, collectionMeta || undefined);
          }}
          className="border px-2 py-1 rounded"
        >
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          <option value="koleksi">Periode Koleksi</option>
        </select>
      </div>

      {/* Date Picker */}
      <div className="mb-4">
        {periode === 'harian' ? (
          <div>
            <label className="mr-2 font-semibold">Tanggal:</label>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              dateFormat="yyyy-MM-dd"
              className="border px-2 py-1 rounded"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <div>
              <label className="mr-2 font-semibold">Mulai:</label>
              <DatePicker
                selected={startDate}
                onChange={(date: any) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="yyyy-MM-dd"
                className="border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="mr-2 font-semibold">Akhir:</label>
              <DatePicker
                selected={endDate}
                onChange={(date: any) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                dateFormat="yyyy-MM-dd"
                className="border px-2 py-1 rounded"
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabel Kehadiran */}
      {loading ? (
        <p>Memuat data...</p>
      ) : viewData ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Nama</th>
                {viewData.dates.map((date) =>
                  viewData.sholat_tracked.map((sholat) => (
                    <th key={`${date}-${sholat}`} className="border px-4 py-2 capitalize">
                      {sholat} <br />
                      <span className="text-xs text-gray-500">{date}</span>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {viewData.data.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 font-medium">{item.fullname}</td>
                  {viewData.dates.map((date) =>
                    viewData.sholat_tracked.map((sholat) => {
                      const status = item.absen[date]?.[sholat] || 'N';
                      return (
                        <td
                          key={`${item.fullname}-${date}-${sholat}`}
                          className="border px-4 py-2 text-center"
                        >
                          {status === 'Y' ? '✅' : '❌'}
                        </td>
                      );
                    })
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Tidak ada data untuk ditampilkan.</p>
      )}
    </div>
  );
}
