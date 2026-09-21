import { generateCommon } from './generate-common-and-pages.mjs';
import { generateHomeFiles } from './generate-home-and-legal.mjs';
import { generateCalculatorsHub } from './generate-calculators-hub.mjs';
import { generateLegalAndContact } from './generate-legal-and-contact.mjs';
import { generateHubs } from './generate-hubs.mjs';
import { generateTools } from './generate-tools.mjs';
import { generateCategoryDrafts } from './generate-category-drafts.mjs';

console.log('--- Starting i18n generators ---');
await generateCommon();
await generateHomeFiles();
await generateCalculatorsHub();
await generateLegalAndContact();
await generateHubs();
await generateTools();
await generateCategoryDrafts();
console.log('--- All generators finished successfully ---');
