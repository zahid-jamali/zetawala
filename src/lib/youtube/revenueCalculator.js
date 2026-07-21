import {
  estimatedRpmBands,
  nicheRpmMultipliers,
  revenueDisclaimer,
} from '../../config/youtube/revenueConfig';

/**
 * Deterministic YouTube revenue estimation.
 * No YouTube API or DeepSeek required.
 */
export function calculateYouTubeRevenue({
  monthlyViews,
  dailyViews,
  contentType = 'long-form',
  region = 'global',
  niche = 'Other',
  rpmMode = 'estimated', // 'estimated' | 'custom'
  customRpm,
  customRpmLow,
  customRpmHigh,
}) {
  const errors = [];
  let monthly = monthlyViews != null && monthlyViews !== '' ? Number(monthlyViews) : null;
  let daily = dailyViews != null && dailyViews !== '' ? Number(dailyViews) : null;

  if ((monthly == null || Number.isNaN(monthly)) && (daily == null || Number.isNaN(daily))) {
    errors.push('Enter monthly views or daily views.');
  }
  if (monthly != null && (Number.isNaN(monthly) || monthly < 0)) {
    errors.push('Monthly views must be a non-negative number.');
  }
  if (daily != null && (Number.isNaN(daily) || daily < 0)) {
    errors.push('Daily views must be a non-negative number.');
  }

  if (monthly == null && daily != null && !Number.isNaN(daily)) {
    monthly = daily * 30;
  }
  if (daily == null && monthly != null && !Number.isNaN(monthly)) {
    daily = monthly / 30;
  }

  if (monthly != null && daily != null && monthly > 0 && daily > 0) {
    const impliedMonthly = daily * 30;
    const drift = Math.abs(impliedMonthly - monthly) / Math.max(monthly, 1);
    if (drift > 0.35) {
      errors.push(
        'Daily and monthly views look inconsistent (more than ~35% apart from a 30-day conversion). Please adjust one of them.'
      );
    }
  }

  let lowRpm;
  let typicalRpm;
  let highRpm;
  let assumptions = [];

  if (rpmMode === 'custom') {
    const rpm = Number(customRpm);
    if (Number.isNaN(rpm) || rpm < 0) {
      errors.push('Custom RPM must be a non-negative number.');
    }
    typicalRpm = rpm;
    lowRpm = customRpmLow != null && customRpmLow !== '' ? Number(customRpmLow) : rpm * 0.7;
    highRpm = customRpmHigh != null && customRpmHigh !== '' ? Number(customRpmHigh) : rpm * 1.4;
    assumptions.push('Using user-provided RPM.');
  } else {
    const band =
      estimatedRpmBands[contentType]?.[region] || estimatedRpmBands['long-form'].global;
    const mult = nicheRpmMultipliers[niche] || 1;
    lowRpm = band.low * mult;
    typicalRpm = band.typical * mult;
    highRpm = band.high * mult;
    assumptions.push('Using estimated RPM bands (not official YouTube data).');
    assumptions.push(`Content type: ${contentType}`);
    assumptions.push(`Region band: ${region}`);
    assumptions.push(`Niche multiplier: ${mult}× for ${niche}`);
  }

  if (errors.length) {
    return { success: false, errors };
  }

  const rev = (views, rpm) => (views / 1000) * rpm;

  const scenarios = {
    low: {
      rpm: round2(lowRpm),
      daily: round2(rev(daily, lowRpm)),
      monthly: round2(rev(monthly, lowRpm)),
      yearly: round2(rev(monthly * 12, lowRpm)),
    },
    typical: {
      rpm: round2(typicalRpm),
      daily: round2(rev(daily, typicalRpm)),
      monthly: round2(rev(monthly, typicalRpm)),
      yearly: round2(rev(monthly * 12, typicalRpm)),
    },
    high: {
      rpm: round2(highRpm),
      daily: round2(rev(daily, highRpm)),
      monthly: round2(rev(monthly, highRpm)),
      yearly: round2(rev(monthly * 12, highRpm)),
    },
  };

  return {
    success: true,
    disclaimer: revenueDisclaimer,
    inputs: {
      monthlyViews: round2(monthly),
      dailyViews: round2(daily),
      contentType,
      region,
      niche,
      rpmMode,
    },
    assumptions,
    factors: [
      'Audience geography',
      'Niche / ad demand',
      'Seasonality',
      'Monetized playback percentage',
      'Viewer demographics',
      'Content type (Long-form vs Shorts)',
      'Ad formats & YouTube revenue share',
    ],
    scenarios,
    formula: 'Estimated Revenue = Views / 1000 × RPM',
  };
}

function round2(n) {
  if (n == null || Number.isNaN(n)) return null;
  return Math.round(n * 100) / 100;
}
