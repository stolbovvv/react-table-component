import './table.css';

import type { TableData } from 'types/table';
import type { TableCel, TableState } from 'types/table';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from 'store/slices/modal';
import { actions as tableActions } from 'store/slices/table';
import { filteredDataSelector } from 'store/selectors/filtered-data';
import { CaretSortIcon, CaretUpIcon, CaretDownIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';

function Table() {
  const data = useSelector(filteredDataSelector);
  const sort = useSelector((state: { table: TableState }) => state.table.sort);
  const cells = useSelector((state: { table: TableState }) => state.table.cells);
  const dispatch = useDispatch();

  const getSortIcon = (field: keyof TableData) => {
    if (sort.field !== field) {
      return <CaretSortIcon />;
    } else {
      if (sort.order === 'acs') return <CaretUpIcon />;
      if (sort.order === 'desc') return <CaretDownIcon />;
    }
  };

  const handleSort = (name: keyof TableData) => {
    dispatch(tableActions.sort({ field: name }));
  };

  const showModal = (data: TableData) => {
    dispatch(modalActions.show({ data }));
  };

  useEffect(() => {
    dispatch(tableActions.sort({ field: 'name' }));
  }, []);

  return (
    <section className="table">
      <div className="table__head">
        <div className="table__head-row">
          {cells.map(
            (cel: TableCel) =>
              cel.visible && (
                <button className="table__head-cel" key={cel.name} onClick={() => handleSort(cel.name)}>
                  <span>{cel.text}</span>
                  {getSortIcon(cel.name)}
                </button>
              ),
          )}
        </div>
      </div>
      <div className="table__body">
        {data.map((item: TableData) => (
          <div className="table__body-row" key={item.id} onClick={() => showModal(item)}>
            {cells.map(
              (cel: TableCel) =>
                cel.visible && (
                  <span className="table__body-cel" key={`${cel.name}-${item.id}`}>
                    {item[cel.name]}
                  </span>
                ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export { Table };
