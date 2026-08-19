import type { ComponentType, SVGProps } from 'react';
import {
  IconFacility,
  IconNews,
  IconStory,
  IconSupport,
} from './KompassTabIcons';

export type MainTab = 'directory' | 'instagram' | 'news' | 'consult';

interface BottomTabBarProps {
  active: MainTab;
  onChange: (tab: MainTab) => void;
}

const TABS: {
  id: MainTab;
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { id: 'directory', label: '事業所', Icon: IconFacility },
  { id: 'instagram', label: 'ストーリー', Icon: IconStory },
  { id: 'news', label: 'お知らせ', Icon: IconNews },
  { id: 'consult', label: 'サポート', Icon: IconSupport },
];

export function BottomTabBar({ active, onChange }: BottomTabBarProps) {
  return (
    <nav className="bottom-tab-bar" aria-label="メインメニュー">
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            className={`bottom-tab${isActive ? ' active' : ''}`}
            onClick={() => onChange(id)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={label}
          >
            <span className="bottom-tab-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="bottom-tab-label">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
