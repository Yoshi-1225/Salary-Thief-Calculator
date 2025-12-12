
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { playSound } from '../../utils/audio';
import { JobType, MessengerType, ChatMessage } from '../../types';
import { COLLEAGUE_NAMES, JOB_SCRIPTS } from '../../data/gameData';
import { TeamsTheme, LineTheme, SlackTheme } from './ChatThemes';

interface ChatWindowProps {
  messenger: MessengerType;
  jobTitle: JobType;
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messenger, jobTitle, className }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [colleagueName, setColleagueName] = useState("Alex Chen");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pick a random colleague name when component mounts
    const randomName = COLLEAGUE_NAMES[Math.floor(Math.random() * COLLEAGUE_NAMES.length)];
    setColleagueName(randomName);

    setMessages([]);

    const script = JOB_SCRIPTS[jobTitle];
    const fullConversation: ChatMessage[] = [
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

  const themeProps = {
    messages,
    colleagueName,
    timeString,
    initial,
    firstName,
    scrollRef,
    className
  };

  if (messenger === 'teams') {
    return <TeamsTheme {...themeProps} />;
  }

  if (messenger === 'line') {
    return <LineTheme {...themeProps} />;
  }

  // Default: Slack
  return <SlackTheme {...themeProps} />;
};

export default React.memo(ChatWindow);