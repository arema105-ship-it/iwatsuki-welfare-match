import { Compass } from 'lucide-react';

interface ConsultPanelProps {
  onStartMatching: () => void;
}

export function ConsultPanel({ onStartMatching }: ConsultPanelProps) {
  return (
    <section className="tab-panel brand-panel">
      <div className="brand-card">
        <div className="brand-card-top">
          <Compass className="brand-compass-icon" strokeWidth={1.25} aria-hidden="true" />
          <p className="brand-label">ABOUT KOMPASS</p>
          <p className="brand-sublabel">Human Understanding Tool</p>
        </div>

        <h2 className="brand-headline">
          支援に、
          <br />
          正解はありません。
        </h2>

        <div className="brand-body">
          <div className="brand-body-group">
            <p>
              コンパスは、
              <br />
              目的地を決めるものではありません。
            </p>
            <p>進むべき方向を示すものです。</p>
          </div>
          <p>
            あるのは、
            <br />
            一人ひとり違う人生と、
            <br />
            一人ひとり違う未来。
          </p>
          <p>
            だから私たちは、
            <br />
            この名前を選びました。
          </p>
        </div>

        <p className="brand-closing">
          <span>人を知る。</span>
          <span>支援が変わる。</span>
        </p>

        <p className="brand-statement">
          人を決めつけるのではなく、
          <br />
          理解するための羅針盤。
        </p>
      </div>

      <div className="brand-cta">
        <button type="button" className="btn-primary" onClick={onStartMatching}>
          条件から事業所を探す
        </button>
      </div>
    </section>
  );
}
