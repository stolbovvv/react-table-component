import { configureStore } from '@reduxjs/toolkit';
import { reducer as modalReducer } from './slices/modal';
import { reducer as tableReducer } from './slices/table';
import { reducer as filterReducer } from './slices/filter';

const store = configureStore({
  reducer: {
    modal: modalReducer,
    table: tableReducer,
    filter: filterReducer,
  },
  devTools: import.meta.env.MODE === 'development',
});

export { store };
