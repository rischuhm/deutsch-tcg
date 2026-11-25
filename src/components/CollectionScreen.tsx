import { useMemo, useState } from 'react';
import type { CardDef, CardInstance, CardType, Collection } from '../game';
import { canCraftPlural, getCard } from '../game';
import { displayWord, RARITY_LABELS, TYPE_LABELS } from '../lib/ui';
import { CardImage } from './CardImage';
import { InspectOverlay } from './InspectOverlay';

interface CollectionScreenProps {
  collection: Collection;
  plurals: Record<string, number>;
  onCraftPlural: (defId: string) => void;
}

type Filter = CardType | 'alle';

const FILTER_ORDER: Filter[] = [
  'alle',
  'noun',
  'verb',
  'modal',
  'pronoun',
  'question',
  'preposition',
  'adjective',
  'adverb',
  'particle',
];

interface OwnedEntry {
  def: CardDef;
  count: number;
}

export function CollectionScreen({
  collection,
  plurals,
  onCraftPlural,
}: CollectionScreenProps) {
  const [filter, setFilter] = useState<Filter>('alle');
  const [inspect, setInspect] = useState<CardInstance | null>(null);

  const owned = useMemo<OwnedEntry[]>(() => {
    const entries: OwnedEntry[] = [];
    for (const [defId, count] of Object.entries(collection)) {
      const def = getCard(defId);
      if (def && count > 0) {
        entries.push({ def, count });
      }
    }
    entries.sort((a, b) =>
      a.def.type === b.def.type
        ? a.def.word.localeCompare(b.def.word, 'de')
        : FILTER_ORDER.indexOf(a.def.type) - FILTER_ORDER.indexOf(b.def.type),
    );
    return entries;
  }, [collection]);

  const pluralEntries = useMemo<OwnedEntry[]>(() => {
    const entries: OwnedEntry[] = [];
    for (const [defId, count] of Object.entries(plurals)) {
      const def = getCard(defId);
      if (def && count > 0) {
        entries.push({ def, count });
      }
    }
    entries.sort((a, b) => a.def.word.localeCompare(b.def.word, 'de'));
    return entries;
  }, [plurals]);

  const filtered =
    filter === 'alle' ? owned : owned.filter((e) => e.def.type === filter);
  const filteredPlurals =
    filter === 'alle' || filter === 'noun' ? pluralEntries : [];

  const totalCards =
    owned.reduce((sum, e) => sum + e.count, 0) +
    pluralEntries.reduce((sum, e) => sum + e.count, 0);

  return (
    <div className="collection-screen">
      <div className="filter-chips">
        {FILTER_ORDER.map((f) => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'alle' ? 'Alle' : TYPE_LABELS[f]}
          </button>
        ))}
      </div>

      {totalCards === 0 ? (
        <p className="empty-hint">
          Deine Sammlung ist noch leer.
          <br />
          Öffne deinen täglichen Booster, um Karten zu bekommen!
        </p>
      ) : (
        <>
          <p className="section-title">
            {totalCards} {totalCards === 1 ? 'Karte' : 'Karten'} in deiner
            Sammlung
          </p>
          <div className="card-grid">
            {filtered.map(({ def, count }) => (
              <div className="collection-card" key={def.id}>
                <span className="count-badge">×{count}</span>
                <button className="collection-inspect" onClick={() => setInspect({ instanceId: def.id, defId: def.id })}>
                  <CardImage defId={def.id} decorative />
                  <span className="card-word">{displayWord({ instanceId: def.id, defId: def.id })}</span>
                </button>
                <span className="card-type">
                  {TYPE_LABELS[def.type]} · {RARITY_LABELS[def.rarity]}
                </span>
                {canCraftPlural(collection, def.id) && (
                  <button
                    className="btn btn-gold craft-btn"
                    onClick={() => onCraftPlural(def.id)}
                  >
                    Plural schmieden (2×)
                  </button>
                )}
              </div>
            ))}
            {filteredPlurals.map(({ def, count }) => (
              <div className="collection-card plural" key={`plural:${def.id}`}>
                <span className="plural-badge">Plural</span>
                <span className="count-badge">×{count}</span>
                <button className="collection-inspect" onClick={() => setInspect({ instanceId: def.id, defId: def.id, isPlural: true })}>
                  <CardImage defId={def.id} decorative />
                  <span className="card-word">die {def.plural ?? def.word}</span>
                </button>
                <span className="card-type">
                  {TYPE_LABELS[def.type]} · geschmiedet
                </span>
              </div>
            ))}
          </div>
        </>
      )}
      {inspect && <InspectOverlay instance={inspect} source="collection" onClose={() => setInspect(null)} />}
    </div>
  );
}
