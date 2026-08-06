export const TYPING_PASSAGES = [
  'Practice makes progress. Focus on accuracy first, then speed will follow naturally as your fingers learn the patterns.',
  'The quick brown fox jumps over the lazy dog. Typing every day for ten minutes builds lasting muscle memory.',
  'Clear communication starts with careful writing. Good typing habits reduce mistakes and help you finish work faster.',
  'In a quiet room, steady breathing and upright posture support comfortable typing for longer practice sessions.',
  'Technology connects learners around the world. Consistent practice turns beginners into confident keyboard users.',
  'Small goals compound. Aim for fewer errors today, and celebrate each accurate sentence you complete without looking down.',
];

export const TYPING_LESSONS = [
  { id: 'b1', level: 'beginner', title: 'Home Row Basics', prompt: 'asdf jkl; asdf jkl; as df jk l; aaa sss ddd fff jjj kkk lll ;;; asdfjkl;' },
  { id: 'b2', level: 'beginner', title: 'Home Row Words', prompt: 'a sad lad; ask dad; fall flask; salad; all fall; dash; flash; glad' },
  { id: 'b3', level: 'beginner', title: 'Easy Sentences', prompt: 'a lad asks dad; she falls fast; all salad is glad; dash and flash' },
  { id: 'i1', level: 'intermediate', title: 'Top Row Intro', prompt: 'qwer tyui qwer tyui quote write type quite true yet try' },
  { id: 'i2', level: 'intermediate', title: 'Bottom Row', prompt: 'zxcv bnm, zxcv bnm, zebra cave moon next box zoom' },
  { id: 'i3', level: 'intermediate', title: 'Mixed Practice', prompt: 'The early bird catches the worm. Practice typing without looking at the keys.' },
  { id: 'a1', level: 'advanced', title: 'Punctuation', prompt: 'Hello, world! Are you ready? Yes — let\'s begin: accuracy, speed, and focus.' },
  { id: 'a2', level: 'advanced', title: 'Numbers & Symbols', prompt: 'Order #42 costs $19.99 (20% off). Email: practice@zetawala.com' },
  { id: 'a3', level: 'advanced', title: 'Speed Paragraph', prompt: 'Consistent daily practice improves both speed and accuracy. Keep your wrists relaxed, eyes on the screen, and correct errors immediately.' },
];

export const CODING_SNIPPETS = {
  javascript: {
    easy: 'function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(2, 3));',
    medium: 'const users = data.filter((u) => u.active)\n  .map((u) => ({ id: u.id, name: u.name }));\n\nexport default users;',
    hard: 'async function fetchJson(url) {\n  const res = await fetch(url);\n  if (!res.ok) throw new Error(`HTTP ${res.status}`);\n  return res.json();\n}',
  },
  python: {
    easy: 'def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ada"))',
    medium: 'nums = [n for n in range(10) if n % 2 == 0]\ntotal = sum(nums)\nprint(total)',
    hard: 'def merge(a, b):\n    i = j = 0\n    out = []\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            out.append(a[i]); i += 1\n        else:\n            out.append(b[j]); j += 1\n    return out + a[i:] + b[j:]',
  },
  java: {
    easy: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}',
    medium: 'List<String> names = list.stream()\n  .filter(s -> !s.isBlank())\n  .map(String::trim)\n  .toList();',
    hard: 'public static int binarySearch(int[] a, int t) {\n  int lo = 0, hi = a.length - 1;\n  while (lo <= hi) {\n    int mid = lo + (hi - lo) / 2;\n    if (a[mid] == t) return mid;\n    if (a[mid] < t) lo = mid + 1; else hi = mid - 1;\n  }\n  return -1;\n}',
  },
  cpp: {
    easy: '#include <iostream>\nint main() {\n  std::cout << "Hi\\n";\n  return 0;\n}',
    medium: 'std::vector<int> v = {1, 2, 3};\nfor (int x : v) {\n  std::cout << x << " ";\n}',
    hard: 'template <typename T>\nT clamp(T v, T lo, T hi) {\n  return v < lo ? lo : (v > hi ? hi : v);\n}',
  },
  html: {
    easy: '<!DOCTYPE html>\n<html>\n<head><title>Demo</title></head>\n<body><h1>Hello</h1></body>\n</html>',
    medium: '<section class="card">\n  <h2>Title</h2>\n  <p>Content goes here.</p>\n  <button type="button">Save</button>\n</section>',
    hard: '<form action="/api" method="post">\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required />\n  <button type="submit">Continue</button>\n</form>',
  },
  sql: {
    easy: 'SELECT id, name\nFROM users\nWHERE active = 1;',
    medium: 'SELECT u.name, COUNT(o.id) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.name;',
    hard: 'WITH ranked AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) rn\n  FROM sessions\n)\nSELECT * FROM ranked WHERE rn = 1;',
  },
};
