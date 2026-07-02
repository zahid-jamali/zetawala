import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';
import toolReducer from './toolSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tools: toolReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
