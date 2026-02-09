import type { ModuleDefinition } from '../types/index.ts';

export const modules: ModuleDefinition[] = [
  {
    id: 'digital-literacy-foundations',
    title: 'Digital Literacy Foundations',
    description: 'Understanding files, data formats, plain text vs binary, character encoding, and version control concepts.',
    estimatedHours: 4,
    prerequisites: [],
    lessons: ['digital-literacy-01', 'digital-literacy-02', 'digital-literacy-03'],
    track: 'digital-literacy',
    disciplines: [],
    keywords: ['files', 'directories', 'data formats', 'encoding', 'version control'],
  },
  {
    id: 'python-basics',
    title: 'Python Basics for Humanists',
    description: 'Variables, data types, control flow, functions, file I/O, and working with libraries.',
    estimatedHours: 7,
    prerequisites: ['digital-literacy-foundations'],
    lessons: ['python-basics-01', 'python-basics-02', 'python-basics-03', 'python-basics-04', 'python-basics-05'],
    track: 'coding-fundamentals',
    disciplines: [],
    keywords: ['python', 'variables', 'functions', 'loops', 'files'],
  },
  {
    id: 'text-analysis-fundamentals',
    title: 'Text Analysis Fundamentals',
    description: 'String operations, regular expressions, word frequency, text cleaning, NLP basics with NLTK.',
    estimatedHours: 9,
    prerequisites: ['python-basics'],
    lessons: ['text-analysis-01', 'text-analysis-02', 'text-analysis-03', 'text-analysis-04', 'text-analysis-05', 'text-analysis-06'],
    track: 'dh-methods',
    disciplines: ['literature', 'linguistics', 'history'],
    keywords: ['text', 'nlp', 'regex', 'frequency', 'nltk'],
  },
  {
    id: 'structured-data',
    title: 'Working with Structured Data',
    description: 'CSV files, Pandas basics, filtering, sorting, grouping, merging datasets, and metadata.',
    estimatedHours: 7,
    prerequisites: ['python-basics'],
    lessons: ['structured-data-01', 'structured-data-02', 'structured-data-03', 'structured-data-04','structured-data-05'],
    track: 'dh-methods',
    disciplines: ['history', 'art-history', 'linguistics'],
    keywords: ['csv', 'pandas', 'tabular', 'metadata', 'dataframe'],
  },
  {
    id: 'data-visualization',
    title: 'Data Visualization for DH',
    description: 'Visualization principles, bar/line/scatter plots, customization, timelines, and geographic visualization.',
    estimatedHours: 7,
    prerequisites: ['python-basics'],
    lessons: ['data-viz-01', 'data-viz-02', 'data-viz-03', 'data-viz-04'],
    track: 'dh-methods',
    disciplines: ['history', 'art-history', 'literature'],
    keywords: ['matplotlib', 'visualization', 'charts', 'graphs', 'maps'],
  },
  {
    id: 'web-data-collection',
    title: 'Web Data Collection',
    description: 'HTML structure, web scraping ethics, BeautifulSoup, APIs and JSON, rate limiting.',
    estimatedHours: 5,
    prerequisites: ['python-basics'],
    lessons: ['web-data-01', 'web-data-02', 'web-data-03'],
    track: 'dh-methods',
    disciplines: [],
    keywords: ['web', 'scraping', 'api', 'html', 'json'],
  },
    {
    id: 'data-sonification',
    title: 'Data Sonification for DH',
    description: 'Translating data into sound: parameter mapping, rhythmic sequences, and multimodal audio representations of humanities datasets.',
    estimatedHours: 3,
    prerequisites: ['python-basics'],
    lessons: ['sonification-01', 'sonification-02', 'sonification-03'],
    track: 'dh-methods',
    disciplines: ['music', 'history', 'literature','archaeology'],
    keywords: ['sonification', 'audio', 'midi', 'mapping', 'multimodal'],
  },
  {
    id: 'topic-modeling',
    title: 'Topic Modeling with LDA',
    description: 'Explore the conceptual foundations of Latent Dirichlet Allocation (LDA), text preprocessing for modeling, training models with Gensim, and interpreting document-topic distributions.',
    estimatedHours: 5,
    prerequisites: ['text-analysis-fundamentals'],
    lessons: [
      'topic-modeling-01',
      'topic-modeling-02',
      'topic-modeling-03',
      'topic-modeling-04',
    ],
    track: 'dh-methods',
    disciplines: ['literature', 'history', 'sociology','archaeology'],
    keywords: ['lda', 'topic modeling', 'gensim', 'distant reading', 'nlp', 'unsupervised learning'],
  },
];

export function getModuleById(id: string): ModuleDefinition | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesByTrack(track: ModuleDefinition['track']): ModuleDefinition[] {
  return modules.filter((m) => m.track === track);
}
