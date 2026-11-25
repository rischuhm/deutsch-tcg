import { useEffect, useRef, useState } from 'react';
import type { AdvancedLevel, CourseLesson } from '../game/curriculum';
import { matchesExercise, orderedOptions } from '../game/exercises';
import type { Exercise } from '../game/exercises';

interface Props {
  level: AdvancedLevel;
  lesson: CourseLesson;
  completed: boolean;
  onComplete: (id: string) => void;
  onNext?: () => void;
  onExit: () => void;
}

export function CourseLessonRunner({ level, lesson, completed, onComplete, onNext, onExit }: Props) {
  const [step, setStep] = useState(0);
  const [finished, setFinished] = useState(false);
  const screen = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    screen.current?.scrollTo(0, 0);
    title.current?.focus({ preventScroll: true });
  }, [step, finished]);

  const advance = () => {
    if (step + 1 < lesson.exercises.length) {
      setStep(step + 1);
      return;
    }
    if (!completed) onComplete(lesson.id);
    setFinished(true);
  };

  return (
    <div className="course-runner" ref={screen}>
      <div className="course-content">
        <header className="course-header">
          <button className="btn btn-secondary lesson-back" onClick={onExit}>← Lektionen</button>
          <p>{level} · {finished ? 'Abgeschlossen' : `Aufgabe ${step + 1} von ${lesson.exercises.length}`}</p>
          <h1 ref={title} tabIndex={-1}>{finished ? 'Lektion geschafft' : lesson.title}</h1>
        </header>
        {finished ? (
          <div className="course-panel">
            <p>{lesson.title}</p>
            <div className="course-actions">
              {onNext && <button className="btn" onClick={onNext}>Nächste Lektion</button>}
              <button className="btn btn-secondary" onClick={onExit}>Zur Übersicht</button>
            </div>
          </div>
        ) : (
          <>
            <p className="course-scene">{lesson.scene}</p>
            <details className="lesson-help">
              <summary>Erklärung</summary>
              <p>{lesson.rule}</p>
            </details>
            <ExerciseStep key={step} exercise={lesson.exercises[step]!} onNext={advance} />
          </>
        )}
      </div>
    </div>
  );
}

function AudioSource({ source }: { source: string }) {
  const [status, setStatus] = useState('');
  const canSpeak = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const current = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => () => {
    if (current.current) {
      current.current = null;
      window.speechSynthesis.cancel();
    }
  }, []);

  const speak = () => {
    current.current = null;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(source);
    current.current = utterance;
    utterance.lang = 'de-DE';
    utterance.rate = .9;
    const german = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLowerCase().startsWith('de'));
    if (german) utterance.voice = german;
    utterance.onerror = () => {
      if (current.current !== utterance) return;
      current.current = null;
      setStatus('Vorlesen ist gerade nicht verfügbar. Du kannst den Hörtext lesen.');
    };
    utterance.onend = () => {
      if (current.current !== utterance) return;
      current.current = null;
      setStatus('');
    };
    setStatus('Hörtext wird vorgelesen.');
    window.speechSynthesis.speak(utterance);
  };

  return <div className="course-audio">
    {canSpeak && <button className="btn btn-secondary" onClick={speak}>Hörtext abspielen</button>}
    <p role="status">{status}</p>
    <details><summary>Hörtext lesen</summary><p>{source}</p></details>
  </div>;
}

function ExerciseStep({ exercise, onNext }: { exercise: Exercise; onNext: () => void }) {
  if (exercise.kind === 'practice') return <PracticeStep exercise={exercise} onNext={onNext} />;
  return <CheckedStep exercise={exercise} onNext={onNext} />;
}

