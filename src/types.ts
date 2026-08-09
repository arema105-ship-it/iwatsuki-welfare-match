export type Atmosphere = 'quiet' | 'lively' | 'either';

export interface UserPreferences {
  workContent: string;
  atmosphere: Atmosphere;
  attendanceDays: number;
  needsTransport: boolean;
  futureGoal: string;
}

/** WAM NET オープンデータ（CSV）から取得した事業所情報 */
export interface FacilityCsvData {
  facilityNumber: string;
  name: string;
  nameKana: string;
  corporationName: string;
  addressCity: string;
  addressStreet: string;
  phone: string | null;
  fax: string | null;
  url: string | null;
  latitude: number | null;
  longitude: number | null;
  hoursWeekday: string | null;
  hoursSaturday: string | null;
  hoursSunday: string | null;
  hoursHoliday: string | null;
  regularHoliday: string | null;
  weekdayNotes: string | null;
  capacity: number | null;
  serviceType: string;
}

/**
 * マッチング用の追加情報（CSVに存在しない項目）
 * 未登録の場合は null
 */
export interface FacilityAdditionalInfo {
  workContents: string[] | null;
  atmosphere: 'quiet' | 'lively' | null;
  minDays: number | null;
  maxDays: number | null;
  hasTransport: boolean | null;
  futureSupport: string[] | null;
  isFull: boolean | null;
}

export interface Facility {
  id: string;
  csv: FacilityCsvData;
  additionalInfo: FacilityAdditionalInfo;
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

export function getFacilityAddress(facility: Facility): string {
  return `${facility.csv.addressCity}${facility.csv.addressStreet}`;
}

export function hasAdditionalInfo(info: FacilityAdditionalInfo): boolean {
  return (
    info.workContents !== null ||
    info.atmosphere !== null ||
    info.minDays !== null ||
    info.maxDays !== null ||
    info.hasTransport !== null ||
    info.futureSupport !== null ||
    info.isFull !== null
  );
}
