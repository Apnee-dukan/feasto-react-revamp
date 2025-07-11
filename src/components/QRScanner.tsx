import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const scanner = new Html5Qrcode("qr-reader");
    scannerRef.current = scanner;

    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText) => {
        if (scannerRef.current && isRunning) {
          scannerRef.current.stop().then(() => {
            setIsRunning(false);
            onScan(decodedText);
          }).catch(console.warn);
        }
      },
      (err) => {
        console.error("Scan error:", err);
      }
    ).then(() => {
      setIsRunning(true);
    }).catch((err) => {
      console.error("Failed to start scanner", err);
    });

    return () => {
      if (scannerRef.current && isRunning) {
        scannerRef.current.stop()
          .then(() => {
            scannerRef.current?.clear();
            setIsRunning(false);
          })
          .catch(() => {
            // silently fail if already stopped
          });
      }
    };
  }, [onScan, isRunning]);

  return (
    <div className="relative mt-4">
      <div
        id="qr-reader"
        className="w-full rounded-lg overflow-hidden border border-gray-300"
        style={{ height: '300px' }}
      />
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-sm text-red-600 bg-white px-2 py-1 rounded shadow"
      >
        ✖ Close
      </button>
    </div>
  );
};

export default QRScanner;
