/**
 * Client-safe Excel formula helpers (no Node APIs).
 * Categories: lookup, math, date, text, logical, dynamic
 */

const TEMPLATES = {
  // Lookup
  'vlookup-basic': {
    category: 'lookup',
    build: (p) =>
      `=VLOOKUP(${p.lookupValue || 'A2'}, ${p.tableRange || 'A:D'}, ${p.colIndex || 2}, ${p.exact !== false ? 'FALSE' : 'TRUE'})`,
    explain: (p) =>
      `Looks up ${p.lookupValue || 'A2'} in the first column of ${p.tableRange || 'A:D'} and returns column ${p.colIndex || 2}.`,
    example: '=VLOOKUP(A2, A:D, 2, FALSE)',
  },
  'xlookup-basic': {
    category: 'lookup',
    build: (p) =>
      `=XLOOKUP(${p.lookupValue || 'A2'}, ${p.lookupRange || 'A:A'}, ${p.returnRange || 'B:B'}, ${quote(p.ifNotFound || 'Not found')})`,
    explain: (p) =>
      `Modern lookup: find ${p.lookupValue || 'A2'} in ${p.lookupRange || 'A:A'} and return from ${p.returnRange || 'B:B'}.`,
    example: '=XLOOKUP(A2, A:A, B:B, "Not found")',
  },
  'index-match': {
    category: 'lookup',
    build: (p) =>
      `=INDEX(${p.returnRange || 'B:B'}, MATCH(${p.lookupValue || 'A2'}, ${p.lookupRange || 'A:A'}, 0))`,
    explain: () =>
      'Flexible two-way lookup: MATCH finds the row, INDEX returns the value from that row.',
    example: '=INDEX(B:B, MATCH(A2, A:A, 0))',
  },

  // Math
  'sum-range': {
    category: 'math',
    build: (p) => `=SUM(${p.range || 'A1:A10'})`,
    explain: (p) => `Adds all numbers in ${p.range || 'A1:A10'}.`,
    example: '=SUM(A1:A10)',
  },
  'average-range': {
    category: 'math',
    build: (p) => `=AVERAGE(${p.range || 'A1:A10'})`,
    explain: (p) => `Returns the arithmetic mean of ${p.range || 'A1:A10'}.`,
    example: '=AVERAGE(A1:A10)',
  },
  'round-value': {
    category: 'math',
    build: (p) => `=ROUND(${p.value || 'A1'}, ${p.digits ?? 2})`,
    explain: (p) => `Rounds ${p.value || 'A1'} to ${p.digits ?? 2} decimal places.`,
    example: '=ROUND(A1, 2)',
  },

  // Date
  'today': {
    category: 'date',
    build: () => '=TODAY()',
    explain: () => 'Returns the current date (no time). Recalculates when the workbook opens.',
    example: '=TODAY()',
  },
  'edate': {
    category: 'date',
    build: (p) => `=EDATE(${p.startDate || 'A1'}, ${p.months ?? 1})`,
    explain: (p) =>
      `Returns the date that is ${p.months ?? 1} month(s) before/after ${p.startDate || 'A1'}.`,
    example: '=EDATE(A1, 1)',
  },
  'datedif': {
    category: 'date',
    build: (p) =>
      `=DATEDIF(${p.startDate || 'A1'}, ${p.endDate || 'B1'}, ${quote(p.unit || 'Y')})`,
    explain: (p) =>
      `Calculates the difference between ${p.startDate || 'A1'} and ${p.endDate || 'B1'} in units "${p.unit || 'Y'}" (Y/M/D).`,
    example: '=DATEDIF(A1, B1, "Y")',
  },

  // Text
  'left': {
    category: 'text',
    build: (p) => `=LEFT(${p.text || 'A1'}, ${p.numChars ?? 3})`,
    explain: (p) => `Returns the first ${p.numChars ?? 3} character(s) from ${p.text || 'A1'}.`,
    example: '=LEFT(A1, 3)',
  },
  'right': {
    category: 'text',
    build: (p) => `=RIGHT(${p.text || 'A1'}, ${p.numChars ?? 3})`,
    explain: (p) => `Returns the last ${p.numChars ?? 3} character(s) from ${p.text || 'A1'}.`,
    example: '=RIGHT(A1, 3)',
  },
  'concat': {
    category: 'text',
    build: (p) => {
      const parts = Array.isArray(p.parts) && p.parts.length ? p.parts : ['A1', '" "', 'B1'];
      return `=CONCAT(${parts.join(', ')})`;
    },
    explain: () => 'Joins text values/cells into one string.',
    example: '=CONCAT(A1, " ", B1)',
  },
  'text-format': {
    category: 'text',
    build: (p) => `=TEXT(${p.value || 'A1'}, ${quote(p.format || '0.00')})`,
    explain: (p) => `Formats ${p.value || 'A1'} as text using format "${p.format || '0.00'}".`,
    example: '=TEXT(A1, "0.00")',
  },

  // Logical
  'if-basic': {
    category: 'logical',
    build: (p) =>
      `=IF(${p.condition || 'A1>100'}, ${quoteOrRaw(p.valueIfTrue ?? 'Yes')}, ${quoteOrRaw(p.valueIfFalse ?? 'No')})`,
    explain: (p) =>
      `If ${p.condition || 'A1>100'} is true, returns the true value; otherwise the false value.`,
    example: '=IF(A1>100, "Yes", "No")',
  },
  'and': {
    category: 'logical',
    build: (p) => {
      const conds = Array.isArray(p.conditions) && p.conditions.length ? p.conditions : ['A1>0', 'B1<>""'];
      return `=AND(${conds.join(', ')})`;
    },
    explain: () => 'Returns TRUE only when all conditions are TRUE.',
    example: '=AND(A1>0, B1<>"")',
  },
  'or': {
    category: 'logical',
    build: (p) => {
      const conds = Array.isArray(p.conditions) && p.conditions.length ? p.conditions : ['A1>0', 'A1="N/A"'];
      return `=OR(${conds.join(', ')})`;
    },
    explain: () => 'Returns TRUE when at least one condition is TRUE.',
    example: '=OR(A1>0, A1="N/A")',
  },
  'ifs': {
    category: 'logical',
    build: (p) => {
      const pairs =
        Array.isArray(p.pairs) && p.pairs.length
          ? p.pairs
          : [
              { condition: 'A1>=90', value: '"A"' },
              { condition: 'A1>=80', value: '"B"' },
              { condition: 'TRUE', value: '"C"' },
            ];
      return `=IFS(${pairs.map((x) => `${x.condition}, ${x.value}`).join(', ')})`;
    },
    explain: () => 'Checks conditions in order and returns the value for the first TRUE condition.',
    example: '=IFS(A1>=90, "A", A1>=80, "B", TRUE, "C")',
  },

  // Dynamic arrays
  'filter': {
    category: 'dynamic',
    build: (p) =>
      `=FILTER(${p.array || 'A2:C100'}, ${p.include || 'B2:B100="Active"'}, ${quote(p.ifEmpty || 'No results')})`,
    explain: () => 'Returns rows from an array that meet a condition (dynamic array).',
    example: '=FILTER(A2:C100, B2:B100="Active", "No results")',
  },
  'unique': {
    category: 'dynamic',
    build: (p) => `=UNIQUE(${p.range || 'A2:A100'})`,
    explain: (p) => `Returns unique values from ${p.range || 'A2:A100'}.`,
    example: '=UNIQUE(A2:A100)',
  },
  'sort': {
    category: 'dynamic',
    build: (p) =>
      `=SORT(${p.range || 'A2:C100'}, ${p.sortIndex ?? 1}, ${p.order ?? 1})`,
    explain: (p) =>
      `Sorts ${p.range || 'A2:C100'} by column ${p.sortIndex ?? 1} (${(p.order ?? 1) === -1 ? 'descending' : 'ascending'}).`,
    example: '=SORT(A2:C100, 1, 1)',
  },
};

