import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to="/" className={styles.header__link}>
          <img src={''} alt="logo" className={styles.header__logo} />
        </NavLink>
        <nav className={styles.navigation}>
          <ul className={styles.navigation__list}>
            <li className={styles.navigation__item}>
              <NavLink to="/">Catalog</NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink to="/about-us">About Us</NavLink>
            </li>
            <li className={styles.navigation__item}>
              <NavLink to="/account">Account</NavLink>
            </li>
          </ul>
        </nav>
        <NavLink to="/cart">Cart (01) </NavLink>
      </div>
    </header>
  );
};
