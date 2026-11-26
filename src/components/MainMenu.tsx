import { CardImage } from './CardImage';
import type { TabId } from './TabBar';

interface MainMenuProps {
  onChoose: (tab: Exclude<TabId, 'menue'>) => void;
  onShowRules: () => void;
}

const SIDE_MODES = [
  { id: 'tisch', icon: '🃏', label: 'Freies Spiel', description: 'Eigene Sätze am Spieltisch bauen' },
  { id: 'booster', icon: '🎁', label: 'Booster', description: 'Das tägliche Kartenpaket öffnen' },
  { id: 'sammlung', icon: '🗂️', label: 'Sammlung', description: 'Karten ansehen und Lektionsdecks spielen' },
] as const;

export function MainMenu({ onChoose, onShowRules }: MainMenuProps) {
  return (
    <div className="main-menu">
      <div className="main-menu-content">
        <h2 id="main-menu-heading">Hauptmenü</h2>

        <nav className="menu-modes" aria-labelledby="main-menu-heading">
          <button type="button" className="menu-mode menu-story" onClick={() => onChoose('story')}>
            <span className="menu-story-copy">
              <strong>Storymodus</strong>
              <span className="menu-description">Grammatik mit Karten lernen, von A1 bis C1</span>
            </span>
            <span className="menu-card-fan" aria-hidden="true">
              <CardImage defId="noun.tisch" decorative />
              <CardImage defId="verb.lernen" decorative />
            </span>
            <span className="menu-arrow" aria-hidden="true">→</span>
          </button>

          <div className="menu-secondary-modes">
            {SIDE_MODES.map(({ id, icon, label, description }) => (
              <button key={id} type="button" className="menu-mode" onClick={() => onChoose(id)}>
                <span className="menu-mode-icon" aria-hidden="true">{icon}</span>
                <strong>{label}</strong>
                <span className="menu-description">{description}</span>
              </button>
            ))}
          </div>
        </nav>

        <button type="button" className="menu-rules" onClick={onShowRules}>Spielregeln</button>
      </div>
    </div>
  );
}
