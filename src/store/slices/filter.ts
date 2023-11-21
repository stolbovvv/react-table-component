import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Filter } from 'types/filter';

const initialState: Filter = {
  term: '',
  type: '',
};

export const { actions, reducer } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    cnahgeTerm: (state, action: PayloadAction<{ term: string }>) => {
      state.term = action.payload.term;
    },
    cnahgeType: (state, action: PayloadAction<{ type: string }>) => {
      state.type = action.payload.type;
    },
  },
});
