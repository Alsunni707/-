import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { getHealthAdvice } from '../services/gemini';
import { Button3D } from './Button3D';

// Sound utility
const playClickSound = () => {
  const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
  audio.play().catch(e => console.log('Audio play blocked:', e));
};

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'مرحباً بك في مساعد صحتي الذكي! كيف يمكنني مساعدتك اليوم؟' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    playClickSound();

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getHealthAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || 'عذراً، حدث خطأ ما.' }]);
    setIsLoading(false);
  };

  const toggleAssistant = () => {
    playClickSound();
    setIsOpen(!isOpen);
  };

  const closeAssistant = () => {
    playClickSound();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 sm:bottom-6 left-4 sm:left-6 z-50 arabic-rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-96 h-[450px] sm:h-[550px] glass rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-emerald-100/50"
          >
            {/* Header */}
            <div className="p-4 bg-emerald-600 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white p-1 rounded-lg shadow-sm">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/822/822143.png" 
                    alt="Clinic Logo" 
                    className="w-6 h-6 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="font-bold">المساعد الذكي</span>
              </div>
              <button onClick={closeAssistant} className="hover:bg-emerald-700 p-1 rounded">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                      : 'bg-white text-slate-800 shadow-sm border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-end">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-emerald-600" />
                    <span className="text-xs text-slate-500">جاري التفكير...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل عن أي شيء صحي..."
                className="flex-1 bg-slate-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <Button3D
                onClick={handleSend}
                className="!p-2 !rounded-full"
                size="sm"
              >
                <Send size={18} />
              </Button3D>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button3D
        onClick={toggleAssistant}
        className="!p-4 !rounded-full"
      >
        <MessageSquare size={24} />
        <span className="font-medium hidden sm:inline">المساعد الذكي</span>
      </Button3D>
    </div>
  );
};
