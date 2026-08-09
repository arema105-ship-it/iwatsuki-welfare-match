import { useState } from 'react';
import type { MatchResult } from '../types';

interface FacilityDetailProps {
  result: MatchResult;
  onClose: () => void;
}

export function FacilityDetail({ result, onClose }: FacilityDetailProps) {
  const { facility, reasons } = result;
  const [tourRequested, setTourRequested] = useState(false);

  const atmosphereLabel = facility.atmosphere === 'quiet' ? '静か' : '活気';

  const handleTourRequest = () => {
    setTourRequested(true);
  };

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="detail-close" onClick={onClose} aria-label="閉じる">
          ✕
        </button>

        <div className="detail-header">
          <span className="detail-emoji">{facility.imageEmoji}</span>
          <div>
            <h2>{facility.name}</h2>
            <p className="detail-address">{facility.address}</p>
          </div>
        </div>

        <div className="detail-body">
          <section className="detail-section">
            <h3>事業所について</h3>
            <p>{facility.description}</p>
          </section>

          <section className="detail-section">
            <h3>なぜこの事業所なのか</h3>
            <ul className="reason-list">
              {reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h3>基本情報</h3>
            <dl className="info-list">
              <div className="info-row">
                <dt>作業内容</dt>
                <dd>{facility.workContents.join('、')}</dd>
              </div>
              <div className="info-row">
                <dt>雰囲気</dt>
                <dd>{atmosphereLabel}</dd>
              </div>
              <div className="info-row">
                <dt>通所日数</dt>
                <dd>
                  週{facility.minDays}〜{facility.maxDays}日
                </dd>
              </div>
              <div className="info-row">
                <dt>送迎</dt>
                <dd>{facility.hasTransport ? 'あり' : 'なし'}</dd>
              </div>
              <div className="info-row">
                <dt>定員</dt>
                <dd>
                  {facility.currentUsers} / {facility.capacity}名
                </dd>
              </div>
              <div className="info-row">
                <dt>営業時間</dt>
                <dd>{facility.hours}</dd>
              </div>
              <div className="info-row">
                <dt>電話</dt>
                <dd>{facility.phone}</dd>
              </div>
            </dl>
          </section>

          <section className="detail-section">
            <h3>支援内容</h3>
            <div className="feature-tags">
              {facility.features.map((feature) => (
                <span key={feature} className="tag">
                  {feature}
                </span>
              ))}
            </div>
          </section>

          <section className="detail-section">
            <h3>将来の支援</h3>
            <div className="feature-tags">
              {facility.futureSupport.map((goal) => (
                <span key={goal} className="tag tag-goal">
                  {goal}
                </span>
              ))}
            </div>
          </section>
        </div>

        <div className="detail-footer">
          {tourRequested ? (
            <div className="tour-success">
              <span className="success-icon">✅</span>
              <div>
                <strong>見学希望を受け付けました</strong>
                <p>
                  {facility.name}より2〜3営業日以内にご連絡いたします。
                  <br />
                  （※これはデモのため、実際の連絡は行われません）
                </p>
              </div>
            </div>
          ) : (
            <button type="button" className="btn-primary btn-tour" onClick={handleTourRequest}>
              見学希望を送る
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
