import { useState } from 'react';
import { MatchingForm } from './components/MatchingForm';
import { MatchResults } from './components/MatchResults';
import { FacilityDetail } from './components/FacilityDetail';
import { facilities } from './data/facilities';
import { matchFacilities } from './utils/matching';
import type { MatchResult, UserPreferences } from './types';
import './App.css';

type AppStep = 'form' | 'results';

function App() {
  const [step, setStep] = useState<AppStep>('form');
  const [results, setResults] = useState<MatchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<MatchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (preferences: UserPreferences) => {
    setIsLoading(true);
    setTimeout(() => {
      const matched = matchFacilities(preferences, facilities);
      setResults(matched);
      setStep('results');
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  const handleReset = () => {
    setStep('form');
    setResults([]);
    setSelectedResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-badge">デモ版</div>
          <h1>岩槻のB型事業所マッチング（デモ）</h1>
          <p className="header-subtitle">あなたに合いそうな事業所を3件ご提案</p>
        </div>
      </header>

      <main className="app-main">
        {step === 'form' && (
          <section className="form-section">
            <div className="form-intro">
              <p>
                5つの質問にお答えいただくと、岩槻周辺の就労継続支援B型事業所の中から、
                あなたの希望条件に合う事業所を3件ご提案します。
              </p>
            </div>
            <MatchingForm onSubmit={handleSubmit} isLoading={isLoading} />
          </section>
        )}

        {step === 'results' && (
          <MatchResults
            results={results}
            onSelectFacility={setSelectedResult}
            onReset={handleReset}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>※ このアプリはデモ版です。事業所情報はすべて架空のものです。</p>
      </footer>

      {selectedResult && (
        <FacilityDetail result={selectedResult} onClose={() => setSelectedResult(null)} />
      )}
    </div>
  );
}

export default App;
