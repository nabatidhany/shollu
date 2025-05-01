'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format, subDays, subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { id } from 'date-fns/locale';

type CollectionMeta = {
  name: string;
  date_start: string;
  date_end: string;
  masjid: string;
};

type AbsenResponse = {
  fullname: string;
  absen: {
    [date: string]: {
      [sholat: string]: 'Y' | 'N';
    };
  };
};

export default function CollectionPage() {
  const { slug } = useParams();
  const [meta, setMeta] = useState<CollectionMeta | null>(null);
  const [data, setData] = useState<AbsenResponse[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [sholatTracked, setSholatTracked] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'harian' | 'mingguan' | 'bulanan' | 'collection'>('harian');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formatDate = (d: Date) => format(d, 'yyyy-MM-dd');

  useEffect(() => {
    const fetchMeta = async () => {
      const res = await fetch(`https://api.shollu.com/api/v1/collections-get-meta/${slug}`);
      const json = await res.json();
      console.log(json)
      setMeta(json?.collections[0]);
    };
    fetchMeta();
  }, [slug]);

  useEffect(() => {
    if (!meta) return;

    let fromDate: string;
    let toDate: string;
    const today = new Date();

    switch (filterType) {
      case 'harian':
        fromDate = toDate = formatDate(selectedDate || today);
        break;
      case 'mingguan':
        fromDate = formatDate(subDays(today, 6));
        toDate = formatDate(today);
        break;
      case 'bulanan':
        fromDate = formatDate(subMonths(today, 1));
        toDate = formatDate(today);
        break;
      case 'collection':
        fromDate = meta.date_start;
        toDate = meta.date_end;
        break;
    }

    const fetchAbsen = async () => {
      const res = await fetch(`https://api.shollu.com/api/v1/collections-get-absensi/${slug}?date_from=${fromDate}&date_to=${toDate}`);
      const json = await res.json();
      setData(json.data);
      setDates(json.dates);
      setSholatTracked(json.sholat_tracked);
    };

    fetchAbsen();
  }, [filterType, selectedDate, meta, slug]);

  return (
    <div className="p-4 mt-24">
      <h1 className="text-xl font-bold mb-2">Collection: {meta?.name}</h1>

      {meta && (
            <div className="mb-4 border p-4 rounded bg-gray-50">
            <p><strong>Nama Koleksi:</strong> {meta.name}</p>
            {/* <p><strong>ID Masjid:</strong> {meta.masjid}</p> */}
            <p>
							<strong>Periode:</strong>{' '}
							{format(new Date(meta.date_start), 'dd MMMM yyyy', { locale: id })} s/d{' '}
							{format(new Date(meta.date_end), 'dd MMMM yyyy', { locale: id })}
						</p>
            </div>
        )}

      <div className="flex items-center gap-4 mb-4">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border px-2 py-1 rounded"
        >
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          <option value="bulanan">Bulanan</option>
          {/* <option value="collection">Tanggal Awal - Akhir</option> */}
        </select>

        {filterType === 'harian' && (
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="border px-2 py-1 rounded"
          />
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border">
          <thead>
            <tr>
              <th className="border p-2">Nama</th>
              {dates.map((date) => (
                <th key={date} className="border p-2 text-center" colSpan={sholatTracked.length}>
                  {date}
                </th>
              ))}
            </tr>
            <tr>
              <td className="border p-2"></td>
              {dates.map((date) =>
                sholatTracked.map((sholat) => (
                  <th key={`${date}-${sholat}`} className="border p-2 text-sm text-center">
                    {sholat}
                  </th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                <td className="border p-2">{row.fullname}</td>
                {dates.map((date) =>
                  sholatTracked.map((sholat) => {
                    const status = row.absen?.[date]?.[sholat] || 'N';
                    return (
                      <td key={`${idx}-${date}-${sholat}`} className="border text-center p-2">
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
    </div>
  );
}
