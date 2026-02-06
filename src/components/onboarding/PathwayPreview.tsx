import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore.ts';
import { generatePathway } from '../../utils/pathwayGenerator.ts';
import { modules } from '../../data/modules.ts';

export function PathwayPreview() {
  const navigate = useNavigate();
  const { profile, setPathway, completeOnboarding } = useUserStore();

  const pathway = useMemo(() => {
    if (!profile) return null;
    return generatePathway(profile);
  }, [profile]);

  const pathwayModules = useMemo(() => {
    if (!pathway) return [];
    return pathway.modules
      .map((id) => modules.find((m) => m.id === id))
      .filter(Boolean);
  }, [pathway]);

  const handleStart = () => {
    if (pathway) {
      setPathway(pathway);
      completeOnboarding();
      navigate('/dashboard');
    }
  };

  if (!profile || !pathway) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 text-center">
        <p className="text-gray-600">Please complete the previous steps first.</p>
        <button
          onClick={() => navigate('/onboarding')}
          className="mt-4 text-indigo-600 hover:text-indigo-800"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-medium">4</div>
          <h2 className="text-2xl font-bold text-gray-900">Your Learning Pathway</h2>
        </div>
        <p className="text-gray-600 ml-10">
          Based on your interests, here's your personalized pathway.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Recommended language:</span>
          <span className="font-medium text-gray-900 capitalize">{pathway.recommendedLanguage}</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">Estimated total time:</span>
          <span className="font-medium text-gray-900">{pathway.estimatedHours} hours</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-600">Modules:</span>
          <span className="font-medium text-gray-900">{pathwayModules.length}</span>
        </div>
      </div>

      <div className="space-y-3">
        {pathwayModules.map((mod, index) => (
          <div key={mod!.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
              {index + 1}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{mod!.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{mod!.description}</p>
              <p className="text-xs text-gray-400 mt-1">~{mod!.estimatedHours} hours</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate('/onboarding/goals')}
          className="text-gray-600 hover:text-gray-800"
        >
          Back
        </button>
        <button
          onClick={handleStart}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 transition-colors"
        >
          Start Learning
        </button>
      </div>
    </div>
  );
}
