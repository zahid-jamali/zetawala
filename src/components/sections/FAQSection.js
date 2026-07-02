"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

const seoFaqs = [
  {
    q: "ZetaWala kya hai aur yeh hamari digital growth me kaise help karta hai?",
    a: "ZetaWala ek advanced digital multi-utility platform hai jo YouTube automation aur e-commerce workflows (jaise Daraz) ko ease aur precision pr faraham karta hai taake aap automated tarike se scalable income sources build kar sakein.",
  },
  {
    q: "Daraz Product Hunting tool baqi standard tools se kaise different hai?",
    a: "Daraz API systems se block rehta hai, lekin ZetaWala ka model advanced market validation parameters, localized Urdu-English search trends, aur accurate profit margin tracking calculations generate karke absolute winning products highlight karta hai.",
  },
  {
    q: "Kya mujhe poora YouTube script ek hi click me milega?",
    a: "Nahi, hamare user engagement analysis ke mutabiq aap step-by-step pipeline use karenge. Pehle Niche se Ideas generate honge, phir Title, Hook, Tags, Description aur Script individual modules ke through high-retention structured format me tayar honge.",
  },
  {
    q: "Is the platform mobile friendly?",
    a: "Yes, ZetaWala’s complete application layout is optimized with extreme responsive Tailwind CSS configurations, giving you access to all tool packages across mobile viewports, tablets, and desktop systems flawlessly.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-850 py-20 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Semantic Title Header */}
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Find answers to commonly asked questions about ZetaWala features and
            capabilities.
          </p>
        </div>

        {/* Semantic Accordion Grid (Google Crawler indexable details/summary tags) */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm divide-y divide-slate-200 dark:divide-slate-800">
          {seoFaqs.map((faq, idx) => (
            <details key={idx} className="group transition-all">
              <summary className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-white cursor-pointer list-none focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-800/45 select-none [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform duration-200 shrink-0" />
              </summary>
              <div className="px-6 pb-6 pt-1 animate-slide-down">
                <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-350 leading-relaxed font-medium">
                  {faq.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
