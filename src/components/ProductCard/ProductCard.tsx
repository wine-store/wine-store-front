import { Link } from 'react-router-dom';
import styles from './ProductCard.module.scss';
import { Wine } from '../../types/Wine';
import { FaStar } from 'react-icons/fa'; 
type Props = {
  category: 'all' | 'wine' | 'object' | 'certificate';
  wine: Wine;
};
export const ProductCard: React.FC<Props> = ({ category, wine }) => {
  return (
    <article className={styles.wineCard}>
      <Link to={category === 'all' ? `/${wine.itemId}` : `/${category}/${wine.itemId}`} className={styles.picture}>
        <div className={styles.imageContainer}>
        <img
          src={'https://placehold.jp/330x360.png'}
          alt={wine.title}
          className={styles.image}
          />
           <div className={styles.rating}>
            {/* add rating */}
            <span className={styles.ratingValue}>5</span> 
            <FaStar className={styles.starIcon} />
          </div>
          </div>
      </Link>
      <div className={styles.content}>
      <Link to={`/${category}/${wine.itemId}`} className={styles.title}>
        {wine.title}
      </Link>
      <div className={styles.price}>{`${wine.price} $`}</div>
      </div>
      <div className={styles.item}>{wine.vintage}</div>
    </article>
  );
};
