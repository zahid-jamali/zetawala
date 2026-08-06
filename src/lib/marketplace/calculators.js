/**
 * Deterministic marketplace math — shared by Shopee & Lazada.
 * Fee % and shipping tables are configurable per marketplace/region.
 */

export function n(v, fallback = 0) {
  const x = Number(v);
  return Number.isFinite(x) ? x : fallback;
}

export function calculateProfit({
  productCost,
  sellingPrice,
  shippingCost = 0,
  platformFee = 0,
  advertisingCost = 0,
}) {
  const cost = n(productCost);
  const price = n(sellingPrice);
  const ship = n(shippingCost);
  const fee = n(platformFee);
  const ads = n(advertisingCost);
  const totalCost = cost + ship + fee + ads;
  const netProfit = price - totalCost;
  const profitMargin = price > 0 ? (netProfit / price) * 100 : 0;
  const invested = cost + ship + fee + ads;
  const roi = invested > 0 ? (netProfit / invested) * 100 : 0;
  return {
    netProfit: round2(netProfit),
    profitMargin: round2(profitMargin),
    roi: round2(roi),
    totalCost: round2(totalCost),
    sellingPrice: round2(price),
  };
}

export function calculateFees({
  sellingPrice,
  marketplaceFeePercent = 0,
  paymentFeePercent = 0,
  shippingSubsidy = 0,
}) {
  const price = n(sellingPrice);
  const mkt = (Math.max(0, n(marketplaceFeePercent)) / 100) * price;
  const pay = (Math.max(0, n(paymentFeePercent)) / 100) * price;
  const subsidy = Math.max(0, n(shippingSubsidy));
  const totalFees = mkt + pay;
  const sellerReceives = price - totalFees + subsidy;
  return {
    marketplaceFee: round2(mkt),
    paymentFee: round2(pay),
    totalFees: round2(totalFees),
    shippingSubsidy: round2(subsidy),
    sellerReceives: round2(sellerReceives),
    netEarnings: round2(sellerReceives),
  };
}

export function calculatePricing({
  productCost,
  desiredMarginPercent = 30,
  shipping = 0,
  fees = 0,
}) {
  const cost = n(productCost);
  const ship = n(shipping);
  const feeAmt = n(fees);
  const base = cost + ship + feeAmt;
  const margin = Math.min(90, Math.max(0, n(desiredMarginPercent))) / 100;
  const suggested = margin < 0.99 ? base / (1 - margin) : base * 2;
  const breakEven = base;
  const competitive = suggested * 0.92;
  const premium = suggested * 1.18;
  return {
    suggestedSellingPrice: round2(suggested),
    breakEvenPrice: round2(breakEven),
    competitivePrice: round2(competitive),
    premiumPrice: round2(premium),
    costBase: round2(base),
  };
}

/**
 * Regional shipping tables — update these objects without changing calculator UI.
 * Rates are illustrative defaults sellers can override in the UI.
 */
export const SHIPPING_TABLES = {
  shopee: {
    local: { base: 2.5, perKg: 0.8, daysMin: 2, daysMax: 5 },
    metro: { base: 3.5, perKg: 1.1, daysMin: 3, daysMax: 7 },
    nationwide: { base: 5.0, perKg: 1.5, daysMin: 4, daysMax: 10 },
    international: { base: 12.0, perKg: 4.0, daysMin: 7, daysMax: 21 },
  },
  lazada: {
    local: { base: 2.8, perKg: 0.9, daysMin: 2, daysMax: 5 },
    metro: { base: 3.8, perKg: 1.2, daysMin: 3, daysMax: 7 },
    nationwide: { base: 5.5, perKg: 1.6, daysMin: 4, daysMax: 10 },
    international: { base: 13.0, perKg: 4.2, daysMin: 7, daysMax: 21 },
  },
};

export function calculateShipping({
  marketplace = 'shopee',
  weightKg,
  lengthCm = 10,
  widthCm = 10,
  heightCm = 10,
  region = 'nationwide',
}) {
  const table = SHIPPING_TABLES[marketplace] || SHIPPING_TABLES.shopee;
  const rule = table[region] || table.nationwide;
  const weight = Math.max(0.1, n(weightKg, 0.5));
  const volumetric = (n(lengthCm) * n(widthCm) * n(heightCm)) / 5000;
  const chargeable = Math.max(weight, volumetric);
  const cost = rule.base + chargeable * rule.perKg;
  return {
    estimatedShippingCost: round2(cost),
    chargeableWeightKg: round2(chargeable),
    volumetricWeightKg: round2(volumetric),
    estimatedDelivery: `${rule.daysMin}–${rule.daysMax} days`,
    region,
  };
}

function round2(x) {
  return Math.round(x * 100) / 100;
}
