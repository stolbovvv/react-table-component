import './panel.css';

import type { TableState } from 'types/table';
import type { FilterState } from 'types/filter';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filterActions } from 'store/slices/filter';
import { actions as modalActions } from 'store/slices/modal';
import { PlusCircledIcon } from '@radix-ui/react-icons';

function Panel() {
  const dispatch = useDispatch();
  const tableData = useSelector((state: { table: TableState }) => state.table.data);
  const filterTrem = useSelector((state: { filter: FilterState }) => state.filter.term);

  const showModal = () => {
    dispatch(modalActions.show());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.cnahgeTerm({ term: e.target.value }));
  };

  return (
    <section className="panel">
      <h1 className="panel__title">Водители</h1>
      <div className="panel__info">
        <span className="panel__info-text">Компания: какое-то название компании</span>
        <span className="panel__info-text">Количество записей: {tableData.length}</span>
      </div>
      <div className="panel__menu">
        <input
          className="panel__menu-input"
          placeholder="Введите текст для фильрации..."
          type="text"
          value={filterTrem}
          onChange={handleChange}
        />
        <button className="panel__menu-button" onClick={showModal}>
          <PlusCircledIcon />
          <span>Добавить</span>
        </button>
      </div>
    </section>
  );
}

export { Panel };
