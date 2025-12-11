import React from 'react';
import { Phone, Video, X, Send, Bold, Paperclip, Smile } from 'lucide-react';
import { ChatMessage } from '../../../types';

interface ThemeProps {
  messages: ChatMessage[];
  colleagueName: string;
  timeString: string;
  initial: string;
  firstName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const TeamsTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, initial, firstName, scrollRef 
}) => {
  return (
    <div className="absolute bottom-16 right-4 md:right-10 w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 animate-slide-up font-segoe select-none">
      {/* Teams Header */}
      <div className="bg-[#5b5fc7] text-white p-3 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-[#5b5fc7] font-bold">{initial}</div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-[#5b5fc7] rounded-full"></span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm">{colleagueName}</span>
            <span className="text-[10px] opacity-80">正在線上 - 忙碌</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Phone className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded p-0.5" />
          <Video className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded p-0.5" />
          <X className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded p-0.5" />
        </div>
      </div>

      {/* Teams Body */}
      <div ref={scrollRef} className="h-64 bg-[#f5f5f5] p-4 flex flex-col gap-3 overflow-y-auto">
        <div className="text-center text-[10px] text-gray-500 my-2">今天 上午 {timeString}</div>
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-2 items-start animate-message-pop ${msg.isSelf ? 'flex-row-reverse' : ''}`}>
            {!msg.isSelf && (
              <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center text-[#5b5fc7] font-bold text-xs shrink-0">{initial}</div>
            )}
            <div className={`${msg.isSelf ? 'bg-[#e8ebfa] border-transparent' : 'bg-white border-gray-200'} p-2 rounded-md shadow-sm text-sm text-gray-800 border max-w-[80%] leading-snug`}>
              <div className="text-[10px] font-bold mb-0.5 opacity-70">{msg.isSelf ? '我' : firstName}</div>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Teams Input */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex gap-2 items-center bg-white mb-2">
          <div className="flex-grow bg-white border-b-2 border-[#5b5fc7] px-1 py-2 text-xs text-gray-800">正在輸入訊息...</div>
          <Send className="w-5 h-5 text-[#5b5fc7]" />
        </div>
        <div className="flex gap-4 text-gray-500 px-1">
          <Bold className="w-4 h-4" />
          <Paperclip className="w-4 h-4" />
          <Smile className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default TeamsTheme;