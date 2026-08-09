import type { FacilityCsvData } from '../types';

function formatValue(value: string | number | null | undefined): string | null {
  if (value === null || value === undefined || value === '') return null;
  return String(value);
}

export function formatHours(csv: FacilityCsvData): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  const entries = [
    { label: '平日', value: csv.hoursWeekday },
    { label: '土曜', value: csv.hoursSaturday },
    { label: '日曜', value: csv.hoursSunday },
    { label: '祝日', value: csv.hoursHoliday },
  ];

  for (const entry of entries) {
    const formatted = formatValue(entry.value);
    if (formatted) rows.push({ label: entry.label, value: formatted });
  }

  return rows;
}

export function formatCapacity(capacity: number | null): string | null {
  if (capacity === null) return null;
  return `${capacity}名`;
}
