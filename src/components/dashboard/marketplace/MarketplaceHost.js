'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Store,
  Loader2,
  AlertTriangle,
  ArrowRight,
  Copy,
  Check,
  Calculator,
} from 'lucide-react';
import TurnstileWidget from '../TurnstileWidget';
import { getSeoPath } from '../../../config/routes';
import { getShopeeTool } from '../../../config/shopee/tools';
import { getLazadaTool } from '../../../config/lazada/tools';
import {
  calculateProfit,
  calculateFees,
  calculatePricing,
  calculateShipping,
  SHIPPING_TABLES,
} from '../../../lib/marketplace/calculators';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all';
const labelClasses =
  'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

function getTool(marketplace, slug) {
  return marketplace === 'lazada' ? getLazadaTool(slug) : getShopeeTool(slug);
}

function baseOf(slug) {
  return String(slug).replace(/^(shopee|lazada)-/, '');
}

const AI_FIELDS = {
  'listing-title-generator': [
    { key: 'productName', label: 'Product Name', type: 'text', required: true },
    { key: 'productCategory', label: 'Product Category', type: 'text' },
    { key: 'targetKeywords', label: 'Target Keywords', type: 'text' },
    { key: 'targetCountry', label: 'Target Country', type: 'text' },
  ],
  'product-description-generator': [
    { key: 'productName', label: 'Product Name', type: 'text', required: true },
    { key: 'features', label: 'Features', type: 'textarea' },
    { key: 'specifications', label: 'Specifications', type: 'textarea' },
    { key: 'targetAudience', label: 'Target Audience', type: 'text' },
  ],
  'keyword-generator': [
    { key: 'product', label: 'Product', type: 'text', required: true },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'niche', label: 'Niche', type: 'text' },
  ],
  'listing-seo-analyzer': [
    { key: 'listingTitle', label: 'Listing Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'keywords', label: 'Keywords', type: 'text' },
  ],
  'chat-reply-generator': [
    { key: 'customerMessage', label: 'Customer Message', type: 'textarea', required: true },
    { key: 'replyTone', label: 'Reply Tone', type: 'select', options: ['professional', 'friendly', 'short'] },
  ],
  'listing-optimizer': [
    { key: 'existingListing', label: 'Existing Listing', type: 'textarea', required: true },
  ],
  'pricing-calculator': [
    { key: 'productCost', label: 'Product Cost', type: 'number', required: true },
    { key: 'desiredProfitMargin', label: 'Desired Profit Margin %', type: 'number' },
    { key: 'shipping', label: 'Shipping', type: 'number' },
    { key: 'fees', label: 'Fees', type: 'number' },
  ],
};

const NEXT = {
  'listing-title-generator': ['product-description-generator', 'keyword-generator'],
  'product-description-generator': ['listing-seo-analyzer', 'listing-optimizer'],
  'keyword-generator': ['listing-title-generator', 'listing-seo-analyzer'],
  'listing-seo-analyzer': ['listing-optimizer', 'listing-title-generator'],
  'chat-reply-generator': ['listing-optimizer', 'product-description-generator'],
  'listing-optimizer': ['listing-seo-analyzer', 'keyword-generator'],
  'pricing-calculator': ['profit-calculator', 'fee-calculator'],
  'profit-calculator': ['fee-calculator', 'pricing-calculator'],
  'fee-calculator': ['profit-calculator', 'pricing-calculator'],
  'shipping-calculator': ['pricing-calculator', 'profit-calculator'],
};

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false);
  if (!text) return null;
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setOk(true);
        setTimeout(() => setOk(false), 1400);
      }}
      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold cursor-pointer"
    >
      {ok ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      {ok ? 'Copied' : 'Copy'}
    </button>
  );
}

function ScoreBar({ label, value }) {
  const v = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <span>{label}</span>
        <span>{v}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
        <div className="h-full rounded-full bg-orange-500 transition-all" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}

