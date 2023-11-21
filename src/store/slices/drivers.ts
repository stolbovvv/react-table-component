import { Driver } from 'types/drivers';
import { drivers } from 'data/drivers.json';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type DriversState = {
  data: Driver[];
  sort: 'acs' | 'desc';
};

const initialState: DriversState = {
  data: drivers,
  sort: 'acs',
};

const { actions, reducer } = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    sort: (state, action: PayloadAction<{ filed: keyof Driver }>) => {
      state.data.sort((a, b) => {
        const elemA = String(a[action.payload.filed]);
        const elemB = String(b[action.payload.filed]);

        return elemA.localeCompare(elemB, undefined, { numeric: true });
      });
    },
  },
});

export { actions, reducer };
