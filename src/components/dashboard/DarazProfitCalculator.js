'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Sparkles, Calculator, Check, AlertTriangle, HelpCircle, DollarSign, ArrowUpRight, TrendingUp } from 'lucide-react';
import categoriesData from '../../config/darazCategories.json';
import shippingData from '../../config/darazShipping.json';
import handlingData from '../../config/darazHandling.json';

export default function DarazProfitCalculator() {
  // Input States
  const [sellingPrice, setSellingPrice] = useState(1500);
  const [purchaseCost, setPurchaseCost] = useState(600);
  const [packaging, setPackaging] = useState(30);
  const [branding, setBranding] = useState(15);
  const [bubbleWrap, setBubbleWrap] = useState(10);
  const [sticker, setSticker] = useState(5);
  const [box, setBox] = useState(25);
  const [otherExpenses, setOtherExpenses] = useState(0);
  const [ads, setAds] = useState(50);
  const [labour, setLabour] = useState(20);
  const [hubDelivery, setHubDelivery] = useState(15);

  // Settings States
  const [fulfillment, setFulfillment] = useState('FBM'); // 'FBM' or 'FBD'
  const [category, setCategory] = useState(categoriesData[0].name);
  const [commissionRate, setCommissionRate] = useState(categoriesData[0].commission);
  const [paymentFeeRate, setPaymentFeeRate] = useState(2.25);
  const [province, setProvince] = useState('Punjab');
  const [vatRate, setVatRate] = useState(0.16);

  // Shipping States
  const [weight, setWeight] = useState('0.5');
  const [zone, setZone] = useState('Zone 1');
  const [deliveryType, setDeliveryType] = useState('Door To Door');
  const [shippingMode, setShippingMode] = useState('Automatic');
  const [manualShipping, setManualShipping] = useState(160);

  // Handling States
  const [handlingMode, setHandlingMode] = useState('Drop Off');

  // FBD States
  const [pickPackFee, setPickPackFee] = useState(60);
  const [storageFee, setStorageFee] = useState(10);

  // Optional Programs & Penalties
  const [voucherOn, setVoucherOn] = useState(false);
  const [voucherRate, setVoucherRate] = useState(1.5);
  const [fsmOn, setFsmOn] = useState(false);
  const [fsmRate, setFsmRate] = useState(4.5);
  const [penalty, setPenalty] = useState(0);

  // AI Advisor States
  const [aiReport, setAiReport] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);

  // Sync Category Commission
  const handleCategoryChange = (e) => {
    const catName = e.target.value;
    setCategory(catName);
    const catObj = categoriesData.find(c => c.name === catName);
    if (catObj) setCommissionRate(catObj.commission);
  };

  // Sync Province VAT
  const handleProvinceChange = (e) => {
    const provName = e.target.value;
    setProvince(provName);
    setVatRate(provName === 'Punjab' ? 0.16 : 0.15);
  };

  // Perform Calculations
  const calculatedCommission = (sellingPrice * commissionRate) / 100;
  const calculatedPaymentFee = (sellingPrice * paymentFeeRate) / 100;
  const calculatedVoucherFee = voucherOn ? (sellingPrice * voucherRate) / 100 : 0;
  const calculatedFsmFee = fsmOn ? (sellingPrice * fsmRate) / 100 : 0;

  // Auto Shipping Calculation
  let calculatedShipping = 0;
  if (shippingMode === 'Automatic') {
    const zoneData = shippingData.zones[zone];
    if (zoneData && zoneData[weight]) {
      calculatedShipping = zoneData[weight];
    }
    if (deliveryType === 'Collection Point') {
      calculatedShipping = Math.max(0, calculatedShipping - shippingData.collectionPointDiscount);
    }
  } else {
    calculatedShipping = Number(manualShipping);
  }

  // Auto Handling Calculation
  let calculatedHandling = 0;
  if (handlingMode === 'Drop Off') {
    const tier = handlingData.dropoff.tiers.find(t => sellingPrice <= t.maxPrice);
    calculatedHandling = tier ? tier.fee : 50;
  } else {
    const wtNum = parseFloat(weight);
    const tier = handlingData.pickup.tiers.find(t => wtNum <= t.maxWeight);
    calculatedHandling = tier ? tier.fee : 85;
  }

  const calculatedPickPack = fulfillment === 'FBD' ? Number(pickPackFee) : 0;
  const calculatedStorage = fulfillment === 'FBD' ? Number(storageFee) : 0;

  // VAT applies only on Daraz services
  const totalServiceFees = calculatedCommission + calculatedPaymentFee + calculatedShipping + calculatedHandling + calculatedVoucherFee + calculatedFsmFee + calculatedPickPack;
  const calculatedVat = totalServiceFees * vatRate;

  const totalDarazFees = calculatedCommission + calculatedPaymentFee + calculatedVat + calculatedShipping + calculatedHandling + calculatedVoucherFee + calculatedFsmFee + calculatedPickPack + calculatedStorage + Number(penalty);
  
  const totalProductCost = Number(purchaseCost) + Number(packaging) + Number(branding) + Number(bubbleWrap) + Number(sticker) + Number(box) + Number(ads) + Number(labour) + Number(hubDelivery) + Number(otherExpenses);
  
  const grandTotalCost = totalProductCost + totalDarazFees;
  const netProfit = sellingPrice - grandTotalCost;
  
  const profitMargin = sellingPrice > 0 ? (netProfit / sellingPrice) * 100 : 0;
  const roi = purchaseCost > 0 ? (netProfit / purchaseCost) * 100 : 0;

  // AI Advice Call
  const handleAskAI = async () => {
    setAiLoading(true);
    setAiReport(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'profit-calculator',
          payload: {
            sourceCost: purchaseCost,
            sellingPrice,
            commissionRate
          }
        })
      });
      const json = await res.json();
      if (json.success && json.data.results) {
        setAiReport(json.data.results[0].content);
      } else {
        setAiReport("Unable to fetch strategy suggestions at this moment.");
      }
    } catch (e) {
      setAiReport("Network error when communicating with AI advisor.");
    } finally {
      setAiLoading(false);
    }
  };

  const cardStyle = (val) => {
    if (val > 0) return "bg-emerald-50/50 dark:bg-emerald-950/15 border-emerald-100 dark:border-emerald-900/35 text-emerald-800 dark:text-emerald-400";
    if (val === 0) return "bg-amber-50/50 dark:bg-amber-950/15 border-amber-100 dark:border-amber-900/35 text-amber-800 dark:text-amber-400";
    return "bg-rose-50/50 dark:bg-rose-955/15 border-rose-100 dark:border-rose-900/35 text-rose-800 dark:text-rose-400";
  };

  const inputCl = "w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";
  const labelCl = "text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider block";

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8 text-slate-900 dark:text-slate-100">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-500" />
            Daraz Premium Profit Analyzer
          </h1>
          <p className="text-xs text-slate-500 mt-1">Interactive SaaS spreadsheet modeling real-time local Pakistan marketplace costs & commissions.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Interactive Input Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
            
            {/* 1. SELLING INFORMATION */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800 pb-1.5">
                1. Selling Information
              </span>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Retail Selling Price (PKR) *</label>
                  <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Sourcing / Purchase Cost (PKR) *</label>
                  <input type="number" value={purchaseCost} onChange={(e) => setPurchaseCost(Number(e.target.value))} className={inputCl} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Packaging flyer</label>
                  <input type="number" value={packaging} onChange={(e) => setPackaging(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Branding / Tag</label>
                  <input type="number" value={branding} onChange={(e) => setBranding(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Bubble wrap</label>
                  <input type="number" value={bubbleWrap} onChange={(e) => setBubbleWrap(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Sticker logo</label>
                  <input type="number" value={sticker} onChange={(e) => setSticker(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Product Box</label>
                  <input type="number" value={box} onChange={(e) => setBox(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Ad budget / Sale</label>
                  <input type="number" value={ads} onChange={(e) => setAds(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Labour cost</label>
                  <input type="number" value={labour} onChange={(e) => setLabour(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Delivery to Hub</label>
                  <input type="number" value={hubDelivery} onChange={(e) => setHubDelivery(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Other expenses</label>
                  <input type="number" value={otherExpenses} onChange={(e) => setOtherExpenses(Number(e.target.value))} className={inputCl} />
                </div>
              </div>
            </div>

            {/* 2. DARAZ LOGISTICS & CONFIGS */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800 pb-1.5">
                2. Logistics & Marketplace Settings
              </span>
              
              <div className="grid grid-cols-2 gap-6">
                {/* Fulfillment Model */}
                <div className="space-y-2">
                  <label className={labelCl}>Fulfillment Model</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input type="radio" checked={fulfillment === 'FBM'} onChange={() => setFulfillment('FBM')} className="text-sky-500 focus:ring-0" />
                      FBM (Merchant)
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                      <input type="radio" checked={fulfillment === 'FBD'} onChange={() => setFulfillment('FBD')} className="text-sky-500 focus:ring-0" />
                      FBD (Fulfilled by Daraz)
                    </label>
                  </div>
                </div>

                {/* Province Selector */}
                <div className="space-y-1.5">
                  <label className={labelCl}>Seller Warehouse Province</label>
                  <select value={province} onChange={handleProvinceChange} className={inputCl}>
                    <option value="Punjab">Punjab (16% services tax)</option>
                    <option value="Sindh">Sindh (15% services tax)</option>
                    <option value="KPK">KPK (15% services tax)</option>
                    <option value="Balochistan">Balochistan (15% services tax)</option>
                  </select>
                </div>
              </div>

              {/* Commission Category & Fee details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Category</label>
                  <select value={category} onChange={handleCategoryChange} className={inputCl}>
                    {categoriesData.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Commission (%)</label>
                  <input type="number" value={commissionRate} onChange={(e) => setCommissionRate(Number(e.target.value))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Payment Fee (%)</label>
                  <input type="number" step="0.01" value={paymentFeeRate} onChange={(e) => setPaymentFeeRate(Number(e.target.value))} className={inputCl} />
                </div>
              </div>
            </div>

            {/* 3. SHIPPING & HANDLING DETAILS */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-800 pb-1.5">
                3. Shipping & Handling
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Shipping Estimation Mode</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input type="radio" checked={shippingMode === 'Automatic'} onChange={() => setShippingMode('Automatic')} />
                      Auto (JSON Matrix)
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input type="radio" checked={shippingMode === 'Manual'} onChange={() => setShippingMode('Manual')} />
                      Manual Override
                    </label>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelCl}>Handling Mode</label>
                  <div className="flex gap-4 mt-1">
                    <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input type="radio" checked={handlingMode === 'Drop Off'} onChange={() => setHandlingMode('Drop Off')} />
                      Drop Off
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-medium cursor-pointer">
                      <input type="radio" checked={handlingMode === 'Pickup'} onChange={() => setHandlingMode('Pickup')} />
                      Pickup
                    </label>
                  </div>
                </div>
              </div>

              {shippingMode === 'Automatic' ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className={labelCl}>Product Weight</label>
                    <select value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCl}>
                      {Object.keys(shippingData.zones['Zone 1']).map(w => <option key={w} value={w}>{w} kg</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCl}>Shipping Zone</label>
                    <select value={zone} onChange={(e) => setZone(e.target.value)} className={inputCl}>
                      {Object.keys(shippingData.zones).map(z => <option key={z} value={z}>{z}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className={labelCl}>Delivery Type</label>
                    <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className={inputCl}>
                      <option value="Door To Door">Door To Door</option>
                      <option value="Collection Point">Collection Point (Discounted)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className={labelCl}>Manual Shipping Fee (PKR)</label>
                  <input type="number" value={manualShipping} onChange={(e) => setManualShipping(Number(e.target.value))} className={inputCl} />
                </div>
              )}
            </div>

            {/* 4. FBD & OPTIONAL PROGRAMS */}
            <div className="grid sm:grid-cols-2 gap-6 pt-2">
              
              {/* FBD Settings Panel */}
              {fulfillment === 'FBD' && (
                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl">
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">FBD Warehouse Fees</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className={labelCl}>Pick & Pack</label>
                      <input type="number" value={pickPackFee} onChange={(e) => setPickPackFee(Number(e.target.value))} className={inputCl} />
                    </div>
                    <div className="space-y-1">
                      <label className={labelCl}>Daily Storage</label>
                      <input type="number" value={storageFee} onChange={(e) => setStorageFee(Number(e.target.value))} className={inputCl} />
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Programs */}
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl col-span-1">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Campaign Programs</span>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={voucherOn} onChange={() => setVoucherOn(!voucherOn)} className="rounded border-slate-300 text-sky-500 focus:ring-0" />
                      Voucher program
                    </label>
                    {voucherOn && (
                      <input type="number" step="0.1" max="2" value={voucherRate} onChange={(e) => setVoucherRate(Math.min(2, Number(e.target.value)))} className="w-16 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-right" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={fsmOn} onChange={() => setFsmOn(!fsmOn)} className="rounded border-slate-300 text-sky-500 focus:ring-0" />
                      Free Shipping (FSM)
                    </label>
                    {fsmOn && (
                      <input type="number" step="0.1" max="6.9" value={fsmRate} onChange={(e) => setFsmRate(Math.min(6.9, Number(e.target.value)))} className="w-16 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-right" />
                    )}
                  </div>
                </div>
              </div>

              {/* Penalties Panel */}
              <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-800 rounded-2xl">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Operational Penalties</span>
                <div className="space-y-1">
                  <label className={labelCl}>Account Penalties (PKR)</label>
                  <input type="number" value={penalty} onChange={(e) => setPenalty(Number(e.target.value))} className={inputCl} />
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Right Financial Breakdown & Premium ROI Cards */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm flex flex-col h-full">
            
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-widest block">
                Live Financial Summary
              </span>
            </div>

            {/* Results Grid - SaaS Cards */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className={labelCl}>Selling Price</span>
                <p className="text-lg font-extrabold mt-1 text-slate-900 dark:text-white">PKR {sellingPrice.toLocaleString()}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className={labelCl}>Product Landed Cost</span>
                <p className="text-lg font-extrabold mt-1 text-slate-900 dark:text-white">PKR {totalProductCost.toFixed(0)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className={labelCl}>Total Daraz Fees</span>
                <p className="text-lg font-extrabold mt-1 text-slate-900 dark:text-white">PKR {totalDarazFees.toFixed(0)}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className={labelCl}>Grand Total Cost</span>
                <p className="text-lg font-extrabold mt-1 text-slate-900 dark:text-white">PKR {grandTotalCost.toFixed(0)}</p>
              </div>

            </div>

            {/* Net Profit, Margin & ROI - Color Coded Premium Cards */}
            <div className="space-y-4">
              
              <div className={`p-5 rounded-2xl border ${cardStyle(netProfit)} flex items-center justify-between`}>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">Net Earnings</span>
                  <p className="text-2xl font-black mt-1">PKR {netProfit.toFixed(0)}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-xl">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border ${cardStyle(netProfit)}`}>
                  <span className="text-[9px] font-bold uppercase tracking-wider block opacity-70">Profit Margin</span>
                  <p className="text-lg font-extrabold mt-1">{profitMargin.toFixed(1)}%</p>
                </div>

                <div className={`p-4 rounded-2xl border ${cardStyle(netProfit)}`}>
                  <span className="text-[9px] font-bold uppercase tracking-wider block opacity-70">Return on Inv (ROI)</span>
                  <p className="text-lg font-extrabold mt-1">{roi.toFixed(1)}%</p>
                </div>
              </div>

            </div>

            {/* AI Advisor Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex-1 flex flex-col justify-end">
              <button
                type="button"
                onClick={handleAskAI}
                disabled={aiLoading}
                className="w-full py-3.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 disabled:opacity-50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-sm border border-transparent dark:border-slate-200 transition-all"
              >
                {aiLoading ? "Consulting AI Advisors..." : "Generate AI SEO & Sourcing Strategy Report"}
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* AI Advice Report Modal/Overlay */}
      {aiReport && (
        <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl relative">
          <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
            <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              AI Advisory Report - Listing & Profit Strategy
            </span>
            <button onClick={() => setAiReport(null)} className="text-xs font-bold text-slate-400 hover:text-slate-850 dark:hover:text-white cursor-pointer">Close</button>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-250 leading-relaxed whitespace-pre-wrap font-medium">{aiReport}</p>
        </div>
      )}

    </div>
  );
}
