import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type {
  CardInstance,
  GermanCase,
  Person,
  ScoreResult,
  StoryCheckResult,
  StoryLesson,
} from '../game';
import { checkLesson, scoreSentence, validateSentence } from '../game';
import { MAX_SENTENCE, displayWord } from '../lib/ui';
import { InspectOverlay } from './InspectOverlay';
import { TableScene } from './three/TableScene';

/** Hebt deutsche Beispiele «…» im Erklärungstext hervor. */
function renderWithExamples(text: string): ReactNode[] {
  return text.split(/(«[^»]*»)/g).map((part, i) =>
    part.startsWith('«') && part.endsWith('»') ? (
      <em key={i} className="de-example">
        {part}
      </em>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

interface LessonRunnerProps {
  lesson: StoryLesson;
  onComplete: (lessonId: string) => void;
  onExit: () => void;
  /** null, wenn es keine weitere Lektion gibt. */
  onNext: (() => void) | null;
  onAddPoints: (points: number) => void;
}

/**
 * Spielt eine Story-Lektion: fixe Hand aus lesson.handCards (frische
 * Instanzen, unabhängig von der Sammlung), bekannter 3D-Spieltisch mit
 * Inspect-Overlay und Steinchen, Check via checkLesson.
 */
export function LessonRunner({
  lesson,
  onComplete,
  onExit,
  onNext,
  onAddPoints,
}: LessonRunnerProps) {
  // Fixe Lektions-Hand: frische Instanzen (inkl. Distraktoren).
  const initialHand = useMemo<CardInstance[]>(
    () =>
      lesson.handCards.map((defId, i) => ({
        instanceId: `${lesson.id}#${i}`,
        defId,
      })),
    [lesson],
  );

  const [hand, setHand] = useState<CardInstance[]>(initialHand);
  const [played, setPlayed] = useState<CardInstance[]>([]);
  const [inspect, setInspect] = useState<{
    instance: CardInstance;
    source: 'hand' | 'played';
  } | null>(null);
  const [explanationOpen, setExplanationOpen] = useState(true);
  const [checkResult, setCheckResult] = useState<StoryCheckResult | null>(null);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState<ScoreResult | null>(null);

  const playCard = (instance: CardInstance) => {
    if (played.length >= MAX_SENTENCE) {
      return;
    }
    setHand((h) => h.filter((c) => c.instanceId !== instance.instanceId));
    setPlayed((p) => [...p, instance]);
    setCheckResult(null);
    setInspect(null);
  };

  const returnCard = (instance: CardInstance) => {
    setPlayed((p) => p.filter((c) => c.instanceId !== instance.instanceId));
    setHand((h) => [...h, instance]);
    setCheckResult(null);
    setInspect(null);
  };

  const resetSentence = () => {
    setHand((h) => [...h, ...played]);
    setPlayed([]);
    setCheckResult(null);
    setInspect(null);
  };

  const updatePlayedInstance = (updated: CardInstance) => {
    setPlayed((p) =>
      p.map((c) => (c.instanceId === updated.instanceId ? updated : c)),
    );
    setInspect((current) =>
      current && current.instance.instanceId === updated.instanceId
        ? { ...current, instance: updated }
        : current,
    );
    setCheckResult(null);
  };

  const togglePersonChip = (person: Person) => {
    if (!inspect || inspect.source !== 'played') {
      return;
    }
    const updated: CardInstance = { ...inspect.instance };
    if (inspect.instance.chosenPerson === person) {
      delete updated.chosenPerson;
    } else {
      updated.chosenPerson = person;
    }
    updatePlayedInstance(updated);
  };

  const toggleCaseChip = (germanCase: GermanCase) => {
    if (!inspect || inspect.source !== 'played') {
      return;
    }
    const updated: CardInstance = { ...inspect.instance };
    if (inspect.instance.chosenCase === germanCase) {
      delete updated.chosenCase;
    } else {
      updated.chosenCase = germanCase;
    }
    updatePlayedInstance(updated);
  };

  const check = () => {
    const res = checkLesson(lesson, played);
    setCheckResult(res);
    if (res.complete) {
      setFinished(true);
      onComplete(lesson.id);
      // Bonus: wenn der Satz zusätzlich den allgemeinen Validator besteht,
      // gibt es die bekannten Satzpunkte obendrauf.
      const validation = validateSentence(played);
      if (validation.valid) {
        const s = scoreSentence(validation, played.length);
        onAddPoints(s.total);
        setScore(s);
      }
    }
  };

  return (
    <div className="lesson-runner">
      <div className="lesson-header">
        <button className="btn btn-secondary lesson-back" onClick={onExit}>
          ← Lektionen
        </button>
        <span className="lesson-header-title">{lesson.title}</span>
      </div>

      <div className="lesson-panel">
        <p className="lesson-goal">🎯 {lesson.goal}</p>
        <p className="lesson-target">
          Build: <em className="de-example">«{lesson.targetSentence}»</em>
        </p>
        <button
          className="lesson-panel-toggle"
          onClick={() => setExplanationOpen((o) => !o)}
        >
          {explanationOpen ? '▼ Erklärung einklappen' : '▶ Erklärung lesen'}
        </button>
        {explanationOpen && (
          <div className="lesson-explanation">
            {lesson.explanation.map((paragraph, i) => (
              <p key={i}>{renderWithExamples(paragraph)}</p>
            ))}
          </div>
        )}
      </div>

      <div className="table-screen lesson-table">
        <div className="table-canvas">
          <TableScene
            hand={hand}
            played={played}
            onPlayCard={(instance) => setInspect({ instance, source: 'hand' })}
            onReturnCard={(instance) =>
              setInspect({ instance, source: 'played' })
            }
          />
        </div>

        {played.length > 0 && (
          <div className="played-words">{played.map(displayWord).join(' ')}</div>
        )}

        <div className="table-controls">
          <button className="btn" onClick={check} disabled={played.length === 0}>
            Check ✓
          </button>
          <button
            className="btn btn-secondary"
            onClick={resetSentence}
            disabled={played.length === 0}
          >
            Reset
          </button>
        </div>

        {inspect && (
          <InspectOverlay
            instance={inspect.instance}
            source={inspect.source}
            playedFull={played.length >= MAX_SENTENCE}
            onPlay={playCard}
            onReturn={returnCard}
            onTogglePerson={togglePersonChip}
            onToggleCase={toggleCaseChip}
            onClose={() => setInspect(null)}
          />
        )}

        {checkResult && !checkResult.complete && (
          <div className="result-overlay" onClick={() => setCheckResult(null)}>
            <div
              className="result-card"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <h2>Fast! 💪</h2>
              <ul className="error-list">
                {checkResult.problems.map((problem) => (
                  <li key={problem}>{problem}</li>
                ))}
              </ul>
              <button
                className="btn result-close"
                onClick={() => setCheckResult(null)}
              >
                Keep trying
              </button>
            </div>
          </div>
        )}

        {finished && (
          <div className="result-overlay">
            <div className="result-card">
              <h2>Lesson complete! 🎉</h2>
              {score && (
                <>
                  {score.breakdown.map((entry) => (
                    <div className="breakdown-row" key={entry.label}>
                      <span>{entry.label}</span>
                      <span>+{entry.points}</span>
                    </div>
                  ))}
                  <div className="breakdown-total">
                    <span>Bonuspunkte</span>
                    <span>+{score.total}</span>
                  </div>
                </>
              )}
              {onNext ? (
                <button className="btn result-close" onClick={onNext}>
                  Next lesson ▶
                </button>
              ) : (
                <p className="lesson-done-note">
                  Du hast alle Lektionen geschafft! 🏆
                </p>
              )}
              <button className="btn btn-secondary result-close" onClick={onExit}>
                Zurück zur Übersicht
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
