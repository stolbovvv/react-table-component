import { TableData } from './table';

// Modal field type
export type ModalField = {
  name: keyof TableData;
  type: string;
  label: string;
  value: string;
  required: boolean;
};

// Modal type
export type ModalState = {
  initialData: TableData;
  currentData: TableData;
  isOpen: boolean;
  fields: ModalField[];
  isChange: boolean;
};
