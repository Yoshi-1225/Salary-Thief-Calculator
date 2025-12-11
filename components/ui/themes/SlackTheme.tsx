import React from 'react';
import { X, Send, Bold, Smile } from 'lucide-react';
import { ChatMessage } from '../../../types';

interface ThemeProps {
  messages: ChatMessage[];
  colleagueName: string;
  timeString: string;
  initial: string;
  firstName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

const SlackTheme: React.FC<ThemeProps> = ({ 
  messages, colleagueName, timeString, initial, scrollRef 
}) => {
  return (
    <div className="absolute bottom-16 right-4 md:right-10 w-80 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-300 animate-slide-up font-sans select-none">
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

export default SlackTheme;