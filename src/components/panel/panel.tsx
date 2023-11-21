import './panel.css';

import type { TableType } from 'types/table';
import type { FilterType } from 'types/filter';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filterActions } from 'store/slices/filter';

function Panel() {
  const dispatch = useDispatch();
  const tableData = useSelector((state: { table: TableType }) => state.table.data);
  const filterTrem = useSelector((state: { filter: FilterType }) => state.filter.term);

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
          type="text"
          placeholder="Введите текст для фильрации..."
          value={filterTrem}
          onChange={(e) => dispatch(filterActions.cnahgeTerm({ term: e.target.value }))}
        />
        <button className="panel__menu-button">Добавить</button>
      </div>
    </section>
  );
}

export { Panel };
