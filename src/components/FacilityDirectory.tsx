import type { Facility } from '../types';
import { getFacilityAddress } from '../types';

interface FacilityDirectoryProps {
  facilities: Facility[];
  onSelectFacility: (facility: Facility) => void;
  onStartMatching: () => void;
}

export function FacilityDirectory({
  facilities,
  onSelectFacility,
  onStartMatching,
}: FacilityDirectoryProps) {
  const list = [...facilities].sort((a, b) => a.csv.name.localeCompare(b.csv.name, 'ja'));

  return (
    <section className="facility-directory">
      <div className="results-header">
        <h2>登録事業所一覧</h2>
        <p className="results-subtitle">
          岩槻区の就労継続支援B型 {list.length}件（WAM NET掲載）
        </p>
      </div>

      <div className="directory-list">
        {list.map((facility) => {
          const { csv, additionalInfo } = facility;
          const isFull = additionalInfo.isFull === true;

          return (
            <article key={facility.id} className={`directory-card${isFull ? ' is-full' : ''}`}>
              <div className="directory-card-body">
                <div className="directory-card-text">
                  <div className="directory-card-title-row">
                    <h3>{csv.name}</h3>
                    {isFull && <span className="tag tag-full">満員</span>}
                  </div>
                  {additionalInfo.catchphrase && (
                    <p className="facility-catchphrase">{additionalInfo.catchphrase}</p>
                  )}
                  <p className="facility-address">{getFacilityAddress(facility)}</p>
                  <div className="result-tags">
                    {csv.capacity !== null && (
                      <span className="tag">定員 {csv.capacity}名</span>
                    )}
                    {additionalInfo.workContents?.slice(0, 2).map((work) => (
                      <span key={work} className="tag">
                        {work}
                      </span>
                    ))}
                    {additionalInfo.hasTransport === true && (
                      <span className="tag tag-transport">送迎あり</span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-secondary directory-detail-btn"
                  onClick={() => onSelectFacility(facility)}
                >
                  詳細を見る
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <button type="button" className="btn-outline" onClick={onStartMatching}>
        条件からマッチングする
      </button>
    </section>
  );
}
