import { useMemo, useState } from 'react';
import { STORY_CHAPTERS, STORY_LESSONS, getLesson, isLessonUnlocked, nextLesson } from '../game';
import { ADVANCED_LEVELS, CURRICULUM, isCourseLessonUnlocked } from '../game/curriculum';
import { LessonRunner } from './LessonRunner';
import { CourseLessonRunner } from './CourseLessonRunner';

interface StoryScreenProps {
  completed: string[];
  onComplete: (lessonId: string) => void;
  onAddPoints: (points: number) => void;
}

const LEVELS = ['A1', ...ADVANCED_LEVELS] as const;

export function StoryScreen({ completed, onComplete, onAddPoints }: StoryScreenProps) {
  const [level, setLevel] = useState<(typeof LEVELS)[number]>('A1');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [freePractice, setFreePractice] = useState(false);
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const openLesson = (id: string) => setActiveLessonId(id);
  const exit = () => setActiveLessonId(null);
  const activeLesson = activeLessonId && level === 'A1' ? getLesson(activeLessonId) : undefined;

  if (activeLesson) {
    const following = freePractice
      ? STORY_LESSONS[STORY_LESSONS.indexOf(activeLesson) + 1]
      : nextLesson(new Set([...completedSet, activeLesson.id]));
    return (
      <LessonRunner key={activeLesson.id} lesson={activeLesson} completed={completedSet.has(activeLesson.id)}
        onComplete={onComplete} onExit={exit} onNext={following ? () => openLesson(following.id) : null}
        onAddPoints={onAddPoints}
        completesLevel={STORY_LESSONS.every(({ id }) => id === activeLesson.id || completedSet.has(id))} />
    );
  }

  const course = level === 'A1' ? undefined : CURRICULUM[level];
  if (level !== 'A1' && course && activeLessonId) {
    const index = course.lessons.findIndex(({ id }) => id === activeLessonId);
    const lesson = course.lessons[index];
    if (lesson) {
      const next = freePractice ? course.lessons[index + 1] : course.lessons.find(({ id }, nextIndex) =>
        !completedSet.has(id) && id !== lesson.id
        && isCourseLessonUnlocked(course.lessons, nextIndex, new Set([...completedSet, lesson.id])));
      return <CourseLessonRunner key={lesson.id} level={level} lesson={lesson}
        completed={completedSet.has(lesson.id)} onComplete={onComplete} onExit={exit}
        onNext={next ? () => openLesson(next.id) : undefined} />;
    }
  }

  const chapters = course ? [...new Set(course.lessons.map(({ chapter }) => chapter))].map((chapter) => ({
    title: chapter,
    lessons: course.lessons.filter((lesson) => lesson.chapter === chapter),
    subtitle: undefined,
  })) : STORY_CHAPTERS.map(({ id, title, subtitle }) => ({
    title, subtitle, lessons: STORY_LESSONS.filter((lesson) => lesson.chapter === id),
  }));
  const allLessons = course?.lessons ?? STORY_LESSONS;
  const isUnlocked = (id: string) => course
    ? isCourseLessonUnlocked(course.lessons, course.lessons.findIndex((lesson) => lesson.id === id), completedSet)
    : isLessonUnlocked(id, completedSet);
  const upcoming = allLessons.find(({ id }) => !completedSet.has(id) && isUnlocked(id));
  const levelCount = allLessons.filter(({ id }) => completedSet.has(id)).length;
  const lang = course ? 'de' : 'en';

  return (
    <div className="story-screen">
      <div className="story-levels" aria-label="Sprachniveau">
        {LEVELS.map((entry) => <button key={entry} className="chip" aria-pressed={level === entry}
          onClick={() => { exit(); setLevel(entry); }}>{entry}</button>)}
      </div>
      <header className="story-intro">
        <p>DEUTSCH · {level}</p>
        <h1>{course?.title ?? 'Dein erster Tag'}</h1>
        <p>{course?.description ?? 'Stell dich vor, finde dich im Alltag zurecht und erzähle, was gestern passiert ist.'}</p>
      </header>
      <div className="story-level-progress">
        <p className="story-progress">{levelCount} / {allLessons.length} Lektionen abgeschlossen</p>
        <label><input type="checkbox" checked={freePractice} onChange={(event) => setFreePractice(event.target.checked)}
          /> Alle Lektionen ausprobieren</label>
      </div>
      {chapters.map((chapter) => (
        <section key={chapter.title} className="story-chapter">
          <h2 className="story-chapter-title" lang={lang}>{chapter.title}</h2>
          {chapter.subtitle && <p className="story-chapter-sub" lang={lang}>{chapter.subtitle}</p>}
          <div className="story-lessons">
            {chapter.lessons.map((lesson) => {
              const done = completedSet.has(lesson.id);
              const unlocked = freePractice || isUnlocked(lesson.id);
              const isNext = upcoming?.id === lesson.id;
              return (
                <button key={lesson.id} className={`story-lesson ${done ? 'done' : ''} ${isNext ? 'next' : ''}`}
                  disabled={!unlocked} onClick={() => openLesson(lesson.id)}>
                  <span className="story-lesson-status">{done ? '✅' : unlocked ? '▶' : '🔒'}</span>
                  <span className="story-lesson-text" lang={lang}>
                    <span className="story-lesson-title">{lesson.title}</span>
                    <span className="story-lesson-goal">{'goal' in lesson ? lesson.goal : lesson.scene}</span>
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
