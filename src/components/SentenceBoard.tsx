import { lazy, Suspense, useState } from 'react';
import type { ReactNode } from 'react';
import type { CardInstance, CardType } from '../game';
import { getCard, hasFormChip } from '../game';
import type { useSentenceCards } from '../hooks/useSentenceCards';
import { displayWord, iconUrl, MAX_SENTENCE, sentenceText, TYPE_COLORS, TYPE_LABELS } from '../lib/ui';
import { InspectOverlay } from './InspectOverlay';

const TableScene = lazy(() => import('./three/TableScene').then(({ TableScene }) => ({ default: TableScene })));

interface SentenceBoardProps {
  cards: ReturnType<typeof useSentenceCards>;
  actions: ReactNode;
  hint?: { text: string; types: CardType[] };
  isSentence?: boolean;
  enable3D?: boolean;
}

export function SentenceBoard({ cards, actions, hint, isSentence = true, enable3D = false }: SentenceBoardProps) {
  const [show3D, setShow3D] = useState(false);
  const { hand, played, inspect, setInspect } = cards;

  const renderCard = (instance: CardInstance, source: 'hand' | 'played') => {
    const def = getCard(instance.defId);
    if (!def) return null;
    const marked = hasFormChip(instance);
    const helpful = source === 'hand' && hint?.types.includes(def.type);
    return (
      <button key={instance.instanceId} type="button"
        className={`board-card ${helpful ? 'board-card-hint' : ''}`}
        style={{ '--card-accent': TYPE_COLORS[def.type] } as React.CSSProperties}
        onClick={() => setInspect({ source, instance })}>
        <span className="board-card-type">{TYPE_LABELS[def.type]}</span>
        {source === 'hand' && <img src={iconUrl(def.icon)} alt="" />}
        <strong>{displayWord(instance)}</strong>
        {source === 'hand' && def.translation && <span className="board-card-translation" lang="en">{def.translation}</span>}
        {marked && <span className="form-stone" aria-label="Steinchen gesetzt" />}
      </button>
    );
  };
  return (
    <section className="sentence-board" aria-label="Spieltisch">
      <div className="board-played">
        <div className="board-heading">
          <h2>Satzleiste</h2>
          {enable3D && <button className="chip" onClick={() => setShow3D(!show3D)} aria-pressed={show3D}>
            {show3D ? 'Kartenansicht' : '3D-Ansicht'}
          </button>}
        </div>
        <p className="board-preview" aria-live="polite">{sentenceText(played, isSentence) || 'Wähle eine Karte aus deiner Hand.'}</p>
        {played.length > 0 && <div className="board-row" aria-label="Gelegte Karten">
          {played.map((instance) => renderCard(instance, 'played'))}
        </div>}
      </div>
      {show3D ? (
        <div className="board-three">
          <Suspense fallback={<p>Spieltisch lädt …</p>}>
            <TableScene hand={hand} played={played} suggestedTypes={hint?.types}
              onPlayCard={(instance) => setInspect({ source: 'hand', instance })}
              onReturnCard={(instance) => setInspect({ source: 'played', instance })} />
          </Suspense>
        </div>
      ) : (
        <section className="board-hand">
          <h2>Deine Hand</h2>
          <div className="board-row">
            {hand.map((instance) => renderCard(instance, 'hand'))}
          </div>
          {hand.length === 0 && <p>Alle Karten aus der Hand liegen auf der Satzleiste.</p>}
        </section>
      )}
      {hint && <p className="board-hint">{hint.text}</p>}
      <div className="board-actions">{actions}</div>
      {inspect && <InspectOverlay
        key={`${inspect.source}:${inspect.instance.instanceId}`}
        {...inspect}
        playedFull={played.length >= MAX_SENTENCE}
        onPlay={cards.play}
        onReturn={cards.returnToHand}
        onChange={cards.update}
        onClose={() => setInspect(null)}
      />}
    </section>
  );
}
