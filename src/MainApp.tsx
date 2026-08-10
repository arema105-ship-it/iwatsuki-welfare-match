import { useState } from 'react';
import { MatchingForm } from './components/MatchingForm';
import { MatchResults } from './components/MatchResults';
import { FacilityDetail } from './components/FacilityDetail';
import { FacilityDirectory } from './components/FacilityDirectory';
import { BottomTabBar, type MainTab } from './components/BottomTabBar';
import { InstagramPanel } from './components/InstagramPanel';
import { NewsPanel } from './components/NewsPanel';
import { ConsultPanel } from './components/ConsultPanel';
import { facilities } from './data/facilities';
import { matchFacilities } from './utils/matching';
import type { Facility, MatchResult, UserPreferences } from './types';

type DirectoryStep = 'list' | 'form' | 'results';

interface SelectedFacility {
  facility: Facility;
  reasons?: string[];
}

export function MainApp() {
  const [tab, setTab] = useState<MainTab>('directory');
  const [directoryStep, setDirectoryStep] = useState<DirectoryStep>('list');
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selected, setSelected] = useState<SelectedFacility | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const switchTab = (next: MainTab) => {
    setTab(next);
    setSelected(null);
    if (next === 'directory') {
      setDirectoryStep('list');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openMatching = () => {
    setTab('directory');
    setDirectoryStep('form');
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (preferences: UserPreferences) => {
    setIsLoading(true);
    setTimeout(() => {
      const matched = matchFacilities(preferences, facilities);
      setResults(matched);
      setDirectoryStep('results');
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setDirectoryStep('form');
    setResults([]);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabSubtitle =
    tab === 'directory'
      ? '岩槻のB型事業所 — 一覧から調べる、条件から探す'
      : tab === 'instagram'
        ? '日々の様子をチェック'
        : tab === 'news'
          ? '最新情報をお届けします'
          : '見学・利用のご案内';

  return (
    <div className="app has-bottom-tabs">
      <header className="app-header app-header-compact">
        <div className="header-inner">
          <div className="header-badge">デモ版</div>
          <h1 className="brand-lockup">
            <img
              className="brand-logo"
              src="/kompass-logo.jpg"
              alt="kompass — 人を知る。支援が変わる。"
              width={320}
              height={160}
            />
          </h1>
          <p className="header-subtitle">{tabSubtitle}</p>
        </div>
      </header>

      <main className="app-main">
        {tab === 'directory' && directoryStep === 'list' && (
          <FacilityDirectory
            facilities={facilities}
            onSelectFacility={(facility) => setSelected({ facility })}
            onStartMatching={openMatching}
          />
        )}

        {tab === 'directory' && directoryStep === 'form' && (
          <section className="form-section">
            <div className="form-intro">
              <p>
                5つの質問にお答えいただくと、希望条件に合いそうな事業所を3件ご提案します。
              </p>
            </div>
            <MatchingForm onSubmit={handleSubmit} isLoading={isLoading} />
            <button
              type="button"
              className="btn-outline"
              style={{ marginTop: '1rem' }}
              onClick={() => setDirectoryStep('list')}
            >
              事業所一覧に戻る
            </button>
          </section>
        )}

        {tab === 'directory' && directoryStep === 'results' && (
          <MatchResults
            results={results}
            onSelectFacility={(result) =>
              setSelected({ facility: result.facility, reasons: result.reasons })
            }
            onReset={handleReset}
          />
        )}

        {tab === 'instagram' && <InstagramPanel />}
        {tab === 'news' && <NewsPanel />}
        {tab === 'consult' && <ConsultPanel onStartMatching={openMatching} />}
      </main>

      <footer className="app-footer">
        <p>※ 事業所情報は WAM NET オープンデータ（2026年8月時点）に基づいています。</p>
      </footer>

      <BottomTabBar active={tab} onChange={switchTab} />

      {selected && (
        <FacilityDetail
          facility={selected.facility}
          reasons={selected.reasons}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
