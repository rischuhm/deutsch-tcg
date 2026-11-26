import { lazy, Suspense, useRef, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import type { CardDef, CardInstance, CardType } from '../game';
import { getCard, hasFormChip } from '../game';
import type { useSentenceCards } from '../hooks/useSentenceCards';
import { displayWord, iconUrl, MAX_SENTENCE, sentenceText, TYPE_COLORS, TYPE_LABELS } from '../lib/ui';
import { InspectOverlay } from './InspectOverlay';

const TableScene = lazy(() => import('./three/TableScene').then(({ TableScene }) => ({ default: TableScene })));

interface SentenceBoardProps {
  cards: ReturnType<typeof useSentenceCards>;
  actions: ReactNode;
  definitions?: ReadonlyMap<string, CardDef>;
  endMark?: string;
  hint?: { text: string; types: CardType[] };
  isSentence?: boolean;
  enable3D?: boolean;
}

export function SentenceBoard({ cards, actions, definitions, endMark, hint, isSentence = true, enable3D = false }: SentenceBoardProps) {
  const [show3D, setShow3D] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const touchDrag = useRef<{ pointer: number; id: string; x: number; y: number; active: boolean } | null>(null);
  const suppressTouchClick = useRef(false);
  const { hand, played, inspect, setInspect } = cards;

  const endDrag = () => {
    setDraggedId(null);
    setDropTarget(null);
  };

  const targetAt = (event: PointerEvent) =>
    document.elementFromPoint(event.clientX, event.clientY)
      ?.closest<HTMLElement>('.played-card-slot')?.dataset.cardId;

  const endTouchDrag = (event: PointerEvent<HTMLDivElement>, drop: boolean) => {
    const drag = touchDrag.current;
    if (!drag || drag.pointer !== event.pointerId) return;
    touchDrag.current = null;
    if (!drag.active) return;
    suppressTouchClick.current = true;
    event.currentTarget.style.removeProperty('--touch-x');
    event.currentTarget.style.removeProperty('--touch-y');
    delete event.currentTarget.dataset.touchDragging;
    const target = drop ? targetAt(event) : undefined;
    if (target) cards.movePlayed(drag.id, target);
    endDrag();
  };

  const renderCard = (instance: CardInstance, source: 'hand' | 'played') => {
    const def = definitions?.get(instance.defId) ?? getCard(instance.defId);
    if (!def) return null;
    const marked = hasFormChip(instance);
    const helpful = source === 'hand' && hint?.types.includes(def.type);
    return (
      <button key={instance.instanceId} type="button"
        className={`board-card ${helpful ? 'board-card-hint' : ''}`}
        style={{ '--card-accent': TYPE_COLORS[def.type] } as React.CSSProperties}
        onClick={() => setInspect({ source, instance })}>
        <span className="board-card-type">{TYPE_LABELS[def.type]}</span>
        {source === 'hand' && def.icon && <img src={iconUrl(def.icon)} alt="" />}
        <strong>{displayWord(instance, definitions)}</strong>
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
        <p className="board-preview" aria-live="polite">{sentenceText(played, isSentence, definitions, endMark) || 'Wähle eine Karte aus deiner Hand.'}</p>
        {played.length > 0 && (
          <ol className="board-row played-cards" aria-label="Gelegte Karten">
            {played.map((instance) => {
              const id = instance.instanceId;
              const word = displayWord(instance, definitions);
              return (
                <li key={id} className="played-card-slot" data-card-id={id}
                  data-drop-target={dropTarget === id || undefined} data-dragging={draggedId === id || undefined}
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
                    onPointerDown={(event) => {
                      suppressTouchClick.current = false;
                      if (event.pointerType !== 'touch' || !event.isPrimary || played.length < 2) return;
                      touchDrag.current = { pointer: event.pointerId, id, x: event.clientX, y: event.clientY, active: false };
                    }}
                    onPointerMove={(event) => {
                      const drag = touchDrag.current;
                      if (!drag || drag.pointer !== event.pointerId) return;
                      const dx = event.clientX - drag.x;
                      const dy = event.clientY - drag.y;
                      if (!drag.active) {
                        if (Math.hypot(dx, dy) < 9) return;
                        drag.active = true;
                        event.currentTarget.dataset.touchDragging = 'true';
                        setDraggedId(id);
                      }
                      event.currentTarget.style.setProperty('--touch-x', `${dx}px`);
                      event.currentTarget.style.setProperty('--touch-y', `${dy}px`);
                      const target = targetAt(event);
                      setDropTarget(target !== id ? target ?? null : null);
                    }}
                    onPointerUp={(event) => endTouchDrag(event, true)}
                    onPointerCancel={(event) => endTouchDrag(event, false)}
                    onLostPointerCapture={(event) => endTouchDrag(event, false)}
                    onClickCapture={(event) => {
                      if (!suppressTouchClick.current || event.detail === 0) return;
                      suppressTouchClick.current = false;
                      event.stopPropagation();
                    }}
                    onDragStart={(event) => {
                      if (touchDrag.current) {
                        event.preventDefault();
                        return;
                      }
                      event.dataTransfer.setData('text/plain', word);
                      event.dataTransfer.effectAllowed = 'move';
                      setDraggedId(id);
                    }}
                    onDragEnd={endDrag}>
                    {renderCard(instance, 'played')}
                  </div>
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
        definitions={definitions}
        playedFull={played.length >= MAX_SENTENCE}
        onPlay={cards.play}
        onReturn={cards.returnToHand}
        onChange={cards.update}
        onClose={() => setInspect(null)}
      />}
    </section>
  );
}
