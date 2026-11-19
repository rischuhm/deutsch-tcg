import { useState } from 'react';
import type { Collection } from './game';
import {
  addStarterDeck,
  addToCollection,
  craftPlural,
  emptyCollection,
} from './game';
import { usePersistentState } from './hooks/usePersistentState';
import { STORAGE_KEYS } from './lib/ui';
import { TabBar } from './components/TabBar';
import type { TabId } from './components/TabBar';
import { TableScreen } from './components/TableScreen';
import { BoosterScreen } from './components/BoosterScreen';
import { CollectionScreen } from './components/CollectionScreen';
import { Onboarding } from './components/Onboarding';

export default function App() {
  const [tab, setTab] = useState<TabId>('tisch');

  // Beim ersten Start (kein gespeicherter Wert) wird das Starter-Deck gegeben.
  const [collection, setCollection] = usePersistentState<Collection>(
    STORAGE_KEYS.collection,
    () => addStarterDeck(emptyCollection()),
  );
  const [plurals, setPlurals] = usePersistentState<Record<string, number>>(
    STORAGE_KEYS.plurals,
    () => ({}),
  );
  const [points, setPoints] = usePersistentState<number>(
    STORAGE_KEYS.points,
    () => 0,
  );
  const [lastBooster, setLastBooster] = usePersistentState<string | null>(
    STORAGE_KEYS.lastBooster,
    () => null,
  );
  const [onboarded, setOnboarded] = usePersistentState<boolean>(
    STORAGE_KEYS.onboarded,
    () => false,
  );

  const handleCollectBooster = (defIds: string[], openedAtISO: string) => {
    setCollection((col) => addToCollection(col, defIds));
    setLastBooster(openedAtISO);
  };

  const handleCraftPlural = (defId: string) => {
    const result = craftPlural(collection, defId);
    if (result) {
      setCollection(result.collection);
      setPlurals((p) => ({ ...p, [defId]: (p[defId] ?? 0) + 1 }));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>SatzMeister</h1>
        <div className="points" title="Gesamtpunkte">
          ⭐ {points}
        </div>
      </header>

      <main className="app-main">
        {tab === 'tisch' && (
          <TableScreen
            collection={collection}
            plurals={plurals}
            onAddPoints={(p) => setPoints((total) => total + p)}
          />
        )}
        {tab === 'booster' && (
          <BoosterScreen
            lastBooster={lastBooster}
            onCollect={handleCollectBooster}
          />
        )}
        {tab === 'sammlung' && (
          <CollectionScreen
            collection={collection}
            plurals={plurals}
            onCraftPlural={handleCraftPlural}
          />
        )}
      </main>

      <TabBar tab={tab} onChange={setTab} />

      {!onboarded && <Onboarding onClose={() => setOnboarded(true)} />}
    </div>
  );
}