function CheckedStep({ exercise, onNext }: {
  exercise: Exclude<Exercise, { kind: 'practice' }>;
  onNext: () => void;
}) {
  const [answer, setAnswer] = useState<number[]>([]);
  const [checked, setChecked] = useState<boolean | null>(null);
  const isOrder = exercise.kind === 'order';
  const options = orderedOptions(isOrder ? exercise.answer : [exercise.answer, ...exercise.alternatives], exercise.question);
  const change = (next: number[]) => {
    setAnswer(next);
    setChecked(null);
  };

  return (
    <section className="course-panel">
      <h2>{exercise.question}</h2>
      {exercise.kind === 'choice' && exercise.source && (exercise.listen
        ? <AudioSource source={exercise.source} />
        : <blockquote>{exercise.source}</blockquote>)}
      {isOrder && (
        <div className="course-order">
          <p>Tippe die Bausteine in der Reihenfolge des Mustersatzes an. Tippe einen gelegten Baustein an, um ihn zurückzunehmen.</p>
          <div className="course-tiles" aria-label="Gelegte Bausteine">
            {answer.map((index) => (
              <button key={index} className="course-option" disabled={checked === true}
                aria-label={`${options[index]} zurücknehmen`}
                onClick={() => change(answer.filter((item) => index !== item))}>{options[index]}</button>
            ))}
          </div>
        </div>
      )}
      <div className={isOrder ? 'course-tiles' : 'course-choices'} aria-label={isOrder ? 'Verfügbare Bausteine' : 'Antworten'}>
        {options.map((option, index) => isOrder && answer.includes(index) ? null : (
          <button key={index} className="course-option" disabled={checked === true}
            aria-pressed={isOrder ? undefined : answer.includes(index)}
            onClick={() => change(isOrder ? [...answer, index] : [index])}>{option}</button>
        ))}
      </div>
      <div className="course-feedback" role="status">
        {checked === true && <p><strong>Richtig.</strong> {exercise.feedback}</p>}
        {checked === false && <p>{isOrder ? 'Die Reihenfolge weicht vom Mustersatz ab.' : 'Diese Antwort passt hier noch nicht.'} Prüfe deine Auswahl.</p>}
      </div>
      {checked !== true && <details className="lesson-help">
        <summary>Lösungshilfe</summary>
        <p>{isOrder ? exercise.answer.join(' ') : exercise.answer}</p>
        <p>{exercise.feedback}</p>
      </details>}
      <div className="course-actions">
        {checked === true
          ? <button className="btn" onClick={onNext}>Weiter</button>
          : <button className="btn" disabled={isOrder ? answer.length !== options.length : answer.length !== 1}
            onClick={() => setChecked(matchesExercise(exercise, answer.map((index) => options[index]!)))}>Antwort prüfen</button>}
        {isOrder && checked !== true && answer.length > 0
          && <button className="btn btn-secondary" onClick={() => change([])}>Neu legen</button>}
      </div>
    </section>
  );
}

function PracticeStep({ exercise, onNext }: {
  exercise: Extract<Exercise, { kind: 'practice' }>;
  onNext: () => void;
}) {
  const [text, setText] = useState('');
  const [shown, setShown] = useState(false);
  const [criteria, setCriteria] = useState<string[]>([]);

  return (
    <section className="course-panel">
      <p className="course-tag">{exercise.mode === 'write' ? 'Schreiben' : 'Sprechen'} · Selbstcheck</p>
      <h2 id="practice-question">{exercise.question}</h2>
      {exercise.mode === 'write'
        ? <textarea aria-labelledby="practice-question" value={text} onChange={(event) => setText(event.target.value)} rows={5} />
        : <p>Sprich deine Antwort laut. Vergleiche sie danach mit der Musterantwort.</p>}
      {shown ? (
        <>
          <blockquote>{exercise.model}</blockquote>
          <p>{exercise.feedback}</p>
          <fieldset>
            <legend>Hast du diese Punkte berücksichtigt?</legend>
            {exercise.criteria.map((criterion) => (
              <label key={criterion}><input type="checkbox" checked={criteria.includes(criterion)}
                onChange={(event) => setCriteria(event.target.checked
                  ? [...criteria, criterion]
                  : criteria.filter((item) => item !== criterion))} />{criterion}</label>
            ))}
          </fieldset>
          <button className="btn" disabled={criteria.length !== exercise.criteria.length
            || (exercise.mode === 'write' && !text.trim())} onClick={onNext}>Selbstcheck abschließen</button>
        </>
      ) : (
        <button className="btn btn-secondary" disabled={exercise.mode === 'write' && !text.trim()}
          onClick={() => setShown(true)}>Musterantwort vergleichen</button>
      )}
    </section>
  );
}
