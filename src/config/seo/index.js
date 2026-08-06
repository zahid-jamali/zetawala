import { youtubeSeoData } from './youtube';
import { darazSeoData } from './daraz';
import { localCommerceSeoData } from './localCommerce';
import { webmasterSeoData } from './webmaster';
import { calculatorsSeoData } from './calculators';
import { pdfUtilitiesSeoData } from './pdfUtilities';
import { writingSeoData } from './writing';
import { studySeoData } from './study';
import { freelancerSeoData } from './freelancer';
import { marketplaceSeoData } from './marketplace';

export const seoData = {
  ...youtubeSeoData,
  ...darazSeoData,
  ...localCommerceSeoData,
  ...webmasterSeoData,
  ...calculatorsSeoData,
  ...pdfUtilitiesSeoData,
  ...writingSeoData,
  ...studySeoData,
  ...freelancerSeoData,
  ...marketplaceSeoData,
};
