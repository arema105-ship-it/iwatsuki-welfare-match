import { facilities } from '../data/facilities';

function shortLabel(name: string): string {
  return name.replace(/^就労継続支援Ｂ型事業所\s*/, '').replace(/^多機能型事業所/, '');
}

export function InstagramPanel() {
  const accounts = facilities.filter((f) => f.additionalInfo.instagramUrl);

  return (
    <section className="tab-panel">
      <div className="results-header">
        <h2>インスタグラム</h2>
        <p className="results-subtitle">事業所の公式アカウント</p>
      </div>

      <div className="instagram-account-list">
        {accounts.map((facility) => {
          const { logoUrl, instagramUrl } = facility.additionalInfo;
          const label = shortLabel(facility.csv.name);

          return (
            <a
              key={facility.id}
              className="instagram-account-card"
              href={instagramUrl!}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="story-avatar has-logo">
                {logoUrl ? (
                  <img src={logoUrl} alt="" />
                ) : (
                  <span className="story-avatar-fallback">{label.slice(0, 2)}</span>
                )}
              </span>
              <span className="instagram-account-text">
                <strong>{label}</strong>
                <span>Instagramを開く</span>
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
