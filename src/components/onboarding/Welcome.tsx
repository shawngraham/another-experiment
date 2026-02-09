import { useNavigate } from 'react-router-dom';

export function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto text-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Welcome to the DHPrimer: Tutorial Lab
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        An interactive learning environment for digital humanities. This web app will
        personalize your learning pathway based on your background and interests. 
      </p>
      <p className="text-sm text-gray-500 mb-8">
        All data stays on your device. Your answers to the next few questions will be written into your learning note pad (which, along with the lessons, can be exported to Obsidian.md or similar.)
      This web app was put together by Shawn Graham and members of the <a href="https://carleton.ca/xlab/"><em>Carleton University XLab</em></a></p><p></p>
      <button
        onClick={() => navigate('/onboarding/background')}
        className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-indigo-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  );
}
