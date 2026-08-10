export type MainTab = 'directory' | 'instagram' | 'news' | 'consult';

interface BottomTabBarProps {
  active: MainTab;
  onChange: (tab: MainTab) => void;
}

const TABS: { id: MainTab; label: string; icon: string }[] = [
  { id: 'directory', label: '事業所一覧', icon: '🏠' },
  { id: 'instagram', label: 'インスタ', icon: '📷' },
  { id: 'news', label: 'お知らせ', icon: '🔔' },
  { id: 'consult', label: 'ご相談', icon: '💬' },
];

export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="メインメニュー">
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-tab${isActive ? ' active' : ''}`}
            onClick={() => onChange(tab.id)}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="bottom-tab-icon" aria-hidden="true">
              {tab.icon}
            </span>
            <span className="bottom-tab-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
