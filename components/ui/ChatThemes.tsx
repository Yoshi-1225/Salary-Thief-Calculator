
import React from 'react';
import { Phone, Video, X, Send, Bold, Paperclip, Smile, Search, MoreHorizontal } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ThemeProps {
  messages: ChatMessage[];
  colleagueName: string;
  timeString: string;
  initial: string;
  firstName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export const TeamsTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, initial, firstName, scrollRef, className 
}) => {
  return (
    <div className={`w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 animate-slide-up font-segoe select-none ${className || ''}`}>
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

export const LineTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, firstName, scrollRef, className 
}) => {
  return (
    <div className={`w-80 bg-[#8daeeb] rounded-xl shadow-2xl overflow-hidden border border-gray-400 animate-slide-up font-sans select-none ${className || ''}`}>
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

export const SlackTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, initial, scrollRef, className 
}) => {
  return (
    <div className={`w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 animate-slide-up font-sans select-none ${className || ''}`}>
       {/* Slack Header */}
       <div className="bg-[#350d36] text-white p-3 flex justify-between items-center">
         <div className="font-bold text-sm tracking-wide"># team-updates</div>
         <div className="opacity-70"><X className="w-4 h-4" /></div>
       </div>

       {/* Slack Body */}
       <div ref={scrollRef} className="h-64 bg-white p-4 flex flex-col gap-1 overflow-y-auto">
        {messages.length > 0 && (
             <div className="flex gap-3 mb-2 animate-message-pop">
                <div className="w-9 h-9 rounded bg-pink-600 flex items-center justify-center text-white font-bold shrink-0 mt-1">{initial}</div>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-baseline">
                        <span className="font-black text-sm text-gray-900">{colleagueName}</span>
                        <span className="text-[10px] text-gray-400">{timeString}</span>
                    </div>
                    {messages.filter(m => !m.isSelf).map((msg, idx) => (
                        <div key={idx} className="text-sm text-gray-800 leading-relaxed mb-0.5">
                            {msg.text}
                        </div>
                    ))}
                </div>
             </div>
        )}
        {messages.filter(m => m.isSelf).map((msg, idx) => (
            <div key={`self-${idx}`} className="flex gap-3 mt-2 animate-message-pop opacity-80">
                <div className="w-9 h-9 rounded bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 mt-1">Me</div>
                <div className="flex flex-col">
                    <div className="flex gap-2 items-baseline">
                        <span className="font-black text-sm text-gray-900">Me</span>
                        <span className="text-[10px] text-gray-400">{timeString}</span>
                    </div>
                    <div className="text-sm text-gray-800 leading-relaxed">
                        {msg.text}
                    </div>
                </div>
            </div>
        ))}
       </div>

       {/* Slack Input */}
       <div className="px-4 pb-4 bg-white">
          <div className="border border-gray-300 rounded-lg p-2">
             <div className="h-8 text-sm text-gray-400">Message #team-updates</div>
             <div className="flex justify-between items-center bg-gray-50 p-1 rounded mt-1">
                <div className="flex gap-2 text-gray-400">
                    <Bold className="w-4 h-4" />
                    <Smile className="w-4 h-4" />
                </div>
                <Send className="w-4 h-4 text-gray-400" />
             </div>
          </div>
       </div>
    </div>
  );
};
