import { FilterForWine } from '../FilterForWine';
import styles from './Sidebar.module.scss';
import { CategoryNavigation } from '../CategoryNavigation';
import { DropDown } from '../DropDown';
type Props = {
  category: 'all' | 'wine' | 'object' | 'certificate';
};
export const Sidebar: React.FC<Props> = ({ category }) => {
  return (
    <div className={styles.sidebar}>
      <FilterForWine category={category} />
      <CategoryNavigation classNameNav="sidebarNavigation" />
      <DropDown />
    </div>
  );
};
