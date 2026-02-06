import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-gray-900 mt-6 mb-3">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-gray-800 mt-5 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-medium text-gray-700 mt-4 mb-2">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{children}</p>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4">
                  <code className="text-sm font-mono">{children}</code>
                </pre>
              );
            }
            return (
              <code className="bg-gray-100 text-indigo-700 px-1.5 py-0.5 rounded text-sm font-mono">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <>{children}</>,
          ul: ({ children }) => (
            <ul className="space-y-1 mb-3">{children}</ul>
          ),
          li: ({ children }) => (
            <li className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-indigo-500 mt-0.5">-</span>
              <span>{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-indigo-300 pl-4 my-4 bg-indigo-50 py-2 rounded-r">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
