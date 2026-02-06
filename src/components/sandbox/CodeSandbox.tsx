import { useState, useCallback } from 'react';
import type { ChallengeDefinition } from '../../types/index.ts';
import { useProgressStore } from '../../stores/progressStore.ts';

interface CodeSandboxProps {
  challenges: ChallengeDefinition[];
  lessonId: string;
}

export function CodeSandbox({ challenges, lessonId }: CodeSandboxProps) {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [code, setCode] = useState(challenges[0]?.starterCode || '');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const { updateChallengeProgress, addCodeSnapshot } = useProgressStore();

  const challenge = challenges[activeChallenge];

  const handleChallengeChange = (index: number) => {
    setActiveChallenge(index);
    setCode(challenges[index].starterCode);
    setOutput('');
    setHintsShown(0);
  };

  const runCode = useCallback(async () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Check if Pyodide is available
      const pyodide = (window as unknown as Record<string, unknown>).pyodide;
      if (pyodide && typeof (pyodide as { runPythonAsync: (code: string) => Promise<unknown> }).runPythonAsync === 'function') {
        const result = await (pyodide as { runPythonAsync: (code: string) => Promise<unknown> }).runPythonAsync(code);
        setOutput(String(result ?? ''));
      } else {
        // Simulated execution for when Pyodide isn't loaded
        setOutput('[Pyodide not loaded] Code submitted:\n' + code);
      }
    } catch (err) {
      setOutput(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setIsRunning(false);
      addCodeSnapshot(lessonId, code, challenge.language);
    }
  }, [code, challenge, lessonId, addCodeSnapshot]);

  const checkSolution = useCallback(() => {
    const isCorrect = output.trim() === challenge.expectedOutput.trim();
    updateChallengeProgress(lessonId, {
      challengeId: challenge.id,
      attempts: 1,
      solved: isCorrect,
      hintsUsed: hintsShown,
    });
    if (isCorrect) {
      setOutput((prev) => prev + '\n\n--- Challenge passed! ---');
    } else {
      setOutput(
        (prev) => prev + `\n\n--- Expected: ${challenge.expectedOutput} ---`
      );
    }
  }, [output, challenge, lessonId, hintsShown, updateChallengeProgress]);

  const showSolution = () => {
    setCode(challenge.solution);
  };

  const resetCode = () => {
    setCode(challenge.starterCode);
    setOutput('');
    setHintsShown(0);
  };

  return (
    <div className="flex flex-col h-full">
      {challenges.length > 1 && (
        <div className="flex gap-1 p-2 bg-gray-100 border-b border-gray-200">
          {challenges.map((c, i) => (
            <button
              key={c.id}
              onClick={() => handleChallengeChange(i)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                i === activeChallenge
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      <div className="p-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-medium text-sm text-gray-900">{challenge.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          Expected output: <code className="bg-gray-200 px-1 rounded">{challenge.expectedOutput}</code>
        </p>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-[200px]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
            spellCheck={false}
            aria-label="Code editor"
          />
        </div>

        <div className="flex items-center gap-2 p-2 bg-gray-100 border-y border-gray-200">
          <button
            onClick={runCode}
            disabled={isRunning}
            className="bg-green-600 text-white px-4 py-1.5 rounded text-sm hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </button>
          <button
            onClick={checkSolution}
            disabled={!output}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors"
          >
            Check
          </button>
          <button
            onClick={resetCode}
            className="text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={showSolution}
            className="text-gray-600 px-3 py-1.5 rounded text-sm hover:bg-gray-200 transition-colors ml-auto"
          >
            Show Solution
          </button>
        </div>

        <div className="h-[200px] overflow-y-auto bg-gray-900 p-4">
          <pre className="font-mono text-sm text-gray-100 whitespace-pre-wrap">
            {output || 'Output will appear here...'}
          </pre>
        </div>
      </div>

      {challenge.hints.length > 0 && (
        <div className="p-3 bg-yellow-50 border-t border-yellow-200">
          <button
            onClick={() => setHintsShown((h) => Math.min(h + 1, challenge.hints.length))}
            className="text-sm text-yellow-700 hover:text-yellow-800"
            disabled={hintsShown >= challenge.hints.length}
          >
            {hintsShown < challenge.hints.length
              ? `Show Hint (${hintsShown}/${challenge.hints.length})`
              : 'All hints shown'}
          </button>
          {hintsShown > 0 && (
            <ul className="mt-2 space-y-1">
              {challenge.hints.slice(0, hintsShown).map((hint, i) => (
                <li key={i} className="text-sm text-yellow-800">
                  {i + 1}. {hint}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
