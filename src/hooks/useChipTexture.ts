import { useMemo } from 'react';
import * as THREE from 'three';

const cache = new Map<string, THREE.CanvasTexture>();

const SIZE = 128;
const STONE_COLOR = '#d8c9a8';
const RIM_COLOR = '#8a7a55';
const TEXT_COLOR = '#3f341f';

/**
 * Erzeugt (und cached) die Oberflächen-Textur für ein Steinchen:
 * sandfarbener Stein mit dunklem Rand und dunklem Label
 * (z. B. „kommst" oder „den Tisch").
 */
export function getChipTexture(label: string): THREE.CanvasTexture {
  const cached = cache.get(label);
  if (cached) {
    return cached;
  }
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const c = SIZE / 2;
    // Steingrund
    ctx.fillStyle = STONE_COLOR;
    ctx.beginPath();
    ctx.arc(c, c, c, 0, Math.PI * 2);
    ctx.fill();
    // Dunkler Rand
    ctx.strokeStyle = RIM_COLOR;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(c, c, c - 5, 0, Math.PI * 2);
    ctx.stroke();
    // Label, Schriftgröße an Textlänge anpassen
    ctx.fillStyle = TEXT_COLOR;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let fontSize = 26;
    const maxWidth = SIZE - 34;
    do {
      ctx.font = `700 ${fontSize}px system-ui, sans-serif`;
      if (ctx.measureText(label).width <= maxWidth) {
        break;
      }
      fontSize -= 2;
    } while (fontSize > 9);
    ctx.fillText(label, c, c + 1, maxWidth);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  cache.set(label, texture);
  return texture;
}

/** Hook-Variante mit Memoization pro Label. */
export function useChipTexture(label: string | null): THREE.CanvasTexture | null {
  return useMemo(() => (label === null ? null : getChipTexture(label)), [label]);
}
