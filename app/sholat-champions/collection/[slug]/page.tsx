'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { format, subDays, subMonths } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { id } from 'date-fns/locale';
import { CircleX } from "lucide-react";

type CollectionMeta = {
  name: string;
  date_start: string;
  date_end: string;
  masjid_id: string;
  masjid_names: any;
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
  const [filterType, setFilterType] = useState<'harian' | 'mingguan' | 'collection'>('collection');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const formatDate = (d: Date) => format(d, 'yyyy-MM-dd');

  useEffect(() => {
    const fetchMeta = async () => {
      const res = await fetch(`https://api.shollu.com/api/v1/collections-get-meta/${slug}`);
      const json = await res.json();
      setMeta(json?.collections);
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
      // case 'bulanan':
      //   fromDate = formatDate(subMonths(today, 1));
      //   toDate = formatDate(today);
      //   break;
      case 'collection':
        fromDate = format(new Date(meta.date_start), 'yyyy-MM-dd');
        toDate = format(new Date(meta.date_end), 'yyyy-MM-dd');
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
    <div className="p-4 mt-24 container mx-auto max-w-6xl px-8">
      <h1 className="text-xl font-bold mb-2">{meta?.name}</h1>

      {meta && (
            <div className="mb-4 border p-4 rounded bg-gray-50">
            <p><strong>Nama Koleksi:</strong> {meta.name}</p>
            <p><strong>Masjid Peserta:</strong></p>
            <ul className='ml-2'>
              {
                meta?.masjid_names?.map((name: any) => (
                  <li>- {name}</li>
                ))
              }
            </ul>
            {/* <p><strong>ID Masjid:</strong> {meta.masjid_id}</p> */}
            <p>
							<strong>Periode:</strong>{' '}
							{format(new Date(meta.date_start), 'dd MMMM yyyy', { locale: id })} s/d{' '}
							{format(new Date(meta.date_end), 'dd MMMM yyyy', { locale: id })}
						</p>
            </div>
        )}

      <div className="flex items-center gap-4 mb-4 flex-col lg:flex-row">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as any)}
          className="border px-2 py-1 rounded w-full lg:w-[270px]"
        >
          <option value="harian">Harian</option>
          <option value="mingguan">Mingguan</option>
          {/* <option value="bulanan">Bulanan</option> */}
          <option value="collection">Periode Collection</option>
        </select>

        {filterType === 'harian' && (
          <div className='w-full'>
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							dateFormat="yyyy-MM-dd"
							className="border px-2 py-1 rounded w-full"
						/>
					</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full border text-sm">
          <thead>
            {filterType === 'collection' && (
              <>
                <tr>
                  <th className="border p-2">Nama</th>
                  {sholatTracked.map((sholat) => (
                    <th key={`subtotal-${sholat}`} className="border p-2 capitalize">{sholat.substring(0, 3)}</th>
                  ))}
                  <th className="border p-2">Total</th>
                  {dates.map((date) => (
                    <th key={`date-${date}`} colSpan={sholatTracked.length} className="border p-2 text-center">
                      {date}
                    </th>
                  ))}
                </tr>
                {
                  sholatTracked.length > 1 && (
                    <tr>
                      <td className="border p-2"></td>
                      {sholatTracked.map((s) => (
                        <td key={`subheader-${s}`} className="border p-2"></td>
                      ))}
                      <td className="border p-2"></td>
                      {dates.map((date) =>
                        sholatTracked.map((sholat) => (
                          <th key={`${date}-${sholat}`} className="border p-2 text-center capitalize">
                            {sholat.substring(0, 3)}
                          </th>
                        ))
                      )}
                    </tr>
                  )
                }
              </>
            )}

            {filterType === 'mingguan' && (
              <tr>
                <th className="border p-2 whitespace-nowrap w-[200px] max-w-[200px] overflow-hidden text-ellipsis">Nama</th>
                {sholatTracked.length > 1 ? (
                  <>
                    {sholatTracked.map((sholat) => (
                      <th key={`subtotal-${sholat}`} className="border p-2 capitalize">{sholat.substring(0, 3)}</th>
                    ))}
                    <th className="border p-2">Total</th>
                  </>
                ) : (
                  <>
                    <th key={`date-${sholatTracked[0]}`} className="border p-2">{sholatTracked[0]}</th>
                    <th className="border p-2">Total</th>
                  </>
                  // dates.map((date) => (
                  //   <th key={`date-${date}`} className="border p-2">{date}</th>
                  // ))
                )}
              </tr>
            )}

            {filterType === 'harian' && (
              <tr>
                <th className="border p-2 whitespace-nowrap w-[200px] max-w-[200px] overflow-hidden text-ellipsis">Nama</th>
                {sholatTracked.length > 1 ? (
                  <>
                    {sholatTracked.map((sholat) => (
                      <th key={`sholat-${sholat}`} className="border p-2 capitalize">{sholat.substring(0, 3)}</th>
                    ))}
                  </>
                ) : (
                  <th className="border p-2">Status</th>
                )}
              </tr>
            )}
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={100} className="text-center p-4 text-gray-500">Tidak ada data</td>
              </tr>
            )}

            {data.map((row, idx) => {
              if (filterType === 'collection') {
                const subtotals: Record<string, number> = {};
                let totalAll = 0;

                sholatTracked.forEach((sholat) => {
                  const subtotal = dates.reduce((acc, date) => {
                    return acc + (row.absen[date]?.[sholat] === 'Y' ? 1 : 0);
                  }, 0);
                  subtotals[sholat] = subtotal;
                  totalAll += subtotal;
                });

                return (
                  <tr key={idx}>
                    <td className="border p-2 whitespace-nowrap w-[200px] max-w-[200px] overflow-hidden text-ellipsis">{row.fullname}</td>
                    {sholatTracked.map((sholat) => (
                      <td key={`subtotal-val-${sholat}`} className="border p-2 text-center capitalize">{subtotals[sholat]}</td>
                    ))}
                    <td className="border p-2 text-center">{totalAll}</td>
                    {dates.map((date) =>
                      sholatTracked.map((sholat) => {
                        const status = row.absen?.[date]?.[sholat] || 'N';
                        return (
                          <td key={`${idx}-${date}-${sholat}`} className="border p-2 text-center">
                            {status === 'Y' ? '✅' : '❌'}
                          </td>
                        );
                      })
                    )}
                  </tr>
                );
              }

              if (filterType === 'mingguan') {
                if (sholatTracked.length > 1) {
                  const subtotals: Record<string, number> = {};
                  let totalAll = 0;

                  sholatTracked.forEach((sholat) => {
                    const subtotal = dates.reduce((acc, date) => {
                      return acc + (row.absen[date]?.[sholat] === 'Y' ? 1 : 0);
                    }, 0);
                    subtotals[sholat] = subtotal;
                    totalAll += subtotal;
                  });

                  return (
                    <tr key={idx}>
                      <td className="border p-2 whitespace-nowrap w-[200px] max-w-[200px] overflow-hidden text-ellipsis">{row.fullname}</td>
                      {sholatTracked.map((sholat) => (
                        <td key={`subtotal-${sholat}`} className="border p-2 text-center capitalize">{subtotals[sholat]}</td>
                      ))}
                      <td className="border p-2 text-center">{totalAll}</td>
                    </tr>
                  );
                } else {
                  let totalAll = 0;
                  return (
                    <tr key={idx}>
                      <td className="border p-2">{row.fullname}</td>
                      <td>
                        {dates.map((date) => {
                          const status = row.absen?.[date]?.[sholatTracked[0]] || 'N';
                          if (status === 'Y') totalAll += 1;
                          return (
                            status === 'Y' ? '✅' : '❌'
                          );
                        })}
                      </td>
                      <td className="border p-2 text-center">{totalAll}</td>
                      {/* {dates.map((date) => {
                        const status = row.absen?.[date]?.[sholatTracked[0]] || 'N';
                        return (
                          <td key={`${idx}-${date}`} className="border p-2 text-center">
                            {status === 'Y' ? '✅' : '❌'}
                          </td>
                        );
                      })} */}
                    </tr>
                  );
                }
              }

              if (filterType === 'harian') {
                return (
                  <tr key={idx}>
                    <td className="border p-2 whitespace-nowrap w-[200px] max-w-[200px] overflow-hidden text-ellipsis">{row.fullname}</td>
                    {sholatTracked.length > 1 ? (
                      sholatTracked.map((sholat) => {
                        const status = row.absen?.[dates[0]]?.[sholat] || 'N';
                        return (
                          <td key={`${idx}-${sholat}`} className="border p-2 text-center">
                            {status === 'Y' ? '✅' : '❌'}
                          </td>
                        );
                      })
                    ) : (
                      <td className="border p-2 text-center">
                        {row.absen?.[dates[0]]?.[sholatTracked[0]] === 'Y' ? '✅' : '❌'}
                      </td>
                    )}
                  </tr>
                );
              }

              return null;
            })}
          </tbody>
        </table>
      </div>


      {/* <div className="overflow-x-auto">
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
      </div> */}

    </div>
  );
}
