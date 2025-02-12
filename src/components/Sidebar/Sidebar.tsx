import styles from './Sidebar.module.scss';
import { CategoryNavigation } from '../CategoryNavigation';
import { DropDown } from '../DropDown';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.filterBtn__text}>Filter</div>
      <CategoryNavigation classNameNav="sidebarNavigation" />
      <DropDown />
    </div>
  );
};
