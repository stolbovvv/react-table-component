import './panel.css';

function Panel() {
  return (
    <section className="panel">
      <h1 className="panel__title">Водители</h1>
      <div className="panel__info">
        <span className="panel__info-text">Компания: какое-то название компании</span>
        <span className="panel__info-text">Количество записей: 3</span>
      </div>
      <div className="panel__menu">
        <input className="panel__menu-input" type="text" placeholder="Введите текст для фильрации..." />
        <button className="panel__menu-button">Добавить</button>
      </div>
    </section>
  );
}

export { Panel };
