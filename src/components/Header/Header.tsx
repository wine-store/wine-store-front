import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navigation } from '../Navigation';
import { useState } from 'react';
import classNames from 'classnames';
import closeIcon from '../../assets/icon/close.svg';
import burgerIcon from '../../assets/icon/burger-menu.svg';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.container__burger} onClick={handleMenu}>
          <img
            src={isMenuOpen ? closeIcon : burgerIcon}
            alt={isMenuOpen ? 'close menu' : 'open menu'}
          />
        </div>
        <NavLink to="/" onClick={closeMenu} className={styles.container__link}>
          <img
            // src={'./img/icons/logo.svg'}
            alt="logo"
            className={styles.container__logo}
          />
        </NavLink>
        <nav
          className={classNames(styles.navigation, {
            [styles['navigation--active']]: isMenuOpen,
          })}
        >
          <Navigation classNameNav="headerNavigation" setIsMenuOpen={setIsMenuOpen} />
          
      </nav>
        <NavLink to="/cart">Cart (01) </NavLink>
      </div>
    </header>
  );
};
