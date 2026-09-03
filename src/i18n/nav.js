/**
 * Locale-aware nav + search helpers.
 */

import { NAV_CATEGORIES, getSearchableTools as getEnglishSearchableTools } from '../config/navSuites';
import { calculatorTools } from '../config/calculators/tools';
import { LOCALIZED_PAGES, isToolLocalized } from './catalog';
import { getHomePath, getLocalizedPagePath, getLocalizedToolPath } from './paths';

const LOCALIZED_PAGE_IDS = new Set(Object.keys(LOCALIZED_PAGES));

export function localizeNavCategories(locale, t) {
  return NAV_CATEGORIES.map((cat) => {
    const label = t(`categories.${cat.id}.label`);
    const desc = t(`categories.${cat.id}.desc`);
    const hubPageId =
      cat.id === 'pdf'
        ? 'pdf-utilities'
        : LOCALIZED_PAGE_IDS.has(cat.id)
          ? cat.id
          : null;
    const hubHref = hubPageId
      ? getLocalizedPagePath(locale, hubPageId)
      : getLocalizedToolPath(locale, cat.routeKey, cat.tools[0]?.slug);

    const tools = cat.tools.map((tool) => {
      const nameKey = `tools.${tool.slug}.name`;
      const descKey = `tools.${tool.slug}.desc`;
      const localizedName = t(nameKey);
      const localizedDesc = t(descKey);
      return {
        ...tool,
        name: localizedName !== nameKey ? localizedName : tool.name,
        desc: localizedDesc !== descKey ? localizedDesc : tool.desc,
        href: getLocalizedToolPath(locale, cat.routeKey, tool.slug),
      };
    });

    return {
      ...cat,
      label: label !== `categories.${cat.id}.label` ? label : cat.label,
      desc: desc !== `categories.${cat.id}.desc` ? desc : cat.desc,
      hubHref,
      tools,
    };
  });
}

export function localizeSearchableTools(locale, t) {
  return getEnglishSearchableTools().map((tool) => {
    const nameKey = `tools.${tool.slug}.name`;
    const descKey = `tools.${tool.slug}.desc`;
    const localizedName = t(nameKey);
    const localizedDesc = t(descKey);
    const category = NAV_CATEGORIES.find((c) => c.id === tool.categoryId);
    return {
      ...tool,
      name: localizedName !== nameKey ? localizedName : tool.name,
      desc: localizedDesc !== descKey ? localizedDesc : tool.desc,
      href: category
        ? getLocalizedToolPath(locale, category.routeKey, tool.slug)
        : tool.href,
      categoryLabel: t(`categories.${tool.categoryId}.label`) !== `categories.${tool.categoryId}.label`
        ? t(`categories.${tool.categoryId}.label`)
        : tool.categoryLabel,
    };
  });
}

export function searchToolsLocalized(query, limit, locale, t) {
  const q = String(query || '').trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = [];

  for (const tool of localizeSearchableTools(locale, t)) {
    const hay = `${tool.name} ${tool.desc} ${tool.categoryLabel} ${tool.slug}`.toLowerCase();
    if (!tokens.every((tok) => hay.includes(tok))) continue;
    let score = 0;
    if (tool.name.toLowerCase().startsWith(q)) score += 40;
    if (tool.name.toLowerCase().includes(q)) score += 20;
    if (tool.categoryLabel.toLowerCase().includes(q)) score += 10;
    if (tool.slug.includes(q.replace(/\s+/g, '-'))) score += 8;
    scored.push({ tool, score });
  }

  return scored
    .sort((a, b) => b.score - a.score || a.tool.name.localeCompare(b.tool.name))
    .slice(0, limit)
    .map((s) => s.tool);
}

export function getLocalizedCalculatorCards(locale, t) {
  return calculatorTools.map((tool) => {
    const nameKey = `tools.${tool.slug}.name`;
    const descKey = `tools.${tool.slug}.desc`;
    const localizedName = t(nameKey);
    const localizedDesc = t(descKey);
    return {
      ...tool,
      name: localizedName !== nameKey ? localizedName : tool.name,
      desc: localizedDesc !== descKey ? localizedDesc : tool.desc,
      href: getLocalizedToolPath(locale, 'calculators', tool.slug),
      isLocalized: isToolLocalized(tool.slug, locale),
    };
  });
}

export { getHomePath };
