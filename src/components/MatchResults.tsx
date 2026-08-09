import type { MatchResult } from '../types';

interface MatchResultsProps {
  results: MatchResult[];
  onSelectFacility: (result: MatchResult) => void;
  onReset: () => void;
}

export function MatchResults({ results, onSelectFacility, onReset }: MatchResultsProps) {
  const rankLabels = ['🥇 第1位', '🥈 第2位', '🥉 第3位'];

  return (
    <section className="match-results">
      <div className="results-header">
        <h2>マッチング結果</h2>
        <p className="results-subtitle">あなたの条件に合う事業所を3件ご提案します</p>
      </div>

      <div className="results-list">
        {results.map((result, index) => (
          <article key={result.facility.id} className="result-card">
            <div className="result-rank">{rankLabels[index]}</div>
            <div className="result-card-header">
              <span className="facility-emoji">{result.facility.imageEmoji}</span>
              <div>
                <h3>{result.facility.name}</h3>
                <p className="facility-address">{result.facility.address}</p>
              </div>
            </div>

            <div className="match-score">
              <span className="score-label">マッチ度</span>
              <div className="score-bar-container">
                <div
                  className="score-bar"
                  style={{ width: `${Math.min(100, (result.score / 100) * 100)}%` }}
                />
              </div>
              <span className="score-value">{result.score}点</span>
            </div>

            <div className="match-reasons">
              <h4>なぜこの事業所なのか</h4>
              <ul>
                {result.reasons.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            </div>

            <div className="result-tags">
              {result.facility.workContents.slice(0, 3).map((work) => (
                <span key={work} className="tag">
                  {work}
                </span>
              ))}
              {result.facility.hasTransport && <span className="tag tag-transport">送迎あり</span>}
            </div>

            <button
              type="button"
              className="btn-secondary"
              onClick={() => onSelectFacility(result)}
            >
              詳細を見る
            </button>
          </article>
        ))}
      </div>

      <button type="button" className="btn-outline" onClick={onReset}>
        条件を変更して再検索
      </button>
    </section>
  );
}
