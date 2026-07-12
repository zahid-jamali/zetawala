export const darazCalculatorConfig = {
  paymentFeeRate: 0.0225, // 2.25% fixed
  fbdPickPackFee: 60, // Rs 60
  campaignVoucherRate: 0.02, // 2%
  campaignFreeShippingRate: 0.069, // 6.9%
  collectionPointDiscount: 30, // Rs 30 off shipping

  provinceVatRates: {
    Punjab: 0.16, // 16%
    Sindh: 0.15, // 15%
    KPK: 0.15, // 15%
    Balochistan: 0.15 // 15%
  },

  categories: [
    { name: "Fashion", commission: 15 },
    { name: "Beauty", commission: 12 },
    { name: "Electronics", commission: 8 },
    { name: "Mobiles", commission: 5 },
    { name: "Home & Living", commission: 10 },
    { name: "Kitchen", commission: 10 },
    { name: "Sports", commission: 12 },
    { name: "Automotive", commission: 8 },
    { name: "Groceries", commission: 7 },
    { name: "Books", commission: 6 },
    { name: "Pet Supplies", commission: 10 },
    { name: "Health", commission: 10 },
    { name: "Kids", commission: 12 },
    { name: "Furniture", commission: 15 }
  ],

  // Shipping Matrix mapping weight classes to logistics zones in PKR
  shippingMatrix: {
    "Local": { "0.1": 135, "0.25": 145, "0.5": 160, "1": 195, "2": 260, "3": 320, "5": 450, "8": 680, "10": 820, "15": 1200, "20": 1600 },
    "Same Province": { "0.1": 150, "0.25": 170, "0.5": 195, "1": 240, "2": 320, "3": 400, "5": 580, "8": 850, "10": 1020, "15": 1480, "20": 1950 },
    "Different Province": { "0.1": 170, "0.25": 195, "0.5": 230, "1": 290, "2": 390, "3": 490, "5": 710, "8": 1050, "10": 1250, "15": 1800, "20": 2350 }
  }
};

// Helper to determine FBM item handling fee based on retail selling price
export const getFbmItemHandlingFee = (price) => {
  if (price < 500) return 10;
  if (price < 1500) return 20;
  if (price < 3000) return 40;
  return 60; // Max Rs 60
};

// Helper to determine FBM pickup fee based on weight (kg)
export const getFbmPickupFee = (weight) => {
  if (weight <= 0.25) return 30;
  if (weight <= 1) return 60;
  if (weight <= 5) return 100;
  return 200; // Max Rs 200
};
