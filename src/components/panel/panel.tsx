import './panel.css';

import type { TableCel, TableState } from 'types/table';
import type { FilterState } from 'types/filter';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as filterActions } from 'store/slices/filter';
import { actions as modalActions } from 'store/slices/modal';
import { actions as tableActions } from 'store/slices/table';
import { animated, useTransition } from '@react-spring/web';
import { DropdownMenuIcon, PlusCircledIcon } from '@radix-ui/react-icons';

function Panel() {
  const dispatch = useDispatch();
  const table = useSelector((state: { table: TableState }) => state.table);
  const filter = useSelector((state: { filter: FilterState }) => state.filter);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const tableVisibleLength = table.cells.filter((cel: TableCel) => cel.visible).length;

  const dropdownTransition = useTransition(dropdownIsOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: {
      duration: 100,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(filterActions.cnahgeTerm({ term: e.target.value }));
  };

  const showModal = () => {
    dispatch(modalActions.show());
  };

  const hideDropdown = (e: MouseEvent) => {
    if (!dropdownRef.current?.contains(e.target as Node)) setDropdownIsOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownIsOpen(!dropdownIsOpen);
  };

  useEffect(() => {
    document.addEventListener('click', hideDropdown);

    return () => {
      document.removeEventListener('click', hideDropdown);
    };
  }, []);

  return (
    <section className="panel">
      <h1 className="panel__title">Водители</h1>
      <div className="panel__info">
        <span className="panel__info-text">Компания: какое-то название компании</span>
        <span className="panel__info-text">Количество записей: {table.data.length}</span>
      </div>
      <div className="panel__menu">
        <input
          className="panel__menu-input"
          placeholder="Введите текст для фильрации..."
          type="text"
          value={filter.term}
          onChange={handleChange}
        />
        <div className="panel__menu-dropdown" ref={dropdownRef}>
          <button className="panel__menu-dropdown-button" onClick={toggleDropdown}>
            <DropdownMenuIcon />
            <span>Поля</span>
          </button>
          {dropdownTransition(
            (style, dropdownIsOpen) =>
              dropdownIsOpen && (
                <animated.ul style={style} className="panel__menu-dropdown-list">
                  {table.cells.map(
                    (cel: TableCel) =>
                      cel.selected && (
                        <li key={`dropdown-item-${cel.name}`} className="panel__menu-dropdown-item">
                          <input
                            id={`dropdown-item-${cel.name}`}
                            type="checkbox"
                            checked={cel.visible}
                            disabled={cel.visible && tableVisibleLength === 1}
                            onClick={() => dispatch(tableActions.changeVisibleCel({ name: cel.name }))}
                          />
                          <label htmlFor={`dropdown-item-${cel.name}`}>{cel.text}</label>
                        </li>
                      ),
                  )}
                </animated.ul>
              ),
          )}
        </div>
        <button className="panel__menu-button" onClick={showModal}>
          <PlusCircledIcon />
          <span>Добавить</span>
        </button>
      </div>
    </section>
  );
}

export { Panel };