const FUNCTION_HELP = {
  VLOOKUP:
    'Searches for a value in the first column of a range and returns a value in the same row from a column you specify.',
  XLOOKUP:
    'Looks up a value in a range/array and returns a corresponding value from another range/array (supports exact match by default).',
  INDEX: 'Returns a value (or reference) from a range based on row and optional column numbers.',
  MATCH: 'Returns the relative position of a lookup value within a range.',
  SUM: 'Adds all numbers in the given arguments/ranges.',
  AVERAGE: 'Returns the arithmetic mean of its arguments.',
  ROUND: 'Rounds a number to a specified number of digits.',
  TODAY: 'Returns the current date.',
  EDATE: 'Returns a date a given number of months before or after a start date.',
  DATEDIF: 'Calculates the number of days, months, or years between two dates.',
  LEFT: 'Returns the leftmost characters from a text string.',
  RIGHT: 'Returns the rightmost characters from a text string.',
  CONCAT: 'Joins several text strings into one string.',
  CONCATENATE: 'Legacy join function; prefer CONCAT or the & operator.',
  TEXT: 'Converts a value to text in a specific number format.',
  IF: 'Returns one value if a condition is TRUE and another if FALSE.',
  AND: 'Returns TRUE if all arguments are TRUE.',
  OR: 'Returns TRUE if any argument is TRUE.',
  IFS: 'Checks multiple conditions and returns a value corresponding to the first TRUE result.',
  FILTER: 'Filters a range based on criteria and spills matching rows/columns.',
  UNIQUE: 'Returns a list of unique values from a range/array.',
  SORT: 'Sorts the contents of a range/array.',
  SUMIF: 'Adds cells that meet a single criterion.',
  COUNTIF: 'Counts cells that meet a single criterion.',
  IFERROR: 'Returns a fallback value when the primary expression errors.',
};

