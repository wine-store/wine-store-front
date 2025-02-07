import { FilterForWine } from '../FilterForWine';
import styles from './Sidebar.module.scss';
import { DropDown } from '../DropDown';
import { CategoryNavigation } from '../CategoryNavigation';
export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
    <FilterForWine />
    <CategoryNavigation classNameNav='sidebarNavigation' />
    <div className={styles.sidebar__sort}>
      <DropDown />
      </div>
      </div>
  );
}