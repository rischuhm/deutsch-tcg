import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import type { CardInstance } from '../../game';
import { CARD_H, CARD_W, MAX_SENTENCE } from '../../lib/ui';
import { PlayingCard } from './PlayingCard';

const STRIP_Z = -1.0;
const STRIP_WIDTH = MAX_SENTENCE * (CARD_W + 0.14) + 0.4;
const STRIP_HEIGHT = CARD_H + 0.4;

/** Kamera leicht von oben-schräg auf die Tischmitte. */
function CameraRig() {
  const camera = useThree((s) => s.camera);
  useEffect(() => {
    camera.lookAt(0, 0.3, 0.3);
  }, [camera]);
  return null;
}

/** Dunkler Tisch: große Grundfläche + Samtgrün-Spielfläche. */
function Table() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0b1120" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0.3]}>
        <planeGeometry args={[13.5, 9.5]} />
        <meshStandardMaterial color="#14532d" roughness={0.95} />
      </mesh>
    </group>
  );
}

/** Leuchtende Outline als Zielbereich für den Satz. */
function SentenceStrip() {
  const t = 0.05;
  const y = 0.02;
  const color = '#34d399';
  return (
    <group position={[0, 0, STRIP_Z]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.006, 0]}>
        <planeGeometry args={[STRIP_WIDTH, STRIP_HEIGHT]} />
        <meshStandardMaterial
          color="#052e22"
          transparent
          opacity={0.65}
          roughness={1}
        />
      </mesh>
      <mesh position={[0, y, -STRIP_HEIGHT / 2]}>
        <boxGeometry args={[STRIP_WIDTH, t, t]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[0, y, STRIP_HEIGHT / 2]}>
        <boxGeometry args={[STRIP_WIDTH, t, t]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[-STRIP_WIDTH / 2, y, 0]}>
        <boxGeometry args={[t, t, STRIP_HEIGHT]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh position={[STRIP_WIDTH / 2, y, 0]}>
        <boxGeometry args={[t, t, STRIP_HEIGHT]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}

interface TableSceneProps {
  hand: CardInstance[];
  played: CardInstance[];
  onPlayCard: (instance: CardInstance) => void;
  onReturnCard: (instance: CardInstance) => void;
}

export function TableScene({
  hand,
  played,
  onPlayCard,
  onReturnCard,
}: TableSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 5.6, 6.6], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 2]}
    >
      <CameraRig />
      <color attach="background" args={['#0f172a']} />
      <fog attach="fog" args={['#0f172a', 14, 30]} />
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 9, 6]} intensity={1.15} />
      <directionalLight position={[-5, 6, -3]} intensity={0.3} />

      <Table />
      <SentenceStrip />

      {played.map((instance, i) => (
        <PlayingCard
          key={instance.instanceId}
          instance={instance}
          basePosition={[
            (i - (played.length - 1) / 2) * (CARD_W + 0.14),
            0.03 + i * 0.002,
            STRIP_Z,
          ]}
          baseRotation={[-Math.PI / 2, 0, 0]}
          hoverLift={0.12}
          onTap={onReturnCard}
        />
      ))}

      {hand.map((instance, i) => {
        const n = hand.length;
        const off = i - (n - 1) / 2;
        const spread = Math.min(0.62, 6 / Math.max(n, 1));
        return (
          <PlayingCard
            key={instance.instanceId}
            instance={instance}
            basePosition={[
              off * spread,
              0.78 - Math.abs(off) * 0.015,
              2.75 - Math.abs(off) * 0.05,
            ]}
            baseRotation={[-0.38, 0, off * -0.055]}
            hoverLift={0.32}
            onTap={onPlayCard}
          />
        );
      })}
    </Canvas>
  );
}
