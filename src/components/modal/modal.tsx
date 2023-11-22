import './modal.css';

import type { ModalField, ModalState } from 'types/modal';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from 'store/slices/modal';
import { actions as tableActions } from 'store/slices/table';
import { CheckCircledIcon, Cross1Icon, CrossCircledIcon } from '@radix-ui/react-icons';

function Modal() {
  const { currentData, fields, isChange } = useSelector((store: { modal: ModalState }) => store.modal);
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(modalActions.hide());
  };

  const handleReset = () => {
    dispatch(modalActions.resetValues());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isChange) {
      dispatch(tableActions.updateItem({ data: currentData }));
    } else {
      dispatch(tableActions.addItem({ data: currentData }));
    }

    hideModal();
    handleReset();
  };

  return (
    <div className="modal">
      <div className="modal__overlay" onClick={hideModal} />
      <div className="modal__dialog">
        <div className="modal__head">
          <h2 className="modal__titile">{isChange ? 'Редактировать' : 'Добавить'} запись</h2>
          <button className="modal__button-close" onClick={hideModal}>
            <Cross1Icon />
          </button>
        </div>
        <form className="modal__form" onSubmit={handleSubmit}>
          <fieldset className="modal__form-fieldset">
            {fields.map((field: ModalField) => (
              <div className="modal__form-field" key={`modal-field-${field.name}`}>
                <label className="modal__form-label">{field.label}</label>
                <input
                  className="modal__form-input"
                  name={field.name}
                  type={field.type}
                  value={currentData[field.name]}
                  required={field.required}
                  onChange={(e) => dispatch(modalActions.changeValue({ name: field.name, value: e.target.value }))}
                />
              </div>
            ))}
          </fieldset>
          <div className="modal__form-foot">
            <button className="modal__form-button modal__form-button_reset" type="button" onClick={handleReset}>
              <CrossCircledIcon />
              <span>{isChange ? 'Отменить изменения' : 'Очистить'}</span>
            </button>
            <button className="modal__form-button modal__form-button_save" type="submit">
              <CheckCircledIcon />
              <span>Сохранить</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { Modal };
