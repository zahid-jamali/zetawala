import sharp from 'sharp';
import exifr from 'exifr';
import { Vibrant } from 'node-vibrant/node';
import JSZip from 'jszip';

const SOCIAL_PLATFORMS = [
  { id: 'instagram-post', platform: 'Instagram Post', width: 1080, height: 1080 },
  { id: 'instagram-story', platform: 'Instagram Story', width: 1080, height: 1920 },
  { id: 'facebook-post', platform: 'Facebook Post', width: 1200, height: 630 },
  { id: 'linkedin', platform: 'LinkedIn', width: 1200, height: 627 },
  { id: 'twitter', platform: 'X/Twitter', width: 1600, height: 900 },
  { id: 'pinterest', platform: 'Pinterest', width: 1000, height: 1500 },
  { id: 'tiktok', platform: 'TikTok', width: 1080, height: 1920 },
  { id: 'youtube-thumbnail', platform: 'YouTube Thumbnail', width: 1280, height: 720 },
];

function friendlyImageError(err) {
  const msg = String(err?.message || err || '');
  if (/unsupported|corrupt|Input buffer|VipsJpeg|Invalid|premature/i.test(msg)) {
    return new Error('This image appears to be corrupt or in an unsupported format.');
  }
  return err instanceof Error ? err : new Error(msg || 'Failed to process image.');
}

