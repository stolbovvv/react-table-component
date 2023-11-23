// Table data type
export type TableData = {
  id: string;
  rfid: string;
  name: string;
  phone: string;
  email: string;
};

// Table cel type
export type TableCel = {
  name: keyof TableData;
  text: string;
  visible: boolean;
  selected: boolean;
};

// Table state type
export type TableState = {
  data: TableData[];
  cells: TableCel[];
  sort: {
    field: keyof TableData;
    order: 'acs' | 'desc';
  };
};
