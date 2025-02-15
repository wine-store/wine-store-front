import styles from './Sidebar.module.scss';
import { CategoryNavigation } from '../CategoryNavigation';
import { DropDown } from '../DropDown';
import filter from '../../assets/icon/filter.svg';
type Props = {
  toggleFilterVisibility: () => void;
};
export const Sidebar: React.FC<Props> = ({ toggleFilterVisibility }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.filterBtn__text}>Filter</div>
      <CategoryNavigation classNameNav="sidebarNavigation" />
      <button className={styles.filterButton} onClick={toggleFilterVisibility}>
        <img src={filter} alt="filter"></img>
      </button>
      <DropDown />
    </div>
  );
};
