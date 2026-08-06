export const studySeoData = {
  'ai-notes-generator': {
    title: 'Free AI Notes Generator – Study Notes by Topic & Level',
    description:
      'Generate complete study notes with key points, examples, and important concepts. Free DeepSeek-powered AI notes for any topic and education level—copy or download PDF.',
    example: {
      input: 'Topic: Photosynthesis · Level: High School',
      output: 'Structured notes with key points, examples, and concept list + word count',
    },
    faqs: [
      {
        q: 'What does the AI Notes Generator create?',
        a: 'It produces structured study notes for your topic and grade level, including key points, examples, and important concepts you can copy or export as PDF.',
      },
      {
        q: 'Is the AI Notes Generator free?',
        a: 'Yes. Zetawala’s AI Notes Generator is free to use and powered by the same DeepSeek integration used across the platform.',
      },
      {
        q: 'Can I download notes as PDF?',
        a: 'Yes. After generation you can copy the notes, regenerate, and download a PDF for offline study.',
      },
      {
        q: 'Which education levels are supported?',
        a: 'Enter any grade or level label (for example Middle School, High School, College, or Professional). The notes adapt tone and depth to that level.',
      },
      {
        q: 'Should I verify the notes?',
        a: 'Yes. AI notes are study aids—always cross-check facts against your textbook or trusted sources before exams.',
      },
    ],
  },

  'ai-quiz-generator': {
    title: 'Free AI Quiz Generator – Interactive MCQs with Scores',
    description:
      'Create interactive multiple-choice quizzes from any topic. Choose easy, medium, or hard difficulty, get explanations, final score, and review mode—free with DeepSeek.',
    example: {
      input: 'Topic: World War II · Difficulty: Medium · 10 questions',
      output: 'Interactive MCQs with answers, explanations, score %, and review mode',
    },
    faqs: [
      {
        q: 'How does the AI Quiz Generator work?',
        a: 'Enter a topic, pick difficulty and question count, then take an interactive MCQ quiz with explanations, score, and percentage.',
      },
      {
        q: 'Which difficulty levels are available?',
        a: 'Easy, Medium, and Hard—so you can practice for classroom quizzes or more advanced review.',
      },
      {
        q: 'Can I review wrong answers?',
        a: 'Yes. After you finish, review mode shows correct answers and explanations for each question.',
      },
      {
        q: 'Is the quiz generator free?',
        a: 'Yes. It is free on Zetawala and uses DeepSeek for question generation.',
      },
      {
        q: 'How many questions can I generate?',
        a: 'You can request a practical set of MCQs (typically a handful up to around twenty) depending on the tool form limits.',
      },
    ],
  },

  'pdf-to-quiz': {
    title: 'Free PDF to Quiz Generator – MCQs from Your PDF',
    description:
      'Upload a PDF, preview extracted text, and generate AI practice MCQs with answers and explanations. Free PDF-to-quiz tool powered by DeepSeek.',
    example: {
      input: 'Upload chapter PDF → generate 8 practice questions',
      output: 'Interactive quiz grounded in the PDF content with score and explanations',
    },
    faqs: [
      {
        q: 'How does PDF to Quiz work?',
        a: 'Upload a PDF, preview extracted text, then generate MCQs grounded in that content. Take the quiz and review answers with explanations.',
      },
      {
        q: 'What if my PDF is scanned or corrupted?',
        a: 'Text-based PDFs work best. Scanned or damaged files may fail extraction—you’ll see a clear error so you can try another file.',
      },
      {
        q: 'Is PDF to Quiz free?',
        a: 'Yes. Extraction uses Zetawala’s existing PDF text pipeline; questions are generated with DeepSeek.',
      },
      {
        q: 'Are questions limited to the PDF?',
        a: 'The prompt asks the model to ground questions in the uploaded text and avoid inventing unrelated facts.',
      },
      {
        q: 'Can I preview before generating?',
        a: 'Yes. You can review extracted text before generating the quiz.',
      },
    ],
  },

  'ai-flashcard-generator': {
    title: 'Free AI Flashcard Generator – Flip Cards from Topic or PDF',
    description:
      'Generate interactive flashcards from a topic or uploaded PDF. Flip animation, shuffle, previous/next, study mode, and download—free DeepSeek-powered study cards.',
    example: {
      input: 'Topic: Cell Biology · or upload lecture PDF',
      output: 'Flip flashcards with question/answer, shuffle, and study navigation',
    },
    faqs: [
      {
        q: 'Can I make flashcards from a PDF?',
        a: 'Yes. Paste a topic or upload a PDF; the tool generates question/answer cards you can flip through.',
      },
      {
        q: 'What study features are included?',
        a: 'Flip animation, shuffle, previous/next navigation, and download options for offline review.',
      },
      {
        q: 'Is the flashcard generator free?',
        a: 'Yes. Flashcards are generated with DeepSeek through Zetawala’s shared generate API.',
      },
      {
        q: 'How many cards will I get?',
        a: 'The model returns a practical set of cards for the topic or PDF length. You can regenerate for a fresh set.',
      },
      {
        q: 'Who should use AI flashcards?',
        a: 'Students, teachers, and self-learners who want quick active-recall decks without making cards by hand.',
      },
    ],
  },

  'youtube-study-notes': {
    title: 'Free YouTube Study Notes Generator – Notes Summary & Quiz',
    description:
      'Paste a YouTube URL to get study notes, summary, key points, and a quiz from the video transcript. Free DeepSeek notes; handles missing captions gracefully.',
    example: {
      input: 'https://www.youtube.com/watch?v=…',
      output: 'Complete notes, summary, key points, and quiz from available captions',
    },
    faqs: [
      {
        q: 'How do YouTube study notes work?',
        a: 'We fetch an available transcript for the video, then DeepSeek turns it into notes, a summary, key points, and a short quiz.',
      },
      {
        q: 'What if the video has no captions?',
        a: 'You’ll see a clear error. Without a transcript we cannot generate accurate notes—try another video with captions enabled.',
      },
      {
        q: 'Is this free?',
        a: 'Yes. Transcript fetching and DeepSeek note generation are available as a free Zetawala study tool.',
      },
      {
        q: 'Do you support all YouTube URLs?',
        a: 'Standard watch and short URLs are supported. Invalid URLs or private/restricted videos may fail.',
      },
      {
        q: 'Are notes a substitute for watching?',
        a: 'No. Use them as study aids. Always verify important claims against the video and trusted sources.',
      },
    ],
  },

  'ai-assignment-generator': {
    title: 'Free AI Assignment Generator – Structured Essays & Papers',
    description:
      'Generate structured assignments with headings, body sections, references, and conclusion. Set topic and word count—copy or download PDF/DOCX-like files.',
    example: {
      input: 'Topic: Climate change policy · Word count: 1200',
      output: 'Structured assignment with headings, references section, and conclusion',
    },
    faqs: [
      {
        q: 'What does the assignment generator produce?',
        a: 'A structured draft with headings, body sections, a references section (example-style placeholders), and a conclusion sized to your word count.',
      },
      {
        q: 'Can I download the assignment?',
        a: 'Yes. Copy the text or download PDF / DOCX-like formats for editing offline.',
      },
      {
        q: 'Is this for submitting without editing?',
        a: 'No. Treat output as a draft outline. Add your research, citations, and voice—and never submit unreviewed AI work where prohibited.',
      },
      {
        q: 'Is the tool free?',
        a: 'Yes. It uses DeepSeek via Zetawala’s shared generate API.',
      },
      {
        q: 'Can I control length?',
        a: 'Yes. Set a target word count so the draft aims for your assignment requirements.',
      },
    ],
  },

  'ai-homework-solver': {
    title: 'Free AI Homework Solver – Step-by-Step Explanations',
    description:
      'Get step-by-step homework explanations, final answers, key concepts, and alternative approaches when appropriate. Educational DeepSeek help—not just bare answers.',
    example: {
      input: 'Explain how to solve a linear equation word problem…',
      output: 'Steps, final answer, key concepts, and optional alternative approach',
    },
    faqs: [
      {
        q: 'Does it only give the final answer?',
        a: 'No. It emphasizes step-by-step explanations, key concepts, and alternative approaches when useful—so you learn the method.',
      },
      {
        q: 'Is the homework solver free?',
        a: 'Yes. It is free on Zetawala and powered by DeepSeek.',
      },
      {
        q: 'What subjects work best?',
        a: 'Clear text questions in math, science, history, and language arts work well. Paste the full question for better steps.',
      },
      {
        q: 'Should I use it to cheat?',
        a: 'No. Use it to understand methods. Follow your school’s academic integrity rules.',
      },
      {
        q: 'What if the AI is wrong?',
        a: 'Always verify. AI can make mistakes—check steps against class materials.',
      },
    ],
  },

  'typing-speed-test': {
    title: 'Free Typing Speed Test – WPM Accuracy & Certificate',
    description:
      'Test typing speed with timed passages. Track WPM, CPM, accuracy, mistakes, local history, and download a certificate—no AI required, dark-mode friendly.',
    example: {
      input: '60-second timed passage',
      output: 'WPM, CPM, accuracy %, mistakes, local history, downloadable certificate',
    },
    faqs: [
      {
        q: 'How is WPM calculated?',
        a: 'Words per minute is based on correct characters (typically characters ÷ 5) over elapsed time, alongside CPM and accuracy.',
      },
      {
        q: 'Is history saved?',
        a: 'Yes. Attempts are stored in LocalStorage on your device when authentication is unavailable—leaderboard-ready architecture for later.',
      },
      {
        q: 'Can I download a certificate?',
        a: 'Yes. Enter your name after a completed test and download a PDF certificate with WPM and accuracy.',
      },
      {
        q: 'Does this use AI?',
        a: 'No. The typing speed test is pure client logic for responsive, lag-free typing.',
      },
      {
        q: 'Which durations are available?',
        a: 'Common timed options such as 30, 60, and 120 seconds.',
      },
    ],
  },

  'typing-master-course': {
    title: 'Free Typing Master Course – Lessons Progress & Certificate',
    description:
      'Beginner, intermediate, and advanced typing lessons with guided practice, LocalStorage resume, lesson completion, and a final certificate—no AI required.',
    example: {
      input: 'Complete home-row lessons → resume later from LocalStorage',
      output: 'Progress tracking, lesson completion, final course certificate',
    },
    faqs: [
      {
        q: 'Will the course resume where I left off?',
        a: 'Yes. Progress and the current lesson are saved in LocalStorage so you can continue later on the same browser.',
      },
      {
        q: 'What levels are included?',
        a: 'Beginner, intermediate, and advanced lessons covering home row, mixed practice, punctuation, and speed paragraphs.',
      },
      {
        q: 'Is there a certificate?',
        a: 'Yes. After completing all lessons you can download a final Typing Master certificate PDF.',
      },
      {
        q: 'Does this use AI?',
        a: 'No. Typing Master is deterministic practice logic only.',
      },
      {
        q: 'How do I complete a lesson?',
        a: 'Type the lesson prompt exactly, then mark it complete to unlock the next lesson.',
      },
    ],
  },

  'coding-typing-test': {
    title: 'Free Coding Typing Test – JS Python Java C++ HTML SQL',
    description:
      'Practice typing real code snippets with syntax-aware display. Track WPM, accuracy, errors, difficulty, history, and download a certificate—no AI required.',
    example: {
      input: 'Language: JavaScript · Difficulty: Medium',
      output: 'Preserve formatting while typing; WPM, accuracy, history, certificate',
    },
    faqs: [
      {
        q: 'Which languages are supported?',
        a: 'JavaScript, Python, Java, C++, HTML, and SQL snippets at easy, medium, and hard difficulty.',
      },
      {
        q: 'Is formatting preserved?',
        a: 'Yes. You type against the exact snippet including whitespace and newlines.',
      },
      {
        q: 'Does coding typing use AI?',
        a: 'No. Snippets and scoring are pure client logic for low-latency practice.',
      },
      {
        q: 'Can I get a certificate?',
        a: 'Yes. After finishing a snippet you can download a PDF certificate with WPM and accuracy.',
      },
      {
        q: 'Is history saved locally?',
        a: 'Yes. Recent attempts are stored in LocalStorage on your device.',
      },
    ],
  },
};