function rgbToHex(r, g, b) {
  const h = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${h(r)}${h(g)}${h(b)}`;
}

function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

function rgbToHsl(r, g, b) {
  const R = r / 255;
  const G = g / 255;
  const B = b / 255;
  const max = Math.max(R, G, B);
  const min = Math.min(R, G, B);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case R:
        h = ((G - B) / d + (G < B ? 6 : 0)) / 6;
        break;
      case G:
        h = ((B - R) / d + 2) / 6;
        break;
      default:
        h = ((R - G) / d + 4) / 6;
    }
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

const TAILWIND_HUES = [
  { name: 'rose', hue: 350 },
  { name: 'red', hue: 0 },
  { name: 'orange', hue: 25 },
  { name: 'amber', hue: 40 },
  { name: 'yellow', hue: 55 },
  { name: 'lime', hue: 80 },
  { name: 'green', hue: 140 },
  { name: 'emerald', hue: 160 },
  { name: 'teal', hue: 175 },
  { name: 'cyan', hue: 190 },
  { name: 'sky', hue: 205 },
  { name: 'blue', hue: 220 },
  { name: 'indigo', hue: 245 },
  { name: 'violet', hue: 265 },
  { name: 'purple', hue: 280 },
  { name: 'fuchsia', hue: 300 },
  { name: 'pink', hue: 330 },
];

function closestTailwindName(hex) {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  if (s < 12) {
    if (l < 20) return 'slate';
    if (l < 40) return 'gray';
    if (l < 70) return 'zinc';
    return 'stone';
  }
  let best = TAILWIND_HUES[0];
  let bestDist = 360;
  for (const entry of TAILWIND_HUES) {
    let dist = Math.abs(h - entry.hue);
    if (dist > 180) dist = 360 - dist;
    if (dist < bestDist) {
      bestDist = dist;
      best = entry;
    }
  }
  const shade = l < 30 ? '800' : l < 45 ? '700' : l < 60 ? '500' : l < 75 ? '400' : '300';
  return `${best.name}-${shade}`;
}

/**
 * @param {Buffer|Uint8Array} buffer
 */
export async function getImageMetadata(buffer) {
  try {
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const meta = await sharp(data).metadata();
    let exif = {};
    try {
      exif = (await exifr.parse(data, {
        gps: true,
        exif: true,
        ifd0: true,
        mergeOutput: true,
      })) || {};
    } catch {
      exif = {};
    }

    const aperture =
      exif.FNumber ??
      exif.ApertureValue ??
      (exif.Exif?.FNumber ?? null);

    return {
      format: meta.format || null,
      width: meta.width || null,
      height: meta.height || null,
      orientation: meta.orientation ?? exif.Orientation ?? null,
      space: meta.space || null,
      channels: meta.channels || null,
      depth: meta.depth || null,
      density: meta.density || null,
      hasAlpha: meta.hasAlpha ?? null,
      sizeBytes: data.length,
      camera: exif.Make && exif.Model ? `${exif.Make} ${exif.Model}`.trim() : exif.Model || exif.Make || null,
      lens: exif.LensModel || exif.Lens || exif.LensMake || null,
      iso: exif.ISO ?? exif.ISOSpeedRatings ?? null,
      aperture: aperture != null ? `f/${aperture}` : null,
      shutterSpeed: exif.ExposureTime
        ? exif.ExposureTime < 1
          ? `1/${Math.round(1 / exif.ExposureTime)}`
          : `${exif.ExposureTime}s`
        : null,
      focalLength: exif.FocalLength ? `${exif.FocalLength}mm` : null,
      dateTaken: exif.DateTimeOriginal || exif.CreateDate || exif.ModifyDate || null,
      gps:
        exif.latitude != null && exif.longitude != null
          ? { latitude: exif.latitude, longitude: exif.longitude }
          : null,
      software: exif.Software || null,
      colorSpace: exif.ColorSpace || meta.space || null,
      rawExif: {
        Make: exif.Make || null,
        Model: exif.Model || null,
        Orientation: exif.Orientation || null,
      },
    };
  } catch (err) {
    throw friendlyImageError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @returns {Promise<{ buffer: Buffer, mimeType: string, filename: string }>}
 */
export async function stripExif(buffer) {
  try {
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const meta = await sharp(data).metadata();
    const format = (meta.format || 'jpeg').toLowerCase();

    let pipeline = sharp(data).rotate();
    let mimeType = 'image/jpeg';
    let ext = 'jpg';

    if (format === 'png') {
      pipeline = pipeline.png();
      mimeType = 'image/png';
      ext = 'png';
    } else if (format === 'webp') {
      pipeline = pipeline.webp();
      mimeType = 'image/webp';
      ext = 'webp';
    } else if (format === 'gif') {
      pipeline = pipeline.png();
      mimeType = 'image/png';
      ext = 'png';
    } else {
      pipeline = pipeline.jpeg({ quality: 92, mozjpeg: true });
      mimeType = 'image/jpeg';
      ext = 'jpg';
    }

    // Re-encode without withMetadata() to strip EXIF/ICC orientation already applied via rotate()
    const out = await pipeline.toBuffer();
    return {
      buffer: out,
      mimeType,
      filename: `image-no-exif.${ext}`,
    };
  } catch (err) {
    throw friendlyImageError(err);
  }
}

/**
 * @param {Buffer|Uint8Array} buffer
 */
export async function extractColorPalette(buffer) {
  try {
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    // Normalize to PNG buffer for Vibrant
    const png = await sharp(data).rotate().png().toBuffer();
    const palette = await Vibrant.from(png).getPalette();

    const swatches = Object.entries(palette)
      .filter(([, sw]) => sw)
      .map(([name, sw]) => {
        const [r, g, b] = sw.rgb;
        const hex = rgbToHex(r, g, b);
        return {
          name,
          hex,
          rgb: { r: Math.round(r), g: Math.round(g), b: Math.round(b) },
          population: sw.population || 0,
          tailwind: closestTailwindName(hex),
        };
      })
      .sort((a, b) => b.population - a.population);

    const cssVars = {};
    swatches.forEach((s, i) => {
      const key = s.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
      cssVars[`--color-${key || i + 1}`] = s.hex;
    });

    const tailwindSuggestions = swatches.map((s) => s.tailwind);

    return {
      colors: swatches,
      dominant: swatches[0] || null,
      cssVars,
      tailwindSuggestions,
    };
  } catch (err) {
    throw friendlyImageError(err);
  }
}

function resolvePlatforms(platforms) {
  if (!platforms || !platforms.length) return SOCIAL_PLATFORMS;
  const wanted = new Set(
    platforms.map((p) => String(p).toLowerCase().trim())
  );
  const matched = SOCIAL_PLATFORMS.filter(
    (p) =>
      wanted.has(p.id) ||
      wanted.has(p.platform.toLowerCase()) ||
      [...wanted].some((w) => p.platform.toLowerCase().includes(w) || p.id.includes(w))
  );
  return matched.length ? matched : SOCIAL_PLATFORMS;
}

/**
 * @param {Buffer|Uint8Array} buffer
 * @param {{ platforms?: string[], fit?: 'cover'|'contain' }} [options]
 */
export async function resizeForSocial(buffer, options = {}) {
  try {
    const data = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer);
    const fit = options.fit === 'contain' ? 'contain' : 'cover';
    const targets = resolvePlatforms(options.platforms);
    const variants = [];
    const zip = new JSZip();

    for (const target of targets) {
      const out = await sharp(data)
        .rotate()
        .resize(target.width, target.height, {
          fit,
          position: 'centre',
          background: { r: 255, g: 255, b: 255, alpha: 1 },
        })
        .jpeg({ quality: 90, mozjpeg: true })
        .toBuffer();

      const base64 = out.toString('base64');
      const filename = `${target.id}.jpg`;
      variants.push({
        platform: target.platform,
        id: target.id,
        width: target.width,
        height: target.height,
        base64,
        mimeType: 'image/jpeg',
        filename,
      });
      zip.file(filename, out);
    }

    const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' });

    return {
      variants,
      zipBase64: zipBuffer.toString('base64'),
      zipMimeType: 'application/zip',
      zipFilename: 'social-images.zip',
    };
  } catch (err) {
    throw friendlyImageError(err);
  }
}

export { SOCIAL_PLATFORMS };
