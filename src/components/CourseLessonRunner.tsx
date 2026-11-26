import { useEffect, useRef, useState } from 'react';
import type { AdvancedLevel, CourseLesson } from '../game/curriculum';
import { CourseCardStep } from './CourseCardStep';

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
            <p>Das Lektionsdeck ist in deiner Sammlung spielbar.</p>
            <div className="course-actions">
              {onNext && <button className="btn" onClick={onNext}>Nächste Lektion</button>}
              <button className="btn btn-secondary" onClick={onExit}>Zur Übersicht</button>
            </div>
          </div>
        ) : (
          <>
            <p className="course-scene">{lesson.scene}</p>
            <details className="lesson-help" open>
              <summary>Grammatik</summary>
              <p>{lesson.rule}</p>
            </details>
            <CourseCardStep key={step} exercise={lesson.exercises[step]!} onNext={advance} />
          </>
        )}
      </div>
    </div>
  );
}