function quote(value) {
  const s = String(value);
  if (/^".*"$/.test(s)) return s;
  return `"${s.replace(/"/g, '""')}"`;
}

function quoteOrRaw(value) {
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  const s = String(value);
  if (/^[A-Z]+\d+$/i.test(s) || /^[A-Z]+[A-Z]*!\w+/i.test(s) || s.startsWith('=')) return s;
  if (/^(TRUE|FALSE)$/i.test(s)) return s.toUpperCase();
  if (/^-?\d+(\.\d+)?$/.test(s)) return s;
  return quote(s);
}

export const FORMULA_CATEGORIES = [
  { id: 'lookup', label: 'Lookup' },
  { id: 'math', label: 'Math' },
  { id: 'date', label: 'Date' },
  { id: 'text', label: 'Text' },
  { id: 'logical', label: 'Logical' },
  { id: 'dynamic', label: 'Dynamic Arrays' },
];

const TEMPLATE_FIELDS = {
  'vlookup-basic': [
    { key: 'lookupValue', label: 'Lookup value', placeholder: 'A2' },
    { key: 'tableRange', label: 'Table range', placeholder: 'A:D' },
    { key: 'colIndex', label: 'Column index', placeholder: '2' },
  ],
  'xlookup-basic': [
    { key: 'lookupValue', label: 'Lookup value', placeholder: 'A2' },
    { key: 'lookupRange', label: 'Lookup range', placeholder: 'A:A' },
    { key: 'returnRange', label: 'Return range', placeholder: 'B:B' },
    { key: 'ifNotFound', label: 'If not found', placeholder: 'Not found' },
  ],
  'index-match': [
    { key: 'lookupValue', label: 'Lookup value', placeholder: 'A2' },
    { key: 'lookupRange', label: 'Lookup range', placeholder: 'A:A' },
    { key: 'returnRange', label: 'Return range', placeholder: 'B:B' },
  ],
  'sum-range': [{ key: 'range', label: 'Range', placeholder: 'A1:A10' }],
  'average-range': [{ key: 'range', label: 'Range', placeholder: 'A1:A10' }],
  'round-value': [
    { key: 'value', label: 'Value / cell', placeholder: 'A1' },
    { key: 'digits', label: 'Decimal places', placeholder: '2' },
  ],
  'edate': [
    { key: 'startDate', label: 'Start date cell', placeholder: 'A1' },
    { key: 'months', label: 'Months', placeholder: '1' },
  ],
  'datedif': [
    { key: 'startDate', label: 'Start date', placeholder: 'A1' },
    { key: 'endDate', label: 'End date', placeholder: 'B1' },
    { key: 'unit', label: 'Unit (Y/M/D)', placeholder: 'Y' },
  ],
  'left-text': [
    { key: 'text', label: 'Text / cell', placeholder: 'A1' },
    { key: 'numChars', label: 'Characters', placeholder: '5' },
  ],
  'right-text': [
    { key: 'text', label: 'Text / cell', placeholder: 'A1' },
    { key: 'numChars', label: 'Characters', placeholder: '5' },
  ],
  'concat-text': [
    { key: 'values', label: 'Values (comma-separated)', placeholder: 'A1, B1, " - "' },
  ],
  'text-format': [
    { key: 'value', label: 'Value / cell', placeholder: 'A1' },
    { key: 'format', label: 'Format code', placeholder: '0.00' },
  ],
  'if-basic': [
    { key: 'condition', label: 'Condition', placeholder: 'A1>10' },
    { key: 'valueTrue', label: 'If true', placeholder: '"Yes"' },
    { key: 'valueFalse', label: 'If false', placeholder: '"No"' },
  ],
  'and-logic': [{ key: 'conditions', label: 'Conditions (comma-separated)', placeholder: 'A1>0, B1<>""' }],
  'or-logic': [{ key: 'conditions', label: 'Conditions (comma-separated)', placeholder: 'A1="X", A1="Y"' }],
  'filter-array': [
    { key: 'array', label: 'Array', placeholder: 'A2:C100' },
    { key: 'include', label: 'Include condition', placeholder: 'B2:B100>100' },
  ],
  'unique-array': [{ key: 'range', label: 'Range', placeholder: 'A2:A100' }],
  'sort-array': [
    { key: 'array', label: 'Array', placeholder: 'A2:C100' },
    { key: 'sortIndex', label: 'Sort column index', placeholder: '1' },
  ],
};

