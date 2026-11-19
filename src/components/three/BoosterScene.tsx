import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import type { CardDef } from '../../game';
import { CARD_H, CARD_W, RARITY_GLOW } from '../../lib/ui';
import { useCardTexture } from '../../hooks/useCardTexture';

function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, 1.2, 1.4);
  }, [camera]);
  return null;
}

interface BoosterCardProps {
  def: CardDef;
  index: number;
}

/** Einzelne Booster-Karte: fliegt gestaffelt auf und dreht sich um. */
function BoosterCard({ def, index }: BoosterCardProps) {
  const group = useRef<THREE.Group>(null);
  const glowMat = useRef<THREE.MeshBasicMaterial>(null);
  const born = useRef<number | null>(null);
  const texture = useCardTexture(def.id);
  const glow = RARITY_GLOW[def.rarity];

  const delay = index * 0.35;
  const duration = 0.9;
  const c = index - 2;
  const target = { x: c * 0.84, y: 1.35, z: 1.7, rotX: -0.32, rotZ: c * -0.09 };

  useFrame(({ clock }) => {
    const g = group.current;
    if (!g) {
      return;
    }
    if (born.current === null) {
      born.current = clock.elapsedTime;
    }
    const t = clock.elapsedTime - born.current - delay;
    const raw = THREE.MathUtils.clamp(t / duration, 0, 1);
    const e = 1 - Math.pow(1 - raw, 3); // easeOutCubic

    g.position.set(
      THREE.MathUtils.lerp(0, target.x, e),
      THREE.MathUtils.lerp(-2.4, target.y, e),
      target.z,
    );
    g.rotation.set(
      THREE.MathUtils.lerp(0.7, target.rotX, e),
      Math.PI * (1 - e),
      THREE.MathUtils.lerp(0, target.rotZ, e),
    );
    g.scale.setScalar(0.35 + 0.65 * e);

    if (glowMat.current && glow) {
      glowMat.current.opacity =
        raw >= 1 ? 0.3 + 0.18 * Math.sin(clock.elapsedTime * 4 + index * 1.7) : 0;
    }
  });

  return (
    <group ref={group} position={[0, -2.4, target.z]} rotation={[0.7, Math.PI, 0]} scale={0.35}>
      {glow && (
        <mesh position={[0, 0, -0.07]}>
          <planeGeometry args={[CARD_W * 1.45, CARD_H * 1.35]} />
          <meshBasicMaterial
            ref={glowMat}
            color={glow}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
      <RoundedBox args={[CARD_W, CARD_H, 0.035]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#e2e8f0" roughness={0.55} />
      </RoundedBox>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
        {texture ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshBasicMaterial color="#1e293b" />
        )}
      </mesh>
      {/* Rückseite */}
      <mesh position={[0, 0, -0.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[CARD_W - 0.02, CARD_H - 0.02]} />
        <meshBasicMaterial color="#334155" />
      </mesh>
    </group>
  );
}

interface BoosterSceneProps {
  cards: CardDef[];
}

/** 3D-Fanfare: 5 Karten fliegen nacheinander auf, Rarity-Glanz dahinter. */
export function BoosterScene({ cards }: BoosterSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2.7, 6.1], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 2]}
    >
      <CameraRig />
      <color attach="background" args={['#0f172a']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 7, 6]} intensity={1.2} />
      <pointLight position={[0, 2, 4]} intensity={6} color="#38bdf8" />
      {cards.map((def, i) => (
        <BoosterCard key={`${def.id}#${i}`} def={def} index={i} />
      ))}
    </Canvas>
  );
}
