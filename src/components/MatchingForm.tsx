import { useState } from 'react';
import type { UserPreferences } from '../types';
import {
  WORK_CONTENT_OPTIONS,
  FUTURE_GOAL_OPTIONS,
  ATTENDANCE_DAY_OPTIONS,
} from '../types';

interface MatchingFormProps {
  onSubmit: (preferences: UserPreferences) => void;
  isLoading?: boolean;
}

export function MatchingForm({ onSubmit, isLoading }: MatchingFormProps) {
  const [workContent, setWorkContent] = useState('');
  const [atmosphere, setAtmosphere] = useState<UserPreferences['atmosphere']>('either');
  const [attendanceDays, setAttendanceDays] = useState(3);
  const [needsTransport, setNeedsTransport] = useState(false);
  const [futureGoal, setFutureGoal] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workContent || !futureGoal) return;
    onSubmit({ workContent, atmosphere, attendanceDays, needsTransport, futureGoal });
  };

  const isValid = workContent && futureGoal;

  return (
    <form className="matching-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="workContent">
          <span className="form-label-number">1</span>
          希望する作業内容
        </label>
        <select
          id="workContent"
          value={workContent}
          onChange={(e) => setWorkContent(e.target.value)}
          required
        >
          <option value="">選択してください</option>
          {WORK_CONTENT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <span className="form-label-number">2</span>
          雰囲気
        </label>
        <div className="radio-group">
          {(
            [
              { value: 'quiet', label: '静か', icon: '🤫' },
              { value: 'lively', label: '活気', icon: '🎉' },
              { value: 'either', label: 'どちらでも', icon: '😊' },
            ] as const
          ).map(({ value, label, icon }) => (
            <label key={value} className={`radio-card ${atmosphere === value ? 'selected' : ''}`}>
              <input
                type="radio"
                name="atmosphere"
                value={value}
                checked={atmosphere === value}
                onChange={() => setAtmosphere(value)}
              />
              <span className="radio-icon">{icon}</span>
              <span className="radio-label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="attendanceDays">
          <span className="form-label-number">3</span>
          希望通所日数
        </label>
        <select
          id="attendanceDays"
          value={attendanceDays}
          onChange={(e) => setAttendanceDays(Number(e.target.value))}
        >
          {ATTENDANCE_DAY_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <span className="form-label-number">4</span>
          送迎の必要有無
        </label>
        <div className="radio-group">
          {(
            [
              { value: false, label: '不要', icon: '🚶' },
              { value: true, label: '必要', icon: '🚌' },
            ] as const
          ).map(({ value, label, icon }) => (
            <label
              key={String(value)}
              className={`radio-card ${needsTransport === value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="needsTransport"
                checked={needsTransport === value}
                onChange={() => setNeedsTransport(value)}
              />
              <span className="radio-icon">{icon}</span>
              <span className="radio-label">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="futureGoal">
          <span className="form-label-number">5</span>
          将来希望
        </label>
        <select
          id="futureGoal"
          value={futureGoal}
          onChange={(e) => setFutureGoal(e.target.value)}
          required
        >
          <option value="">選択してください</option>
          {FUTURE_GOAL_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary" disabled={!isValid || isLoading}>
        {isLoading ? 'マッチング中...' : '事業所を探す'}
      </button>
    </form>
  );
}
