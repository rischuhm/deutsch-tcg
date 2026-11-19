import { useState } from 'react';
import { getCard } from '../game';
import { TYPE_COLORS, cardFaceUrl } from '../lib/ui';

interface CardImageProps {
  defId: string;
}

/** Kartenbild mit Fallback-Kachel, falls das PNG (noch) fehlt. */
export function CardImage({ defId }: CardImageProps) {
  const [failed, setFailed] = useState(false);
  const def = getCard(defId);

  if (failed || !def) {
    const color = def ? TYPE_COLORS[def.type] : '#334155';
    return (
      <div className="card-img-fallback" style={{ backgroundColor: color }}>
        {def?.word ?? defId}
      </div>
    );
  }

  return (
    <img
      src={cardFaceUrl(defId)}
      alt={def.word}
      loading="lazy"
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
