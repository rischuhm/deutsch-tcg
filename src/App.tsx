import { lazy, Suspense, useEffect, useRef, useState } from 'react';
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
import { CollectionScreen } from './components/CollectionScreen';
import { StoryScreen } from './components/StoryScreen';
import { Onboarding } from './components/Onboarding';
import { MainMenu } from './components/MainMenu';

const BoosterScreen = lazy(() => import('./components/BoosterScreen').then(({ BoosterScreen }) => ({ default: BoosterScreen })));

export default function App() {
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
  const [tab, setTab] = useState<TabId>('menue');
  const [showRules, setShowRules] = useState(false);
  const main = useRef<HTMLElement>(null);
  const [storyCompleted, setStoryCompleted] = usePersistentState<string[]>(
    STORAGE_KEYS.storyCompleted,
    () => [],
  );

  useEffect(() => {
    main.current?.focus({ preventScroll: true });
  }, [tab]);

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

      <main className="app-main" ref={main} tabIndex={-1}>
        {tab === 'menue' && <MainMenu onChoose={setTab} onShowRules={() => setShowRules(true)} />}
        {tab === 'tisch' && (
          <TableScreen
            collection={collection}
            plurals={plurals}
            onAddPoints={(p) => setPoints((total) => total + p)}
          />
        )}
        {tab === 'story' && (
          <StoryScreen
            completed={storyCompleted}
            onComplete={(lessonId) =>
              setStoryCompleted((prev) =>
                prev.includes(lessonId) ? prev : [...prev, lessonId],
              )
            }
            onAddPoints={(p) => setPoints((total) => total + p)}
          />
        )}
        {tab === 'booster' && (
          <Suspense fallback={<p className="empty-hint">Booster lädt …</p>}>
            <BoosterScreen lastBooster={lastBooster} onCollect={handleCollectBooster} />
          </Suspense>
        )}
        {tab === 'sammlung' && (
          <CollectionScreen
            collection={collection}
            plurals={plurals}
            onCraftPlural={handleCraftPlural}
            completedLessons={storyCompleted}
          />
        )}
      </main>

      {tab !== 'menue' && <TabBar tab={tab} onChange={setTab} />}

      {showRules && <Onboarding onClose={() => setShowRules(false)} />}
    </div>
  );
}
