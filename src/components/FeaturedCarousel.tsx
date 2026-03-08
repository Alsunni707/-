import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Star, Calendar, ShoppingBag, Activity } from 'lucide-react';
import { doctors, products, medicalTests } from '../constants';
import { Button3D } from './Button3D';

interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  price?: number;
  type: 'doctor' | 'product' | 'test';
  rating?: number;
}

const featuredItems: CarouselItem[] = [
  {
    id: doctors[0].id,
    title: doctors[0].name,
    subtitle: doctors[0].specialty,
    image: doctors[0].image,
    price: doctors[0].price,
    type: 'doctor',
    rating: doctors[0].rating
  },
  {
    id: medicalTests[0].id,
    title: medicalTests[0].name,
    subtitle: 'فحص مخبري دقيق',
    image: medicalTests[0].image,
    price: medicalTests[0].price,
    type: 'test'
  },
  {
    id: products[0].id,
    title: products[0].name,
    subtitle: products[0].category,
    image: products[0].image,
    price: products[0].price,
    type: 'product'
  },
  {
    id: doctors[1].id,
    title: doctors[1].name,
    subtitle: doctors[1].specialty,
    image: doctors[1].image,
    price: doctors[1].price,
    type: 'doctor',
    rating: doctors[1].rating
  }
];

interface FeaturedCarouselProps {
  onAction: (title: string, price: number, phone: string) => void;
  onNavigate: (section: 'doctors' | 'pharmacy' | 'tests') => void;
}

export const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ onAction, onNavigate }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      scale: 1.1,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      scale: 0.9,
      opacity: 0
    })
  };

  const currentItem = featuredItems[currentIndex];

  const handleAction = () => {
    if (currentItem.type === 'doctor') {
      const doc = doctors.find(d => d.id === currentItem.id);
      if (doc) onAction(doc.name, doc.price, doc.phone);
    } else if (currentItem.type === 'test') {
      const test = medicalTests.find(t => t.id === currentItem.id);
      if (test) onAction(test.name, test.price, '+249111729111');
    } else {
      onNavigate('pharmacy');
    }
  };

  return (
    <div className="relative h-[350px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2rem] shadow-2xl bg-emerald-900">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <div className="relative h-full w-full">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="h-full w-full object-cover opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-900/40 to-transparent" />
            
            <div className="absolute bottom-0 right-0 left-0 p-6 sm:p-10 md:p-16 text-white text-right">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-3 md:space-y-4 max-w-2xl mr-auto"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[10px] md:text-sm font-bold">
                  {currentItem.type === 'doctor' && <Calendar size={12} />}
                  {currentItem.type === 'test' && <Activity size={12} />}
                  {currentItem.type === 'product' && <ShoppingBag size={12} />}
                  {currentItem.type === 'doctor' ? 'طبيب متميز' : currentItem.type === 'test' ? 'فحص مخبري' : 'منتج صيدلاني'}
                </div>
                
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-black leading-tight text-balance">
                  {currentItem.title}
                </h2>
                
                <p className="text-xs sm:text-base md:text-xl text-emerald-50/80 font-medium leading-relaxed text-balance">
                  {currentItem.subtitle}
                </p>

                {currentItem.rating && (
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star size={14} fill="currentColor" className="md:w-4 md:h-4" />
                    <span className="text-xs md:text-lg font-bold">{currentItem.rating}</span>
                  </div>
                )}

                <div className="flex items-center gap-4 md:gap-6 pt-2 md:pt-4">
                  <Button3D
                    onClick={handleAction}
                    size="lg"
                    className="!px-4 sm:!px-6 md:!px-10 !py-2.5 sm:!py-3 md:!py-4 text-xs sm:text-sm md:text-base"
                  >
                    {currentItem.type === 'doctor' ? 'احجز موعداً' : currentItem.type === 'test' ? 'اطلب الفحص' : 'تسوق الآن'}
                  </Button3D>
                  
                  {currentItem.price !== undefined && (
                    <div className="text-right">
                      <p className="text-emerald-300 text-[10px] md:text-sm font-bold">السعر</p>
                      <p className="text-lg sm:text-xl md:text-3xl font-black">{currentItem.price} <span className="text-[10px] md:text-sm font-normal opacity-70">ج.س</span></p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 flex gap-3 sm:gap-4 z-10">
        <button
          onClick={prevSlide}
          className="p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all active:scale-90"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="p-3 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all active:scale-90"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute top-8 left-8 flex items-center gap-4 z-10">
        <div className="flex gap-2">
          {featuredItems.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all rounded-full ${
                i === currentIndex ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>
        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/20">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
            alt="Clinic Logo Watermark" 
            className="w-6 h-6 object-contain opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  );
};
