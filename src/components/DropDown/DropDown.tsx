import { useState } from 'react';
import styles from './DropDown.module.scss';
import { useSearchParams } from 'react-router-dom';
// import { fetchData } from '../../utils/fetchData';
import classNames from 'classnames';
import { useClickOutside } from '@mantine/hooks';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price low to high', value: 'cheaper' },
  { label: 'Price high to low', value: 'expensive' },
];

export const DropDown: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useClickOutside(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(false);

  const sortFromUrl = searchParams.get('sort') || '';

  const handleSortChange = (value: string) => {
    if (sortFromUrl === value) {
      setIsOpen(false);
      return;
    }

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort', value);
      return newParams;
    });

    setIsOpen(false);
  };

  return (
    <div
      className={styles.dropdown}
      tabIndex={isOpen ? 0 : -1}
      ref={ref}
      // onBlur={() => setIsOpen(false)}
    >
      <button
        className={styles.dropdown__label}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
      >
        <span className={styles.dropdown__text}>Sort by</span>
        <span className={styles.dropdown__value}>
          {SORT_OPTIONS.find(opt => opt.value === sortFromUrl)?.label ?? '...'}
        </span>

      <span
        className={classNames(styles.arrowDown, {
          [styles["arrowDown--active"]]: isOpen,
        })}
        />
        </button>

      {isOpen && (
        <div className={styles.dropdown__list}>
          {SORT_OPTIONS.map(({ label, value }) => (
            <button
              key={value}
              className={styles.dropdown__item}
              onClick={() => handleSortChange(value)}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
