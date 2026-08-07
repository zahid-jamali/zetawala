/**
 * AI Study, Quizzes & Typing — tool registry (10 tools).
 */

export const STUDY_CATEGORY_SLUG = 'ai-study';
export const STUDY_FOLDER = 'study';

export const studyTools = [
  {
    slug: 'ai-notes-generator',
    name: 'AI Notes Generator',
    desc: 'Generate complete study notes with key points and examples',
    seoSlug: 'ai-notes-generator',
    ai: true,
  },
  {
    slug: 'ai-quiz-generator',
    name: 'AI Quiz Generator',
    desc: 'Interactive MCQs with scores, explanations, and review mode',
    seoSlug: 'ai-quiz-generator',
    ai: true,
  },
  {
    slug: 'pdf-to-quiz',
    name: 'PDF to Quiz Generator',
    desc: 'Upload a PDF and generate practice MCQs with answers',
    seoSlug: 'pdf-to-quiz-generator',
    ai: true,
    supportsPdf: true,
  },
  {
    slug: 'ai-flashcard-generator',
    name: 'AI Flashcard Generator',
    desc: 'Interactive flip flashcards from a topic or PDF',
    seoSlug: 'ai-flashcard-generator',
    ai: true,
    supportsPdf: true,
  },
  {
    slug: 'youtube-study-notes',
    name: 'AI Study Notes from YouTube',
    desc: 'Notes, summary, key points, and quiz from a YouTube URL',
    seoSlug: 'youtube-study-notes-generator',
    ai: true,
  },
  {
    slug: 'ai-assignment-generator',
    name: 'AI Assignment Generator',
    desc: 'Structured assignments with headings, references, and conclusion',
    seoSlug: 'ai-assignment-generator',
    ai: true,
  },
  {
    slug: 'ai-homework-solver',
    name: 'AI Homework Solver',
    desc: 'Step-by-step explanations with final answer and key concepts',
    seoSlug: 'ai-homework-solver',
    ai: true,
  },
  {
    slug: 'typing-speed-test',
    name: 'Typing Speed Test',
    desc: 'WPM, accuracy, mistakes, timed tests, and downloadable certificate',
    seoSlug: 'typing-speed-test',
    clientOnly: true,
  },
  {
    slug: 'typing-master-course',
    name: 'Typing Master Course',
    desc: 'Guided lessons with live feedback, accuracy gates & certificate',
    seoSlug: 'typing-master-course',
    clientOnly: true,
  },
  {
    slug: 'coding-typing-test',
    name: 'Coding Typing Test',
    desc: 'Practice typing JS, Python, Java, C++, HTML, and SQL',
    seoSlug: 'coding-typing-test',
    clientOnly: true,
  },
];

export const STUDY_TOOL_SLUGS = studyTools.map((t) => t.slug);
export const STUDY_AI_SLUGS = studyTools.filter((t) => t.ai).map((t) => t.slug);
export const STUDY_TYPING_SLUGS = studyTools.filter((t) => t.clientOnly).map((t) => t.slug);

export function getStudyTool(slug) {
  return studyTools.find((t) => t.slug === slug) || null;
}
