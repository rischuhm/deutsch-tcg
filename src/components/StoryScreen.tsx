import { useMemo, useState } from 'react';
import {
  STORY_CHAPTERS,
  STORY_LESSONS,
  getLesson,
  isLessonUnlocked,
  nextLesson,
} from '../game';
import { LessonRunner } from './LessonRunner';

interface StoryScreenProps {
  /** IDs der abgeschlossenen Lektionen (persistent). */
  completed: string[];
  onComplete: (lessonId: string) => void;
  onAddPoints: (points: number) => void;
}

/**
 * Story-Modus: Kapitel-/Lektionsliste mit Fortschritt, öffnet den
 * LessonRunner für die gewählte Lektion.
 */
export function StoryScreen({
  completed,
  onComplete,
  onAddPoints,
}: StoryScreenProps) {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const activeLesson = activeLessonId ? getLesson(activeLessonId) : undefined;

  if (activeLesson) {
    const following = nextLesson(new Set([...completedSet, activeLesson.id]));
    return (
      <LessonRunner
        key={activeLesson.id}
        lesson={activeLesson}
        completed={completedSet.has(activeLesson.id)}
        onComplete={onComplete}
        onExit={() => setActiveLessonId(null)}
        onNext={following ? () => setActiveLessonId(following.id) : null}
        onAddPoints={onAddPoints}
      />
    );
  }

  const upcoming = nextLesson(completedSet);

  return (
    <div className="story-screen">
      <header className="story-intro">
        <p>DEUTSCH · A1</p>
        <h1>Dein erster Tag</h1>
        <p>Stell dich vor, finde dich im Alltag zurecht und erzähle, was gestern passiert ist.</p>
      </header>
      <p className="story-progress">
        {completedSet.size} / {STORY_LESSONS.length} Lektionen abgeschlossen
      </p>
      {STORY_CHAPTERS.map((chapter) => (
        <section key={chapter.id} className="story-chapter">
          <h2 className="story-chapter-title">
            <span className="story-chapter-number">{chapter.id}</span> <span lang="en">{chapter.title}</span>
          </h2>
          <p className="story-chapter-sub" lang="en">{chapter.subtitle}</p>
          <div className="story-lessons">
            {STORY_LESSONS.filter(
              (lesson) => lesson.chapter === chapter.id,
            ).map((lesson) => {
              const done = completedSet.has(lesson.id);
              const unlocked = isLessonUnlocked(lesson.id, completedSet);
              const isNext = !done && upcoming?.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  className={`story-lesson ${done ? 'done' : ''} ${
                    isNext ? 'next' : ''
                  }`}
                  disabled={!unlocked}
                  onClick={() => setActiveLessonId(lesson.id)}
                >
                  <span className="story-lesson-status">
                    {done ? '✅' : unlocked ? '▶' : '🔒'}
                  </span>
                  <span className="story-lesson-text" lang="en">
                    <span className="story-lesson-title">{lesson.title}</span>
                    <span className="story-lesson-goal">{lesson.goal}</span>
                  </span>
                  {isNext && <span className="story-next-badge">Weiter</span>}
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
