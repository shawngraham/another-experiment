import { generatePathway, matchDisciplineModules, getMethodModules } from '../utils/pathwayGenerator.ts';
import type { UserProfile } from '../types/index.ts';

function makeProfile(overrides: Partial<UserProfile> = {}): UserProfile {
  return {
    id: 'test-id',
    createdAt: new Date(),
    background: {
      discipline: 'literature',
      role: 'graduate-student',
      programmingExperience: 'none',
      researchInterests: ['text analysis'],
    },
    preferences: {
      preferredLanguage: 'python',
      lessonDuration: 30,
      dailyGoalMinutes: 30,
    },
    currentPathway: {
      pathwayId: '',
      modules: [],
      customizations: [],
    },
    learningGoals: ['Learn text analysis'],
    onboardingCompleted: false,
    ...overrides,
  };
}

describe('generatePathway', () => {
  it('includes foundational modules for beginners with no experience', () => {
    const profile = makeProfile({
      background: {
        discipline: 'history',
        role: 'student',
        programmingExperience: 'none',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).toContain('digital-literacy-foundations');
    expect(pathway.modules).toContain('python-basics');
  });

  it('skips digital literacy for beginner programmers', () => {
    const profile = makeProfile({
      background: {
        discipline: 'history',
        role: 'student',
        programmingExperience: 'beginner',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).not.toContain('digital-literacy-foundations');
    expect(pathway.modules).toContain('python-basics');
  });

  it('skips foundational modules for intermediate programmers', () => {
    const profile = makeProfile({
      background: {
        discipline: 'history',
        role: 'student',
        programmingExperience: 'intermediate',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).not.toContain('digital-literacy-foundations');
    expect(pathway.modules).not.toContain('python-basics');
  });

  it('adds discipline-specific modules for literature', () => {
    const profile = makeProfile({
      background: {
        discipline: 'literature',
        role: 'student',
        programmingExperience: 'intermediate',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).toContain('text-analysis-fundamentals');
    expect(pathway.modules).toContain('data-visualization');
  });

  it('adds discipline-specific modules for history', () => {
    const profile = makeProfile({
      background: {
        discipline: 'history',
        role: 'student',
        programmingExperience: 'intermediate',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).toContain('structured-data');
    expect(pathway.modules).toContain('data-visualization');
    expect(pathway.modules).toContain('web-data-collection');
  });

  it('adds interest-based modules', () => {
    const profile = makeProfile({
      background: {
        discipline: 'philosophy',
        role: 'student',
        programmingExperience: 'intermediate',
        researchInterests: ['web scraping', 'data visualization'],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.modules).toContain('web-data-collection');
    expect(pathway.modules).toContain('data-visualization');
  });

  it('does not duplicate modules', () => {
    const profile = makeProfile({
      background: {
        discipline: 'literature',
        role: 'student',
        programmingExperience: 'none',
        researchInterests: ['text analysis'],
      },
    });
    const pathway = generatePathway(profile);
    const unique = new Set(pathway.modules);
    expect(pathway.modules.length).toBe(unique.size);
  });

  it('recommends python by default', () => {
    const profile = makeProfile();
    const pathway = generatePathway(profile);
    expect(pathway.recommendedLanguage).toBe('python');
  });

  it('recommends r for statistical interests', () => {
    const profile = makeProfile({
      background: {
        discipline: 'linguistics',
        role: 'student',
        programmingExperience: 'none',
        researchInterests: ['statistical analysis'],
      },
    });
    const pathway = generatePathway(profile);
    expect(pathway.recommendedLanguage).toBe('r');
  });

  it('calculates estimated hours', () => {
    const profile = makeProfile();
    const pathway = generatePathway(profile);
    expect(pathway.estimatedHours).toBeGreaterThan(0);
  });

  it('generates a unique id', () => {
    const profile = makeProfile();
    const p1 = generatePathway(profile);
    const p2 = generatePathway(profile);
    expect(p1.id).not.toBe(p2.id);
  });

  it('adds default modules when few specific ones match', () => {
    const profile = makeProfile({
      background: {
        discipline: 'philosophy',
        role: 'student',
        programmingExperience: 'intermediate',
        researchInterests: [],
      },
    });
    const pathway = generatePathway(profile);
    // Should have at least the default modules
    expect(pathway.modules.length).toBeGreaterThanOrEqual(2);
  });
});

describe('matchDisciplineModules', () => {
  it('returns modules for literature', () => {
    const modules = matchDisciplineModules('literature');
    expect(modules).toContain('text-analysis-fundamentals');
  });

  it('returns empty array for unknown discipline', () => {
    const modules = matchDisciplineModules('unknown');
    expect(modules).toEqual([]);
  });
});

describe('getMethodModules', () => {
  it('returns modules for text analysis interest', () => {
    const modules = getMethodModules('text analysis');
    expect(modules).toContain('text-analysis-fundamentals');
  });

  it('returns modules for web scraping interest', () => {
    const modules = getMethodModules('web scraping');
    expect(modules).toContain('web-data-collection');
  });

  it('returns empty array for unknown interest', () => {
    const modules = getMethodModules('unknown');
    expect(modules).toEqual([]);
  });
});
