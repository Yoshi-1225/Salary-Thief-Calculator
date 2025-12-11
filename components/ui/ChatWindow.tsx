import React, { useEffect, useState, useRef } from 'react';
import { Phone, Video, X, Send, Bold, Paperclip, Smile, Search, Bell, MoreHorizontal } from 'lucide-react';
import { playSound } from '../../utils/audio.ts';
import { JobType, MessengerType } from '../../types.ts';

interface Message {
  text: string;
  isSelf: boolean;
}

interface ChatWindowProps {
  messenger: MessengerType;
  jobTitle: JobType;
}

const COLLEAGUE_NAMES = [
  "Alex Chen", "Sarah Wu", "David Lin", "Jessica Wang", 
  "Kevin Liu", "Emily Chang", "Michael Huang", "Rachel Lee"
];

const JOB_SCRIPTS: Record<JobType, string[]> = {
  engineer: [
    "哥",
    "剛剛客戶回報那個問題炸了",
    "Log 噴一堆 error 500",
    "主管請你現在過去會議室一下",
    "很急，大家都在等你",
    "不用帶電腦，現場有投影",
    "快來，拜託了"
  ],
  designer: [
    "欸欸",
    "業務說客戶不喜歡那個藍色",
    "說要再『大器』一點",
    "還有Logo要放大 200%",
    "但不能佔太多空間 (?)",
    "老闆叫我們現在進去改圖",
    "你在位子上嗎？"
  ],
  pm: [
    "在嗎？",
    "客戶剛剛突然改需求了",
    "下週就要上線的功能要大改",
    "老闆問時程能不能不變",
    "會議室集合，緊急討論",
    "帶著你的筆記本過來",
    "快點，氣氛不太好"
  ],
  sales: [
    "前輩",
    "大客戶說合約有問題",
    "他們法務現在線上要對條款",
    "老闆問你業績目標進度",
    "說怎麼還沒看到入帳",
    "快進來會議室救火",
    "這單掉了我們都完蛋"
  ],
  admin: [
    "哈囉",
    "老闆在問那個報銷單的事",
    "會計說金額對不上",
    "還有下週活動的便當沒訂？",
    "老闆臉色很難看",
    "叫你現在拿單據進去解釋",
    "趕快過來吧"
  ]
};

const ChatWindow: React.FC<ChatWindowProps> = ({ messenger, jobTitle }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [colleagueName, setColleagueName] = useState("Alex Chen");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pick a random colleague name when component mounts
    const randomName = COLLEAGUE_NAMES[Math.floor(Math.random() * COLLEAGUE_NAMES.length)];
    setColleagueName(randomName);

    setMessages([]);

    const script = JOB_SCRIPTS[jobTitle];
    const fullConversation: Message[] = [
        ...script.map(text => ({ text, isSelf: false })),
        { text: "好!!我馬上過去", isSelf: true }
    ];

    // Immediately set the full conversation without delay
    setMessages(fullConversation);
    
    // Optional: Play a notification sound once when the window opens
    playSound('notification');

  }, [jobTitle]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const currentTime = new Date();
  const timeString = `${currentTime.getHours()}:${String(currentTime.getMinutes()).padStart(2, '0')}`;
  const initial = colleagueName.charAt(0);
  const firstName = colleagueName.split(' ')[0];

  // -- Render Logic based on Messenger Type --

  if (messenger === 'teams') {
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
  }

  if (messenger === 'line') {
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
  }

  // Default: Slack
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

export default ChatWindow;