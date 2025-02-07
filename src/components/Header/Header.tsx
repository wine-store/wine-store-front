import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { Navigation } from '../Navigation';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <NavLink to="/" className={styles.header__link}>
          <img src={''} alt="logo" className={styles.header__logo} />
        </NavLink>
        <Navigation classNameNav="headerNavigation"  />
        <NavLink to="/cart">Cart (01) </NavLink>
      </div>
    </header>
  );
};
