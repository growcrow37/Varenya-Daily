import type { Article, Category, Comment } from './types';

const CATEGORIES: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology' },
  { id: '2', name: 'Business', slug: 'business' },
  { id: '3', name: 'Science', slug: 'science' },
  { id: '4', name: 'Culture', slug: 'culture' },
  { id: '5', name: 'Health', slug: 'health' },
];

const COMMENTS: Comment[] = [
  { id: '1', author: 'John Doe', content: 'Great article, very insightful!', createdAt: '2024-05-20T10:00:00Z', articleId: '1' },
  { id: '2', author: 'Jane Smith', content: 'I have a different perspective on this. Here is why...', createdAt: '2024-05-20T11:30:00Z', articleId: '1' },
  { id: '3', author: 'AI Enthusiast', content: 'This is a fascinating look into the future of AI.', createdAt: '2024-05-19T14:00:00Z', articleId: '2' },
];

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of Quantum Computing and Its Impact on Modern Cryptography',
    slug: 'future-of-quantum-computing',
    content: '... full content ...',
    excerpt: 'Quantum computing threatens to break current encryption standards. Explore how it works and what the future holds for data security.',
    imageUrl: 'https://placehold.co/800x450.png',
    status: 'Published',
    createdAt: '2024-05-20T09:00:00Z',
    category: CATEGORIES[0],
    tags: ['quantum computing', 'cybersecurity', 'technology', 'encryption'],
    comments: [COMMENTS[0], COMMENTS[1]],
  },
  {
    id: '2',
    title: 'Navigating the New Era of Artificial Intelligence in Business',
    slug: 'ai-in-business',
    content: '... full content ...',
    excerpt: 'AI is no longer a buzzword; it\'s a fundamental business tool. Learn how companies are leveraging AI for growth and innovation.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-19T12:00:00Z',
    category: CATEGORIES[1],
    tags: ['ai', 'business', 'innovation', 'machine learning'],
    comments: [COMMENTS[2]],
  },
  {
    id: '3',
    title: 'Breakthrough in Alzheimer\'s Research: A New Hope',
    slug: 'alzheimers-breakthrough',
    content: '... full content ...',
    excerpt: 'Scientists have discovered a new protein that could be key to stopping the progression of Alzheimer\'s disease.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-18T15:00:00Z',
    category: CATEGORIES[2],
    tags: ['science', 'health', 'research', 'alzheimers'],
    comments: [],
  },
  {
    id: '4',
    title: 'The Rise of Indie Video Games and Their Cultural Impact',
    slug: 'rise-of-indie-games',
    content: '... full content ...',
    excerpt: 'From solo developers to small studios, indie games are pushing creative boundaries and changing the gaming landscape.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-17T18:00:00Z',
    category: CATEGORIES[3],
    tags: ['gaming', 'culture', 'indie games', 'entertainment'],
    comments: [],
  },
  {
    id: '5',
    title: 'Mental Health in the Digital Age: A Growing Concern',
    slug: 'mental-health-digital-age',
    content: '... full content ...',
    excerpt: 'How is our constant connectivity affecting our mental well-being? Experts weigh in on the challenges and solutions.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-16T11:00:00Z',
    category: CATEGORIES[4],
    tags: ['health', 'mental health', 'technology', 'social media'],
    comments: [],
  },
  {
    id: '6',
    title: 'The Gig Economy: Freedom or Exploitation?',
    slug: 'gig-economy',
    content: '... full content ...',
    excerpt: 'A deep dive into the pros and cons of the gig economy and its impact on the modern workforce.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Draft',
    createdAt: '2024-05-15T14:30:00Z',
    category: CATEGORIES[1],
    tags: ['business', 'work', 'economy'],
    comments: [],
  },
  {
    id: '7',
    title: 'CRISPR Gene Editing: The Power to Reshape Life',
    slug: 'crispr-gene-editing',
    content: '... full content ...',
    excerpt: 'An exploration of the revolutionary gene-editing tool CRISPR and the ethical questions it raises.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-14T09:00:00Z',
    category: CATEGORIES[2],
    tags: ['science', 'genetics', 'crispr', 'bioethics'],
    comments: [],
  },
    {
    id: '8',
    title: 'The Metaverse: What Is It and Should You Care?',
    slug: 'metaverse-explainer',
    content: '... full content ...',
    excerpt: 'Breaking down the concept of the metaverse, from its sci-fi origins to the tech giants building it today.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-13T16:00:00Z',
    category: CATEGORIES[0],
    tags: ['metaverse', 'virtual reality', 'technology'],
    comments: [],
  },
  {
    id: '9',
    title: 'Sustainable Investing: Aligning Your Portfolio with Your Values',
    slug: 'sustainable-investing',
    content: '... full content ...',
    excerpt: 'How to make your money work for you and the planet. An introduction to ESG investing.',
    imageUrl: 'https://placehold.co/400x300.png',
    status: 'Published',
    createdAt: '2024-05-12T11:00:00Z',
    category: CATEGORIES[1],
    tags: ['business', 'investing', 'sustainability', 'finance'],
    comments: [],
  },
];

// Simulate API calls
export const getArticles = async (): Promise<Article[]> => {
  return ARTICLES;
};

export const getArticleBySlug = async (slug: string): Promise<Article | undefined> => {
  return ARTICLES.find((article) => article.slug === slug);
};

export const getArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
  return ARTICLES.filter((article) => article.category.slug === categorySlug);
};

export const getCategories = async (): Promise<Category[]> => {
  return CATEGORIES;
};

export const getCategoryBySlug = async (slug: string): Promise<Category | undefined> => {
  return CATEGORIES.find((category) => category.slug === slug);
}

export const getCommentsByArticleId = async (articleId: string): Promise<Comment[]> => {
  return COMMENTS.filter((comment) => comment.articleId === articleId);
}
