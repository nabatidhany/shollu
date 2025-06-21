"use client";
import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { CircleCheck, CircleX } from "lucide-react";

export default function EventView({ masjidId }: { masjidId: string | number }) {
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [collectionMeta, setCollectionMeta] = useState<any>(null);
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [sholatTracked, setSholatTracked] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<'harian' | 'mingguan' | 'collection'>("collection");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAllMasjid, setShowAllMasjid] = useState(false);
  const [sortType, setSortType] = useState<'point' | 'abjad'>('point');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://api.shollu.com/api/v1/collections/category-collection")
      .then(res => res.json())
      .then(data => setCategories(data?.categories || []));
  }, []);

  useEffect(() => {
    if (!collectionMeta || !selectedCollection) return;

    let fromDate = "", toDate = "";
    const today = new Date();

    if (filterType === "harian") {
      fromDate = toDate = format(selectedDate, "yyyy-MM-dd");
    } else if (filterType === "mingguan") {
      fromDate = format(subDays(today, 6), "yyyy-MM-dd");
      toDate = format(today, "yyyy-MM-dd");
    } else {
      fromDate = format(new Date(collectionMeta.date_start), "yyyy-MM-dd");
      toDate = format(new Date(collectionMeta.date_end), "yyyy-MM-dd");
    }

    setLoading(true);
    fetch(`https://api.shollu.com/api/v1/collections-absensi/${selectedCollection}?date_from=${fromDate}&date_to=${toDate}`)
      .then(res => res.json())
      .then(data => {
				const enrichedData = (data.data || []).map(row => {
					let subtotal = { subuh: 0, dzuhur: 0, ashar: 0, maghrib: 0, isya: 0 };
					let total = 0;
					let point = 0;

					(data.dates || []).forEach(date => {
						let dailyPoint = 0;
						["subuh", "dzuhur", "ashar", "maghrib", "isya"].forEach(sholat => {
							const absenSholat = row.absen?.[date]?.[sholat];
							if (absenSholat?.status === "Y") {
								subtotal[sholat]++;
								total++;
								if (["subuh", "maghrib", "isya"].includes(sholat)) {
									dailyPoint++;
								}
							}
						});
						point += dailyPoint;
					});

					return {
						...row,
						subuh_count: subtotal.subuh,
						dzuhur_count: subtotal.dzuhur,
						ashar_count: subtotal.ashar,
						maghrib_count: subtotal.maghrib,
						isya_count: subtotal.isya,
						total_count: total,
						point_count: point
					};
				});
        setCollectionData(enrichedData);
        setDates(data.dates || []);
        setSholatTracked(data.sholat_tracked || []);
      })
      .finally(() => setLoading(false));
  }, [collectionMeta, filterType, selectedDate, selectedCollection]);

  // Sort data
  const sortedData = [...collectionData].sort((a, b) => {
		if (sortType === "point") {
			return b.point_count - a.point_count;
		}
		return a.fullname.localeCompare(b.fullname);
	});

  return (
    <div className="mt-0">
      <div className="grid grid-cols-3 gap-2 mb-4">
        {categories?.map((cat) => (
          <button
            key={cat.id}
            className={`w-full border border-green-700 text-green-700 py-2 rounded hover:bg-green-500 hover:text-white ${
              selectedCategory === cat.id ? "bg-green-700 text-white" : ""
            }`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSelectedCollection(null);
              setCollectionMeta(null);
              setCollectionData([]);
              setDates([]);
              setSholatTracked([]);
              fetch(`https://api.shollu.com/api/v1/collections/collection-category?id_category=${cat.id}&id_masjid=${masjidId}`)
                .then(res => res.json())
                .then(data => setCollections(data.collections || []));
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {collections?.length > 0 ? (
				<>
					<p className="text-sm text-gray-500 mb-2">Pilih Event untuk kategori {categories.find(cat => cat.id === selectedCategory)?.name} dari masjid ini</p>
					<select
						className="w-full border rounded p-2 mb-4 text-sm"
						value={selectedCollection || ""}
						onChange={(e) => {
							const val = e.target.value;
							setSelectedCollection(val);
							setFilterType("collection");
							fetch(`https://api.shollu.com/api/v1/collections-get-meta/${val}`)
								.then(res => res.json())
								.then(data => setCollectionMeta(data.collections || null));
						}}
					>
						<option value="">Pilih Event</option>
						{collections.map((col) => (
							<option key={col.slug} value={col.slug}>{col.name}</option>
						))}
					</select>
				</>
      ) : (
				<p className="text-center text-gray-500">Belum ada data</p>)}

      {collectionMeta && (
        <>
          <hr className="pb-2" />
          <p><strong>Nama Koleksi:</strong> {collectionMeta.name}</p>
					<p><strong>Periode:</strong> {format(new Date(collectionMeta.date_start), 'dd MMM yyyy')} - {format(new Date(collectionMeta.date_end), 'dd MMM yyyy')}</p>
					<hr className="mb-4 mt-2" />
					<div className="flex gap-2 mb-2">
						<button
							className={`border p-1 px-2 rounded-xl text-xs ${sortType === "point" ? "bg-yellow-600 text-white" : ""}`}
							onClick={() => setSortType("point")}
						>
							Urut Point Terbanyak
						</button>
						<button
							className={`border p-1 px-2 rounded-xl text-xs ${sortType === "abjad" ? "bg-yellow-600 text-white" : ""}`}
							onClick={() => setSortType("abjad")}
						>
							Urut Abjad
						</button>
					</div>
					<p className="italic text-xs mb-2">*note: Total Point dijumlahkan dari : Subuh = 1, Magrib = 1, Isya = 1</p>
          {loading ? (
						<p className="text-center text-gray-500">Loading data...</p>
          ) : collectionData.length === 0 ? (
						<p className="text-center text-gray-500">Tidak ada data absensi</p>
          ) : (
						<div className="overflow-x-auto">
              <table className="table-auto border-collapse w-full border text-xs">
                <thead>
									<tr>
										<th className="border p-2 sticky left-0 bg-white">Nama</th>
										<th className="border p-2">Sub</th>
										<th className="border p-2">Dzu</th>
										<th className="border p-2">Ash</th>
										<th className="border p-2">Mag</th>
										<th className="border p-2">Isy</th>
										<th className="border p-2">Total</th>
										<th className="border p-2">Poin</th>
										{dates.map(date => (
											<th key={date} className="border p-2 text-center" colSpan={5}>{date}</th>
										))}
									</tr>
									<tr>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										<th></th>
										{dates.map(date => (
											<>
												<th className="border p-2">S</th>
												<th className="border p-2">D</th>
												<th className="border p-2">A</th>
												<th className="border p-2">M</th>
												<th className="border p-2">I</th>
											</>
										))}
									</tr>
								</thead>

                <tbody>
                  {sortedData.map((row, idx) => {
                    let subtotal: any = { subuh: 0, dzuhur: 0, ashar: 0, maghrib: 0, isya: 0 };
										let total = 0;
										let point = 0;

										dates.forEach(date => {
											let dailyPoint = 0;

											["subuh", "dzuhur", "ashar", "maghrib", "isya"].forEach(sholat => {
												const absenSholat = row.absen?.[date]?.[sholat];
												if (absenSholat?.status === "Y") {
													subtotal[sholat]++;
													total++;

													if (["subuh", "maghrib", "isya"].includes(sholat)) {
														dailyPoint++;
													}
												}
											});

											point += dailyPoint;
										});

                    return (
                      <tr key={idx}>
                        <td className="border p-2 sticky left-0 bg-white">{row.fullname}</td>
                        <td className="border p-2 text-center">{row.subuh_count}</td>
												<td className="border p-2 text-center">{row.dzuhur_count}</td>
												<td className="border p-2 text-center">{row.ashar_count}</td>
												<td className="border p-2 text-center">{row.maghrib_count}</td>
												<td className="border p-2 text-center">{row.isya_count}</td>
												<td className="border p-2 text-center">{row.total_count}</td>
												<td className="border p-2 text-center">{row.point_count}</td>

                        {dates.map(date => (
                          <>
                            {["subuh", "dzuhur", "ashar", "maghrib", "isya"].map(sholat => {
                              const absenSholat = row.absen?.[date]?.[sholat];
                              return (
                                <td key={`${date}-${sholat}`} className="border p-2 text-center">
                                  {absenSholat?.status === "Y" ? <CircleCheck color="green" size={20} /> : <CircleX color="red" size={20} />}
                                </td>
                              );
                            })}
                          </>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
								<tfoot>
									<tr className="font-bold">
										<td className="border p-2 sticky left-0 bg-white">TOTAL</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.subuh_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.dzuhur_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.ashar_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.maghrib_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.isya_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.total_count || 0), 0)}</td>
										<td className="border p-2 text-center">{collectionData.reduce((sum, row) => sum + (row.point_count || 0), 0)}</td>
										
										{dates.map(date => (
											<>
												{["subuh", "dzuhur", "ashar", "maghrib", "isya"].map(sholat => {
													const totalPerSholat = collectionData.reduce((sum, row) => {
														return sum + (row.absen?.[date]?.[sholat]?.status === "Y" ? 1 : 0);
													}, 0);
													return (
														<td key={`total-${date}-${sholat}`} className="border p-2 text-center">{totalPerSholat}</td>
													);
												})}
											</>
										))}
									</tr>
								</tfoot>

              </table>
            </div>
          )}

          {/* Collection meta info as before */}
          <div className="border p-4 rounded bg-gray-50 mt-4">
            <p><strong>Masjid Peserta:</strong></p>
            <ul className="ml-4 list-disc">
              {collectionMeta.masjid_names.slice(0, 5).map((name: string, idx: number) => (
                <li key={idx}>{name}</li>
              ))}
              {collectionMeta.masjid_names.length > 5 && (
                <li className="text-blue-600 cursor-pointer" onClick={() => setShowAllMasjid(!showAllMasjid)}>
                  dan {collectionMeta.masjid_names.length - 5} masjid lainnya
                </li>
              )}
            </ul>
            {showAllMasjid && (
              <ul className="ml-6 mt-2 list-disc">
                {collectionMeta.masjid_names.slice(5).map((name: string, idx: number) => (
                  <li key={`more-${idx}`}>{name}</li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}
