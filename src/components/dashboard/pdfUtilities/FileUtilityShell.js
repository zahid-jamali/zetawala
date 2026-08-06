'use client';

import React, { useMemo, useState } from 'react';
import { FileStack } from 'lucide-react';
import { getPdfUtilityTool } from '../../../config/pdfUtilities/tools';
import FileDropzone from './FileDropzone';
import TurnstileWidget from '../TurnstileWidget';
import {
  ErrorBanner,
  NextSteps,
  CopyButton,
  DownloadButton,
  ProcessButton,
  ResultCard,
  processUtility,
  inputClasses,
  labelClasses,
} from './PdfShared';

const NEXT = {
  'pdf-to-markdown': [
    { slug: 'pdf-table-extractor', label: 'Extract Tables' },
    { slug: 'pdf-link-extractor', label: 'Extract Links' },
    { slug: 'screenshot-to-text', label: 'OCR Screenshot' },
  ],
  'pdf-table-extractor': [
    { slug: 'excel-to-json', label: 'Excel → JSON' },
    { slug: 'csv-to-excel', label: 'CSV → Excel' },
    { slug: 'pdf-to-markdown', label: 'PDF → Markdown' },
  ],
  'pdf-link-extractor': [
    { slug: 'pdf-metadata-viewer', label: 'PDF Metadata' },
    { slug: 'pdf-to-markdown', label: 'PDF → Markdown' },
  ],
  'pdf-metadata-viewer': [
    { slug: 'pdf-link-extractor', label: 'Extract Links' },
    { slug: 'pdf-image-extractor', label: 'Extract Images' },
  ],
  'pdf-image-extractor': [
    { slug: 'image-color-palette', label: 'Color Palette' },
    { slug: 'exif-metadata-remover', label: 'Strip EXIF' },
    { slug: 'social-image-resizer', label: 'Social Resizer' },
  ],
  'excel-to-json': [
    { slug: 'json-to-excel', label: 'JSON → Excel' },
    { slug: 'csv-to-excel', label: 'CSV → Excel' },
  ],
  'json-to-excel': [
    { slug: 'excel-to-json', label: 'Excel → JSON' },
    { slug: 'csv-to-excel', label: 'CSV → Excel' },
  ],
  'csv-to-excel': [
    { slug: 'excel-to-json', label: 'Excel → JSON' },
    { slug: 'json-to-excel', label: 'JSON → Excel' },
  ],
  'image-metadata-viewer': [
    { slug: 'exif-metadata-remover', label: 'Strip EXIF' },
    { slug: 'image-color-palette', label: 'Color Palette' },
  ],
  'exif-metadata-remover': [
    { slug: 'image-metadata-viewer', label: 'View Metadata' },
    { slug: 'social-image-resizer', label: 'Social Resizer' },
  ],
  'image-color-palette': [
    { slug: 'social-image-resizer', label: 'Social Resizer' },
    { slug: 'image-metadata-viewer', label: 'View Metadata' },
  ],
  'social-image-resizer': [
    { slug: 'image-color-palette', label: 'Color Palette' },
    { slug: 'exif-metadata-remover', label: 'Strip EXIF' },
  ],
  'screenshot-to-text': [
    { slug: 'pdf-to-markdown', label: 'PDF → Markdown' },
    { slug: 'excel-formula-generator', label: 'Excel Formulas' },
  ],
};

function downloadTablesAsCsv(tables) {
  if (!tables?.length) return '';
  return tables
    .map((t, i) => {
      const header = `# Table ${i + 1} (page ${t.page || '?'})\n`;
      const body = (t.rows || []).map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
      return header + body;
    })
    .join('\n\n');
}

