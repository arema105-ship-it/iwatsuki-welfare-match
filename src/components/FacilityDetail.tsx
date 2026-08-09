import { useState } from 'react';
import type { MatchResult } from '../types';
import { getFacilityAddress, hasAdditionalInfo } from '../types';
import { formatCapacity, formatHours } from '../utils/facilityDisplay';

interface FacilityDetailProps {
  result: MatchResult;
  onClose: () => void;
}

function InfoRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="info-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

export function FacilityDetail({ result, onClose }: FacilityDetailProps) {
  const { facility, reasons } = result;
  const { csv, additionalInfo } = facility;
  const [tourRequested, setTourRequested] = useState(false);

  const hours = formatHours(csv);
  const hasAdditional = hasAdditionalInfo(additionalInfo);

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
          <div>
            <h2>{csv.name}</h2>
            <p className="detail-address">{getFacilityAddress(facility)}</p>
            <p className="detail-source">出典: WAM NET オープンデータ</p>
          </div>
        </div>

        <div className="detail-body">
          <section className="detail-section">
            <h3>なぜこの事業所なのか</h3>
            <ul className="reason-list">
              {reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h3>公開情報（WAM NET）</h3>
            <dl className="info-list">
              <InfoRow label="サービス種別" value={csv.serviceType} />
              <InfoRow label="法人名" value={csv.corporationName} />
              <InfoRow label="事業所番号" value={csv.facilityNumber} />
              <InfoRow label="電話" value={csv.phone} />
              <InfoRow label="FAX" value={csv.fax} />
              {csv.url && (
                <div className="info-row">
                  <dt>URL</dt>
                  <dd>
                    <a href={csv.url} target="_blank" rel="noopener noreferrer">
                      {csv.url}
                    </a>
                  </dd>
                </div>
              )}
              <InfoRow label="定員" value={formatCapacity(csv.capacity)} />
              <InfoRow label="定休日" value={csv.regularHoliday} />
              <InfoRow label="留意事項" value={csv.weekdayNotes} />
              {csv.latitude !== null && csv.longitude !== null && (
                <InfoRow label="所在地（緯度・経度）" value={`${csv.latitude}, ${csv.longitude}`} />
              )}
            </dl>

            {hours.length > 0 && (
              <div className="hours-table">
                <h4>利用可能な時間帯</h4>
                <dl className="info-list">
                  {hours.map(({ label, value }) => (
                    <InfoRow key={label} label={label} value={value} />
                  ))}
                </dl>
              </div>
            )}
          </section>

          <section className="detail-section detail-section-additional">
            <h3>追加情報（マッチング用）</h3>
            {!hasAdditional ? (
              <p className="additional-info-empty">
                CSVに含まれないマッチング項目（作業内容・雰囲気・通所日数・送迎・将来希望など）は未登録です。詳細は事業所へ直接お問い合わせください。
              </p>
            ) : (
              <dl className="info-list">
                {additionalInfo.workContents && (
                  <InfoRow label="作業内容" value={additionalInfo.workContents.join('、')} />
                )}
                {additionalInfo.atmosphere && (
                  <InfoRow
                    label="雰囲気"
                    value={additionalInfo.atmosphere === 'quiet' ? '静か' : '活気'}
                  />
                )}
                {additionalInfo.minDays !== null && additionalInfo.maxDays !== null && (
                  <InfoRow
                    label="通所日数"
                    value={`週${additionalInfo.minDays}〜${additionalInfo.maxDays}日`}
                  />
                )}
                {additionalInfo.hasTransport !== null && (
                  <InfoRow
                    label="送迎"
                    value={additionalInfo.hasTransport ? 'あり' : 'なし'}
                  />
                )}
                {additionalInfo.futureSupport && (
                  <div className="info-row">
                    <dt>将来の支援</dt>
                    <dd>
                      <div className="feature-tags">
                        {additionalInfo.futureSupport.map((goal) => (
                          <span key={goal} className="tag tag-goal">
                            {goal}
                          </span>
                        ))}
                      </div>
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </section>
        </div>

        <div className="detail-footer">
          {tourRequested ? (
            <div className="tour-success">
              <span className="success-icon">✅</span>
              <div>
                <strong>見学希望を受け付けました</strong>
                <p>
                  {csv.name}より2〜3営業日以内にご連絡いたします。
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
