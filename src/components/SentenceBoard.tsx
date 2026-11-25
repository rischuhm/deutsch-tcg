import { lazy, Suspense, useLayoutEffect, useRef, useState } from 'react';
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const focusAfterMove = useRef<HTMLButtonElement | null>(null);
  const { hand, played, inspect, setInspect } = cards;

  useLayoutEffect(() => {
    focusAfterMove.current?.focus({ preventScroll: true });
    focusAfterMove.current = null;
  }, [played]);

  const endDrag = () => {
    setDraggedId(null);
    setDropTarget(null);
  };

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
        {played.length > 0 && (
          <ol className="board-row played-cards" aria-label="Gelegte Karten">
            {played.map((instance, index) => {
              const id = instance.instanceId;
              const word = displayWord(instance);
              return (
                <li key={id} className="played-card-slot" data-drop-target={dropTarget === id || undefined}
                  onDragOver={(event) => {
                    if (!draggedId || draggedId === id) return;
                    event.preventDefault();
                    event.dataTransfer.dropEffect = 'move';
                    setDropTarget(id);
                  }}
                  onDragLeave={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setDropTarget((target) => target === id ? null : target);
                    }
                  }}
                  onDrop={(event) => {
                    if (!draggedId) return;
                    event.preventDefault();
                    cards.movePlayed(draggedId, id);
                    endDrag();
                  }}>
                  <div className="played-card-face" draggable={played.length > 1}
                    onDragStart={(event) => {
                      event.dataTransfer.setData('text/plain', word);
                      event.dataTransfer.effectAllowed = 'move';
                      setDraggedId(id);
                    }}
                    onDragEnd={endDrag}>
                    {renderCard(instance, 'played')}
                  </div>
                  {played.length > 1 && <div className="played-card-controls">
                    {([-1, 1] as const).map((offset) => {
                      const neighbor = played[index + offset];
                      const label = offset < 0 ? 'nach vorne' : 'nach hinten';
                      return <button key={offset} type="button" className="played-card-move"
                        aria-disabled={!neighbor} aria-label={`Karte ${index + 1}: „${word}“ ${label} verschieben`}
                        title={`Karte ${label} verschieben`}
                        onClick={(event) => {
                          if (!neighbor) return;
                          focusAfterMove.current = event.currentTarget;
                          cards.movePlayed(id, neighbor.instanceId);
                        }}>{offset < 0 ? '←' : '→'}</button>;
                    })}
                  </div>}
                </li>
              );
            })}
          </ol>
        )}
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