export default function FileUtilityShell({ toolSlug }) {
  const tool = getPdfUtilityTool(toolSlug);
  const [file, setFile] = useState(null);
  const [jsonText, setJsonText] = useState('[\n  {"name": "Ada", "role": "Engineer"}\n]');
  const [sheetName, setSheetName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [securityToken, setSecurityToken] = useState('');
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);

  const isJsonTool = toolSlug === 'json-to-excel';
  const turnstileRequired = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const run = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const options = {};
      if (toolSlug === 'excel-to-json' && sheetName) options.sheetName = sheetName;
      const result = await processUtility(toolSlug, {
        file: isJsonTool ? undefined : file,
        text: isJsonTool ? jsonText : undefined,
        options,
        securityToken,
      });
      setData(result);
    } catch (err) {
      setError(err.message || 'Processing failed.');
    } finally {
      setLoading(false);
      setSecurityToken('');
      setTurnstileResetKey((k) => k + 1);
    }
  };

  const tableCsv = useMemo(
    () => (toolSlug === 'pdf-table-extractor' ? downloadTablesAsCsv(data?.tables) : ''),
    [toolSlug, data]
  );

  if (!tool) return null;

  return (
    <div className="grid lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center gap-2">
          <FileStack className="w-4 h-4 text-sky-500" />
          <h2 className="text-sm font-black text-slate-900 dark:text-white">Inputs</h2>
        </div>

        {isJsonTool ? (
          <div className="space-y-2">
            <label className={labelClasses}>JSON Array or Object</label>
            <textarea
              className={`${inputClasses} min-h-[220px] font-mono text-xs`}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              spellCheck={false}
            />
          </div>
        ) : (
          <FileDropzone
            accept={tool.accept}
            maxMb={tool.maxMb || 10}
            file={file}
            onFile={(f) => {
              setFile(f);
              setData(null);
              setError(null);
            }}
            hint={`Max ${tool.maxMb || 10}MB · processed locally on server · not uploaded to third parties`}
          />
        )}

        {toolSlug === 'excel-to-json' && (
          <div className="space-y-2">
            <label className={labelClasses}>Worksheet name (optional)</label>
            <input
              className={inputClasses}
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder="Leave blank for first sheet"
            />
          </div>
        )}

        <TurnstileWidget onTokenChange={setSecurityToken} resetKey={turnstileResetKey} />

        <ProcessButton
          onClick={run}
          loading={loading}
          disabled={(isJsonTool ? !jsonText.trim() : !file) || (turnstileRequired && !securityToken)}
        />
        <p className="text-[10px] text-slate-500 leading-relaxed">
          Open-source processing only. Temporary buffers are discarded after the response.
        </p>
      </div>

      <div className="lg:col-span-8 space-y-5">
        <ErrorBanner message={error} />

        {!data && !error && !loading && (
          <div className="p-8 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            Upload a file and click Process to see results for {tool.name}.
          </div>
        )}

        {data && toolSlug === 'pdf-to-markdown' && (
          <ResultCard
            title="Markdown Output"
            actions={
              <>
                <CopyButton text={data.markdown} label="Copy Markdown" />
                <DownloadButton
                  text={data.markdown || ''}
                  mimeType="text/markdown"
                  filename="converted.md"
                  label="Download .md"
                />
              </>
            }
          >
            <p className="text-[10px] text-slate-500 mb-2">{data.pageCount} page(s)</p>
            <pre className="text-xs whitespace-pre-wrap max-h-[480px] overflow-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              {data.markdown}
            </pre>
          </ResultCard>
        )}

        {data && toolSlug === 'pdf-table-extractor' && (
          <ResultCard
            title={`Tables Found (${data.tables?.length || 0})`}
            actions={
              <>
                <CopyButton text={tableCsv} label="Copy CSV" />
                {data.excel && (
                  <DownloadButton
                    base64={data.excel.base64}
                    mimeType={data.excel.mimeType}
                    filename={data.excel.filename || 'tables.xlsx'}
                    label="Download Excel"
                  />
                )}
                {data.json && (
                  <CopyButton text={JSON.stringify(data.tables, null, 2)} label="Copy JSON" />
                )}
              </>
            }
          >
            {(data.tables || []).length === 0 && (
              <p className="text-xs text-slate-500">No clear table structures detected. Try a PDF with grid-like text.</p>
            )}
            {(data.tables || []).slice(0, 5).map((t, idx) => (
              <div key={idx} className="overflow-auto mb-4">
                <p className="text-[10px] font-bold text-slate-400 mb-1">Page {t.page} · Table {idx + 1}</p>
                <table className="min-w-full text-[11px] border-collapse">
                  <tbody>
                    {(t.rows || []).slice(0, 12).map((row, r) => (
                      <tr key={r} className="border-b border-slate-100 dark:border-slate-800">
                        {row.map((cell, c) => (
                          <td key={c} className="px-2 py-1 text-slate-700 dark:text-slate-300">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </ResultCard>
        )}

        {data && toolSlug === 'pdf-link-extractor' && (
          <ResultCard
            title={`Links Extracted (${data.count ?? data.links?.length ?? 0})`}
            actions={
              <>
                <CopyButton
                  text={(data.links || []).map((l) => `${l.type},${l.value}`).join('\n')}
                  label="Copy CSV"
                />
                {data.csv && (
                  <DownloadButton
                    base64={data.csv.base64}
                    mimeType={data.csv.mimeType || 'text/csv'}
                    filename={data.csv.filename || 'links.csv'}
                  />
                )}
              </>
            }
          >
            <ul className="space-y-1.5 max-h-[420px] overflow-auto">
              {(data.links || []).map((l, i) => (
                <li key={i} className="text-xs flex gap-2">
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                    {l.type}
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 break-all">{l.value}</span>
                </li>
              ))}
            </ul>
          </ResultCard>
        )}

        {data && toolSlug === 'pdf-metadata-viewer' && (
          <ResultCard title="PDF Metadata">
            <dl className="grid sm:grid-cols-2 gap-3">
              {Object.entries(data).map(([k, v]) => {
                if (typeof v === 'object' && v !== null) {
                  return (
                    <div key={k} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 sm:col-span-2">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</dt>
                      <dd className="text-xs font-semibold text-slate-800 dark:text-slate-200 break-all">{JSON.stringify(v)}</dd>
                    </div>
                  );
                }
                return (
                  <div key={k} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</dt>
                    <dd className="text-xs font-semibold text-slate-800 dark:text-slate-200 break-all">
                      {v == null || v === '' ? '—' : String(v)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </ResultCard>
        )}

        {data && toolSlug === 'pdf-image-extractor' && (
          <ResultCard
            title={`Images (${data.count ?? data.images?.length ?? 0})`}
            actions={
              data.zip ? (
                <DownloadButton
                  base64={data.zip.base64}
                  mimeType={data.zip.mimeType || 'application/zip'}
                  filename={data.zip.filename || 'pdf-images.zip'}
                  label="Download ZIP"
                />
              ) : null
            }
          >
            {(data.note || data.message) && (
              <p className="text-[11px] text-slate-500 mb-3">{data.note || data.message}</p>
            )}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {(data.images || []).map((img, i) => (
                <div key={i} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:${img.mimeType || 'image/png'};base64,${img.base64}`}
                    alt={img.name || `image-${i}`}
                    className="w-full h-32 object-contain rounded-xl bg-slate-50 dark:bg-slate-950"
                  />
                  <DownloadButton
                    base64={img.base64}
                    mimeType={img.mimeType}
                    filename={img.name || `image-${i + 1}.png`}
                    label="Download"
                  />
                </div>
              ))}
            </div>
          </ResultCard>
        )}

        {data && toolSlug === 'excel-to-json' && (
          <ResultCard
            title="JSON Output"
            actions={<CopyButton text={JSON.stringify(data.rows || data, null, 2)} label="Copy JSON" />}
          >
            {data.sheets && (
              <p className="text-[10px] text-slate-500">Sheets: {(data.sheets || []).join(', ')} · Active: {data.activeSheet}</p>
            )}
            <pre className="text-xs whitespace-pre-wrap max-h-[480px] overflow-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              {JSON.stringify(data.rows || data.preview || data, null, 2)}
            </pre>
          </ResultCard>
        )}

        {data && (toolSlug === 'json-to-excel' || toolSlug === 'csv-to-excel') && (
          <ResultCard
            title="Excel Ready"
            actions={
              <DownloadButton
                base64={data.base64}
                mimeType={data.mimeType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                filename={data.filename || 'converted.xlsx'}
                label="Download XLSX"
              />
            }
          >
            {data.previewRows && (
              <pre className="text-xs whitespace-pre-wrap max-h-[240px] overflow-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950">
                {JSON.stringify(data.previewRows.slice?.(0, 8) || data.previewRows, null, 2)}
              </pre>
            )}
            <p className="text-xs text-slate-500">Your workbook is ready to download.</p>
          </ResultCard>
        )}

        {data && toolSlug === 'image-metadata-viewer' && (
          <ResultCard title="Image Metadata">
            <dl className="grid sm:grid-cols-2 gap-3">
              {Object.entries(data).map(([k, v]) => {
                if (k === 'rawExif') return null;
                if (typeof v === 'object' && v !== null) {
                  return (
                    <div key={k} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800 sm:col-span-2">
                      <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</dt>
                      <dd className="text-xs font-semibold text-slate-800 dark:text-slate-200 break-all">
                        {JSON.stringify(v)}
                      </dd>
                    </div>
                  );
                }
                return (
                  <div key={k} className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <dt className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{k}</dt>
                    <dd className="text-xs font-semibold text-slate-800 dark:text-slate-200 break-all">
                      {v == null || v === '' ? '—' : String(v)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </ResultCard>
        )}

        {data && toolSlug === 'exif-metadata-remover' && (
          <ResultCard
            title="Cleaned Image"
            actions={
              <DownloadButton
                base64={data.base64}
                mimeType={data.mimeType || 'image/jpeg'}
                filename={data.filename || 'cleaned.jpg'}
              />
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`data:${data.mimeType || 'image/jpeg'};base64,${data.base64}`}
              alt="Cleaned preview"
              className="max-h-80 rounded-2xl border border-slate-200 dark:border-slate-800"
            />
            <p className="text-[11px] text-slate-500">EXIF and other metadata stripped. Visual quality preserved.</p>
          </ResultCard>
        )}

        {data && toolSlug === 'image-color-palette' && (
          <ResultCard
            title="Color Palette"
            actions={
              <CopyButton
                text={(data.colors || []).map((c) => c.hex).join('\n')}
                label="Copy HEX"
              />
            }
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {(data.colors || []).map((c, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <div
                    className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0"
                    style={{ background: c.hex }}
                  />
                  <div className="text-xs space-y-0.5 min-w-0">
                    <p className="font-bold">{c.name}: {c.hex}</p>
                    <p className="text-slate-500">
                      RGB {c.rgb?.r}, {c.rgb?.g}, {c.rgb?.b}
                    </p>
                    <p className="text-sky-600 dark:text-sky-400">{c.tailwind}</p>
                  </div>
                </div>
              ))}
            </div>
            {data.cssVars && (
              <pre className="text-[11px] mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 overflow-auto">
                {Object.entries(data.cssVars)
                  .map(([k, v]) => `${k}: ${v};`)
                  .join('\n')}
              </pre>
            )}
          </ResultCard>
        )}

        {data && toolSlug === 'social-image-resizer' && (
          <ResultCard
            title="Social Sizes"
            actions={
              data.zip ? (
                <DownloadButton
                  base64={data.zip.base64}
                  mimeType={data.zip.mimeType || 'application/zip'}
                  filename={data.zip.filename || 'social-sizes.zip'}
                  label="Download All ZIP"
                />
              ) : null
            }
          >
            <div className="grid sm:grid-cols-2 gap-3">
              {(data.variants || []).map((v) => (
                <div key={v.platform} className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <p className="text-xs font-bold">{v.platform} · {v.width}×{v.height}</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:${v.mimeType || 'image/jpeg'};base64,${v.base64}`}
                    alt={v.platform}
                    className="w-full h-36 object-cover rounded-xl"
                  />
                  <DownloadButton
                    base64={v.base64}
                    mimeType={v.mimeType}
                    filename={`${v.platform.replace(/\s+/g, '-').toLowerCase()}.jpg`}
                  />
                </div>
              ))}
            </div>
          </ResultCard>
        )}

        {data && toolSlug === 'screenshot-to-text' && (
          <ResultCard
            title="OCR Text"
            actions={
              <>
                <CopyButton text={data.text} label="Copy Text" />
                <DownloadButton text={data.text || ''} mimeType="text/plain" filename="ocr.txt" label="Download TXT" />
                <DownloadButton text={data.markdown || data.text || ''} mimeType="text/markdown" filename="ocr.md" label="Download MD" />
              </>
            }
          >
            {data.confidence != null && (
              <p className="text-[10px] text-slate-500">Confidence ~{Math.round(data.confidence)}%</p>
            )}
            <pre className="text-xs whitespace-pre-wrap max-h-[480px] overflow-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
              {data.text || 'No text detected.'}
            </pre>
          </ResultCard>
        )}

        <NextSteps links={NEXT[toolSlug] || []} />
      </div>
    </div>
  );
}
