import type { TableData, TableState } from 'types/table';
import type { FilterState } from 'types/filter';
import { createSelector } from '@reduxjs/toolkit';

const getTableData = (store: { table: TableState }): TableData[] => store.table.data;
const getFilterTerm = (store: { filter: FilterState }): string => store.filter.term;

const filteredDataSelector = createSelector([getTableData, getFilterTerm], (list, term) => {
  return list.filter((item) => {
    let key: keyof TableData;

    for (key in item) {
      if (String(item[key]).toLowerCase().includes(term.toLowerCase()) && key !== 'id') return item;
    }
  });
});

export { filteredDataSelector };
