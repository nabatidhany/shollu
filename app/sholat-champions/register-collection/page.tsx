// app/events/page.tsx
'use client'

import Link from 'next/link';

const dummyEvents = [
  { id: '1', name: 'Event A', date: '2025-06-20' },
  { id: '2', name: 'Event B', date: '2025-06-21' },
];

export default function EventList() {
  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Daftar Event</h1>
      <ul className="space-y-4">
        {dummyEvents.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <p className="text-lg font-semibold">{event.name}</p>
            <p className="text-sm text-gray-500">{event.date}</p>
            <Link
              href={`/sholat-champions/register-collection/${event.id}`}
              className="text-blue-600 underline mt-2 inline-block"
            >
              Lihat & Scan QR
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
