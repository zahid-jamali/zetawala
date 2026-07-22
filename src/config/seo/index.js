import { youtubeSeoData } from './youtube';
import { darazSeoData } from './daraz';
import { localCommerceSeoData } from './localCommerce';
import { webmasterSeoData } from './webmaster';

export const seoData = {
  ...youtubeSeoData,
  ...darazSeoData,
  ...localCommerceSeoData,
  ...webmasterSeoData,
};
