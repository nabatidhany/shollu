'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Scanner } from '@yudiel/react-qr-scanner';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';

export default function EventDetail() {
  const { id } = useParams();
  const [scanResult, setScanResult] = useState('');
  const [meta, setMeta] = useState<any | null>(null);
  const [showAllMasjid, setShowAllMasjid] = useState(false);
  const [scannerKey, setScannerKey] = useState(Date.now());

  // Audio refs
  const successAudioRef = useRef<HTMLAudioElement>(null);
  const errorAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchMeta = async () => {
      const res = await fetch(`https://api.shollu.com/api/v1/collections-get-meta/${id}`);
      const json = await res.json();
      setMeta(json?.collections);
    };
    fetchMeta();
  }, [id]);

  const handleScan = async (qrValue: string) => {
    if (!qrValue) return;

    setScanResult(qrValue);

    try {
      await axios.post('https://api.shollu.com/api/v1/collections/add-peserta', {
        collection_id: Number(meta.id),
        peserta_ids: qrValue,
      });

      // ✅ Success
      successAudioRef.current?.play();
      alert(`✅ Berhasil menambahkan peserta: ${qrValue}`);
    } catch (err: any) {
      console.error(err);
      // ❌ Error
      errorAudioRef.current?.play();
      const msg = err.response?.data?.error || 'Terjadi kesalahan saat mengirim QR';
      alert(`❌ ${msg}`);
    }

    // Reset scanner untuk scan berikutnya
    setTimeout(() => {
      setScanResult('');
      setScannerKey(Date.now());
    }, 500); // jeda singkat supaya scanner stabil
  };

  return (
    <div className="p-6 mt-20">
      {/* Scanner */}
      <Scanner key={scannerKey} onScan={(result) => handleScan(result && result[0]?.rawValue)} />

      {/* Audio Elements */}
      <audio ref={successAudioRef} src="/sound/success.wav" />
      <audio ref={errorAudioRef} src="/sound/error.wav" />

      {/* Meta Info */}
      {meta && (
        <div className="mb-4 border p-4 rounded bg-gray-50">
          <p><strong>Nama Koleksi:</strong> {meta.name}</p>
          <p><strong>Masjid Peserta:</strong></p>
          <ul className="ml-2">
            {meta.masjid_names.slice(0, 5).map((name: string, i: number) => (
              <li key={i}>- {name}</li>
            ))}
            {meta.masjid_names.length > 5 && (
              <>
                <li
                  className="text-blue-600 cursor-pointer underline inline-block"
                  onClick={() => setShowAllMasjid(!showAllMasjid)}
                  title={typeof window !== 'undefined' && window.innerWidth > 768 
                          ? meta.masjid_names.slice(5).join(', ') 
                          : ''}
                >
                  dan {meta.masjid_names.length - 5} masjid lainnya
                </li>
                {showAllMasjid && (
                  <ul className="mt-2 ml-4 text-sm text-gray-700">
                    {meta.masjid_names.slice(5).map((name: string, i: number) => (
                      <li key={`more-${i}`}>- {name}</li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </ul>
          <p>
            <strong>Periode:</strong>{' '}
            {format(new Date(meta.date_start), 'dd MMMM yyyy', { locale: localeId })} s/d{' '}
            {format(new Date(meta.date_end), 'dd MMMM yyyy', { locale: localeId })}
          </p>
        </div>
      )}
    </div>
  );
}
