import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { getCard } from '../game';
import { TYPE_COLORS, cardFaceUrl } from '../lib/ui';

const cache = new Map<string, THREE.Texture>();

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/**
 * Fallback-Textur (Canvas), falls zu einer defId noch kein PNG existiert.
 * Wichtig, weil cards.json parallel erweitert wird.
 */
function createFallbackTexture(defId: string): THREE.Texture {
  const cacheKey = `fallback:${defId}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  const def = getCard(defId);
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 358;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const color = def ? TYPE_COLORS[def.type] : '#334155';
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;
    drawRoundRect(ctx, 8, 8, 240, 342, 20);
    ctx.fill();
    ctx.fillStyle = '#0f172a';
    ctx.font = '700 34px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(def?.word ?? defId, 128, 179, 220);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(cacheKey, texture);
  return texture;
}

/**
 * Lädt die Kartenface-Textur zu einer defId (mit Cache).
 * Liefert bei fehlendem PNG eine generierte Fallback-Textur.
 */
export function useCardTexture(defId: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(
    () => cache.get(defId) ?? null,
  );

  useEffect(() => {
    const cached = cache.get(defId);
    if (cached) {
      setTexture(cached);
      return;
    }
    let cancelled = false;
    new THREE.TextureLoader().load(
      cardFaceUrl(defId),
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 4;
        cache.set(defId, tex);
        if (!cancelled) {
          setTexture(tex);
        }
      },
      undefined,
      () => {
        const fallback = createFallbackTexture(defId);
        cache.set(defId, fallback);
        if (!cancelled) {
          setTexture(fallback);
        }
      },
    );
    return () => {
      cancelled = true;
    };
  }, [defId]);

  return texture;
}
