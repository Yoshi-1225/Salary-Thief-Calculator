
export enum AppStatus {
  IDLE = 'IDLE',
  WORKING = 'WORKING',
  POOPING = 'POOPING',
  SLACKING = 'SLACKING'
}

export type JobType = 'engineer' | 'designer' | 'pm' | 'sales' | 'admin';
export type OsType = 'windows' | 'macos';
export type MessengerType = 'teams' | 'line' | 'slack';

export interface AppState {
  status: AppStatus;
  salaryPerSecond: number;
  startTime: number;
  sessionTotal: number;
  poopTotal: number;
  slackTotal: number;
  poopStartTime: number;
  slackStartTime: number;
  totalPoopTime: number;
  totalSlackTime: number;
  lastFrameTime: number;
  isRetroactive: boolean;
  retroStartTimeString: string;
  settings: Settings | null;
}

export interface Settings {
  salary: number;
  days: number;
  hours: number;
  startTime: string;
  jobTitle: JobType;
  os: OsType;
  messenger: MessengerType;
}

export interface ChatMessage {
  text: string;
  isSelf: boolean;
}
