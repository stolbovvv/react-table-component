import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type FiltersState = {
  term: string;
  type: string;
};

const initialState: FiltersState = {
  term: '',
  type: '',
};

const { actions, reducer } = createSlice({
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

export { actions, reducer };
