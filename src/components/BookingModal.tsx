import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Copy, Check, Upload, Send, Building2, User, Hash, Phone, Users, Calendar as CalendarIcon, QrCode } from 'lucide-react';
import { BANK_DETAILS } from '../constants';
import { Button3D } from './Button3D';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  price: number;
  targetPhone: string;
}

// Sound utility
const playClickSound = () => {
  const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
  audio.play().catch(e => console.log('Audio play blocked:', e));
};

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, title, price, targetPhone }) => {
  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientGender, setPatientGender] = useState<'male' | 'female' | ''>('');
  const [patientAge, setPatientAge] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'number' | 'qr'>('number');

  const handleCopy = () => {
    playClickSound();
    navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    playClickSound();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleConfirm = () => {
    playClickSound();
    
    if (!patientName || !patientGender || !patientAge) {
      alert('يرجى إكمال بيانات المريض (الاسم، النوع، والعمر)');
      return;
    }

    const genderText = patientGender === 'male' ? 'ذكر' : 'أنثى';
    const message = `مرحباً، أود تأكيد الحجز لـ: ${title}
القيمة: ${price} ج.س
بيانات المريض:
- الاسم: ${patientName}
- النوع: ${genderText}
- العمر: ${patientAge} سنة

لقد قمت بتحويل المبلغ إلى حساب بنك الخرطوم.
(يرجى إرفاق صورة الإشعار في المحادثة)`;
    const encodedMsg = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${BANK_DETAILS.paymentPhone.replace('+', '')}?text=${encodedMsg}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleClose = () => {
    playClickSound();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 arabic-rtl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-emerald-50">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-xl shadow-sm border border-emerald-100">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
                    alt="Clinic Logo" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-emerald-900">تأكيد الحجز والدفع</h3>
                  <p className="text-sm text-emerald-600">{title}</p>
                </div>
              </div>
              <button onClick={handleClose} className="p-2 hover:bg-white rounded-full transition-colors text-slate-400">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Patient Details */}
              <div className="space-y-4">
                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                  <User size={18} className="text-emerald-600" />
                  بيانات المريض
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 mr-1">اسم المريض بالكامل</label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="أدخل اسم المريض"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 mr-1">النوع</label>
                      <div className="flex bg-slate-50 border border-slate-200 rounded-xl p-1">
                        <button 
                          onClick={() => { playClickSound(); setPatientGender('male'); }}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${patientGender === 'male' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          ذكر
                        </button>
                        <button 
                          onClick={() => { playClickSound(); setPatientGender('female'); }}
                          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${patientGender === 'female' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                        >
                          أنثى
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 mr-1">العمر</label>
                      <div className="relative">
                        <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                          type="number" 
                          value={patientAge}
                          onChange={(e) => setPatientAge(e.target.value)}
                          placeholder="العمر"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center">
                <span className="text-slate-500">المبلغ المطلوب:</span>
                <span className="text-2xl font-bold text-slate-900">{price} ج.س</span>
              </div>

              {/* Bank Details */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-700 flex items-center gap-2">
                    <Building2 size={18} className="text-emerald-600" />
                    تفاصيل الدفع
                  </h4>
                  <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold">
                    <button 
                      onClick={() => { playClickSound(); setPaymentMethod('number'); }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${paymentMethod === 'number' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      رقم الحساب
                    </button>
                    <button 
                      onClick={() => { playClickSound(); setPaymentMethod('qr'); }}
                      className={`px-3 py-1.5 rounded-lg transition-all ${paymentMethod === 'qr' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      مسح الكود
                    </button>
                  </div>
                </div>

                <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-4 space-y-3">
                  {paymentMethod === 'number' ? (
                    <>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Building2 size={14} />
                          <span>البنك:</span>
                        </div>
                        <span className="font-bold leading-none">{BANK_DETAILS.bankName}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <User size={14} />
                          <span>الاسم:</span>
                        </div>
                        <span className="font-bold leading-none">{BANK_DETAILS.accountName}</span>
                      </div>
                      <div className="flex justify-between items-center bg-white p-2 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Hash size={14} />
                          <span>رقم الحساب:</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-emerald-700">{BANK_DETAILS.accountNumber}</span>
                          <button 
                            onClick={handleCopy}
                            className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-4 py-2">
                      <div className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-sm">
                        <img 
                          src={BANK_DETAILS.qrCodeUrl} 
                          alt="QR Code" 
                          className="w-48 h-48 object-contain"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <p className="text-xs text-slate-500 text-center">
                        امسح الكود باستخدام تطبيق بنكك (بنك الخرطوم) لإتمام عملية الدفع مباشرة
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Section */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                  <Upload size={18} className="text-emerald-600" />
                  إرفاق صورة الإشعار
                </h4>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {file ? (
                      <div className="flex items-center gap-2 text-emerald-600">
                        <Check size={24} />
                        <span className="text-sm font-medium">{file.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-3 text-slate-400" />
                        <p className="text-sm text-slate-500">اضغط لرفع صورة الإشعار</p>
                      </>
                    )}
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>
              </div>

              {/* Action Button */}
              <Button3D
                onClick={handleConfirm}
                fullWidth
                size="lg"
              >
                <Send size={20} />
                تأكيد وإرسال عبر واتساب
              </Button3D>
              
              <p className="text-center text-xs text-slate-400">
                سيتم تحويلك إلى واتساب لإرسال صورة الإشعار وتأكيد الحجز
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
