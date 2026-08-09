export type Atmosphere = 'quiet' | 'lively' | 'either';

export interface UserPreferences {
  workContent: string;
  atmosphere: Atmosphere;
  attendanceDays: number;
  needsTransport: boolean;
  futureGoal: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  description: string;
  workContents: string[];
  atmosphere: 'quiet' | 'lively';
  minDays: number;
  maxDays: number;
  hasTransport: boolean;
  futureSupport: string[];
  isFull: boolean;
  capacity: number;
  currentUsers: number;
  features: string[];
  phone: string;
  hours: string;
  imageEmoji: string;
}

export interface MatchResult {
  facility: Facility;
  score: number;
  reasons: string[];
}

export const WORK_CONTENT_OPTIONS = [
  '軽作業・組立',
  'データ入力・PC作業',
  '清掃・メンテナンス',
  '農業・園芸',
  '軽飲食・調理補助',
  'クラフト・手芸',
] as const;

export const FUTURE_GOAL_OPTIONS = [
  '一般就労（A型・一般企業）',
  '在宅ワーク',
  '独立・起業',
  '資格取得',
  'まずは安定した通所',
] as const;

export const ATTENDANCE_DAY_OPTIONS = [
  { value: 1, label: '週1日' },
  { value: 2, label: '週2日' },
  { value: 3, label: '週3日' },
  { value: 4, label: '週4日' },
  { value: 5, label: '週5日' },
] as const;
