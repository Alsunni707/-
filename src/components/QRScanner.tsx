import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QrCode, X, Camera, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button3D } from './Button3D';
import { Html5Qrcode } from 'html5-qrcode';

export const QRScanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerId = "qr-reader";

  const startScanning = async () => {
    setError(null);
    setIsScanning(true);
    setScanResult(null);

    try {
      const html5QrCode = new Html5Qrcode(scannerId);
      scannerRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          setScanResult(`تم تأكيد العملية بنجاح! الرمز: ${decodedText}`);
          stopScanning();
        },
        (errorMessage) => {
          // Silent fail for frame-by-frame errors
          console.log(errorMessage);
        }
      );
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError("تعذر الوصول إلى الكاميرا. يرجى التأكد من منح الإذن.");
      setIsScanning(false);
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      try {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
    setIsScanning(false);
  };

  const reset = async () => {
    await stopScanning();
    setIsOpen(false);
    setScanResult(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current && scannerRef.current.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 left-6 z-40 bg-emerald-600 text-white p-4 rounded-full shadow-2xl border-4 border-white md:bottom-8"
      >
        <QrCode size={28} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 arabic-rtl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={reset}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center space-y-6"
            >
              <button onClick={reset} className="absolute top-4 left-4 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>

              <div className="flex justify-center mb-2">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-emerald-50">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
                    alt="Clinic Logo Small" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">ماسح الكود الطبي</h3>
                <p className="text-slate-500 text-sm">امسح كود الفحص أو الشراء لتأكيد العملية فوراً</p>
              </div>

              <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border-2 border-slate-200 flex items-center justify-center">
                <div id={scannerId} className="w-full h-full"></div>
                
                {!isScanning && !scanResult && !error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-slate-400">
                    <QrCode size={64} className="opacity-20" />
                    <p className="text-xs">اضغط على الزر أدناه لبدء المسح</p>
                  </div>
                )}

                {error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-red-500 p-4">
                    <AlertCircle size={48} />
                    <p className="text-sm font-bold">{error}</p>
                  </div>
                )}

                {scanResult && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-white flex flex-col items-center justify-center gap-4 text-emerald-600 p-4"
                  >
                    <CheckCircle2 size={64} />
                    <p className="font-bold text-center">{scanResult}</p>
                  </motion.div>
                )}
              </div>

              {!scanResult && (
                <Button3D
                  onClick={isScanning ? stopScanning : startScanning}
                  fullWidth
                  size="lg"
                  variant={isScanning ? "secondary" : "emerald"}
                >
                  {isScanning ? 'إيقاف الكاميرا' : 'بدء المسح الآن'}
                </Button3D>
              )}

              {scanResult && (
                <Button3D
                  onClick={reset}
                  fullWidth
                  variant="emerald"
                >
                  إغلاق
                </Button3D>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
