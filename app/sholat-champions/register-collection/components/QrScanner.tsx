'use client';

import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useRef, useState } from 'react';

export default function QRScanner() {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const hasScannedRef = useRef(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!scannerRef.current && !hasScannedRef.current) {
      const scanner = new Html5QrcodeScanner(
        'reader',
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        false
      );

      scanner.render(
        (decodedText, decodedResult) => {
          if (!hasScannedRef.current) {
            hasScannedRef.current = true;
            setResult(decodedText);
            scanner.clear().catch((err) => console.error('Stop error:', err));
          }
        },
        (errorMessage) => {
          // Optional: handle scan failure
        }
      );

      scannerRef.current = scanner;
    }

    return () => {
      scannerRef.current?.clear().catch((e) => console.error(e));
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div id="reader" style={{ width: 300, height: 300 }} />
      {result && (
        <div className="mt-4 text-green-600 font-bold">
          ✅ Scanned Result: {result}
        </div>
      )}
    </div>
  );
}
