import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore.ts';
import { useProgressStore } from '../../stores/progressStore.ts';
import { useNoteStore } from '../../stores/noteStore.ts';
import { modules } from '../../data/modules.ts';
import { getLessonsByModule } from '../../data/lessons.ts';

export function Dashboard() {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { lessonProgress, getCompletedLessons, getSuccessRate } = useProgressStore();
  const { getAllNotes } = useNoteStore();

  const completedLessons = getCompletedLessons();
  const successRate = getSuccessRate();
  const notesCount = getAllNotes().length;

  const pathwayModules = useMemo(() => {
    if (!profile?.currentPathway.modules.length) return modules;
    return profile.currentPathway.modules
      .map((id) => modules.find((m) => m.id === id))
      .filter(Boolean);
  }, [profile]);

  const totalLessons = pathwayModules.reduce(
    (acc, m) => acc + (m?.lessons.length || 0),
    0
  );

  const nextLesson = useMemo(() => {
    for (const mod of pathwayModules) {
      if (!mod) continue;
      const modLessons = getLessonsByModule(mod.id);
      for (const lesson of modLessons) {
        const progress = lessonProgress[lesson.id];
        if (!progress || progress.status !== 'completed') {
          return { lesson, module: mod };
        }
      }
    }
    return null;
  }, [pathwayModules, lessonProgress]);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Lessons Completed</p>
          <p className="text-2xl font-bold text-gray-900">{completedLessons.length}/{totalLessons}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Success Rate</p>
          <p className="text-2xl font-bold text-gray-900">{Math.round(successRate)}%</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Notes Created</p>
          <p className="text-2xl font-bold text-gray-900">{notesCount}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-sm text-gray-500">Modules</p>
          <p className="text-2xl font-bold text-gray-900">{pathwayModules.length}</p>
        </div>
      </div>

      {nextLesson && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6 mb-8">
          <h2 className="text-sm font-medium text-indigo-600">Continue Learning</h2>
          <h3 className="text-lg font-bold text-gray-900 mt-1">{nextLesson.lesson.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{nextLesson.module.title}</p>
          <button
            onClick={() => navigate(`/lesson/${nextLesson.lesson.id}`)}
            className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Continue
          </button>
        </div>
      )}

      <h2 className="text-lg font-semibold text-gray-800 mb-4">Your Pathway</h2>
      <div className="space-y-3">
        {pathwayModules.map((mod) => {
          if (!mod) return null;
          const modLessons = getLessonsByModule(mod.id);
          const completed = modLessons.filter(
            (l) => lessonProgress[l.id]?.status === 'completed'
          ).length;
          const pct = modLessons.length > 0 ? (completed / modLessons.length) * 100 : 0;

          return (
            <div
              key={mod.id}
              className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-indigo-300 transition-colors"
              onClick={() => {
                const firstLesson = modLessons[0];
                if (firstLesson) navigate(`/lesson/${firstLesson.id}`);
              }}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-900">{mod.title}</h3>
                  <p className="text-sm text-gray-500">{completed}/{modLessons.length} lessons</p>
                </div>
                <span className="text-sm font-medium text-gray-700">{Math.round(pct)}%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
