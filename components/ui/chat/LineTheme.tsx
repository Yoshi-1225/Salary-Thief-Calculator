import React from 'react';
import { Phone, Send, Smile, Search, MoreHorizontal } from 'lucide-react';
import { ThemeProps } from './types';

export const LineTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, firstName, scrollRef 
}) => {
  return (
    <div className="absolute bottom-16 right-4 md:right-10 w-80 bg-[#8daeeb] rounded-xl shadow-2xl overflow-hidden border border-gray-400 animate-slide-up font-sans select-none">
      {/* LINE Header */}
      <div className="bg-[#242a38] text-white p-3 flex justify-between items-center opacity-95">
        <div className="flex items-center gap-3">
           <div className="w-4 h-4"><MoreHorizontal /></div>
           <span className="font-bold">{colleagueName}</span>
        </div>
        <div className="flex gap-3">
          <Search className="w-4 h-4" />
          <Phone className="w-4 h-4" />
          <MoreHorizontal className="w-4 h-4 transform rotate-90" />
        </div>
      </div>

      {/* LINE Body */}
      <div ref={scrollRef} className="h-72 bg-[#7293c6] p-3 flex flex-col gap-3 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 items-start animate-message-pop ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
            {!msg.isSelf && (
               <div className="flex flex-col gap-1 items-center shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border border-gray-400 overflow-hidden">
                      <span className="text-xs font-bold text-gray-600">{firstName}</span>
                  </div>
               </div>
            )}
            <div className="flex flex-col gap-1 max-w-[75%]">
               {!msg.isSelf && <span className="text-[10px] text-white pl-1">{colleagueName}</span>}
               <div className={`
                  p-2.5 rounded-2xl text-sm leading-snug shadow-sm relative
                  ${msg.isSelf 
                      ? 'bg-[#85e249] text-black rounded-tr-none' 
                      : 'bg-white text-black rounded-tl-none'}
               `}>
                  {msg.text}
               </div>
            </div>
            <div className={`text-[9px] text-white self-end mb-1 ${msg.isSelf ? 'mr-1' : 'ml-1'}`}>
                {timeString}
            </div>
          </div>
        ))}
      </div>

      {/* LINE Input */}
      <div className="p-2 bg-white flex items-center gap-2">
         <div className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><MoreHorizontal className="w-5 h-5 text-gray-500" /></div>
         <div className="flex-grow bg-[#f0f0f0] rounded-full px-3 py-1.5 text-sm text-gray-600">Aa</div>
         <div className="p-1.5 hover:bg-gray-100 rounded cursor-pointer"><Smile className="w-5 h-5 text-gray-500" /></div>
         <Send className="w-5 h-5 text-[#5b5fc7] cursor-pointer" />
      </div>
    </div>
  );
};