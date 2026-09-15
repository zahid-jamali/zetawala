'use client';

import React from 'react';
import { DollarSign, Percent, TrendingUp, AlertCircle } from 'lucide-react';

export default function DarazCalculatorResults({
  sellingPrice,
  costPrice,
  commission,
  paymentFee,
  shippingFee,
  handlingFee,
  vat,
  campaignFees,
  additionalCosts,
  penalties,
  totalExpenses,
  totalDarazFees,
  netPayout,
  profit,
  roi,
  profitMargin,
  validations
}) {
  const cardStyle = (val) => {
    if (val > 0) return "bg-emerald-50/50 dark:bg-emerald-950/15 border-emerald-100 dark:border-emerald-900/35 text-emerald-800 dark:text-emerald-400";
    if (val === 0) return "bg-amber-50/50 dark:bg-amber-950/15 border-amber-100 dark:border-amber-900/35 text-amber-800 dark:text-amber-400";
    return "bg-rose-50/50 dark:bg-rose-955/15 border-rose-100 dark:border-rose-900/35 text-rose-800 dark:text-rose-400";
  };

  const labelCl = "text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider block";
  
  const formatCurrency = (val) => `Rs ${Math.round(val).toLocaleString()}`;
  const formatPercent = (val) => `${val.toFixed(2)}%`;

  return (
    <div className="space-y-6">
      
      {/* 1. Dynamic Validations/Warnings Banner */}
      {validations.length > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900/30 rounded-2xl space-y-1.5">
          {validations.map((v, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-amber-800 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6 shadow-sm">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest block">
            Real-Time Financial Dashboard
          </span>
        </div>

        {/* Core Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850">
            <span className={labelCl}>Net Payout</span>
            <p className="text-sm sm:text-base font-extrabold mt-1 text-slate-900 dark:text-white">{formatCurrency(netPayout)}</p>
          </div>
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850">
            <span className={labelCl}>Total Daraz Fees</span>
            <p className="text-sm sm:text-base font-extrabold mt-1 text-slate-900 dark:text-white">{formatCurrency(totalDarazFees)}</p>
          </div>
        </div>

        {/* ROI and Profit Margin */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div className={`p-3.5 sm:p-4 rounded-2xl border ${cardStyle(profit)}`}>
            <span className="text-[9px] font-bold uppercase tracking-wider block opacity-75">ROI (%)</span>
            <p className="text-sm sm:text-base font-extrabold mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {formatPercent(roi)}
            </p>
          </div>
          <div className={`p-3.5 sm:p-4 rounded-2xl border ${cardStyle(profit)}`}>
            <span className="text-[9px] font-bold uppercase tracking-wider block opacity-75">Profit Margin</span>
            <p className="text-sm sm:text-base font-extrabold mt-1 flex items-center gap-1">
              <Percent className="w-3.5 h-3.5" />
              {formatPercent(profitMargin)}
            </p>
          </div>
        </div>

        {/* Net Profit Card */}
        <div className={`p-4 sm:p-5 rounded-2xl border ${cardStyle(profit)} flex items-center justify-between`}>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-75">Estimated Net Profit</span>
            <p className="text-xl sm:text-2xl font-black mt-1">{formatCurrency(profit)}</p>
          </div>
          <div className="p-2 sm:p-2.5 bg-white/20 dark:bg-black/10 rounded-xl">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Cost Breakdown Details */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Cost Breakdown Report</span>
          
          <div className="space-y-2 text-xs font-semibold">
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Retail Selling Price</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(sellingPrice)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Product Cost Price</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(costPrice)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Category Commission</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(commission)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Payment Fee (2.25%)</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(paymentFee)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Shipping Fee</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(shippingFee)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Handling Fee</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(handlingFee)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">VAT (Provincial Tax)</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(vat)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Campaign Enrollment Fees</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(campaignFees)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Additional Costs</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(additionalCosts)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-850">
              <span className="text-slate-500">Optional Penalties</span>
              <span className="text-slate-900 dark:text-white">{formatCurrency(penalties)}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 font-bold">
              <span>Total Expenses</span>
              <span>{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
