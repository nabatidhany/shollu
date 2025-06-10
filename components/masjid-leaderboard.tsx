'use client';

import { useEffect, useState } from 'react';
import { User, TowerControl } from 'lucide-react';

export default function LeaderboardMasjid({ date }: any) {
  const [masjidData, setMasjidData] = useState<any[]>([]);

  useEffect(() => {
    fetch(`https://api.shollu.com/api/statistics-rekap-masjid?event_date=${date}`)
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) => b.total_count - a.total_count);
        setMasjidData(sorted);
      });
  }, [date]);

  const topFive = masjidData.slice(0, 5);
  const restMasjid = masjidData.slice(5);

  return (
    <div className="p-0 space-y-6 max-w-5xl mx-auto">
      {/* Leaderboard Section */}
      <section className="bg-blue-600 text-white p-6 rounded-lg border-2 border-yellow-300">
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          🏆 Top 3 Masjid tanggal {date}
        </h2>

        {/* Podium 1–3 */}
        <div className="flex justify-center gap-4 items-end mb-8 flex-wrap sm:flex-nowrap">
          {[0, 1, 2].map((i) => {
            const item = topFive[i];
            if (!item) return null;
            const rank = i + 1;
            const crown = rank === 1;
            const color =
              rank === 1
                ? 'bg-yellow-400'
                : rank === 2
                ? 'bg-gray-400'
                : 'bg-orange-400';
            return (
              <PodiumCard key={i} data={item} rank={rank} color={color} crown={crown} />
            );
          })}
        </div>

        {/* Rank 4–5 List */}
        {/* <div className="bg-white text-gray-800 rounded-lg p-4">
          {topFive.slice(3, 5).map((item, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between border-b py-2 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">#{i + 4}</span>
                <User className="text-gray-500" />
                <span className="truncate max-w-[200px]">{item.masjid_nama}</span>
              </div>
              <span className="text-sm font-medium mt-1 sm:mt-0">
                Total: {item.total_count}
              </span>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
}

function PodiumCard({
  data,
  rank,
  color,
  crown = false,
}: {
  data: any;
  rank: number;
  color: string;
  crown?: boolean;
}) {
  const heights = {
    1: 'h-32',
    2: 'h-28',
    3: 'h-24',
  };

  return (
    <div className="flex flex-col items-center text-center w-24 sm:w-28 mb-6 sm:mb-0">
      {crown && <span className="text-yellow-300 text-lg mb-1">👑</span>}
      {/* <TowerControl className="text-white mb-2 w-10 h-10" /> */}
      <div
        className={`rounded-t-md w-full flex flex-col justify-end items-center py-2 text-white ${color} ${heights[rank as 1 | 2 | 3]}`}
      >
        <span className="font-bold text-lg">#{rank}</span>
      </div>
      <p className="text-xs font-semibold mt-1 max-w-[120px]">{data.masjid_nama}</p>
      <p className="text-xs text-white/70">Total: {data.total_count}</p>
    </div>
  );
}
