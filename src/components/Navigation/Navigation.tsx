import styles from './Navigation.module.scss';
import { NavLink } from 'react-router-dom';
import { Dispatch, SetStateAction, useCallback } from 'react';
import classNames from 'classnames';

interface NavigationProps {
  classNameNav?: string;
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export const Navigation: React.FC<NavigationProps> = ({ classNameNav = '', setIsMenuOpen }) => {
  const closeMenu = useCallback(() => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [setIsMenuOpen]);

  return (
    <nav className={classNames(styles.navigation, styles[classNameNav])}>
      <ul className={styles.navigation__list}>
        {[
          { path: '/', label: 'Catalog' },
          { path: '/about-us', label: 'About Us' },
          { path: '/account', label: 'Account' },
        ].map(({ path, label }) => (
          <li key={path} className={styles.navigation__item}>
            <NavLink to={path} className={styles.navigation__link} onClick={closeMenu}>
              <div className={styles.title}>{label}</div>
              <div className={styles.arrow}></div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
