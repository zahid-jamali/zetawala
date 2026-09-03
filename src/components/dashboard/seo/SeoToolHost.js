'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2, AlertTriangle, ArrowRight, Search } from 'lucide-react';
import TurnstileWidget from '../TurnstileWidget';
import { getSeoTool } from '../../../config/seoWebmaster/tools';
import { useLocalizedHref } from '../../../i18n/useLocalizedHref';

const inputClasses =
  'w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all';
const labelClasses = 'text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block';

const NEXT = {
  'website-checker': [
    { slug: 'pagespeed-analyzer', label: 'PageSpeed Analyzer' },
    { slug: 'content-audit', label: 'Content Audit' },
    { slug: 'health-score', label: 'SEO Health Score' },
    { slug: 'action-plan', label: 'SEO Action Plan' },
  ],
  'content-audit': [
    { slug: 'keyword-density', label: 'Keyword Density' },
    { slug: 'title-meta-analyzer', label: 'Title & Meta Analyzer' },
  ],
  'pagespeed-analyzer': [
    { slug: 'website-checker', label: 'Website Checker' },
    { slug: 'health-score', label: 'Health Score' },
  ],
  'sitemap-tool': [
    { slug: 'robots-txt-tool', label: 'Robots.txt Tool' },
    { slug: 'canonical-indexability', label: 'Indexability Checker' },
  ],
  'health-score': [{ slug: 'action-plan', label: 'SEO Action Plan' }],
  'canonical-indexability': [
    { slug: 'robots-txt-tool', label: 'Robots.txt Tester' },
    { slug: 'broken-link-checker', label: 'Broken Link Checker' },
  ],
};

