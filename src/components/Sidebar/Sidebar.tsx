import { FilterForWine } from '../FilterForWine';
import styles from './Sidebar.module.scss';
import { CategoryNavigation } from '../CategoryNavigation';
import { DropDown } from '../DropDown';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <FilterForWine />
      <CategoryNavigation classNameNav="sidebarNavigation" />
      <DropDown />
    </div>
  );
};
