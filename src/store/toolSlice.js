import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  outputs: {},
  history: [],
  inputs: {
    'video-ideas': { niche: '' },
    'title-generator': { idea: '', niche: '' },
    'hook-architect': { title: '' },
    'description-builder': { title: '' },
    'tags-extractor': { title: '' },
    'thumbnail-prompt': { title: '' },
    'script-master': { title: '', duration: '5' },
    'product-hunting': { seed: '' },
    'roman-urdu-keywords': { product: '' },
  },
};

const toolSlice = createSlice({
  name: 'tools',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setOutput: (state, action) => {
      const { toolSlug, data } = action.payload;
      state.outputs[toolSlug] = data;
    },
    addHistory: (state, action) => {
      state.history.unshift({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      });
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setToolInput: (state, action) => {
      const { toolSlug, field, value } = action.payload;
      if (state.inputs[toolSlug]) {
        state.inputs[toolSlug][field] = value;
      }
    },
  },
});

export const { setLoading, setError, setOutput, addHistory, clearHistory, setToolInput } = toolSlice.actions;

export default toolSlice.reducer;