export default function SeoToolHost({ toolSlug }) {
  const { toolHref } = useLocalizedHref();
  const tool = getSeoTool(toolSlug);
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState(defaultForm(tool?.mode));

  if (!tool) {
    return <p className="text-sm text-slate-500">Unknown SEO tool.</p>;
  }

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/seo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: tool.apiAction, securityToken, ...buildPayload(tool.mode, form) }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error || 'Analysis failed.');
      setResult(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <form onSubmit={onSubmit} className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">{tool.name}</h2>
        </div>
        <p className="text-[11px] text-slate-500">{tool.desc}</p>

        <SeoFormFields mode={tool.mode} form={form} set={set} />

        <TurnstileWidget onTokenChange={setSecurityToken} resetKey={turnstileResetKey} />
        <button
          type="submit"
          disabled={loading || (!!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !securityToken)}
          className="w-full py-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 text-white font-semibold text-sm disabled:opacity-50"
        >
          {loading ? 'Analyzing…' : 'Run Analysis'}
        </button>
      </form>

      <div className="lg:col-span-8 space-y-4">
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 text-red-600 dark:text-red-400 text-xs flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}
        {loading && (
          <div className="min-h-[220px] flex flex-col items-center justify-center gap-3 py-16">
            <Loader2 className="w-10 h-10 animate-spin text-slate-800 dark:text-white" />
            <p className="text-xs text-slate-500">Fetching pages, calculating metrics, then interpreting insights…</p>
          </div>
        )}
        {!loading && result && (
          <>
            <ResultView data={result} />
            {(NEXT[toolSlug] || [{ slug: 'website-checker', label: 'SEO Website Checker' }, { slug: 'action-plan', label: 'SEO Action Plan' }]).length > 0 && (
              <div className="p-5 rounded-3xl bg-sky-50/50 dark:bg-sky-950/10 border border-sky-100 dark:border-sky-900/30 space-y-3">
                <h4 className="text-xs font-extrabold">Recommended Next Steps</h4>
                <div className="flex flex-wrap gap-2">
                  {(NEXT[toolSlug] || [
                    { slug: 'health-score', label: 'Health Score' },
                    { slug: 'action-plan', label: 'Action Plan' },
                  ]).map((l) => (
                    <Link
                      key={l.slug}
                      href={toolHref('seo', l.slug)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-sky-600"
                    >
                      {l.label}
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        {!loading && !result && !error && (
          <div className="p-10 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Enter your inputs and run analysis to see deterministic SEO results.
          </div>
        )}
      </div>
    </div>
  );
}

export const SEO_HOST_SLUGS = [
  'website-checker',
  'content-audit',
  'title-meta-analyzer',
  'pagespeed-analyzer',
  'internal-link-analyzer',
  'broken-link-checker',
  'sitemap-tool',
  'canonical-indexability',
  'action-plan',
  'robots-txt-tool',
  'header-meta-inspector',
  'traffic-revenue',
  'health-score',
  'keyword-density',
  'seo-roi',
  'keyword-roi',
  'content-roi',
];

function defaultForm(mode) {
  switch (mode) {
    case 'pagespeed':
      return { url: '', strategy: 'mobile' };
    case 'sitemap':
      return { url: '', mode: 'validate' };
    case 'robots':
      return { url: '', mode: 'generate', testPath: '/', userAgent: 'Googlebot' };
    case 'density':
      return { url: '', text: '' };
    case 'traffic':
      return { estimatedMonthlyVisits: '10000', pagesPerVisit: '1.8', rpm: '2' };
    case 'seo-roi':
      return { monthlyInvestment: '500', monthlyOrganicSessions: '8000', conversionRatePct: '2', averageOrderValue: '40', leadToCustomerRatePct: '100' };
    case 'keyword-roi':
      return { monthlySearchVolume: '5000', estimatedCtrPct: '10', conversionRatePct: '2', customerValue: '50' };
    case 'content-roi':
      return { contentCost: '300', monthlyTraffic: '2000', conversionRatePct: '1.5', averageValue: '35', monthsActive: '12' };
    default:
      return { url: '' };
  }
}

function buildPayload(mode, form) {
  if (mode === 'pagespeed') return { url: form.url, strategy: form.strategy };
  if (mode === 'sitemap') return { url: form.url, mode: form.mode };
  if (mode === 'robots') return { url: form.url, mode: form.mode, testPath: form.testPath, userAgent: form.userAgent };
  if (mode === 'density') return { url: form.url || undefined, text: form.text || undefined };
  if (mode === 'traffic') return { estimatedMonthlyVisits: form.estimatedMonthlyVisits, pagesPerVisit: form.pagesPerVisit, rpm: form.rpm };
  if (mode === 'seo-roi') return { ...form };
  if (mode === 'keyword-roi') return { ...form };
  if (mode === 'content-roi') return { ...form };
  return { url: form.url };
}

function SeoFormFields({ mode, form, set }) {
  if (mode === 'pagespeed') {
    return (
      <>
        <Field label="Website URL *" value={form.url} onChange={(v) => set('url', v)} placeholder="https://example.com" required />
        <div className="space-y-2">
          <label className={labelClasses}>Strategy</label>
          <select className={inputClasses} value={form.strategy} onChange={(e) => set('strategy', e.target.value)}>
            <option value="mobile">Mobile</option>
            <option value="desktop">Desktop</option>
          </select>
        </div>
      </>
    );
  }
  if (mode === 'sitemap') {
    return (
      <>
        <Field label="Site or Sitemap URL *" value={form.url} onChange={(v) => set('url', v)} required />
        <div className="space-y-2">
          <label className={labelClasses}>Mode</label>
          <select className={inputClasses} value={form.mode} onChange={(e) => set('mode', e.target.value)}>
            <option value="validate">Validate sitemap</option>
            <option value="generate">Generate from crawl</option>
          </select>
        </div>
      </>
    );
  }
  if (mode === 'robots') {
    return (
      <>
        <Field label="Website URL *" value={form.url} onChange={(v) => set('url', v)} required />
        <div className="space-y-2">
          <label className={labelClasses}>Mode</label>
          <select className={inputClasses} value={form.mode} onChange={(e) => set('mode', e.target.value)}>
            <option value="generate">Generate robots.txt</option>
            <option value="test">Test existing robots.txt</option>
          </select>
        </div>
        {form.mode === 'test' && (
          <>
            <Field label="Path to test" value={form.testPath} onChange={(v) => set('testPath', v)} placeholder="/blog/post" />
            <Field label="User-agent" value={form.userAgent} onChange={(v) => set('userAgent', v)} />
          </>
        )}
      </>
    );
  }
  if (mode === 'density') {
    return (
      <>
        <Field label="Page URL (optional)" value={form.url} onChange={(v) => set('url', v)} placeholder="https://example.com/page" />
        <div className="space-y-2">
          <label className={labelClasses}>Or paste text</label>
          <textarea className={inputClasses} rows={5} value={form.text} onChange={(e) => set('text', e.target.value)} placeholder="Paste content…" />
        </div>
      </>
    );
  }
  if (mode === 'traffic') {
    return (
      <>
        <Field label="Estimated monthly visits" type="number" value={form.estimatedMonthlyVisits} onChange={(v) => set('estimatedMonthlyVisits', v)} />
        <Field label="Pages per visit" type="number" value={form.pagesPerVisit} onChange={(v) => set('pagesPerVisit', v)} />
        <Field label="Assumed RPM (USD)" type="number" value={form.rpm} onChange={(v) => set('rpm', v)} />
        <p className="text-[10px] text-slate-500">All outputs are labeled estimates — not Analytics/AdSense data.</p>
      </>
    );
  }
  if (mode === 'seo-roi') {
    return (
      <>
        <Field label="Monthly SEO investment" type="number" value={form.monthlyInvestment} onChange={(v) => set('monthlyInvestment', v)} />
        <Field label="Monthly organic sessions" type="number" value={form.monthlyOrganicSessions} onChange={(v) => set('monthlyOrganicSessions', v)} />
        <Field label="Conversion rate %" type="number" value={form.conversionRatePct} onChange={(v) => set('conversionRatePct', v)} />
        <Field label="Average order / customer value" type="number" value={form.averageOrderValue} onChange={(v) => set('averageOrderValue', v)} />
        <Field label="Lead → customer % " type="number" value={form.leadToCustomerRatePct} onChange={(v) => set('leadToCustomerRatePct', v)} />
      </>
    );
  }
  if (mode === 'keyword-roi') {
    return (
      <>
        <Field label="Monthly search volume" type="number" value={form.monthlySearchVolume} onChange={(v) => set('monthlySearchVolume', v)} />
        <Field label="Estimated CTR %" type="number" value={form.estimatedCtrPct} onChange={(v) => set('estimatedCtrPct', v)} />
        <Field label="Conversion rate %" type="number" value={form.conversionRatePct} onChange={(v) => set('conversionRatePct', v)} />
        <Field label="Customer value" type="number" value={form.customerValue} onChange={(v) => set('customerValue', v)} />
      </>
    );
  }
  if (mode === 'content-roi') {
    return (
      <>
        <Field label="Content creation cost" type="number" value={form.contentCost} onChange={(v) => set('contentCost', v)} />
        <Field label="Monthly traffic" type="number" value={form.monthlyTraffic} onChange={(v) => set('monthlyTraffic', v)} />
        <Field label="Conversion rate %" type="number" value={form.conversionRatePct} onChange={(v) => set('conversionRatePct', v)} />
        <Field label="Average value / conversion" type="number" value={form.averageValue} onChange={(v) => set('averageValue', v)} />
        <Field label="Months active" type="number" value={form.monthsActive} onChange={(v) => set('monthsActive', v)} />
      </>
    );
  }
  return <Field label="Website / Page URL *" value={form.url} onChange={(v) => set('url', v)} placeholder="https://example.com" required />;
}

function Field({ label, value, onChange, placeholder, type = 'text', required }) {
  return (
    <div className="space-y-2">
      <label className={labelClasses}>{label}</label>
      <input
        className={inputClasses}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function ResultView({ data }) {
  if (data.xml) {
    return (
      <div className="space-y-3">
        <Metric title="URLs in generated sitemap" value={data.urlCount} />
        <CodeBlock title="Generated sitemap XML" text={data.xml} />
        {data.note && <p className="text-[11px] text-slate-500">{data.note}</p>}
      </div>
    );
  }
  if (data.robotsTxt) {
    return (
      <div className="space-y-3">
        <CodeBlock title="robots.txt" text={data.robotsTxt} />
        {data.tips?.length > 0 && <IssueList title="Tips" items={data.tips} tone="emerald" />}
      </div>
    );
  }

  const critical =
    data.critical || data.audit?.critical || data.onPage?.issues || data.onPage?.critical || data.auditSummary?.critical;
  const warnings = data.warnings || data.audit?.warnings || data.onPage?.warnings || data.auditSummary?.warnings;
  const passed = data.passed || data.audit?.passed || data.onPage?.passed;

  return (
    <div className="space-y-4">
      {data.overall != null && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Overall Score</p>
          <p className="text-4xl font-black text-sky-600 dark:text-sky-400">
            {data.overall}
            <span className="text-base text-slate-400">/100</span>
          </p>
          {data.disclaimer && <p className="text-[10px] text-slate-500 mt-2">{data.disclaimer}</p>}
        </div>
      )}
      {(data.audit?.overall != null || data.auditSummary?.overall != null) && data.overall == null && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Website SEO Score</p>
          <p className="text-4xl font-black text-sky-600">
            {data.audit?.overall ?? data.auditSummary?.overall}
            <span className="text-base text-slate-400">/100</span>
          </p>
        </div>
      )}
      {data.onPage?.score != null && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">On-Page Score</p>
          <p className="text-4xl font-black text-sky-600">
            {data.onPage.score}
            <span className="text-base text-slate-400">/100</span>
          </p>
        </div>
      )}

      {data.scores && <MetricsGrid entries={data.scores} />}
      {data.categories && <MetricsGrid entries={data.categories} />}
      {(data.audit?.categories || data.auditSummary?.categories) && (
        <MetricsGrid entries={data.audit?.categories || data.auditSummary?.categories} />
      )}

      {data.crawl && (
        <div className="grid sm:grid-cols-3 gap-3">
          <Metric title="Start URL" value={shortUrl(data.crawl.startUrl)} />
          <Metric title="Pages analyzed" value={data.crawl.pagesAnalyzed} />
          <Metric title="Cache" value={data.crawl.fromCache ? 'Hit' : 'Fresh'} />
        </div>
      )}

      {data.pagesAnalyzed != null && !data.crawl && <Metric title="Pages analyzed" value={data.pagesAnalyzed} />}
      {data.pagesChecked != null && <Metric title="Pages checked" value={data.pagesChecked} />}
      {data.pagesScored != null && <Metric title="Pages scored" value={data.pagesScored} />}

      {data.page && (
        <InfoCard title="Page Snapshot">
          <KeyValueList
            entries={{
              Title: data.page.title || '—',
              Description: data.page.description || '—',
              'Word count': data.page.wordCount,
              H1: (data.page.headings?.h1 || []).join(' · ') || '—',
              'H2 count': data.page.headings?.h2?.length ?? '—',
              Images: data.page.imageCount,
              'Missing alt': data.page.missingAlt,
            }}
          />
        </InfoCard>
      )}

      {data.links && (
        <div className="grid sm:grid-cols-2 gap-3">
          <Metric title="Internal links" value={data.links.internal} />
          <Metric title="External links" value={data.links.external} />
        </div>
      )}

      {data.fetch && (
        <InfoCard title="Fetch Status">
          <KeyValueList
            entries={{
              Status: data.fetch.status,
              OK: data.fetch.ok ? 'Yes' : 'No',
              'Final URL': data.fetch.finalUrl,
              'Content type': data.fetch.contentType,
            }}
          />
        </InfoCard>
      )}

      <IssueList title="Critical Issues" items={critical} tone="red" />
      <IssueList title="Warnings" items={warnings} tone="amber" />
      <IssueList title="Passed Checks" items={passed} tone="emerald" />

      {data.broken && <BrokenTable rows={data.broken} />}
      {data.rows && <MetaTable rows={data.rows} />}
      {data.duplicates && <DuplicatesBlock duplicates={data.duplicates} />}
      {data.density && <DensityBlocks density={data.density} overused={data.overused} />}
      {data.vitals && <VitalsBlock vitals={data.vitals} />}

      {data.meta && <MetaCard meta={data.meta} />}
      {data.indexability && <IndexabilityCard score={data.indexability} extra={data} />}

      {data.orphanCandidates?.length > 0 && (
        <IssueList title="Orphan / low-inbound candidates" items={data.orphanCandidates} tone="amber" />
      )}
      {data.weaklyLinked?.length > 0 && (
        <IssueList
          title="Weakly linked pages"
          items={data.weaklyLinked.map((r) => `${r.url} (inbound: ${r.inbound})`)}
          tone="amber"
        />
      )}
      {data.hubPages?.length > 0 && (
        <IssueList
          title="Hub pages (most outbound)"
          items={data.hubPages.map((r) => `${r.url} (outbound: ${r.outbound})`)}
          tone="emerald"
        />
      )}
      {data.weakAnchors?.length > 0 && (
        <IssueList
          title="Weak anchor text"
          items={data.weakAnchors.map((r) => `"${r.anchor}" → ${r.to}`)}
          tone="amber"
        />
      )}

      {data.test && (
        <InfoCard title="Robots Path Test">
          <KeyValueList
            entries={{
              Path: data.test.path,
              'User-agent': data.test.userAgent,
              Decision: data.test.decision,
              'robots.txt URL': data.robotsUrl,
              Accessible: data.accessible ? 'Yes' : 'No',
              'HTTP status': data.status,
            }}
          />
        </InfoCard>
      )}

      {data.revenue && (
        <div className="grid sm:grid-cols-3 gap-3">
          <Metric title="Low $/mo" value={`$${data.revenue.low}`} />
          <Metric title="Typical $/mo" value={`$${data.revenue.typical}`} />
          <Metric title="High $/mo" value={`$${data.revenue.high}`} />
        </div>
      )}
      {data.roiPercent != null && <Metric title="ROI %" value={`${data.roiPercent}%`} />}
      {data.estimatedRevenue != null && <Metric title="Estimated revenue" value={`$${data.estimatedRevenue}`} />}
      {data.estimatedMonthlyRevenue != null && (
        <Metric title="Est. monthly revenue" value={`$${data.estimatedMonthlyRevenue}`} />
      )}

      {data.ai && <AiBlock ai={data.ai} />}
      {data.aiError && (
        <p className="text-[11px] text-amber-600 dark:text-amber-400">{data.aiError}</p>
      )}
      {data.disclaimer && data.overall == null && (
        <p className="text-[11px] text-slate-500">{data.disclaimer}</p>
      )}
      {data.labels && (
        <p className="text-[10px] text-slate-500">
          {Object.entries(data.labels)
            .map(([k, v]) => `${humanizeKey(k)}: ${v}`)
            .join(' · ')}
        </p>
      )}
      {data.note && <p className="text-[11px] text-slate-500">{data.note}</p>}
      {data.limitNote && <p className="text-[11px] text-slate-500">{data.limitNote}</p>}
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{title}</p>
      <p className="text-lg font-black text-slate-900 dark:text-white mt-1 break-words">{formatDisplay(value)}</p>
    </div>
  );
}

function MetricsGrid({ entries }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(entries).map(([k, v]) => (
        <Metric key={k} title={humanizeKey(k)} value={v == null ? 'N/A' : v} />
      ))}
    </div>
  );
}

function IssueList({ title, items, tone }) {
  if (!items?.length) return null;
  const color =
    tone === 'red'
      ? 'border-red-200 dark:border-red-900/40'
      : tone === 'amber'
        ? 'border-amber-200 dark:border-amber-900/40'
        : 'border-emerald-200 dark:border-emerald-900/40';
  return (
    <div className={`p-5 rounded-2xl border bg-white dark:bg-slate-900 ${color} space-y-2`}>
      <h4 className="text-xs font-extrabold">{title}</h4>
      <ul className="list-disc pl-4 text-xs text-slate-600 dark:text-slate-300 space-y-1">
        {items.slice(0, 25).map((i, idx) => (
          <li key={`${String(i).slice(0, 40)}-${idx}`}>{typeof i === 'string' ? i : formatDisplay(i)}</li>
        ))}
      </ul>
    </div>
  );
}

function BrokenTable({ rows }) {
  if (!rows.length) return <p className="text-xs text-emerald-600">No broken links found in the sampled set.</p>;
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-[11px]">
        <thead className="bg-slate-50 dark:bg-slate-950 text-left">
          <tr>
            <th className="p-3">Source</th>
            <th className="p-3">Broken URL</th>
            <th className="p-3">Status</th>
            <th className="p-3">Anchor</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
              <td className="p-3 max-w-[160px] truncate">{r.source}</td>
              <td className="p-3 max-w-[200px] truncate">{r.url}</td>
              <td className="p-3">{r.status}</td>
              <td className="p-3">{r.anchor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetaTable({ rows }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 max-h-[480px]">
      <table className="w-full text-[11px]">
        <thead className="bg-slate-50 dark:bg-slate-950 text-left sticky top-0">
          <tr>
            <th className="p-3">URL</th>
            <th className="p-3">Title</th>
            <th className="p-3">Desc len</th>
            <th className="p-3">Issues</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-100 dark:border-slate-800 align-top">
              <td className="p-3 max-w-[180px] truncate">{r.url}</td>
              <td className="p-3 max-w-[200px]">{r.title || '—'}</td>
              <td className="p-3">{r.descriptionLength ?? '—'}</td>
              <td className="p-3">{(r.issues || []).join(', ') || 'OK'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DensityBlocks({ density, overused }) {
  return (
    <div className="space-y-3">
      <Metric title="Word count" value={density.wordCount} />
      {['oneWord', 'twoWord', 'threeWord'].map((key) => (
        <div key={key} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <h4 className="text-xs font-extrabold mb-2">{humanizeKey(key)}</h4>
          <ul className="text-[11px] space-y-1 text-slate-600 dark:text-slate-300">
            {(density[key] || []).slice(0, 12).map((t) => (
              <li key={t.term}>
                {t.term} — {t.count} ({t.density}%)
              </li>
            ))}
          </ul>
        </div>
      ))}
      {overused?.length > 0 && (
        <IssueList title="Potentially overused terms" items={overused.map((t) => `${t.term} (${t.density}%)`)} tone="amber" />
      )}
    </div>
  );
}

function VitalsBlock({ vitals }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(vitals).map(([k, v]) => (
        <Metric key={k} title={k.toUpperCase()} value={v?.displayValue || 'N/A'} />
      ))}
    </div>
  );
}

function DuplicatesBlock({ duplicates }) {
  const titles = duplicates.titles || [];
  const descriptions = duplicates.descriptions || [];
  if (!titles.length && !descriptions.length) return null;
  return (
    <div className="space-y-3">
      {titles.length > 0 && (
        <IssueList
          title="Duplicate titles"
          items={titles.map((t) => `"${t.value}" × ${t.count}`)}
          tone="amber"
        />
      )}
      {descriptions.length > 0 && (
        <IssueList
          title="Duplicate meta descriptions"
          items={descriptions.map((t) => `"${String(t.value).slice(0, 80)}…" × ${t.count}`)}
          tone="amber"
        />
      )}
    </div>
  );
}

function MetaCard({ meta }) {
  return (
    <div className="space-y-3">
      <InfoCard title="Page Metadata">
        <KeyValueList
          entries={{
            Title: meta.title || '—',
            Description: meta.description || '—',
            Robots: meta.robots || '—',
            Canonical: meta.canonical || '—',
            Language: meta.language || '—',
            Charset: meta.charset || '—',
            Viewport: meta.viewport || '—',
          }}
        />
      </InfoCard>
      {meta.openGraph && Object.keys(meta.openGraph).length > 0 && (
        <InfoCard title="Open Graph Tags">
          <KeyValueList entries={meta.openGraph} />
        </InfoCard>
      )}
      {meta.twitter && Object.keys(meta.twitter).length > 0 && (
        <InfoCard title="Twitter Card Tags">
          <KeyValueList entries={meta.twitter} />
        </InfoCard>
      )}
    </div>
  );
}

function IndexabilityCard({ score, extra }) {
  return (
    <div className="space-y-3">
      {score.score != null && <Metric title="Indexability score" value={`${score.score}/100`} />}
      <InfoCard title="Indexability Signals">
        <KeyValueList
          entries={{
            Canonical: extra.canonical || score.canonical || '—',
            'Robots meta': extra.robotsMeta || score.robotsMeta || '—',
            'X-Robots-Tag': extra.xRobotsTag || score.xRobotsTag || '—',
            'robots.txt accessible':
              extra.robotsTxtAccessible == null ? '—' : extra.robotsTxtAccessible ? 'Yes' : 'No',
            Indexable: score.indexable == null ? '—' : score.indexable ? 'Likely yes' : 'Blocked / limited',
          }}
        />
      </InfoCard>
      <IssueList title="Indexability issues" items={score.issues} tone="red" />
      <IssueList title="Indexability warnings" items={score.warnings} tone="amber" />
      <IssueList title="Passed checks" items={score.passed} tone="emerald" />
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{title}</h4>
      {children}
    </div>
  );
}

function KeyValueList({ entries }) {
  const list = Object.entries(entries || {}).filter(([, v]) => v !== undefined);
  if (!list.length) return <p className="text-xs text-slate-500">No data</p>;
  return (
    <dl className="space-y-2.5">
      {list.map(([k, v]) => (
        <div key={k} className="grid grid-cols-[120px_1fr] sm:grid-cols-[160px_1fr] gap-2 text-xs">
          <dt className="font-bold text-slate-500 dark:text-slate-400">{humanizeKey(k)}</dt>
          <dd className="text-slate-700 dark:text-slate-200 break-words leading-relaxed">{formatDisplay(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

function CodeBlock({ title, text }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
      {title && <h4 className="text-xs font-extrabold">{title}</h4>}
      <pre className="text-[10px] overflow-auto max-h-96 whitespace-pre-wrap text-slate-600 dark:text-slate-300 font-mono">
        {text}
      </pre>
    </div>
  );
}

const AI_FIELD_ORDER = [
  ['summary', 'Summary'],
  ['contentQuality', 'Content Quality'],
  ['recommendations', 'Recommendations'],
  ['priorityFixes', 'Priority Fixes'],
  ['fixFirst', 'Fix First'],
  ['improveFirst', 'Improve First'],
  ['suggestions', 'Suggestions'],
  ['seoNotes', 'SEO Notes'],
  ['improvements', 'Improvements'],
  ['beginnerTips', 'Beginner Tips'],
  ['beginnerSteps', 'Beginner Steps'],
  ['roadmap', 'Action Roadmap'],
];

function AiBlock({ ai }) {
  if (!ai) return null;
  if (typeof ai === 'string') {
    return (
      <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/10 space-y-2">
        <AiHeader />
        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{ai}</p>
      </div>
    );
  }

  const knownKeys = new Set(AI_FIELD_ORDER.map(([k]) => k));
  const extras = Object.keys(ai).filter((k) => !knownKeys.has(k));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">AI Insight</h3>
        <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/30 text-indigo-500">
          Interpretation only
        </span>
      </div>

      {AI_FIELD_ORDER.map(([key, label]) => {
        const value = ai[key];
        if (value == null || value === '') return null;
        if (key === 'roadmap' && Array.isArray(value)) {
          return <RoadmapList key={key} items={value} />;
        }
        return (
          <InsightCard key={key} title={label}>
            <ListOrText value={value} />
          </InsightCard>
        );
      })}

      {extras.map((key) => (
        <InsightCard key={key} title={humanizeKey(key)}>
          <ListOrText value={ai[key]} />
        </InsightCard>
      ))}
    </div>
  );
}

function AiHeader() {
  return (
    <div className="flex justify-between items-center">
      <h4 className="text-xs font-extrabold">AI Insight</h4>
      <span className="text-[8px] font-bold uppercase text-indigo-500">Interpretation only</span>
    </div>
  );
}

function InsightCard({ title, children }) {
  return (
    <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/10 space-y-2">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">{title}</h4>
      <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
    </div>
  );
}

function RoadmapList({ items }) {
  return (
    <div className="p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/30 dark:bg-indigo-950/10 space-y-3">
      <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Action Roadmap</h4>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1"
          >
            <div className="flex flex-wrap gap-2 text-[9px] font-bold uppercase tracking-wider">
              {item.priority && (
                <span className="px-1.5 py-0.5 rounded bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300">
                  {item.priority}
                </span>
              )}
              {item.impact && (
                <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  Impact: {item.impact}
                </span>
              )}
              {item.urgency && (
                <span className="px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-300">
                  {item.urgency}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white">{item.task || item.title || 'Task'}</p>
            {item.why && <p className="text-[11px] text-slate-500 leading-relaxed">{item.why}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ListOrText({ value }) {
  if (Array.isArray(value)) {
    if (!value.length) return <p>—</p>;
    return (
      <ul className="list-disc pl-4 space-y-1">
        {value.map((item, i) => (
          <li key={i}>{typeof item === 'string' ? item : formatDisplay(item)}</li>
        ))}
      </ul>
    );
  }
  if (value && typeof value === 'object') {
    return <KeyValueList entries={value} />;
  }
  return <p className="whitespace-pre-wrap">{value || '—'}</p>;
}

function humanizeKey(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDisplay(value) {
  if (value == null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (typeof value === 'number') return value;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    if (!value.length) return '—';
    if (value.every((v) => typeof v === 'string' || typeof v === 'number')) return value.join(', ');
    return value.map((v) => (typeof v === 'string' ? v : v?.task || v?.url || humanReadableObject(v))).join(' · ');
  }
  return humanReadableObject(value);
}

function humanReadableObject(obj) {
  if (!obj || typeof obj !== 'object') return String(obj);
  const preferred = obj.task || obj.title || obj.url || obj.name || obj.message || obj.label;
  if (preferred) return preferred;
  return Object.entries(obj)
    .slice(0, 4)
    .map(([k, v]) => `${humanizeKey(k)}: ${typeof v === 'object' ? '…' : v}`)
    .join(' · ');
}

function shortUrl(url) {
  if (!url) return '—';
  try {
    const u = new URL(url);
    return u.hostname + (u.pathname === '/' ? '' : u.pathname);
  } catch {
    return url;
  }
}
