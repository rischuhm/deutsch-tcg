import { useEffect, useState } from 'react';
import type { CardDef } from '../game';
import { CARD_POOL, canOpenBoosterToday, dailyBooster, nounForm } from '../game';
import {
  RARITY_LABELS,
  formatCountdown,
  msUntilMidnight,
  todayLocalISO,
} from '../lib/ui';
import { BoosterScene } from './three/BoosterScene';

interface BoosterScreenProps {
  lastBooster: string | null;
  onCollect: (defIds: string[], openedAtISO: string) => void;
}

type Phase = 'idle' | 'revealing' | 'done';

export function BoosterScreen({ lastBooster, onCollect }: BoosterScreenProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [booster, setBooster] = useState<CardDef[]>([]);
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const canOpen = canOpenBoosterToday(lastBooster, todayLocalISO());

  // Countdown tickt nur, wenn heute schon geöffnet wurde.
  useEffect(() => {
    if (canOpen) {
      return;
    }
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [canOpen]);

  useEffect(() => {
    if (phase !== 'revealing') return;
    const timeout = window.setTimeout(() => setPhase('done'), 5 * 350 + 900 + 400);
    return () => window.clearTimeout(timeout);
  }, [phase]);

  const openBooster = () => {
    const today = todayLocalISO();
    setOpenedOn(today);
    setBooster(dailyBooster(today, CARD_POOL));
    setPhase('revealing');
  };

  const collect = () => {
    if (!openedOn) return;
    onCollect(booster.map((c) => c.id), openedOn);
    setBooster([]);
    setPhase('idle');
  };

  if (phase !== 'idle') {
    return (
      <div className="booster-screen">
        <div className="booster-canvas">
          <BoosterScene cards={booster} />
        </div>
        <div className="booster-names">
          {booster.map((def, i) => (
            <span key={`${def.id}#${i}`} className={`name-chip ${def.rarity}`}>
              {def.type === 'noun' ? nounForm(def, 'Nominativ', false) : def.word}
            </span>
          ))}
        </div>
        <div className="booster-actions">
          <button
            className="btn btn-gold"
            onClick={collect}
            disabled={phase !== 'done'}
          >
            {phase === 'done' ? 'In Sammlung legen' : 'Booster wird geöffnet …'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booster-screen">
      <div className="booster-idle">
        <div className="booster-pack-icon">🎁</div>
        {canOpen ? (
          <>
            <h2>Dein Tages-Booster ist bereit!</h2>
            <p className="booster-hint">
              5 neue Karten warten auf dich — mindestens eine davon ist
              ungewöhnlich oder seltener.
            </p>
            <button className="btn btn-gold" onClick={openBooster}>
              Booster öffnen
            </button>
          </>
        ) : (
          <>
            <h2>Nächster Booster morgen</h2>
            <p className="booster-hint">
              Du hast deinen heutigen Booster schon geöffnet.
            </p>
            <div className="countdown" data-now={now}>
              {formatCountdown(msUntilMidnight())}
            </div>
            <p className="booster-hint">bis zum nächsten Booster</p>
          </>
        )}
        <p className="booster-legend">
          Seltenheiten: {RARITY_LABELS.common} · {RARITY_LABELS.uncommon} ·{' '}
          {RARITY_LABELS.rare}
        </p>
      </div>
    </div>
  );
}
