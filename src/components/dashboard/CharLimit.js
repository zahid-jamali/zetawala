'use client';

/**
 * Live "used / max" character counter shown under AI input fields.
 * Turns amber near the limit and red when over it.
 */
export default function CharLimit({ value, max, className = '' }) {
  if (!max) return null;
  const used = String(value ?? '').length;
  const ratio = used / max;
  const tone =
    ratio > 1
      ? 'text-rose-600 dark:text-rose-400 font-bold'
      : ratio >= 0.9
        ? 'text-amber-600 dark:text-amber-400'
        : 'text-slate-400';

  return (
    <p className={`text-[10px] text-right tabular-nums ${tone} ${className}`}>
      {used.toLocaleString()} / {max.toLocaleString()}
      {ratio > 1 ? ' (too long)' : ''}
    </p>
  );
}
