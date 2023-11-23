import './modal.css';

import type { TableData } from 'types/table';
import type { ModalField, ModalState } from 'types/modal';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from 'store/slices/modal';
import { actions as tableActions } from 'store/slices/table';
import { animated, useTransition } from '@react-spring/web';
import { CheckCircledIcon, Cross1Icon, CrossCircledIcon, TrashIcon } from '@radix-ui/react-icons';

function Modal() {
  const modal = useSelector((store: { modal: ModalState }) => store.modal);
  const modalIsOpen = useMemo(() => modal.isOpen, [modal.isOpen]);
  const dispatch = useDispatch();
  const transition = useTransition(modalIsOpen, {
    from: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transform: 'translateY(-120%)',
    },
    enter: {
      opacity: 1,
      backdropFilter: 'blur(2px)',
      transform: 'translateY(0%)',
    },
    leave: {
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transform: 'translateY(-120%)',
    },
  });

  const hideModal = () => {
    dispatch(modalActions.hide());
  };

  const handleReset = () => {
    dispatch(modalActions.resetValues());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: keyof TableData) => {
    dispatch(modalActions.changeValue({ name: name, value: e.target.value }));
  };

  const handleDelete = () => {
    dispatch(tableActions.removeItem({ id: modal.currentData.id }));

    hideModal();
    handleReset();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (modal.isChange) {
      dispatch(tableActions.updateItem({ data: modal.currentData }));
    } else {
      dispatch(tableActions.addItem({ data: modal.currentData }));
    }

    hideModal();
    handleReset();
  };

  return transition(
    (style, modalIsOpen) =>
      modalIsOpen && (
        <div className="modal">
          <animated.div
            style={{ opacity: style.opacity, backdropFilter: style.backdropFilter }}
            className="modal__overlay"
            onClick={hideModal}
          />
          <animated.div style={{ transform: style.transform }} className="modal__dialog">
            <div className="modal__head">
              <h2 className="modal__titile">{modal.isChange ? 'Редактировать' : 'Добавить'} запись</h2>
              <button className="modal__button-close" onClick={hideModal}>
                <Cross1Icon />
              </button>
            </div>
            <form className="modal__form" onSubmit={handleSubmit}>
              <fieldset className="modal__form-fieldset">
                {modal.fields.map((field: ModalField) => (
                  <div className="modal__form-field" key={`modal-field-${field.name}`}>
                    <label className="modal__form-label">
                      {field.label}
                      {field.required ? '*' : ''}
                    </label>
                    <input
                      className="modal__form-input"
                      type={field.type}
                      value={modal.currentData[field.name]}
                      required={field.required}
                      onChange={(e) => handleChange(e, field.name)}
                    />
                  </div>
                ))}
              </fieldset>
              <div className="modal__form-foot">
                {modal.isChange && (
                  <button className="modal__form-button modal__form-button_delete" type="button" onClick={handleDelete}>
                    <TrashIcon />
                    <span>Удалить</span>
                  </button>
                )}
                <button className="modal__form-button modal__form-button_reset" type="button" onClick={handleReset}>
                  <CrossCircledIcon />
                  <span>{modal.isChange ? 'Отменить' : 'Очистить'}</span>
                </button>
                <button className="modal__form-button modal__form-button_save" type="submit">
                  <CheckCircledIcon />
                  <span>Сохранить</span>
                </button>
              </div>
            </form>
          </animated.div>
        </div>
      ),
  );
}

export { Modal };
