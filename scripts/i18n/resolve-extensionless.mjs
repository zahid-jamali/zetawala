/**
 * Node ESM resolve hook so plain `node` can import the app's source modules,
 * which rely on the bundler's extensionless specifier resolution.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (!specifier.startsWith('.') && !specifier.startsWith('/')) throw err;
    const parentPath = context.parentURL ? fileURLToPath(context.parentURL) : process.cwd();
    const base = path.resolve(path.dirname(parentPath), specifier);
    const candidates = [`${base}.js`, `${base}.mjs`, path.join(base, 'index.js')];
    for (const candidate of candidates) {
      if (existsSync(candidate)) {
        return { url: pathToFileURL(candidate).href, shortCircuit: true, format: 'module' };
      }
    }
    throw err;
  }
}