const TEMPLATE_LABELS = {
  'vlookup-basic': 'VLOOKUP',
  'xlookup-basic': 'XLOOKUP',
  'index-match': 'INDEX + MATCH',
  'sum-range': 'SUM',
  'average-range': 'AVERAGE',
  'round-value': 'ROUND',
  today: 'TODAY',
  edate: 'EDATE',
  datedif: 'DATEDIF',
  'left-text': 'LEFT',
  'right-text': 'RIGHT',
  'concat-text': 'CONCAT',
  'text-format': 'TEXT',
  'if-basic': 'IF',
  'and-logic': 'AND',
  'or-logic': 'OR',
  'filter-array': 'FILTER',
  'unique-array': 'UNIQUE',
  'sort-array': 'SORT',
};

export function listFormulaTemplates() {
  return Object.entries(TEMPLATES).map(([templateId, t]) => ({
    templateId,
    id: templateId,
    category: t.category,
    example: t.example,
    label: TEMPLATE_LABELS[templateId] || templateId,
    fields: TEMPLATE_FIELDS[templateId] || [],
  }));
}

export function listTemplates(category) {
  return listFormulaTemplates().filter((t) => !category || t.category === category);
}

/**
 * @param {{ category?: string, templateId: string, params?: object }} input
 * @returns {{ formula: string, explanation: string, example: string, category: string, templateId: string }}
 */
export function generateExcelFormula({ category, templateId, params = {} } = {}) {
  if (!templateId || !TEMPLATES[templateId]) {
    const available = Object.keys(TEMPLATES).join(', ');
    throw new Error(`Unknown templateId. Available: ${available}`);
  }
  const tpl = TEMPLATES[templateId];
  if (category && category !== tpl.category) {
    throw new Error(`Template "${templateId}" belongs to category "${tpl.category}", not "${category}".`);
  }
  const formula = tpl.build(params || {});
  return {
    formula,
    explanation: tpl.explain(params || {}),
    example: tpl.example,
    category: tpl.category,
    templateId,
  };
}

