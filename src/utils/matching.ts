import type { Facility, MatchResult, UserPreferences } from '../types';

const ATMOSPHERE_LABELS: Record<string, string> = {
  quiet: '静か',
  lively: '活気',
};

function scoreWorkContent(facility: Facility, pref: UserPreferences): { score: number; reason: string | null } {
  if (facility.workContents.includes(pref.workContent)) {
    return {
      score: 30,
      reason: `「${pref.workContent}」の作業メニューがあります`,
    };
  }
  return { score: 0, reason: null };
}

function scoreAtmosphere(facility: Facility, pref: UserPreferences): { score: number; reason: string | null } {
  if (pref.atmosphere === 'either') {
    return { score: 15, reason: '雰囲気のご希望に柔軟に対応できます' };
  }
  if (facility.atmosphere === pref.atmosphere) {
    const label = ATMOSPHERE_LABELS[pref.atmosphere];
    return { score: 20, reason: `「${label}」な雰囲気で、ご希望に合っています` };
  }
  return { score: 0, reason: null };
}

function scoreAttendanceDays(facility: Facility, pref: UserPreferences): { score: number; reason: string | null } {
  if (pref.attendanceDays >= facility.minDays && pref.attendanceDays <= facility.maxDays) {
    return {
      score: 20,
      reason: `週${pref.attendanceDays}日の通所に対応しています（週${facility.minDays}〜${facility.maxDays}日）`,
    };
  }
  if (pref.attendanceDays < facility.minDays) {
    return { score: 5, reason: null };
  }
  return { score: 0, reason: null };
}

function scoreTransport(facility: Facility, pref: UserPreferences): { score: number; reason: string | null } {
  if (!pref.needsTransport) {
    return { score: 10, reason: null };
  }
  if (facility.hasTransport) {
    return { score: 15, reason: '送迎サービスに対応しています' };
  }
  return { score: 0, reason: null };
}

function scoreFutureGoal(facility: Facility, pref: UserPreferences): { score: number; reason: string | null } {
  if (facility.futureSupport.includes(pref.futureGoal)) {
    return {
      score: 15,
      reason: `「${pref.futureGoal}」に向けた支援実績があります`,
    };
  }
  return { score: 0, reason: null };
}

export function matchFacilities(preferences: UserPreferences, allFacilities: Facility[]): MatchResult[] {
  const available = allFacilities.filter((f) => !f.isFull);

  const results: MatchResult[] = available.map((facility) => {
    const scores = [
      scoreWorkContent(facility, preferences),
      scoreAtmosphere(facility, preferences),
      scoreAttendanceDays(facility, preferences),
      scoreTransport(facility, preferences),
      scoreFutureGoal(facility, preferences),
    ];

    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const reasons = scores.map((s) => s.reason).filter((r): r is string => r !== null);

    if (reasons.length === 0) {
      reasons.push('総合的な条件からおすすめの事業所です');
    }

    return { facility, score: totalScore, reasons };
  });

  return results.sort((a, b) => b.score - a.score).slice(0, 3);
}
