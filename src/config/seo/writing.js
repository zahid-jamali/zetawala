export const writingSeoData = {
  'ai-humanizer': {
    title: 'Free AI Humanizer – Make AI Text Sound Natural',
    description:
      'Humanize AI-generated text with Zetawala’s free DeepSeek-powered AI humanizer. Rewrite stiff ChatGPT-style copy into natural, readable prose in English, Spanish, or Urdu—ideal for blogs, emails, and student drafts. Paste your draft, pick a language, and get smoother wording that still keeps your meaning. No signup required to try.',
    example: {
      input:
        'In today’s rapidly evolving digital landscape, it is imperative to leverage synergistic solutions…',
      output:
        'Online tools change fast, so pick ones that actually help your team get work done…',
    },
    faqs: [
      {
        q: 'What does the AI humanizer do?',
        a: 'It rewrites AI-sounding or stiff text so it reads more naturally—clearer rhythm, less formulaic phrasing—while aiming to keep your original meaning.',
      },
      {
        q: 'Is the AI humanizer free?',
        a: 'Yes. Zetawala’s AI humanizer is free to use. Results are generated with DeepSeek-powered writing analysis through our generate API.',
      },
      {
        q: 'Which languages are supported?',
        a: 'You can humanize text in English, Spanish, and Urdu. Choose the language that matches your draft for best results.',
      },
      {
        q: 'Will humanizing remove my facts or citations?',
        a: 'The tool focuses on tone and fluency. You should still review names, numbers, and citations—never invent facts, and verify anything important before publishing.',
      },
      {
        q: 'Who should use an AI humanizer?',
        a: 'Writers, marketers, students, and support teams who want AI drafts to sound less robotic before they publish or send.',
      },
      {
        q: 'Is this a guarantee against AI detectors?',
        a: 'No. Detectors vary and are imperfect. Use the humanizer to improve readability and voice—not as a promise that any detector will score “100% human.”',
      },
    ],
  },

  'ai-content-detector': {
    title: 'Free AI Content Detector – Estimate AI vs Human Writing',
    description:
      'Check whether text looks AI-written with Zetawala’s free DeepSeek-powered AI content detector. Get an overall estimate plus sentence-level signals in English, Spanish, or Urdu—useful for editors, teachers, and publishers reviewing drafts. Paste content and review cautious scores, not absolute proof. Free to try with no account required.',
    example: {
      input: 'Paste a 200-word blog intro that may be AI-generated',
      output:
        'Overall: Likely AI-assisted · Sample sentences flagged for formulaic openers and repetitive structure',
    },
    faqs: [
      {
        q: 'How accurate is the AI content detector?',
        a: 'It estimates likelihood from writing patterns via DeepSeek-powered analysis. Treat scores as guidance—not courtroom proof—especially on short or heavily edited text.',
      },
      {
        q: 'Is the AI detector free?',
        a: 'Yes. Zetawala offers a free AI content detector for English, Spanish, and Urdu text.',
      },
      {
        q: 'Does it highlight specific sentences?',
        a: 'Yes. Alongside an overall estimate, you get sentence-level signals that help you review which parts sound more formulaic or AI-like.',
      },
      {
        q: 'Can mixed human + AI text confuse the score?',
        a: 'Often yes. Heavily edited AI drafts or collaborative writing can land in a middle range. Use the sentence view to inspect borderline sections.',
      },
      {
        q: 'Which languages can I check?',
        a: 'English, Spanish, and Urdu are supported. Pick the language that matches the text you paste.',
      },
      {
        q: 'Who uses an AI content detector?',
        a: 'Editors, educators, agencies, and site owners who want a second opinion before publishing or grading AI-assisted writing.',
      },
    ],
  },

  'plagiarism-checker': {
    title: 'Free Plagiarism Checker – Local Document Similarity',
    description:
      'Compare two texts for overlap with Zetawala’s free DeepSeek-powered plagiarism checker. This is LOCAL document similarity analysis between your pasted or uploaded draft and a reference you provide—not a web-wide internet plagiarism search. Ideal for English, Spanish, or Urdu drafts when you need overlap estimates against a known source. Free to use; always review matches yourself.',
    example: {
      input:
        'Source: your essay · Reference: classmate draft or source notes (paste or upload)',
      output:
        'Similarity estimate + overlapping phrases (local/document compare only—not web crawl)',
    },
    faqs: [
      {
        q: 'Does this search the entire internet for plagiarism?',
        a: 'No. It performs LOCAL document similarity between the text you provide and a reference you paste or upload. It is not web-wide plagiarism detection.',
      },
      {
        q: 'Is the plagiarism checker free?',
        a: 'Yes. Zetawala’s local similarity checker is free. Analysis uses DeepSeek-powered comparison of the documents you supply.',
      },
      {
        q: 'What can I upload?',
        a: 'You can paste text or upload a supported document for extraction, then compare against a reference. Stick to files you have rights to analyze.',
      },
      {
        q: 'Which languages are supported?',
        a: 'Comparisons work for English, Spanish, and Urdu content when you select the matching language.',
      },
      {
        q: 'How should I interpret a high similarity score?',
        a: 'High overlap means the two documents share wording or structure. Quoted citations and shared boilerplate can raise scores—always review highlighted stretches in context.',
      },
      {
        q: 'Who should use local document similarity?',
        a: 'Teachers comparing submissions, editors checking drafts against a brief, and writers verifying their text against a known source document.',
      },
    ],
  },

  'grammar-checker': {
    title: 'Free Grammar Checker – Spelling, Punctuation & Style',
    description:
      'Fix grammar, spelling, punctuation, and style with Zetawala’s free DeepSeek-powered grammar checker. Get clear suggestions for English, Spanish, or Urdu writing—emails, essays, and website copy. Paste your text, review issues, and apply cleaner wording before you publish. Free online grammar help with no install.',
    example: {
      input: 'She dont have the report ready yet, and there going to be late.',
      output:
        'She doesn’t have the report ready yet, and they’re going to be late. · Issues: subject–verb, their/they’re',
    },
    faqs: [
      {
        q: 'What does the grammar checker review?',
        a: 'It looks for grammar, spelling, punctuation, and style issues, then suggests clearer alternatives powered by DeepSeek writing analysis.',
      },
      {
        q: 'Is the grammar checker free?',
        a: 'Yes. Zetawala’s grammar checker is free to use for everyday drafting and proofreading.',
      },
      {
        q: 'Which languages are supported?',
        a: 'English, Spanish, and Urdu. Choose the language of your draft so suggestions match that grammar.',
      },
      {
        q: 'Will it rewrite my whole document?',
        a: 'It focuses on corrections and style suggestions. You stay in control—accept what fits your voice and keep intentional stylistic choices.',
      },
      {
        q: 'Can it help with business or academic writing?',
        a: 'Yes. It is useful for emails, reports, blog posts, and school drafts. Always double-check domain-specific terms and citations.',
      },
      {
        q: 'Who should use an online grammar checker?',
        a: 'Anyone polishing writing before sending or publishing—non-native speakers, students, marketers, and busy professionals.',
      },
    ],
  },

  'paraphrasing-tool': {
    title: 'Free Paraphrasing Tool – Fluency, Formal & Academic Modes',
    description:
      'Paraphrase text online with Zetawala’s free DeepSeek-powered paraphrasing tool. Rewrite in standard, fluency, formal, creative, or academic modes for English, Spanish, or Urdu. Keep your ideas while refreshing wording for blogs, homework explanations, and client updates. Free to try—review output for accuracy before you publish.',
    example: {
      input: 'Mode: Academic · “Social media can hurt focus if you check it all day.”',
      output:
        'Continuous social media use may impair sustained attention when checking becomes habitual throughout the day.',
    },
    faqs: [
      {
        q: 'What paraphrase modes are available?',
        a: 'Standard, fluency, formal, creative, and academic. Pick the mode that matches the tone you need.',
      },
      {
        q: 'Is the paraphrasing tool free?',
        a: 'Yes. Zetawala’s paraphraser is free and powered by DeepSeek through our writing generate API.',
      },
      {
        q: 'Which languages can I paraphrase?',
        a: 'English, Spanish, and Urdu are supported. Select the language that matches your source text.',
      },
      {
        q: 'Does paraphrasing equal plagiarism-free writing?',
        a: 'No. Paraphrasing changes wording; you still must cite sources and avoid presenting others’ ideas as your own.',
      },
      {
        q: 'When should I use formal vs creative mode?',
        a: 'Use formal for reports and professional mail. Use creative when you want livelier marketing or storytelling language.',
      },
      {
        q: 'Who benefits from a paraphrasing tool?',
        a: 'Students clarifying notes, content writers refreshing drafts, and professionals adapting the same message for different audiences.',
      },
    ],
  },

  'roman-urdu-to-urdu': {
    title: 'Free Roman Urdu to Urdu Converter – Proper Urdu Script',
    description:
      'Convert Roman Urdu into proper Urdu script with Zetawala’s free DeepSeek-powered Roman Urdu to Urdu converter. Paste chat-style Roman Urdu and get readable اردو for posts, captions, and messages. Built for Pakistani and Urdu-speaking users who type in Latin letters but need Nastaliq-ready text. Free online transliteration—no install.',
    example: {
      input: 'Aaj mausam bohot acha hai, chalo bahir chalte hain.',
      output: 'آج موسم بہت اچھا ہے، چلو باہر چلتے ہیں۔',
    },
    faqs: [
      {
        q: 'What is Roman Urdu to Urdu conversion?',
        a: 'It maps Latin-letter Roman Urdu (e.g., “kya haal hai”) into proper Urdu script so your text displays correctly for Urdu readers.',
      },
      {
        q: 'Is the converter free?',
        a: 'Yes. Zetawala’s Roman Urdu → Urdu converter is free and uses DeepSeek-powered language processing.',
      },
      {
        q: 'Will every spelling convert perfectly?',
        a: 'Roman Urdu has many spellings for the same word. Review names and uncommon terms—common phrases usually convert well.',
      },
      {
        q: 'Who should use this tool?',
        a: 'Anyone who types Urdu in English letters for WhatsApp, Facebook, or Instagram but needs proper Urdu script for publishing.',
      },
      {
        q: 'Can I convert long paragraphs?',
        a: 'Yes. Paste longer drafts and convert in one pass, then skim for names, brands, and English words mixed into the text.',
      },
      {
        q: 'Does this translate English to Urdu?',
        a: 'No. It transliterates Roman Urdu into Urdu script. For English meaning changes, use a translator or rewrite tool instead.',
      },
    ],
  },

  'urdu-to-roman-urdu': {
    title: 'Free Urdu to Roman Urdu Converter – Easy Latin Script',
    description:
      'Transliterate Urdu script into Roman Urdu with Zetawala’s free DeepSeek-powered Urdu to Roman Urdu converter. Choose standard, phonetic, or casual style for chats, captions, and learners who read Latin letters. Paste اردو text and get natural Roman Urdu you can share anywhere. Free online tool—no download required.',
    example: {
      input: 'آج میٹنگ تین بجے ہے، بروقت پہنچنا۔',
      output: 'Aaj meeting teen baje hai, barwaqt pahunchna. (style: standard/casual)',
    },
    faqs: [
      {
        q: 'What styles of Roman Urdu can I get?',
        a: 'Standard, phonetic, and casual. Casual leans toward everyday WhatsApp-style spelling; phonetic aims for clearer pronunciation cues.',
      },
      {
        q: 'Is the Urdu to Roman Urdu converter free?',
        a: 'Yes. It is free on Zetawala and powered by DeepSeek language processing.',
      },
      {
        q: 'Why convert Urdu to Roman Urdu?',
        a: 'Many audiences type and read Latin letters faster on phones. Roman Urdu helps when the other person cannot read Urdu script easily.',
      },
      {
        q: 'Will English words inside Urdu stay English?',
        a: 'Usually yes for common loanwords (meeting, office). Always check brand names and technical terms after conversion.',
      },
      {
        q: 'Who uses this converter?',
        a: 'Social sellers, content creators, diaspora families, and learners practicing Urdu pronunciation via Latin script.',
      },
      {
        q: 'Is Roman Urdu spelling standardized?',
        a: 'No single standard exists. Styles differ by region and chat habits—pick the style closest to your audience.',
      },
    ],
  },

  'roman-urdu-grammar': {
    title: 'Free Roman Urdu Grammar & Spell Checker',
    description:
      'Fix Roman Urdu spelling and grammar with Zetawala’s free DeepSeek-powered Roman Urdu grammar checker. Get clearer chat and caption wording with side-by-side compare—ideal for Pakistani social commerce, WhatsApp, and Facebook posts. Paste Roman Urdu, review suggestions, and copy a cleaner version. Free online proofreading for Latin-script Urdu.',
    example: {
      input: 'Mujhe kal market jana tha lekin time nai mila or mein late ho gaya.',
      output:
        'Mujhe kal market jana tha lekin time nahi mila aur main late ho gaya. · Side-by-side fixes shown',
    },
    faqs: [
      {
        q: 'What does the Roman Urdu grammar checker fix?',
        a: 'It targets common Roman Urdu spelling and grammar issues—particles like “nahi/nai,” “aur/or,” “main/mein”—and suggests cleaner alternatives.',
      },
      {
        q: 'Is this tool free?',
        a: 'Yes. Zetawala’s Roman Urdu grammar & spell checker is free and DeepSeek-powered.',
      },
      {
        q: 'Can I compare before and after?',
        a: 'Yes. The tool is designed for side-by-side compare so you can see what changed before you copy the result.',
      },
      {
        q: 'Does it convert to Urdu script?',
        a: 'No. This checker stays in Roman Urdu. Use the Roman Urdu → Urdu converter if you need proper اردو script.',
      },
      {
        q: 'Who should use Roman Urdu spell check?',
        a: 'Local sellers, community managers, and anyone writing Roman Urdu captions or WhatsApp broadcasts who wants fewer awkward mistakes.',
      },
      {
        q: 'Will slang and English mix-ins be preserved?',
        a: 'Everyday code-mixing is common in Roman Urdu. The checker aims to keep natural mix while fixing clear errors—review creative slang yourself.',
      },
    ],
  },

  'ai-text-summarizer': {
    title: 'Free AI Text Summarizer – Short, Bullet & Key Points',
    description:
      'Summarize long text with Zetawala’s free DeepSeek-powered AI text summarizer. Choose short, medium, or detailed length and get concise, bullet, or key-point summaries in English, Spanish, or Urdu. Paste articles, notes, or reports and extract what matters fast. Free online summarizer—review facts before you act on them.',
    example: {
      input: 'Length: Short · 800-word product update blog pasted',
      output:
        '3–5 sentence summary of launch date, features, and who should upgrade',
    },
    faqs: [
      {
        q: 'What summary lengths are available?',
        a: 'Short, medium, and detailed. Short is best for skimming; detailed keeps more nuance and supporting points.',
      },
      {
        q: 'Is the AI text summarizer free?',
        a: 'Yes. Zetawala’s summarizer is free and powered by DeepSeek writing analysis.',
      },
      {
        q: 'Which languages can I summarize?',
        a: 'English, Spanish, and Urdu. Match the language setting to your source text for better results.',
      },
      {
        q: 'Can summaries invent facts?',
        a: 'Models can miss or oversimplify details. Always verify numbers, dates, and claims against the original before publishing or deciding.',
      },
      {
        q: 'What content works best?',
        a: 'Articles, meeting notes, research abstracts, and support tickets with a clear topic. Extremely noisy or fragmented text may need cleanup first.',
      },
      {
        q: 'Who uses an AI summarizer?',
        a: 'Students, researchers, PMs, and marketers who need a fast digest before reading or sharing the full document.',
      },
    ],
  },

  'ai-rewrite-tool': {
    title: 'Free AI Rewrite Tool – Shorter, Longer, SEO & Tone',
    description:
      'Rewrite any draft with Zetawala’s free DeepSeek-powered AI rewrite tool. Modes include shorter, longer, professional, friendly, and SEO-focused—for English, Spanish, or Urdu. Refresh blog posts, landing copy, and emails without starting from scratch. Free online rewriter; keep your meaning and edit the output to match your brand.',
    example: {
      input: 'Mode: SEO · “Buy running shoes online. Fast shipping.”',
      output:
        'Shop lightweight running shoes online with free shipping options, size guides, and easy returns for everyday runners.',
    },
    faqs: [
      {
        q: 'What rewrite modes are supported?',
        a: 'Shorter, longer, professional, friendly, and SEO. Each reshapes length or tone while aiming to keep your core message.',
      },
      {
        q: 'Is the AI rewrite tool free?',
        a: 'Yes. It is free on Zetawala and uses DeepSeek-powered rewriting via our generate API.',
      },
      {
        q: 'Which languages can I rewrite?',
        a: 'English, Spanish, and Urdu. Select the language that matches your draft.',
      },
      {
        q: 'How is rewrite different from paraphrase?',
        a: 'Paraphrase modes emphasize rewording styles (fluency, academic, etc.). Rewrite modes focus on length and tone goals like shorter, friendlier, or SEO-oriented copy.',
      },
      {
        q: 'Will SEO mode stuff keywords?',
        a: 'It aims for clearer, search-friendly wording—not awkward keyword stuffing. Add your target phrase naturally and edit as needed.',
      },
      {
        q: 'Who should use an AI rewrite tool?',
        a: 'Content marketers, founders, and support writers who need quick tone or length changes on existing copy.',
      },
    ],
  },
};
