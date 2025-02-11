import { useEffect } from 'react';
import { Sidebar } from '../../components/Sidebar';
import styles from './CatalogPage.module.scss';
type CatalogPageProps = {
  category: 'all' | 'wine' | 'object' | 'certificate';
};

export const CatalogPage: React.FC<CatalogPageProps> = ({ category }) => {
  useEffect((
  ) => {}, [category]);
  return (
    <section className={styles.catalog}>
      <Sidebar category={category} />
      <div>{category}</div>
    </section>
  );
};
