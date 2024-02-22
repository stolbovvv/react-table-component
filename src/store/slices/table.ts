import type { TableCel, TableData, TableState } from 'types/table';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { data } from 'data/data.json';

const initialState: TableState = {
  data: data,
  sort: {
    field: 'name',
    order: 'acs',
  },
  cells: [
    { name: 'id', text: 'ID', visible: false, selected: false },
    { name: 'name', text: 'ФИО', visible: true, selected: true },
    { name: 'phone', text: 'Телефон', visible: true, selected: true },
    { name: 'email', text: 'Электронная почта', visible: true, selected: true },
    { name: 'personal', text: 'Личный номер', visible: true, selected: true },
  ],
};

export const { actions, reducer } = createSlice({
  name: 'table',
  initialState,
  reducers: {
    sort: (state, action: PayloadAction<{ field: keyof TableData }>) => {
      const _order = state.sort.order;
      const _field = state.sort.field;

      if (_field !== action.payload.field) {
        state.sort.field = action.payload.field;
        state.sort.order = 'acs';
      } else {
        if (_order === 'acs') state.sort.order = 'desc';
        if (_order === 'desc') state.sort.order = 'acs';
      }

      state.data.sort((a, b) => {
        const elemA = String(a[action.payload.field]);
        const elemB = String(b[action.payload.field]);

        const result = elemA.localeCompare(elemB, undefined, { numeric: true });

        if (state.sort.order === 'acs') return result * 1;
        if (state.sort.order === 'desc') return result * -1;

        return 0;
      });
    },
    addItem: (state, action: PayloadAction<{ data: TableData }>) => {
      state.data.push({ ...action.payload.data, id: uuidv4() });
    },
    updateItem: (state, action: PayloadAction<{ data: TableData }>) => {
      state.data = state.data.map((item: TableData) => {
        if (item.id === action.payload.data.id) return action.payload.data;
        return item;
      });
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      state.data = state.data.filter((item: TableData) => item.id !== action.payload.id);
    },
    changeVisibleCel: (state, action: PayloadAction<{ name: keyof TableData }>) => {
      state.cells = state.cells.map((cel: TableCel) => {
        if (cel.name === action.payload.name) return { ...cel, visible: !cel.visible };
        return cel;
      });
    },
  },
});
