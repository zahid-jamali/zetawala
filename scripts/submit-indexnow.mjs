#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Simple .env loader if run directly
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

loadEnv();

const DEFAULT_KEY = '483f35001f40cc679318506d75a8095b';
const KEY = process.env.INDEXNOW_KEY || DEFAULT_KEY;
const HOST = 'www.zetawala.com';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.zetawala.com').replace(/\/+$/, '');
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function verifyKeyFile() {
  console.log(`\n🔍 Verifying IndexNow key file at: ${KEY_LOCATION}`);
  try {
    const res = await fetch(KEY_LOCATION);
    if (!res.ok) {
      console.error(`❌ Verification failed: HTTP ${res.status} ${res.statusText}`);
      console.log(`💡 Note: If running locally before deployment, this file is located at /public/${KEY}.txt`);
      return false;
    }
    const body = (await res.text()).trim();
    if (body === KEY) {
      console.log(`✅ Key file verified successfully! Content matches key: ${KEY}`);
      return true;
    } else {
      console.error(`❌ Key file content mismatch. Expected: ${KEY}, Got: ${body}`);
      return false;
    }
  } catch (err) {
    console.error(`⚠️ Could not reach ${KEY_LOCATION}:`, err.message);
    console.log(`💡 Note: Make sure the server is deployed or running if testing remote verification.`);
    return false;
  }
}

async function extractUrlsFromSitemap(sitemapUrl) {
  console.log(`📥 Fetching sitemap from: ${sitemapUrl}`);
  const res = await fetch(sitemapUrl);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();
  const locRegex = /<loc>(.*?)<\/loc>/gi;
  const urls = [];
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    const url = match[1].trim();
    if (url) {
      urls.push(url);
    }
  }
  return urls;
}

async function submitBatch(urlList) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  return {
    status: res.status,
    statusText: res.statusText,
    ok: res.status === 200 || res.status === 202,
    body: text,
  };
}

async function submitUrls(urls) {
  console.log(`\n🚀 Submitting ${urls.length} URL(s) to IndexNow...`);
  console.log(`   Host:        ${HOST}`);
  console.log(`   Key:         ${KEY}`);
  console.log(`   KeyLocation: ${KEY_LOCATION}`);

  const BATCH_SIZE = 10000;
  let totalSubmitted = 0;
  let hasErrors = false;

  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    const batch = urls.slice(i, i + BATCH_SIZE);
    console.log(`\n📦 Sending batch ${Math.floor(i / BATCH_SIZE) + 1} (${batch.length} URLs)...`);

    try {
      const result = await submitBatch(batch);
      if (result.ok) {
        console.log(`   ✅ Status ${result.status} (${result.statusText}): Batch accepted by IndexNow!`);
        totalSubmitted += batch.length;
      } else {
        console.error(`   ❌ Status ${result.status} (${result.statusText})`);
        if (result.body) {
          console.error(`   Response: ${result.body}`);
        }
        hasErrors = true;
      }
    } catch (err) {
      console.error(`   ❌ Batch submission failed:`, err.message);
      hasErrors = true;
    }
  }

  console.log(`\n🏁 Summary: ${totalSubmitted}/${urls.length} URLs successfully submitted.`);
  if (hasErrors) {
    process.exitCode = 1;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
IndexNow Submission CLI for Zetawala
====================================
Usage:
  node scripts/submit-indexnow.mjs [options] [urls...]

Options:
  --all, -a            Fetch all URLs from sitemap and submit them
  --sitemap <url>      Custom sitemap URL (defaults to ${SITE_URL}/sitemap.xml)
  --verify, -v         Verify that the key file is accessible on the domain
  --help, -h           Show this help message

Examples:
  # Submit all URLs from production sitemap
  node scripts/submit-indexnow.mjs --all

  # Submit a single URL
  node scripts/submit-indexnow.mjs https://www.zetawala.com/blog/my-new-post

  # Submit multiple URLs
  node scripts/submit-indexnow.mjs https://www.zetawala.com/seo https://www.zetawala.com/tools

  # Verify key file status
  node scripts/submit-indexnow.mjs --verify
    `);
    return;
  }

  if (args.includes('--verify') || args.includes('-v')) {
    await verifyKeyFile();
    return;
  }

  if (args.includes('--all') || args.includes('-a')) {
    const sitemapFlagIdx = args.findIndex((arg) => arg === '--sitemap');
    const sitemapUrl = sitemapFlagIdx !== -1 && args[sitemapFlagIdx + 1]
      ? args[sitemapFlagIdx + 1]
      : `${SITE_URL}/sitemap.xml`;

    try {
      const urls = await extractUrlsFromSitemap(sitemapUrl);
      if (urls.length === 0) {
        console.warn(`⚠️ No URLs found in sitemap (${sitemapUrl}).`);
        return;
      }
      console.log(`Found ${urls.length} URLs in sitemap.`);
      await submitUrls(urls);
    } catch (err) {
      console.error(`❌ Failed to read sitemap:`, err.message);
      process.exitCode = 1;
    }
    return;
  }

  // Filter positional URL arguments
  const urls = args.filter((a) => !a.startsWith('-'));

  if (urls.length > 0) {
    await submitUrls(urls);
  } else {
    console.log(`ℹ️ No URLs or flags provided.`);
    console.log(`   Running key file verification and showing site info:`);
    console.log(`   Key:         ${KEY}`);
    console.log(`   Host:        ${HOST}`);
    console.log(`   KeyLocation: ${KEY_LOCATION}`);
    console.log(`\n💡 To submit all sitemap URLs, run:`);
    console.log(`   npm run indexnow:all`);
    console.log(`   (or: node scripts/submit-indexnow.mjs --all)`);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
