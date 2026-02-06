import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LessonViewer } from '../../components/lesson/LessonViewer.tsx';
import { LessonContent } from '../../components/lesson/LessonContent.tsx';
import { useProgressStore } from '../../stores/progressStore.ts';

const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
};

describe('LessonContent', () => {
  it('renders markdown content', () => {
    renderWithRouter(<LessonContent content="# Hello World" />);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders paragraphs', () => {
    renderWithRouter(<LessonContent content="This is a paragraph." />);
    expect(screen.getByText('This is a paragraph.')).toBeInTheDocument();
  });

  it('renders headings at different levels', () => {
    renderWithRouter(<LessonContent content="## Section Title\n\n### Subsection" />);
    // react-markdown may split heading text - use queryByText with regex
    expect(screen.queryByText(/Section Title/)).toBeInTheDocument();
    expect(screen.queryByText(/Subsection/)).toBeInTheDocument();
  });
});

describe('LessonViewer', () => {
  beforeEach(() => {
    useProgressStore.getState().resetProgress();
  });

  it('shows not found for invalid lesson', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/nonexistent']}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonViewer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Lesson not found.')).toBeInTheDocument();
  });

  it('renders lesson title for valid lesson', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/text-analysis-01']}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonViewer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Introduction to String Operations')).toBeInTheDocument();
  });

  it('shows learning objectives', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/text-analysis-01']}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonViewer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Understand string data type')).toBeInTheDocument();
  });

  it('shows mark complete button', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/text-analysis-01']}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonViewer />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Mark Complete')).toBeInTheDocument();
  });

  it('starts lesson progress on mount', () => {
    render(
      <MemoryRouter initialEntries={['/lesson/text-analysis-01']}>
        <Routes>
          <Route path="/lesson/:lessonId" element={<LessonViewer />} />
        </Routes>
      </MemoryRouter>
    );
    const progress = useProgressStore.getState().lessonProgress['text-analysis-01'];
    expect(progress).toBeDefined();
    expect(progress.status).toBe('in_progress');
  });
});
