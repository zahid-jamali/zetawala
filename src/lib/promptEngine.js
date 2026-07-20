import { getYoutubePrompt } from './prompts/youtube';
import { getDarazPrompt } from './prompts/daraz';
import { getLocalCommercePrompt } from './prompts/localCommerce';

// Route action prompt checks to target prompt templates
export function getUserPrompt(action, payload) {
  const youtubePrompt = getYoutubePrompt(action, payload);
  if (youtubePrompt) return youtubePrompt;

  const darazPrompt = getDarazPrompt(action, payload);
  if (darazPrompt) return darazPrompt;

  const localCommercePrompt = getLocalCommercePrompt(action, payload);
  if (localCommercePrompt) return localCommercePrompt;

  return null;
}
