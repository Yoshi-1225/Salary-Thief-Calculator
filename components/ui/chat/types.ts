import React from 'react';
import { ChatMessage } from '../../../types';

export interface ThemeProps {
  messages: ChatMessage[];
  colleagueName: string;
  timeString: string;
  initial: string;
  firstName: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}