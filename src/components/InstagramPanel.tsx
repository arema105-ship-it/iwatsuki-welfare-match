const INSTAGRAM_URL = 'https://www.instagram.com/';

export function InstagramPanel() {
  return (
    <section className="tab-panel">
      <div className="results-header">
        <h2>インスタグラム</h2>
        <p className="results-subtitle">日々の様子やお知らせを発信しています</p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-icon" aria-hidden="true">
          📷
        </div>
        <p>
          ここにはInstagramの投稿一覧を表示する想定です（デモでは外部リンクのみ）。
        </p>
        <a
          className="btn-primary placeholder-link"
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagramを開く
        </a>
      </div>
    </section>
  );
}
