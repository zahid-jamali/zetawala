import mongoose from 'mongoose';

const ProductHuntSchema = new mongoose.Schema({
  query: {
    type: String,
    required: [true, 'Query seed is required'],
    trim: true,
  },
  marketDemandScore: {
    type: Number,
    required: [true, 'Market demand score is required'],
  },
  competitionLevel: {
    type: String,
    required: [true, 'Competition level is required'],
    enum: ['Low', 'Medium', 'High'],
  },
  estimatedProfitMargin: {
    type: String,
    trim: true,
  },
  winningCriteria: {
    type: String,
    trim: true,
  },
  sourcingTips: {
    type: String,
    trim: true,
  },
  customerPainPoints: {
    type: [String],
    default: [],
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.ProductHunt || mongoose.model('ProductHunt', ProductHuntSchema);
