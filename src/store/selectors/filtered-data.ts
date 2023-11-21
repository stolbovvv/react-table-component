import type { DataType } from 'types/data';
import type { TableType } from 'types/table';
import type { FilterType } from 'types/filter';
import { createSelector } from '@reduxjs/toolkit';

const getTableData = (store: { table: TableType }): DataType[] => store.table.data;
const getFilterTerm = (store: { filter: FilterType }): string => store.filter.term;

const filteredDataSelector = createSelector([getTableData, getFilterTerm], (list, term) => {
  return list.filter((item) => {
    let key: keyof DataType;

    for (key in item) {
      if (String(item[key]).toLowerCase().includes(term.toLowerCase())) return item;
    }
  });
});

export { filteredDataSelector };
