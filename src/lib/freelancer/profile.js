/**
 * Optional Freelancer Profile — LocalStorage shared context across toolkit tools.
 */

export const FREELANCER_PROFILE_KEY = 'zetawala_freelancer_profile';

export const EMPTY_PROFILE = {
  name: '',
  profession: '',
  skills: '',
  yearsExperience: '',
  portfolioLinks: '',
  certifications: '',
  industries: '',
  hourlyRate: '',
  writingTone: 'professional',
};

export function loadFreelancerProfile() {
  if (typeof window === 'undefined') return { ...EMPTY_PROFILE };
  try {
    const raw = JSON.parse(localStorage.getItem(FREELANCER_PROFILE_KEY) || 'null');
    return { ...EMPTY_PROFILE, ...(raw || {}) };
  } catch {
    return { ...EMPTY_PROFILE };
  }
}

export function saveFreelancerProfile(profile) {
  const next = { ...EMPTY_PROFILE, ...profile };
  try {
    localStorage.setItem(FREELANCER_PROFILE_KEY, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
  return next;
}

/** Map profile fields into tool form defaults (manual edits always win after load). */
export function profilePrefillForTool(toolSlug, profile = {}) {
  const p = profile || {};
  const base = {
    skills: p.skills || '',
    experience: p.yearsExperience || '',
    experienceLevel: mapExperienceLevel(p.yearsExperience),
    portfolio: p.portfolioLinks || '',
    portfolioLinks: p.portfolioLinks || '',
    tone: p.writingTone || 'professional',
    preferredTone: p.writingTone || 'professional',
    headline: p.profession ? `${p.profession} | ${p.name || 'Freelancer'}`.trim() : '',
    bio: '',
    name: p.name || '',
    profession: p.profession || '',
    hourlyRate: p.hourlyRate || '',
    services: p.skills || '',
  };

  if (toolSlug === 'upwork-profile-optimizer') {
    return { ...base, headline: base.headline, bio: p.profession ? `Experienced ${p.profession} with ${p.yearsExperience || 'several'} years helping clients succeed.` : '' };
  }
  if (toolSlug === 'fiverr-profile-bio-generator') {
    return { ...base, skills: p.skills || '', experience: p.yearsExperience || '', services: p.skills || '' };
  }
  return base;
}

function mapExperienceLevel(years) {
  const n = Number(years);
  if (!Number.isFinite(n)) return 'intermediate';
  if (n < 2) return 'entry';
  if (n < 5) return 'intermediate';
  return 'expert';
}
