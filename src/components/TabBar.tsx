export type TabId = 'tisch' | 'story' | 'booster' | 'sammlung';

interface TabBarProps {
  tab: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: 'tisch', icon: '🃏', label: 'Spieltisch' },
  { id: 'story', icon: '📖', label: 'Story' },
  { id: 'booster', icon: '🎁', label: 'Booster' },
  { id: 'sammlung', icon: '🗂️', label: 'Sammlung' },
];

export function TabBar({ tab, onChange }: TabBarProps) {
  return (
    <nav className="tabbar">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={tab === t.id ? 'active' : ''}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-icon">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
