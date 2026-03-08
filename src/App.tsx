import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Stethoscope, 
  Pill, 
  TestTube, 
  Calendar, 
  ShoppingBag, 
  Activity, 
  Search, 
  Menu, 
  X,
  Star,
  Clock,
  ChevronRight,
  Heart,
  Bell,
  Check
} from 'lucide-react';
import { doctors, products, medicalTests, BANK_DETAILS } from './constants';
import { AIAssistant } from './components/AIAssistant';
import { BookingModal } from './components/BookingModal';
import { FeaturedCarousel } from './components/FeaturedCarousel';
import { Button3D } from './components/Button3D';
import { QRScanner } from './components/QRScanner';

// Sound utility
const playClickSound = () => {
  const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
  audio.play().catch(e => console.log('Audio play blocked:', e));
};

type Section = 'home' | 'doctors' | 'pharmacy' | 'tests';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({ title: '', price: 0, phone: '' });

  const handleBooking = (title: string, price: number, phone: string) => {
    playClickSound();
    setBookingData({ title, price, phone });
    setIsBookingModalOpen(true);
  };

  const navigateTo = (section: Section) => {
    playClickSound();
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  const renderHome = () => (
    <div className="space-y-12">
      {/* Welcome Message Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-50 text-center space-y-6"
      >
        <div className="inline-flex p-1 bg-white rounded-2xl shadow-xl border border-emerald-50 mb-2 group-hover:scale-110 transition-transform">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
            alt="Clinic Logo Large" 
            className="w-16 h-16 md:w-20 md:h-20 object-contain"
            referrerPolicy="no-referrer"
          />
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight text-balance">
          مرحباً بكم في <span className="text-emerald-600">مركز أُم علي الطبي</span>
        </h2>
        <p className="text-lg md:text-2xl font-medium text-slate-600 leading-relaxed max-w-3xl mx-auto text-balance">
          نتشرف بزيارتكم لنا ونرجوا أن نقدم لكم أفضل الرعاية الصحية والخدمات الطبية، فاعافيتكم هي ما نسعى إليه دائماً.
        </p>
        <div className="pt-8 border-t border-slate-100 relative flex flex-col md:flex-row items-center gap-6 justify-center">
          <div className="relative group">
            <img 
              src={doctors[1].image} 
              alt={doctors[1].name} 
              className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-emerald-100 shadow-xl transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1.5 rounded-full border-2 border-white"
            >
              <Check size={12} strokeWidth={4} />
            </motion.div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-slate-500 text-sm mb-1">تحت إشراف المدير الإداري للمركز:</p>
            <p className="text-lg md:text-xl font-bold text-emerald-800">{doctors[1].name}</p>
            <p className="text-sm text-emerald-600 font-medium italic leading-relaxed">{doctors[1].specialty}</p>
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-12 -right-4 text-emerald-200 opacity-30 hidden lg:block"
          >
            <Stethoscope size={64} />
          </motion.div>
          <motion.div 
            animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -bottom-4 -left-8 text-emerald-200 opacity-30 hidden lg:block"
          >
            <Pill size={48} />
          </motion.div>
        </div>
      </motion.div>

      {/* Featured Carousel Section */}
      <div className="px-1 md:px-0">
        <FeaturedCarousel 
          onAction={handleBooking} 
          onNavigate={navigateTo} 
        />
      </div>

      {/* Quick Services */}
      <section className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {[
          { id: 'doctors', title: 'حجز الأطباء', icon: Stethoscope, color: 'bg-blue-500', shadow: 'shadow-blue-100', desc: 'أطباء متخصصون' },
          { id: 'pharmacy', title: 'الصيدلية', icon: Pill, color: 'bg-emerald-500', shadow: 'shadow-emerald-100', desc: 'توصيل سريع' },
          { id: 'tests', title: 'الفحوصات', icon: TestTube, color: 'bg-purple-500', shadow: 'shadow-purple-100', desc: 'نتائج دقيقة' },
        ].map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ 
              y: -8, 
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            onClick={() => navigateTo(service.id as Section)}
            className={`p-4 md:p-6 bg-white rounded-3xl shadow-xl ${service.shadow} border border-slate-100 cursor-pointer flex flex-col md:flex-row items-center md:items-start text-center md:text-right gap-3 md:gap-4 group transition-all ${idx === 2 ? 'col-span-2 md:col-span-1' : ''}`}
          >
            <div className={`${service.color} p-3 md:p-4 rounded-2xl text-white group-hover:rotate-12 transition-transform shadow-lg`}>
              <service.icon size={28} className="md:w-8 md:h-8" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-xl text-slate-900">{service.title}</h3>
              <p className="text-slate-500 text-xs md:text-sm hidden sm:block">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Doctors */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold">أطباء متميزون</h2>
          <button onClick={() => setActiveSection('doctors')} className="text-emerald-600 font-medium flex items-center gap-1">
            عرض الكل <ChevronRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {doctors.map((doc, idx) => (
            <motion.div 
              key={doc.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ 
                y: -10, 
                scale: 1.02,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              }}
              className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4 cursor-pointer"
            >
              <img src={doc.image} alt={doc.name} className="w-full h-48 object-cover rounded-xl" referrerPolicy="no-referrer" />
              <div>
                <h3 className="font-bold text-lg">{doc.name}</h3>
                <p className="text-emerald-600 text-sm">{doc.specialty}</p>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={16} fill="currentColor" />
                  <span className="text-slate-700 font-medium">{doc.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 font-bold">{doc.price} ج.س</span>
                  <Button3D 
                    onClick={() => handleBooking(doc.name, doc.price, doc.phone)}
                    size="sm"
                    className="!p-3"
                  >
                    <Calendar size={20} />
                  </Button3D>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderDoctors = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">احجز موعدك</h2>
        <div className="relative w-full md:w-96">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="ابحث عن طبيب أو تخصص..." 
            className="w-full bg-white border border-slate-200 rounded-2xl py-4 pr-12 pl-4 shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {doctors.map((doc, idx) => (
          <motion.div 
            key={doc.id} 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer flex flex-col"
          >
            <div className="relative h-56 md:h-64">
              <img src={doc.image} alt={doc.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <button className="absolute top-4 left-4 p-2.5 bg-white/90 backdrop-blur-md rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-lg active:scale-90">
                <Heart size={20} />
              </button>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-bold text-xl text-slate-900 group-hover:text-emerald-700 transition-colors">{doc.name}</h3>
                <p className="text-emerald-600 font-bold text-sm">{doc.specialty}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1.5 bg-yellow-50 px-2 py-1 rounded-lg">
                  <Star size={16} className="text-yellow-500" fill="currentColor" />
                  <span className="font-bold text-yellow-700">{doc.rating}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg">
                  <Clock size={16} className="text-slate-400" />
                  <span className="font-medium">متاح: {doc.availability[0]}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase">سعر الكشف</span>
                  <span className="text-2xl font-black text-slate-900">{doc.price} <span className="text-xs font-normal text-slate-500">ج.س</span></span>
                </div>
                <Button3D 
                  onClick={() => handleBooking(doc.name, doc.price, doc.phone)}
                >
                  احجز الآن
                </Button3D>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderPharmacy = () => (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">الصيدلية الإلكترونية</h2>
        <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-4 no-scrollbar">
          {['الكل', 'أدوية', 'مضادات حيوية', 'فيتامينات', 'مستلزمات', 'مسكنات', 'محاليل'].map((cat) => (
            <button key={cat} className="whitespace-nowrap px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 font-medium hover:bg-emerald-50 hover:border-emerald-200 hover:text-emerald-700 transition-all shadow-sm active:scale-95">
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {products.map((prod, idx) => (
          <motion.div 
            key={prod.id} 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            whileHover={{ 
              y: -10, 
              scale: 1.03,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)"
            }}
            className="bg-white p-3 md:p-5 rounded-3xl shadow-sm border border-slate-100 flex flex-col cursor-pointer group"
          >
            <div className="relative overflow-hidden rounded-2xl mb-4">
              <img src={prod.image} alt={prod.name} className="w-full h-32 md:h-48 object-cover transition-transform group-hover:scale-110 duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2">
                <span className="text-[8px] md:text-[10px] font-mono text-white bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded uppercase tracking-tighter">ID: {prod.id}</span>
              </div>
            </div>
            <div className="flex-1 space-y-1.5 md:space-y-2">
              <span className="text-[10px] md:text-xs font-black text-emerald-600 uppercase tracking-wider">{prod.category}</span>
              <h3 className="font-bold text-sm md:text-lg text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">{prod.name}</h3>
              <p className="text-slate-500 text-[10px] md:text-sm line-clamp-2 leading-relaxed">{prod.description}</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black text-slate-900">{prod.price} <span className="text-[10px] md:text-xs font-normal text-slate-400">ج.س</span></span>
              </div>
              <Button3D 
                size="sm" 
                className="!p-2 md:!p-2.5"
                onClick={() => handleBooking(prod.name, prod.price, BANK_DETAILS.paymentPhone)}
              >
                <ShoppingBag size={18} className="md:w-5 md:h-5" />
              </Button3D>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderTests = () => (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">الفحوصات الطبية</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {medicalTests.map((test, idx) => (
          <motion.div 
            key={test.id} 
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            whileHover={{ 
              y: -8, 
              scale: 1.01,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
            }}
            className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row cursor-pointer group"
          >
            <div className="sm:w-56 h-56 sm:h-auto relative overflow-hidden">
              <img 
                src={test.image} 
                alt={test.name} 
                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3">
                <span className="text-[10px] font-mono text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-lg uppercase tracking-wider">ID: {test.id}</span>
              </div>
            </div>
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-purple-600">
                  <div className="p-2 bg-purple-50 rounded-xl">
                    <Activity size={24} />
                  </div>
                  <h3 className="font-bold text-xl md:text-2xl text-slate-900 group-hover:text-purple-700 transition-colors">{test.name}</h3>
                </div>
                <p className="text-slate-500 text-sm md:text-base leading-relaxed line-clamp-2">{test.description}</p>
                <div className="flex items-center gap-4 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl"><Clock size={16} /> {test.duration}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">التكلفة</span>
                  <div className="text-2xl md:text-3xl font-black text-slate-900">{test.price} <span className="text-sm font-normal text-slate-500">ج.س</span></div>
                </div>
                <Button3D 
                  variant="purple"
                  onClick={() => handleBooking(test.name, test.price, BANK_DETAILS.paymentPhone)}
                  className="whitespace-nowrap !px-8"
                >
                  طلب الفحص
                </Button3D>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 arabic-rtl pb-20" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass border-b border-slate-200/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-4 md:gap-8">
              <div 
                onClick={() => navigateTo('home')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="bg-white p-1 rounded-xl shadow-md group-hover:scale-110 transition-transform border border-emerald-50">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
                    alt="Clinic Logo" 
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">أُم علي الطبي</span>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em] mr-0.5">الرعاية المتكاملة</span>
                </div>
              </div>
              
              <div className="hidden lg:flex items-center gap-8">
                {[
                  { id: 'home', label: 'الرئيسية' },
                  { id: 'doctors', label: 'الأطباء' },
                  { id: 'pharmacy', label: 'الصيدلية' },
                  { id: 'tests', label: 'الفحوصات' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id as Section)}
                    className={`font-bold text-sm transition-all relative py-2 ${
                      activeSection === item.id 
                        ? 'text-emerald-600' 
                        : 'text-slate-500 hover:text-emerald-500'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all relative">
                <Bell size={22} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="hidden md:flex items-center gap-3 pr-4 border-r border-slate-200">
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">خالد السني</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">الملف الشخصي</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-inner">
                  خ
                </div>
              </div>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="p-4 space-y-4">
                {[
                  { id: 'home', label: 'الرئيسية' },
                  { id: 'doctors', label: 'الأطباء' },
                  { id: 'pharmacy', label: 'الصيدلية' },
                  { id: 'tests', label: 'الفحوصات' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id as Section);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-right p-3 rounded-xl hover:bg-emerald-50 text-slate-600 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ 
              x: [0, 50, 0],
              y: [0, 30, 0],
              rotate: [0, 45, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 text-emerald-100/30"
          >
            <Heart size={120} />
          </motion.div>
          <motion.div 
            animate={{ 
              x: [0, -40, 0],
              y: [0, 60, 0],
              rotate: [0, -30, 0]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-40 right-20 text-blue-100/30"
          >
            <Activity size={100} />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection === 'home' && renderHome()}
            {activeSection === 'doctors' && renderDoctors()}
            {activeSection === 'pharmacy' && renderPharmacy()}
            {activeSection === 'tests' && renderTests()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* AI Assistant */}
      <AIAssistant />

      {/* QR Scanner */}
      <QRScanner />

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title={bookingData.title}
        price={bookingData.price}
        targetPhone={bookingData.phone}
      />

      {/* Footer (Simplified for Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white/80 backdrop-blur-xl border-t border-slate-200 flex justify-around p-2 pb-6 z-40 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
        {[
          { id: 'home', icon: Activity, label: 'الرئيسية' },
          { id: 'doctors', icon: Stethoscope, label: 'الأطباء' },
          { id: 'pharmacy', icon: Pill, label: 'الصيدلية' },
          { id: 'tests', icon: TestTube, label: 'الفحوصات' },
        ].map((item) => (
          <motion.button
            key={item.id}
            onClick={() => navigateTo(item.id as Section)}
            whileTap={{ scale: 0.9 }}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
              activeSection === item.id 
                ? 'text-emerald-600 bg-emerald-50 shadow-inner' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon size={22} strokeWidth={activeSection === item.id ? 2.5 : 2} />
            <span className={`text-[10px] font-black transition-all ${activeSection === item.id ? 'opacity-100 scale-110' : 'opacity-70'}`}>
              {item.label}
            </span>
            {activeSection === item.id && (
              <motion.div 
                layoutId="bottom-nav-dot"
                className="w-1 h-1 bg-emerald-500 rounded-full mt-0.5"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