function ResultView({ base, data }) {
  if (!data) return null;

  if (base === 'listing-seo-analyzer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="SEO Score" value={data.seoScore} />
        <ScoreBar label="Readability" value={data.readability?.score} />
        {data.readability?.notes && <p className="text-xs text-slate-500">{data.readability.notes}</p>}
        <List title="Missing Keywords" items={data.missingKeywords} />
        <List title="Suggestions" items={data.optimizationSuggestions} />
      </div>
    );
  }

  if (base === 'listing-optimizer') {
    return (
      <div className="space-y-4">
        <ScoreBar label="Quality Score" value={data.qualityScore} />
        <Text title="Optimized Title" text={data.optimizedTitle} />
        <Text title="Improved Description" text={data.improvedDescription} />
        <List title="Keyword Suggestions" items={data.keywordSuggestions} />
        <List title="SEO Improvements" items={data.seoImprovements} />
      </div>
    );
  }

  if (base === 'listing-title-generator' && data.titles) {
    return (
      <div className="space-y-3">
        {data.titles.map((t, i) => {
          const title = typeof t === 'string' ? t : t.title;
          const count = typeof t === 'object' ? t.characterCount : String(title || '').length;
          return (
            <div key={i} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between gap-3">
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-[10px] text-slate-400 mt-1">{count} characters</p>
              </div>
              <CopyBtn text={title} />
            </div>
          );
        })}
        <List title="Tips" items={data.tips} />
      </div>
    );
  }

  if (base === 'pricing-calculator') {
    return (
      <div className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ['Suggested', data.suggestedSellingPrice],
            ['Break-even', data.breakEvenPrice],
            ['Competitive', data.competitivePrice],
            ['Premium', data.premiumPrice],
          ].map(([label, val]) => (
            <div key={label} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <p className="text-[10px] font-bold uppercase text-slate-400">{label}</p>
              <p className="text-xl font-black">${val}</p>
            </div>
          ))}
        </div>
        <List title="AI Pricing Suggestions" items={data.pricingSuggestions} />
        {data.positioningTips && <p className="text-xs text-slate-500">{data.positioningTips}</p>}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Text title="Description" text={data.description} />
      <Text title="Call to Action" text={data.callToAction} />
      <Text title="Professional Reply" text={data.professionalReply} />
      <Text title="Friendly Reply" text={data.friendlyReply} />
      <Text title="Short Reply" text={data.shortReply} />
      <List title="Bullet Points" items={data.bulletPoints} />
      <List title="Primary Keywords" items={data.primaryKeywords} />
      <List title="Long-tail Keywords" items={data.longTailKeywords} />
      <List title="Search Intent" items={data.searchIntentSuggestions || data.suggestedSearchTerms} />
      {!data.description && !data.professionalReply && !data.primaryKeywords && !data.titles && (
        <pre className="text-xs p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}

function Text({ title, text }) {
  if (!text) return null;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
      <div className="flex justify-between"><h4 className="text-xs font-extrabold">{title}</h4><CopyBtn text={text} /></div>
      <pre className="text-sm whitespace-pre-wrap font-sans">{text}</pre>
    </div>
  );
}

function List({ title, items }) {
  if (!items?.length) return null;
  return (
    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h4 className="text-xs font-extrabold mb-2">{title}</h4>
      <ul className="list-disc pl-5 text-sm space-y-1">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
    </div>
  );
}

function MarketplaceAiPanel({ marketplace, toolSlug }) {
  const tool = getTool(marketplace, toolSlug);
  const base = baseOf(toolSlug);
  const fields = AI_FIELDS[base] || [];
  const [form, setForm] = useState({});
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const init = {};
    fields.forEach((f) => {
      init[f.key] = f.type === 'number' ? (f.key.includes('Margin') ? '30' : '') : f.options?.[0] || '';
    });
    setForm(init);
    setResult(null);
    setError(null);
  }, [toolSlug]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const turnstileRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const related = (NEXT[base] || []).map((b) => `${marketplace}-${b}`);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      let payload = { ...form };
      let localPricing = null;
      if (base === 'pricing-calculator') {
        localPricing = calculatePricing({
          productCost: form.productCost,
          desiredMarginPercent: form.desiredProfitMargin || 30,
          shipping: form.shipping,
          fees: form.fees,
        });
        payload = { ...payload, pricing: localPricing };
      }
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: toolSlug, payload, securityToken }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Generation failed.');
      setResult(localPricing ? { ...localPricing, ...json.data } : json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  if (!tool) return <p className="text-sm text-slate-500">Unknown tool.</p>;

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Store className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-black">{tool.name}</h2>
        </div>
        <p className="text-[11px] text-slate-500">{tool.desc}</p>
        {fields.map((f) => (
          <div key={f.key} className="space-y-2">
            <label className={labelClasses}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea className={`${inputClasses} min-h-[120px]`} value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} required={f.required} />
            ) : f.type === 'select' ? (
              <select className={inputClasses} value={form[f.key] || f.options[0]} onChange={(e) => set(f.key, e.target.value)}>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <input type={f.type === 'number' ? 'number' : 'text'} className={inputClasses} value={form[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} required={f.required} min={f.type === 'number' ? '0' : undefined} step="any" />
            )}
          </div>
        ))}
        <TurnstileWidget onTokenChange={setSecurityToken} resetKey={turnstileResetKey} />
        <button type="submit" disabled={loading || (turnstileRequired && !securityToken)} className="w-full py-3 rounded-xl bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white text-xs font-bold cursor-pointer inline-flex items-center justify-center gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {loading ? 'Generating…' : 'Generate'}
        </button>
      </form>
      <div className="lg:col-span-8 space-y-4">
        {error && (
          <div className="p-4 rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50 dark:bg-rose-950/20 text-sm text-rose-700 dark:text-rose-300 flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />{error}
          </div>
        )}
        {loading && (
          <div className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center gap-3 text-sm text-slate-500">
            <Loader2 className="w-5 h-5 animate-spin text-orange-500" /> Running DeepSeek marketplace analysis…
          </div>
        )}
        {!loading && result && <ResultView base={base} data={result} />}
        {!loading && !result && !error && (
          <div className="p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-sm text-slate-400">Fill the form and generate to see results.</div>
        )}
        <div className="flex flex-wrap gap-2">
          {related.map((slug) => (
            <Link key={slug} href={getSeoPath(marketplace, slug)} className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600 dark:text-sky-400">
              Related <ArrowRight className="w-3 h-3" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MarketplaceCalcPanel({ marketplace, toolSlug }) {
  const tool = getTool(marketplace, toolSlug);
  const base = baseOf(toolSlug);
  const regions = Object.keys(SHIPPING_TABLES[marketplace] || SHIPPING_TABLES.shopee);

  const [form, setForm] = useState({
    productCost: '20',
    sellingPrice: '49.99',
    shippingCost: '3',
    platformFee: '5',
    advertisingCost: '2',
    marketplaceFeePercent: marketplace === 'lazada' ? '6' : '5.5',
    paymentFeePercent: '2',
    shippingSubsidy: '0',
    desiredMarginPercent: '30',
    shipping: '3',
    fees: '5',
    weightKg: '0.5',
    lengthCm: '20',
    widthCm: '15',
    heightCm: '10',
    region: 'nationwide',
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const result = useMemo(() => {
    if (base === 'profit-calculator') {
      return calculateProfit(form);
    }
    if (base === 'fee-calculator') {
      return calculateFees(form);
    }
    if (base === 'shipping-calculator') {
      return calculateShipping({ ...form, marketplace });
    }
    return null;
  }, [form, base, marketplace]);

  if (!tool) return null;

  const fieldsByBase = {
    'profit-calculator': [
      ['productCost', 'Product Cost'],
      ['sellingPrice', 'Selling Price'],
      ['shippingCost', 'Shipping Cost'],
      ['platformFee', 'Platform Fee ($)'],
      ['advertisingCost', 'Advertising Cost'],
    ],
    'fee-calculator': [
      ['sellingPrice', 'Selling Price'],
      ['marketplaceFeePercent', 'Marketplace Fee %'],
      ['paymentFeePercent', 'Payment Fee %'],
      ['shippingSubsidy', 'Shipping Subsidy (optional)'],
    ],
    'shipping-calculator': [
      ['weightKg', 'Weight (kg)'],
      ['lengthCm', 'Length (cm)'],
      ['widthCm', 'Width (cm)'],
      ['heightCm', 'Height (cm)'],
    ],
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-orange-500" />
          <h2 className="text-sm font-black">{tool.name}</h2>
        </div>
        <p className="text-[11px] text-slate-500">{tool.desc} · Instant client math</p>
        {(fieldsByBase[base] || []).map(([k, label]) => (
          <div key={k} className="space-y-2">
            <label className={labelClasses}>{label}</label>
            <input type="number" min="0" step="any" className={inputClasses} value={form[k]} onChange={(e) => set(k, e.target.value)} />
          </div>
        ))}
        {base === 'shipping-calculator' && (
          <div className="space-y-2">
            <label className={labelClasses}>Shipping Region</label>
            <select className={inputClasses} value={form.region} onChange={(e) => set('region', e.target.value)}>
              {regions.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <p className="text-[10px] text-slate-400">Regional rates live in SHIPPING_TABLES — update without UI code changes.</p>
          </div>
        )}
        {base === 'fee-calculator' && (
          <p className="text-[10px] text-slate-400">Fee % fields are configurable for regional marketplace differences.</p>
        )}
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
        {base === 'profit-calculator' && result && (
          <>
            <Stat label="Net Profit" value={`$${result.netProfit}`} />
            <Stat label="Profit Margin" value={`${result.profitMargin}%`} />
            <Stat label="ROI" value={`${result.roi}%`} />
            <Stat label="Total Cost" value={`$${result.totalCost}`} />
          </>
        )}
        {base === 'fee-calculator' && result && (
          <>
            <Stat label="Total Fees" value={`$${result.totalFees}`} />
            <Stat label="Seller Receives" value={`$${result.sellerReceives}`} />
            <Stat label="Marketplace Fee" value={`$${result.marketplaceFee}`} />
            <Stat label="Payment Fee" value={`$${result.paymentFee}`} />
          </>
        )}
        {base === 'shipping-calculator' && result && (
          <>
            <Stat label="Estimated Shipping" value={`$${result.estimatedShippingCost}`} />
            <Stat label="Delivery Estimate" value={result.estimatedDelivery} />
            <Stat label="Chargeable Weight" value={`${result.chargeableWeightKg} kg`} />
            <Stat label="Volumetric Weight" value={`${result.volumetricWeightKg} kg`} />
          </>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-2xl font-black mt-1">{value}</p>
    </div>
  );
}

export const SHOPEE_HOST_SLUGS = [
  'shopee-listing-title-generator', 'shopee-product-description-generator', 'shopee-keyword-generator',
  'shopee-listing-seo-analyzer', 'shopee-profit-calculator', 'shopee-fee-calculator',
  'shopee-pricing-calculator', 'shopee-shipping-calculator', 'shopee-chat-reply-generator', 'shopee-listing-optimizer',
];

export const LAZADA_HOST_SLUGS = [
  'lazada-listing-title-generator', 'lazada-product-description-generator', 'lazada-keyword-generator',
  'lazada-listing-seo-analyzer', 'lazada-profit-calculator', 'lazada-fee-calculator',
  'lazada-pricing-calculator', 'lazada-shipping-calculator', 'lazada-chat-reply-generator', 'lazada-listing-optimizer',
];

export default function MarketplaceHost({ marketplace, toolSlug }) {
  const base = baseOf(toolSlug);
  if (['profit-calculator', 'fee-calculator', 'shipping-calculator'].includes(base)) {
    return <MarketplaceCalcPanel marketplace={marketplace} toolSlug={toolSlug} />;
  }
  return <MarketplaceAiPanel marketplace={marketplace} toolSlug={toolSlug} />;
}
