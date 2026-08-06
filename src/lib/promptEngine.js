import { getYoutubePrompt } from './prompts/youtube';
import { getDarazPrompt } from './prompts/daraz';
import { getLocalCommercePrompt } from './prompts/localCommerce';
import { getWritingPrompt } from './prompts/writing';
import { getStudyPrompt } from './prompts/study';
import { getFreelancerPrompt } from './prompts/freelancer';
import { getMarketplacePrompt } from './prompts/marketplace';

// Route action prompt checks to target prompt templates
export function getUserPrompt(action, payload) {
  const youtubePrompt = getYoutubePrompt(action, payload);
  if (youtubePrompt) return youtubePrompt;

  const darazPrompt = getDarazPrompt(action, payload);
  if (darazPrompt) return darazPrompt;

  const localCommercePrompt = getLocalCommercePrompt(action, payload);
  if (localCommercePrompt) return localCommercePrompt;

  const writingPrompt = getWritingPrompt(action, payload);
  if (writingPrompt) return writingPrompt;

  const studyPrompt = getStudyPrompt(action, payload);
  if (studyPrompt) return studyPrompt;

  const freelancerPrompt = getFreelancerPrompt(action, payload);
  if (freelancerPrompt) return freelancerPrompt;

  const marketplacePrompt = getMarketplacePrompt(action, payload);
  if (marketplacePrompt) return marketplacePrompt;

  return null;
}
