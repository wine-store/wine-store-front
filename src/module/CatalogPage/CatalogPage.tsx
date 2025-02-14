import { useEffect, useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './CatalogPage.module.scss';
import { FilterForWine } from '../../components/FilterForWine';
import { ProductCard } from '../../components/ProductCard';
type CatalogPageProps = {
  category: 'all' | 'wine' | 'object' | 'certificate';
};

export const CatalogPage: React.FC<CatalogPageProps> = ({ category }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilterVisibility = () => {
    setIsFilterOpen(prevState => !prevState); 
  };
  useEffect(() => {}, [category]);
  return (
    <article className={styles.catalog}>
      <Sidebar toggleFilterVisibility={toggleFilterVisibility} />
      <section className={styles.catalog__content}>
        <FilterForWine category={category} toggleFilterVisibility={toggleFilterVisibility} isFilterOpen={isFilterOpen} />
        <ul className={styles.cardsConteiner}>
          <li className={styles.card}>
            <ProductCard />
          </li>
        </ul>
      </section>
    </article>
  );
};
