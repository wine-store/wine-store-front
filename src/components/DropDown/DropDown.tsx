import { useState } from 'react';
import styles from './DropDown.module.scss';
import { useSearchParams } from 'react-router-dom';
import { fetchData } from '../../utils/fetchData';

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Price low to high', value: 'cheaper' },
  { label: 'Price high to low', value: 'expensive' },
];

export const DropDown:React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const sortFromUrl = searchParams.get('sort') || '';

  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort', value);
      return newParams;
    });
    setIsOpen(false);
    fetchData();
  };

  return (
  <div className={styles.dropdown} tabIndex={0} >
      <button className={styles.dropdown__label} onClick={() => setIsOpen(prev => !prev)}>
      Sort by {SORT_OPTIONS.find(opt => opt.value === sortFromUrl)?.label || '...'}
      </button>
    
      {isOpen && (
        <div className={styles.dropdown__list}>
         {SORT_OPTIONS.map(({ label, value }) =>  (
            <button
              key={value}
              className={styles.dropdown__item}
              onClick={() => {
                handleSortChange(value);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}