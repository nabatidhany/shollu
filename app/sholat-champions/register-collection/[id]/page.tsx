'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import QRScanner from '../components/QrScanner';

export default function EventDetail() {
  const { id } = useParams();
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = async (text: string) => {
    setScanResult(text);
    try {
      await axios.post('/api/scan', {
        eventId: id,
        qrData: text,
      });
      setMessage('✅ QR berhasil dikirim');
    } catch (err) {
      console.error(err);
      setMessage('❌ Gagal mengirim QR');
    }
  };

  return (
    <div className="p-6 mt-20">
      <h1 className="text-xl font-bold mb-4">Detail Event ID: {id}</h1>

      <QRScanner />

      {scanResult && <p className="mt-4">Hasil: {scanResult}</p>}
      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
}
