import { DataType } from './data';

// Table column type
export type CelType = {
  name: keyof DataType;
  text: string;
  visible: boolean;
};

// Table type
export type TableType = {
  data: DataType[];
  cells: CelType[];
  sort: {
    field: keyof DataType | null;
    order: 'acs' | 'desc';
  };
};
