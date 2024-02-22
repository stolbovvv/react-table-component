import './header.css';

import logo from 'assets/react-table-component.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo-icon" src={logo} alt="React Table Component logo" />
        <span className="header__logo-text">React Table Component</span>
      </div>
      <div className="header__menu"></div>
    </header>
  );
}

export { Header };
