import { getYoutubePrompt } from './prompts/youtube';
import { getDarazPrompt } from './prompts/daraz';

// Route action prompt checks to target prompt templates
export function getUserPrompt(action, payload) {
  const youtubePrompt = getYoutubePrompt(action, payload);
  if (youtubePrompt) return youtubePrompt;

  const darazPrompt = getDarazPrompt(action, payload);
  if (darazPrompt) return darazPrompt;

  return null;
}
