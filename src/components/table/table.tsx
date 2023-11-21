import './table.css';

function Table() {
  return (
    <section className="table">
      <div className="table__head">
        <div className="table__head-row">
          <button className="table__head-cel">ФИО</button>
          <button className="table__head-cel">RFID</button>
          <button className="table__head-cel">Телефон</button>
          <button className="table__head-cel">Электронная почта</button>
        </div>
      </div>
      <div className="table__body">
        <div className="table__body-row">
          <span className="table__body-cel">Иван Иванов</span>
          <span className="table__body-cel">3085452</span>
          <span className="table__body-cel">+7 (902) 852 45 32</span>
          <span className="table__body-cel">ivan@email.com</span>
        </div>
        <div className="table__body-row">
          <span className="table__body-cel">Семён Семёнов</span>
          <span className="table__body-cel">2954123</span>
          <span className="table__body-cel">+7 (965) 458 25 34</span>
          <span className="table__body-cel">semen@email.com</span>
        </div>
        <div className="table__body-row">
          <span className="table__body-cel">Сергей Сергеев</span>
          <span className="table__body-cel">1625489</span>
          <span className="table__body-cel">+7 (980) 125 48 48</span>
          <span className="table__body-cel">sergey@email.com</span>
        </div>
      </div>
    </section>
  );
}

export { Table };
