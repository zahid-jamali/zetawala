'use client';

import React, { useState } from 'react';
import { Calculator, Search } from 'lucide-react';
import { 
  darazCalculatorConfig, 
  getFbmItemHandlingFee, 
  getFbmPickupFee 
} from '../../config/darazCalculatorConfig';
import DarazCalculatorResults from './DarazCalculatorResults';

export default function DarazProfitCalculator() {
  // Required Inputs
  const [costPrice, setCostPrice] = useState(600);
  const [sellingPrice, setSellingPrice] = useState(1500);
  const [fulfillment, setFulfillment] = useState('FBM'); // 'FBM' | 'FBD'
  const [handlingMethod, setHandlingMethod] = useState('Drop-Off'); // 'Drop-Off' | 'Pickup'
  
  // Category Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(darazCalculatorConfig.categories[0]);
  const [showCatDropdown, setShowCatDropdown] = useState(false);

  // Shipping
  const [weight, setWeight] = useState('0.5');
  const [shippingZone, setShippingZone] = useState('Local'); // 'Local' | 'Same Province' | 'Different Province'
  const [deliveryType, setDeliveryType] = useState('Door-to-Door'); // 'Door-to-Door' | 'Collection Point'
  
  // Province & VAT
  const [province, setProvince] = useState('Punjab');
  
  // Extras
  const [additionalCosts, setAdditionalCosts] = useState(70); // Packaging + Labels + Marketing
  const [penalties, setPenalties] = useState(0);

  // Campaign Checkboxes
  const [voucherEnabled, setVoucherEnabled] = useState(false);
  const [freeShippingEnabled, setFreeShippingEnabled] = useState(false);

  // Calculation helpers
  const calculateCommission = (price, commPercent) => price * (commPercent / 100);
  const calculateCampaignFees = (price, voucher, freeShip) =>
    price * ((voucher ? darazCalculatorConfig.campaignVoucherRate : 0) + (freeShip ? darazCalculatorConfig.campaignFreeShippingRate : 0));
  const calculateHandlingFee = (mode, method, price, wt) =>
    mode === 'FBD' ? darazCalculatorConfig.fbdPickPackFee : method === 'Drop-Off' ? getFbmItemHandlingFee(price) : getFbmPickupFee(parseFloat(wt) || 0);
  const calculateShipping = (zone, wt, type) => {
    const brackets = [0.1, 0.25, 0.5, 1, 2, 3, 5, 8, 10, 15, 20];
    const parsedWt = parseFloat(wt) || 0;
    const matchedBracket = (brackets.find((b) => parsedWt <= b) || 20).toString();
    const fee = darazCalculatorConfig.shippingMatrix[zone]?.[matchedBracket] || 170;
    return type === 'Collection Point' ? Math.max(0, fee - darazCalculatorConfig.collectionPointDiscount) : fee;
  };
  const calculateVAT = (comm, payFee, shipFee, vatRate) => (comm + payFee + shipFee) * vatRate;

  // Perform Computations dynamically
  const activeCommissionRate = selectedCategory.commission;
  const commission = calculateCommission(sellingPrice, activeCommissionRate);
  const paymentFee = sellingPrice * darazCalculatorConfig.paymentFeeRate;
  const campaignFees = calculateCampaignFees(sellingPrice, voucherEnabled, freeShippingEnabled);
  const handlingFee = calculateHandlingFee(fulfillment, handlingMethod, sellingPrice, weight);
  const shippingFee = calculateShipping(shippingZone, weight, deliveryType);
  
  const activeVatRate = darazCalculatorConfig.provinceVatRates[province] || 0.15;
  const vat = calculateVAT(commission, paymentFee, shippingFee, activeVatRate);

  const totalDarazFees = commission + paymentFee + handlingFee + shippingFee + vat + campaignFees + Number(penalties);
  const netPayout = sellingPrice - totalDarazFees;
  const totalExpenses = Number(costPrice) + totalDarazFees + Number(additionalCosts);
  const profit = sellingPrice - totalExpenses;

  const roi = costPrice > 0 ? (profit / costPrice) * 100 : 0;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  // Validation messages
  const validations = [];
  if (sellingPrice <= 0) validations.push("Selling price must be greater than zero.");
  if (Number(costPrice) > sellingPrice) validations.push("Cost price cannot exceed selling price.");
  if (parseFloat(weight) < 0) validations.push("Weight cannot be negative.");

  // Filter categories by search
  const filteredCategories = darazCalculatorConfig.categories.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inputCl = "w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all";
  const labelCl = "text-[10px] font-bold text-slate-500 dark:text-slate-450 uppercase tracking-wider block";

  return (
    <div className="space-y-8 w-full max-w-full min-w-0">
      
      {/* Page Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm flex items-center justify-between w-full max-w-full min-w-0">
        <div>
          <h1 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-sky-500 shrink-0" />
            Daraz Professional Profit Calculator (2026)
          </h1>
          <p className="text-xs text-slate-500 mt-1">Deterministic frontend calculations engine mapping commission slabs, VAT rates, and weight indices.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-stretch w-full max-w-full min-w-0">
        
        {/* Left Input Pane */}
        <div className="lg:col-span-7 space-y-6 w-full max-w-full min-w-0">
          <div className="p-4 sm:p-6 bg-white dark:bg-slate-900 border border-slate-205 dark:border-slate-800 rounded-2xl sm:rounded-3xl space-y-6 shadow-sm w-full max-w-full min-w-0">
            
            {/* Section 1: Product Information */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-850 pb-1.5">
                Product Details
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Cost Price (Rs) *</label>
                  <input type="number" value={costPrice} onChange={(e) => setCostPrice(Math.max(0, Number(e.target.value)))} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Selling Price (Rs) *</label>
                  <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value)))} className={inputCl} />
                </div>
              </div>

              {/* Searchable Category Selector */}
              <div className="space-y-1.5 relative">
                <label className={labelCl}>Product Category (Search Slabs)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={showCatDropdown ? searchQuery : selectedCategory.name + ` (${selectedCategory.commission}% Comm)`}
                    onFocus={() => { setShowCatDropdown(true); setSearchQuery(''); }}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`${inputCl} pr-8`}
                    placeholder="Search category..."
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
                {showCatDropdown && (
                  <div className="absolute z-20 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg mt-1 max-h-48 overflow-y-auto">
                    {filteredCategories.map(cat => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setShowCatDropdown(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {cat.name} ({cat.commission}% Commission)
                      </button>
                    ))}
                    {filteredCategories.length === 0 && (
                      <p className="px-4 py-2 text-xs italic text-slate-400">No categories match search query.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Fulfillment & Handling */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-850 pb-1.5">
                Fulfillment & Handling Slabs
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Fulfillment Model</label>
                  <select value={fulfillment} onChange={(e) => setFulfillment(e.target.value)} className={inputCl}>
                    <option value="FBM">FBM (Fulfilled by Merchant)</option>
                    <option value="FBD">FBD (Fulfilled by Daraz)</option>
                  </select>
                </div>
                {fulfillment === 'FBM' && (
                  <div className="space-y-1.5">
                    <label className={labelCl}>Handling Method</label>
                    <select value={handlingMethod} onChange={(e) => setHandlingMethod(e.target.value)} className={inputCl}>
                      <option value="Drop-Off">Drop-Off (Fee depends on price)</option>
                      <option value="Pickup">Pickup (Fee depends on weight)</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Section 3: Shipping & Tax Slabs */}
            <div className="space-y-4">
              <span className="text-[10px] font-extrabold text-sky-500 uppercase tracking-widest block border-b border-slate-100 dark:border-slate-850 pb-1.5">
                Logistics & Provincial Tax
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Weight (kg)</label>
                  <input type="number" step="0.01" value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCl} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Shipping Zone</label>
                  <select value={shippingZone} onChange={(e) => setShippingZone(e.target.value)} className={inputCl}>
                    <option value="Local">Intra-City (Local)</option>
                    <option value="Same Province">Intra-Province (Same Province)</option>
                    <option value="Different Province">Inter-Province (Different Province)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Delivery Type</label>
                  <select value={deliveryType} onChange={(e) => setDeliveryType(e.target.value)} className={inputCl}>
                    <option value="Door-to-Door">Door-to-Door</option>
                    <option value="Collection Point">Collection Point (Discounted)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className={labelCl}>Province (VAT Rule)</label>
                  <select value={province} onChange={(e) => setProvince(e.target.value)} className={inputCl}>
                    <option value="Punjab">Punjab (16% VAT on fees)</option>
                    <option value="Sindh">Sindh (15% VAT on fees)</option>
                    <option value="KPK">KPK (15% VAT on fees)</option>
                    <option value="Balochistan">Balochistan (15% VAT on fees)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelCl}>Operational Penalties (Rs)</label>
                  <input type="number" value={penalties} onChange={(e) => setPenalties(Math.max(0, Number(e.target.value)))} className={inputCl} />
                </div>
              </div>
            </div>

            {/* Section 4: Campaigns & Extra Overhead */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-3">
                <span className={labelCl}>Campaign Enrollment Slabs</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                    <input type="checkbox" checked={voucherEnabled} onChange={() => setVoucherEnabled(!voucherEnabled)} className="rounded text-sky-500 focus:ring-0" />
                    Voucher Program (2% Max fee)
                  </label>
                  <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
                    <input type="checkbox" checked={freeShippingEnabled} onChange={() => setFreeShippingEnabled(!freeShippingEnabled)} className="rounded text-sky-500 focus:ring-0" />
                    Free Shipping Program (6.9% Max fee)
                  </label>
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-800 rounded-2xl space-y-3">
                <span className={labelCl}>Additional Expenses (Rs)</span>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400">Packaging, Labels, Ads, etc.</label>
                  <input type="number" value={additionalCosts} onChange={(e) => setAdditionalCosts(Math.max(0, Number(e.target.value)))} className={inputCl} />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Cost Summary Results Dashboard Column */}
        <div className="lg:col-span-5 w-full max-w-full min-w-0">
          <DarazCalculatorResults
            sellingPrice={sellingPrice}
            costPrice={costPrice}
            commission={commission}
            paymentFee={paymentFee}
            shippingFee={shippingFee}
            handlingFee={handlingFee}
            vat={vat}
            campaignFees={campaignFees}
            additionalCosts={additionalCosts}
            penalties={penalties}
            totalExpenses={totalExpenses}
            totalDarazFees={totalDarazFees}
            netPayout={netPayout}
            profit={profit}
            roi={roi}
            profitMargin={profitMargin}
            validations={validations}
          />
        </div>

      </div>

    </div>
  );
}
