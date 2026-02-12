import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modules } from '../data/modules.ts';
import { getLessonsByModule } from '../data/lessons.ts';
import { useProgressStore } from '../stores/progressStore.ts';

export function LibraryPage() {
  const navigate = useNavigate();
  const { lessonProgress } = useProgressStore();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleModule = (moduleId: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Lesson Library</h1>
      <p className="text-gray-600 mb-8">Browse all available modules and lessons.</p>

      <div className="space-y-6">
        {modules.map((mod) => {
          const modLessons = getLessonsByModule(mod.id);
          const isExpanded = expanded.has(mod.id);

          return (
            <div key={mod.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full p-4 bg-white flex items-start justify-between hover:bg-gray-50 transition-colors text-left"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{mod.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{mod.description}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {mod.track}
                    </span>
                    <span className="text-xs text-gray-400">~{mod.estimatedHours}h</span>
                  </div>
                </div>
                <div className="ml-4 mt-1">
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-gray-200 divide-y divide-gray-100">
                  {modLessons.map((lesson) => {
                    const prog = lessonProgress[lesson.id];
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => navigate(`/lesson/${lesson.id}`)}
                        className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 text-left transition-colors"
                      >
                        <span
                          className={`w-2 h-2 rounded-full flex-shrink-0 ${
                            prog?.status === 'completed'
                              ? 'bg-green-500'
                              : prog?.status === 'in_progress'
                              ? 'bg-yellow-500'
                              : 'bg-gray-300'
                          }`}
                        />
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">{lesson.title}</span>
                          <span className="text-xs text-gray-400 ml-2 capitalize">
                            {lesson.difficulty}
                          </span>
                        </div>
                        <span className="text-xs text-gray-400">~{lesson.estimatedTimeMinutes}m</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}