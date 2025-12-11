import React from 'react';
import { Star } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl transition-opacity pointer-events-none z-[200] flex items-center gap-2 ${message ? 'opacity-100' : 'opacity-0'}`}>
      <Star className="text-yellow-400 w-5 h-5" />
      <span>{message}</span>
    </div>
  );
};

export default Toast;