import './header.css';

import logoFortMonitorHandbook from 'assets/fort-monitor-handbook.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img className="header__logo-icon" src={logoFortMonitorHandbook} alt="Fort Monitor Handbook logo" />
        <span className="header__logo-text">Fort Monitor Справочник</span>
      </div>
      <div className="header__menu"></div>
    </header>
  );
}

export { Header };
