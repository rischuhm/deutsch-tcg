export type TabId = 'menue' | 'tisch' | 'story' | 'booster' | 'sammlung';

interface TabBarProps {
  tab: TabId;
  onChange: (tab: TabId) => void;
}

const TABS: { id: TabId; icon: string; label: string }[] = [
  { id: 'menue', icon: '☰', label: 'Menü' },
  { id: 'tisch', icon: '🃏', label: 'Spieltisch' },
  { id: 'story', icon: '📖', label: 'Story' },
  { id: 'booster', icon: '🎁', label: 'Booster' },
  { id: 'sammlung', icon: '🗂️', label: 'Sammlung' },
];

export function TabBar({ tab, onChange }: TabBarProps) {
  return (
    <nav className="tabbar" aria-label="Hauptnavigation">
      {TABS.map((t) => (
        <button
          key={t.id}
          className={tab === t.id ? 'active' : ''}
          aria-current={tab === t.id ? 'page' : undefined}
          onClick={() => onChange(t.id)}
        >
          <span className="tab-icon" aria-hidden="true">{t.icon}</span>
          <span>{t.label}</span>
        </button>
      ))}
    </nav>
  );
}
