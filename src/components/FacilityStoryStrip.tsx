import type { Facility } from '../types';

interface FacilityStoryStripProps {
  facilities: Facility[];
  onSelectFacility: (facility: Facility) => void;
}

function shortLabel(name: string): string {
  return name.replace(/^就労継続支援Ｂ型事業所\s*/, '').replace(/^多機能型事業所/, '').slice(0, 6);
}

function initialLabel(name: string): string {
  const short = shortLabel(name);
  return short.slice(0, 2);
}

export function FacilityStoryStrip({ facilities, onSelectFacility }: FacilityStoryStripProps) {
  const ordered = [...facilities].sort((a, b) => {
    const aLogo = a.additionalInfo.logoUrl ? 0 : 1;
    const bLogo = b.additionalInfo.logoUrl ? 0 : 1;
    if (aLogo !== bLogo) return aLogo - bLogo;
    return a.csv.name.localeCompare(b.csv.name, 'ja');
  });

  // ループ用に2周分並べる（CSSアニメーション）
  const loopItems = [...ordered, ...ordered];

  return (
    <section className="story-strip" aria-label="事業所アイコン一覧">
      <div className="story-strip-viewport">
        <div className="story-strip-track">
          {loopItems.map((facility, index) => {
            const { logoUrl, instagramUrl } = facility.additionalInfo;
            const label = shortLabel(facility.csv.name);
            const isDuplicate = index >= ordered.length;
            const sharedClassName = 'story-item';
            const sharedTabIndex = isDuplicate ? -1 : 0;
            const avatar = (
              <>
                <span className={`story-avatar${logoUrl ? ' has-logo' : ''}`}>
                  {logoUrl ? (
                    <img src={logoUrl} alt="" />
                  ) : (
                    <span className="story-avatar-fallback">{initialLabel(facility.csv.name)}</span>
                  )}
                </span>
                <span className="story-name">{label}</span>
              </>
            );

            if (instagramUrl) {
              return (
                <a
                  key={`${facility.id}-${index}`}
                  className={sharedClassName}
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={sharedTabIndex}
                  aria-hidden={isDuplicate || undefined}
                  aria-label={`${label}のInstagramを開く`}
                  title="Instagramを開く"
                >
                  {avatar}
                </a>
              );
            }

            return (
              <button
                key={`${facility.id}-${index}`}
                type="button"
                className={sharedClassName}
                onClick={() => onSelectFacility(facility)}
                tabIndex={sharedTabIndex}
                aria-hidden={isDuplicate || undefined}
              >
                {avatar}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
