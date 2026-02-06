import type { UserProfile, Pathway } from '../types/index.ts';
import { modules } from '../data/modules.ts';
import { v4 as uuidv4 } from 'uuid';

const DISCIPLINE_MODULE_MAP: Record<string, string[]> = {
  literature: ['text-analysis-fundamentals', 'data-visualization'],
  history: ['structured-data', 'data-visualization', 'web-data-collection'],
  linguistics: ['text-analysis-fundamentals', 'structured-data'],
  'art-history': ['data-visualization', 'structured-data', 'web-data-collection'],
};

const INTEREST_MODULE_MAP: Record<string, string[]> = {
  'text analysis': ['text-analysis-fundamentals'],
  'data visualization': ['data-visualization'],
  'web scraping': ['web-data-collection'],
  'structured data': ['structured-data'],
  'word frequency': ['text-analysis-fundamentals'],
  'creating timelines': ['data-visualization'],
  'mapping historical events': ['data-visualization'],
  'analyzing word frequency': ['text-analysis-fundamentals'],
  'working with archives': ['web-data-collection', 'structured-data'],
};

export function generatePathway(profile: UserProfile): Pathway {
  const selectedModules: string[] = [];

  // Determine recommended language
  const textHeavyInterests = ['text analysis', 'word frequency', 'nlp', 'analyzing word frequency'];
  const statisticalInterests = ['statistics', 'statistical analysis'];

  const interests = profile.background.researchInterests.map((i) => i.toLowerCase());

  let recommendedLanguage: 'python' | 'r' = 'python';
  if (interests.some((i) => statisticalInterests.some((s) => i.includes(s)))) {
    recommendedLanguage = 'r';
  } else if (interests.some((i) => textHeavyInterests.some((t) => i.includes(t)))) {
    recommendedLanguage = 'python';
  }

  // Add foundational modules for beginners
  if (profile.background.programmingExperience === 'none') {
    selectedModules.push('digital-literacy-foundations');
    selectedModules.push('python-basics');
  } else if (profile.background.programmingExperience === 'beginner') {
    selectedModules.push('python-basics');
  }

  // Add discipline-specific modules
  const discipline = profile.background.discipline.toLowerCase();
  const disciplineModules = DISCIPLINE_MODULE_MAP[discipline] || [];
  for (const modId of disciplineModules) {
    if (!selectedModules.includes(modId)) {
      selectedModules.push(modId);
    }
  }

  // Add interest-based modules
  for (const interest of interests) {
    const interestModules = INTEREST_MODULE_MAP[interest] || [];
    for (const modId of interestModules) {
      if (!selectedModules.includes(modId)) {
        selectedModules.push(modId);
      }
    }
  }

  // If no specific modules added, add defaults
  if (selectedModules.length <= 2) {
    for (const mod of ['text-analysis-fundamentals', 'data-visualization']) {
      if (!selectedModules.includes(mod)) {
        selectedModules.push(mod);
      }
    }
  }

  // Calculate total estimated hours
  const estimatedHours = selectedModules.reduce((total, modId) => {
    const mod = modules.find((m) => m.id === modId);
    return total + (mod?.estimatedHours || 0);
  }, 0);

  return {
    id: uuidv4(),
    modules: selectedModules,
    estimatedHours,
    recommendedLanguage,
  };
}

export function matchDisciplineModules(discipline: string): string[] {
  return DISCIPLINE_MODULE_MAP[discipline.toLowerCase()] || [];
}

export function getMethodModules(interest: string): string[] {
  return INTEREST_MODULE_MAP[interest.toLowerCase()] || [];
}
