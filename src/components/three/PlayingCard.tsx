import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { CardInstance } from '../../game';
import { CARD_H, CARD_W } from '../../lib/ui';
import { useCardTexture } from '../../hooks/useCardTexture';

interface PlayingCardProps {
  instance: CardInstance;
  basePosition: [number, number, number];
  baseRotation: [number, number, number];
  /** Wie weit sich die Karte bei Hover/Berührung hebt (Welt-Y). */
  hoverLift?: number;
  /** Karte wird als „jetzt sinnvoll spielbar" hervorgehoben. */
  suggested?: boolean;
  onTap: (instance: CardInstance) => void;
}

/**
 * Spielkarte auf dem 3D-Tisch: abgerundeter Körper + Face-Textur.
 * Position/Rotation werden per useFrame weich an die Zielwerte gelerpt,
 * Hover/Touch hebt die Karte an und kippt sie leicht Richtung Kamera.
 */
export function PlayingCard({
  instance,
  basePosition,
  baseRotation,
  hoverLift = 0.25,
  suggested = false,
  onTap,
}: PlayingCardProps) {
  const group = useRef<THREE.Group>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const texture = useCardTexture(instance.defId);

  useFrame(({ clock }, delta) => {
    const g = group.current;
    if (!g) {
      return;
    }
    const k = 1 - Math.exp(-12 * delta);
    g.position.x = THREE.MathUtils.lerp(g.position.x, basePosition[0], k);
    g.position.y = THREE.MathUtils.lerp(
      g.position.y,
      basePosition[1] + (hovered ? hoverLift : 0),
      k,
    );
    g.position.z = THREE.MathUtils.lerp(g.position.z, basePosition[2], k);
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      baseRotation[0] + (hovered ? -0.14 : 0),
      k,
    );
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, baseRotation[1], k);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, baseRotation[2], k);
    const targetScale = hovered ? 1.09 : 1;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, targetScale, k));
    if (glowMat.current) {
      glowMat.current.opacity = 0.35 + 0.25 * Math.sin(clock.elapsedTime * 3);
    }
  });

  return (
    <group
      ref={group}
      position={basePosition}
      rotation={baseRotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        onTap(instance);
      }}
    >
      <RoundedBox args={[CARD_W, CARD_H, 0.032]} radius={0.05} smoothness={4}>
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#e2e8f0'}
          roughness={0.55}
        />
      </RoundedBox>
      {suggested && (
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[CARD_W + 0.09, CARD_H + 0.09]} />
          <meshBasicMaterial
            ref={glowMat}
            color="#34d399"
            transparent
            opacity={0.4}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
      <mesh position={[0, 0, 0.018]}>
        <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
        {texture ? (
          <meshBasicMaterial
            key={texture.uuid}
            map={texture}
            toneMapped={false}
          />
        ) : (
          <meshBasicMaterial key="placeholder" color="#1e293b" />
        )}
      </mesh>
      {instance.isPlural === true && (
        <mesh position={[0, CARD_H / 2 + 0.015, 0]}>
          <boxGeometry args={[CARD_W * 0.55, 0.055, 0.055]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
      )}
    </group>
  );
}
