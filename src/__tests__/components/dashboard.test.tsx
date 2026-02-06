import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Dashboard } from '../../components/dashboard/Dashboard.tsx';
import { useUserStore } from '../../stores/userStore.ts';
import { useProgressStore } from '../../stores/progressStore.ts';
import { useNoteStore } from '../../stores/noteStore.ts';

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

describe('Dashboard', () => {
  beforeEach(() => {
    useUserStore.getState().resetProfile();
    useProgressStore.getState().resetProgress();
    const notes = useNoteStore.getState().notes;
    for (const id of Object.keys(notes)) {
      useNoteStore.getState().deleteNote(id);
    }
  });

  it('renders dashboard heading', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('shows stats cards', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Lessons Completed')).toBeInTheDocument();
    expect(screen.getByText('Success Rate')).toBeInTheDocument();
    expect(screen.getByText('Notes Created')).toBeInTheDocument();
    expect(screen.getByText('Modules')).toBeInTheDocument();
  });

  it('shows 0 completed lessons initially', () => {
    renderWithRouter(<Dashboard />);
    const stats = screen.getAllByText(/^0/);
    expect(stats.length).toBeGreaterThan(0);
  });

  it('shows continue learning section when lessons available', () => {
    useUserStore.getState().createProfile({
      currentPathway: {
        pathwayId: 'test',
        modules: ['python-basics'],
        customizations: [],
      },
      onboardingCompleted: true,
    });
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Continue Learning')).toBeInTheDocument();
  });

  it('shows pathway modules', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Your Pathway')).toBeInTheDocument();
  });

  it('reflects completed lesson count', () => {
    useProgressStore.getState().startLesson('python-basics-01');
    useProgressStore.getState().completeLesson('python-basics-01');
    renderWithRouter(<Dashboard />);
    // Should show at least 1 completed somewhere in the page
    expect(screen.getAllByText(/1\//).length).toBeGreaterThan(0);
  });

  it('reflects notes count', () => {
    useNoteStore.getState().createNote({
      type: 'personal_note',
      title: 'Test',
      content: '',
      tags: [],
      linkedLessons: [],
    });
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
