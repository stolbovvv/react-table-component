import type { TableData } from 'types/table';
import type { ModalState } from 'types/modal';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialDataState: TableData = {
  id: '',
  name: '',
  rfid: '',
  phone: '',
  email: '',
};

const initialState: ModalState = {
  initialData: initialDataState,
  currentData: initialDataState,
  isOpen: false,
  isChange: false,
  fields: [
    { name: 'name', type: 'text', label: 'ФИО', value: '', required: true },
    { name: 'rfid', type: 'number', label: 'RFID', value: '', required: true },
    { name: 'phone', type: 'tel', label: 'Телефон', value: '', required: false },
    { name: 'email', type: 'email', label: 'Электронная почта', value: '', required: false },
  ],
};

export const { actions, reducer } = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    show: (state, action: PayloadAction<{ data: TableData } | undefined>) => {
      const _data = action.payload?.data;

      if (_data) {
        state.initialData = _data;
        state.currentData = _data;
        state.isChange = true;
      } else {
        state.isChange = false;
      }

      state.isOpen = true;
    },
    hide: (state) => {
      state.initialData = initialDataState;
      state.currentData = initialDataState;
      state.isOpen = false;
    },
    changeValue: (state, action: PayloadAction<{ name: keyof TableData; value: string }>) => {
      state.currentData[action.payload.name] = action.payload.value;
    },
    resetValues: (state) => {
      state.currentData = state.initialData;
    },
  },
});
