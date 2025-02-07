import { NavLink } from 'react-router-dom';
import { FilterForWine } from '../FilterForWine';
import styles from './Sidebar.module.scss';
import { DropDown } from '../DropDown';
export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
    <FilterForWine />
    <nav className={styles.navigation}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink to="/">All</NavLink>
        </li>
        <li>
          <NavLink to="/wine">Wine</NavLink>
        </li>
        <li>
          <NavLink to="/object">Object</NavLink>
        </li>
        <li>
          <NavLink to="/certificate">Certificate</NavLink>
        </li>
      </ul>
    </nav>
    <div className={styles.sidebar__sort}>
      <DropDown />
      </div>
      </div>
  );
}