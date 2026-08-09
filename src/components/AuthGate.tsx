import { useState, type FormEvent, type ReactNode } from 'react';

const AUTH_SESSION_KEY = 'iwatsuki-demo-authenticated';

interface AuthGateProps {
  children: ReactNode;
}

export function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_SESSION_KEY) === 'true',
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
        setIsAuthenticated(true);
        setPassword('');
        return;
      }

      if (response.status === 401) {
        setError('パスワードが正しくありません');
        return;
      }

      setError('認証に失敗しました。しばらくしてから再度お試しください');
    } catch {
      setError('通信エラーが発生しました。ネットワークを確認してください');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="auth-gate">
      <div className="auth-gate-card">
        <div className="auth-gate-icon" aria-hidden="true">
          🔒
        </div>
        <h1>岩槻のB型事業所マッチング（デモ）</h1>
        <p className="auth-gate-description">
          このページは関係者限定のデモです。
          <br />
          パスワードを入力してアクセスしてください。
        </p>

        <form className="auth-gate-form" onSubmit={handleSubmit}>
          <label htmlFor="demo-password">パスワード</label>
          <input
            id="demo-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="パスワードを入力"
            autoComplete="current-password"
            required
            disabled={isSubmitting}
          />
          {error && (
            <p className="auth-gate-error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary" disabled={isSubmitting || !password}>
            {isSubmitting ? '確認中...' : 'アクセスする'}
          </button>
        </form>
      </div>
    </div>
  );
}
