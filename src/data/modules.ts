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
    lessons: ['structured-data-01', 'structured-data-02', 'structured-data-03', 'structured-data-04','structured-data-05', 'structured-data-06'],
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
    lessons: ['data-viz-01', 'data-viz-02', 'data-viz-03', 'data-viz-04', 'data-viz-05', 'data-viz-06'],
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
    lessons: ['web-data-01', 'web-data-02', 'web-data-03', 'web-data-04'],
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
  {
  id: 'network-analysis',
  title: 'Network Analysis for Humanists',
  description: 'Modeling relationships using nodes and edges. Learn to build, visualize, and analyze networks using NetworkX.',
  estimatedHours: 6,
  prerequisites: ['python-basics', 'structured-data'],
  lessons: [
    'network-analysis-01', // Intro to Graph Theory terms
    'network-analysis-02', // Creating Nodes and Edges with NetworkX
    'network-analysis-03', // Centrality measures (Degree, Betweenness)
    'network-analysis-04', // Visualizing Networks
    'network-analysis-05',  // Case Study: Correspondence networks or Character maps
    'network-analysis-06'
  ],
  track: 'dh-methods',
  disciplines: ['history', 'sociology', 'literature', 'anthropology'],
  keywords: ['graphs', 'nodes', 'edges', 'networkx', 'relationships'],
},
{
  id: 'geospatial-analysis',
  title: 'Mapping and Geospatial Data',
  description: 'Introduction to GIS concepts for python. plotting coordinates, working with Shapefiles/GeoJSON, and creating interactive maps.',
  estimatedHours: 6,
  prerequisites: ['python-basics', 'structured-data'],
  lessons: [
    'geospatial-01', // Coordinate systems and Projections
    'geospatial-02', // Intro to GeoPandas
    'geospatial-03', // Plotting points on maps
    'geospatial-04', // Creating interactive maps with Folium
  ],
  track: 'dh-methods',
  disciplines: ['history', 'archaeology', 'anthropology', 'classics'],
  keywords: ['gis', 'maps', 'geopandas', 'folium', 'coordinates', 'spatial'],
},
{
  id: 'image-analysis',
  title: 'Computer Vision for Humanities',
  description: 'Programmatic analysis of image collections. Color extraction, similarity detection, and metadata generation from visual data.',
  estimatedHours: 5,
  prerequisites: ['python-basics'],
  lessons: [
    'image-analysis-01', // pixels as data (numpy arrays)
    'image-analysis-02', // Processing images with Pillow/OpenCV
    'image-analysis-03', // Color histograms and extraction
    'image-analysis-04', // Detecting visual similarity
  ],
  track: 'dh-methods',
  disciplines: ['art-history', 'media-studies', 'history', 'archaeology'],
  keywords: ['computer vision', 'images', 'pixels', 'color analysis', 'opencv'],
},
{
  id: 'sentiment-analysis',
  title: 'Sentiment and Emotion Analysis',
  description: 'Computational approaches to detecting emotional valence in text. Using lexicons and ML classifiers to track narrative arcs.',
  estimatedHours: 4,
  prerequisites: ['text-analysis-fundamentals'],
  lessons: [
    'sentiment-01', // Theory: Dictionary vs ML approaches
    'sentiment-02', // Using VADER for social data
    'sentiment-03', // Plotting emotional arcs in novels
    'sentiment-04', // Limitations and bias in sentiment tools
  ],
  track: 'dh-methods',
  disciplines: ['literature', 'linguistics', 'sociology', 'marketing'],
  keywords: ['sentiment', 'emotions', 'vader', 'textblob', 'valence'],
},
];

export function getModuleById(id: string): ModuleDefinition | undefined {
  return modules.find((m) => m.id === id);
}

export function getModulesByTrack(track: ModuleDefinition['track']): ModuleDefinition[] {
  return modules.filter((m) => m.track === track);
}
