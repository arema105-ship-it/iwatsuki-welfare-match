interface ConsultPanelProps {
  onStartMatching: () => void;
}

export function ConsultPanel({ onStartMatching }: ConsultPanelProps) {
  return (
    <section className="tab-panel">
      <div className="results-header">
        <h2>ご相談</h2>
        <p className="results-subtitle">見学や利用についてお気軽にどうぞ</p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">
          💬
        </div>
        <p>
          まずは条件から事業所を探すか、一覧から気になる事業所の詳細を開いて「見学希望」を送れます。
        </p>
        <button type="button" className="btn-primary" onClick={onStartMatching}>
          条件から事業所を探す
        </button>
        <p className="consult-note">
          ※ 本番では電話・フォーム・相談支援への案内などを置く想定です。
        </p>
      </div>
    </section>
  );
}