function extractFunctionNames(formula) {
  const names = [];
  const re = /\b([A-Z][A-Z0-9.]*)\s*\(/gi;
  let m;
  while ((m = re.exec(formula))) {
    names.push(m[1].toUpperCase());
  }
  return [...new Set(names)];
}

function splitTopLevelArgs(inner) {
  const args = [];
  let current = '';
  let depth = 0;
  let inStr = false;
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (ch === '"' && inner[i - 1] !== '\\') {
      inStr = !inStr;
      current += ch;
      continue;
    }
    if (!inStr) {
      if (ch === '(') depth += 1;
      if (ch === ')') depth -= 1;
      if (ch === ',' && depth === 0) {
        args.push(current.trim());
        current = '';
        continue;
      }
    }
    current += ch;
  }
  if (current.trim()) args.push(current.trim());
  return args;
}

function describeArgs(fn, args) {
  const a = args.map((x, i) => `arg${i + 1}=${x}`);
  switch (fn) {
    case 'VLOOKUP':
      return `lookup_value=${args[0] || '?'}, table_array=${args[1] || '?'}, col_index=${args[2] || '?'}, range_lookup=${args[3] || 'FALSE'}`;
    case 'XLOOKUP':
      return `lookup_value=${args[0] || '?'}, lookup_array=${args[1] || '?'}, return_array=${args[2] || '?'}`;
    case 'IF':
      return `condition=${args[0] || '?'}, value_if_true=${args[1] || '?'}, value_if_false=${args[2] || '?'}`;
    case 'INDEX':
      return `array=${args[0] || '?'}, row_num=${args[1] || '?'}${args[2] ? `, col_num=${args[2]}` : ''}`;
    case 'MATCH':
      return `lookup_value=${args[0] || '?'}, lookup_array=${args[1] || '?'}, match_type=${args[2] ?? 0}`;
    default:
      return a.join('; ') || 'no arguments';
  }
}

/**
 * @param {string} formulaString
 * @returns {{ formula: string, functions: Array<object>, summary: string, nested: boolean }}
 */
export function explainExcelFormula(formulaString) {
  const formula = String(formulaString || '').trim();
  if (!formula) {
    throw new Error('Please provide an Excel formula to explain.');
  }
  const normalized = formula.startsWith('=') ? formula : `=${formula}`;
  const names = extractFunctionNames(normalized);
  if (!names.length) {
    return {
      formula: normalized,
      functions: [],
      summary: 'No recognizable Excel functions were found. This may be a simple expression or cell reference.',
      nested: false,
    };
  }

  const functions = names.map((name) => ({
    name,
    description: FUNCTION_HELP[name] || `Recognized function ${name} (no detailed help available yet).`,
    known: Boolean(FUNCTION_HELP[name]),
  }));

  // Heuristic nested-arg walk for outermost call
  let nested = names.length > 1;
  let outerDetail = null;
  const outerMatch = normalized.match(/^=\s*([A-Z][A-Z0-9.]*)\s*\(([\s\S]*)\)\s*$/i);
  if (outerMatch) {
    const fn = outerMatch[1].toUpperCase();
    const args = splitTopLevelArgs(outerMatch[2]);
    nested = nested || args.some((a) => /[A-Z]+\s*\(/i.test(a));
    outerDetail = {
      name: fn,
      args,
      argSummary: describeArgs(fn, args),
    };
  }

  const knownBits = functions
    .filter((f) => f.known)
    .map((f) => `${f.name}: ${f.description}`)
    .join(' ');

  const summary = [
    `This formula uses ${names.join(', ')}.`,
    outerDetail ? `Outermost call: ${outerDetail.name}(${outerDetail.argSummary}).` : null,
    nested ? 'It contains nested functions — evaluate inner calls first.' : null,
    knownBits || null,
  ]
    .filter(Boolean)
    .join(' ');

  return {
    formula: normalized,
    functions,
    outer: outerDetail,
    summary,
    nested,
  };
}
