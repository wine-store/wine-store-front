import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';

interface NavigationProps {
  classNameNav?: string;
}
export const Navigation: React.FC<NavigationProps> = ({ classNameNav = '' }) => {
  return (
    <nav className={`${styles.navigation} ${ styles[classNameNav] || ''}`}>
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
  );
};