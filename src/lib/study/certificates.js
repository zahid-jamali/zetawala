'use client';

import { jsPDF } from 'jspdf';

/**
 * Reusable certificate PDF for typing tools.
 */
export function downloadCertificate({
  title = 'Certificate of Achievement',
  name = 'Learner',
  subtitle = 'Zetawala Typing',
  stats = {},
  filename = 'zetawala-certificate.pdf',
}) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, w, h, 'F');
  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(3);
  doc.rect(28, 28, w - 56, h - 56);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(15, 23, 42);
  doc.text(title, w / 2, 110, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(14);
  doc.setTextColor(100, 116, 139);
  doc.text(subtitle, w / 2, 140, { align: 'center' });

  doc.setFontSize(16);
  doc.setTextColor(51, 65, 85);
  doc.text('This certifies that', w / 2, 190, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  doc.setTextColor(2, 132, 199);
  doc.text(String(name || 'Learner'), w / 2, 230, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(13);
  doc.setTextColor(71, 85, 105);
  const lines = Object.entries(stats)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${k}: ${v}`);
  let y = 280;
  lines.forEach((line) => {
    doc.text(line, w / 2, y, { align: 'center' });
    y += 22;
  });

  doc.setFontSize(11);
  doc.setTextColor(148, 163, 184);
  doc.text(`Issued ${new Date().toLocaleDateString()} · zetawala.com`, w / 2, h - 60, { align: 'center' });
  doc.text('Verification placeholder: local certificate · no external QR required', w / 2, h - 42, { align: 'center' });

  doc.save(filename);
}

export function downloadTextAsPdf(title, body, filename = 'study-notes.pdf') {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const margin = 48;
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxWidth = pageWidth - margin * 2;
  let y = margin;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(title || 'Study Notes', margin, y);
  y += 28;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const lines = doc.splitTextToSize(String(body || ''), maxWidth);
  lines.forEach((line) => {
    if (y > doc.internal.pageSize.getHeight() - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 16;
  });
  doc.save(filename);
}

export function downloadDocxLike(filename, title, body) {
  // Lightweight Word-compatible HTML download (opens in Word / Docs)
  const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${escapeHtml(title)}</title></head><body><h1>${escapeHtml(title)}</h1><pre style="white-space:pre-wrap;font-family:Calibri,Arial,sans-serif;font-size:12pt;">${escapeHtml(body)}</pre></body></html>`;
  const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
