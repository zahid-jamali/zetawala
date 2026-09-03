/**
 * Nested-key translator. `t(dict, 'nav.openHub')` → dict.nav.openHub
 */

export function interpolate(template, vars = {}) {
  if (template == null) return '';
  return String(template).replace(/\{(\w+)\}/g, (_, key) => {
    if (vars[key] == null) return '';
    return String(vars[key]);
  });
}

export function getByPath(dict, path) {
  if (!dict || !path) return undefined;
  const parts = String(path).split('.');
  let current = dict;
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined;
    current = current[part];
  }
  return current;
}

export function createTranslator(dict) {
  return function t(path, vars) {
    const value = getByPath(dict, path);
    if (value == null) return path;
    if (typeof value === 'string') return interpolate(value, vars);
    return value;
  };
}
