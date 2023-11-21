import { configureStore } from '@reduxjs/toolkit';
import { reducer as driversReducer } from './slices/drivers';
import { reducer as filtersReducer } from './slices/filters';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
    filters: filtersReducer,
  },
  devTools: import.meta.env.MODE === 'development',
});

export { store };
