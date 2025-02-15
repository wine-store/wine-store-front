import { NavLink } from "react-router-dom";
import styles from "./CategoryNavigation.module.scss";
import React from "react";

interface CategoryNavigationProps {
  classNameNav?: string;
}
export const CategoryNavigation: React.FC<CategoryNavigationProps> = ({ classNameNav = ''}) => {
  return (
    <nav className={`${styles.navigation} ${classNameNav ? styles[classNameNav] : ''}`}>
      <ul className={styles.navigation__list}>
        <li className={styles.navigation__item}>
          <NavLink to="/">All</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink to="/wine">Wine</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink to="/object">Object</NavLink>
        </li>
        <li className={styles.navigation__item}>
          <NavLink to="/certificate">Certificate</NavLink>
        </li>
      </ul>
    </nav>
  );
};