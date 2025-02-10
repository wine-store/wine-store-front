import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FilterForWine.module.scss';
import classNames from 'classnames';
import { useClickOutside } from '@mantine/hooks';
import { fetchData } from '../../utils/fetchData';
const filtersFromServer = {
  type: ['Red', 'Rose', 'Sparkling', 'White'],
  priceRanges: ['00-49', '50-74', '75-99', '100-149', '150-199', '200+'],
  grape: ['Cabernet Sauvignon', 'Merlot', 'Chardonnay', 'Pinot Noir'],
  country: ['France', 'Italy', 'Spain', 'USA'],
  vintage: ['2020', '2019', '2018', '2017'],
  capacity: ['750ml', '1L', '1.5L'],
  abv: ['12%', '13%', '14%', '15%'],
  region: ['Bordeaux', 'Tuscany', 'La Rioja'],
};

const filterCategories = [
  { label: 'Type', key: 'type' },
  { label: 'Price range', key: 'priceRanges' },
  { label: 'Grape', key: 'grape' },
  { label: 'Country', key: 'country' },
  { label: 'Vintage', key: 'vintage' },
  { label: 'Capacity', key: 'capacity' },
  { label: 'ABV', key: 'abv' },
  { label: 'Region', key: 'region' },
];

export const FilterForWine: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<
    { label: string; key: string; values: string[] }[]
    >([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const ref = useClickOutside(() => setIsOpen(false));
  
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        // const response = await axios.get('/path-to-api/filters');
        const filterData = filtersFromServer;

        const mappedFilters = filterCategories.map(({ label, key }) => ({
          label,
          key,
          values: filterData[key as keyof typeof filtersFromServer] || [],
        }));

        setFilters(mappedFilters);
      } catch (error) {
        setError('Error loading filters');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const toggleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    const existingValues = newParams.getAll(key);

    if (existingValues.includes(value)) {
      newParams.delete(key);
      existingValues
        .filter(item => item !== value)
        .forEach(val => newParams.append(key, val));
    } else {
      newParams.append(key, value);
    }

    setSearchParams(newParams);
  };

  const activeFilters = [...searchParams.entries()]
  .filter(([key]) => filterCategories.some(category => category.key === key))
  .map(([key, value]) => ({ key, value }));

  const applyFilters = () => {
    setLoading(true);
    fetchData();
    setIsOpen(false);
  };

  const reset = () => {
    setActiveIndex(null);

    const sortValue = searchParams.get('sort');
    const newParams = new URLSearchParams();
    if (sortValue) {
      newParams.set('sort', sortValue);
    }
  
    setSearchParams(newParams, { replace: true });
    setIsOpen(false);
  };

  

  const toggleAccordion = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <>
      <button
        className={classNames(styles.filterBtn, {
          [styles['filterBtn--active']]: isOpen,
        })}
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <span className={styles.filterBtn__text}>Filter</span>
        <span
          className={classNames(styles.arrowDown, {
            [styles['arrowDown--active']]: isOpen,
          })}
        ></span>
      </button>

      {isOpen && !error && (
        <div ref={ref} className={styles.modal}>
          <div className={styles.yourChoice}>
            <div>Your choice</div>
          </div>
          {activeFilters.length > 0 && (
            <div className={styles.filterGroup}>
              {activeFilters.map(({key, value}) => (
                <button
                  key={`${key}-${value}`}
                  onClick={() => toggleFilter(key, value)}
                  className={styles.filterTag}
                >
                  {value}
                </button>
              ))}
            </div>
          )}

          <div className={styles.simpleAccordion}>
            {filters.map((filter, index) => (
              <div key={index}>
                <div
                   className={classNames(styles.accordionControl, {
                    [styles['accordionControl--active']]: activeIndex === index,
                  })}
                  onClick={() => toggleAccordion(index)}
                >
                  <span className={styles.accordionControl__text}>
                    {filter.label}
                  </span>
                  <span
                    className={classNames(styles.arrowDown, {
                      [styles['arrowDown--active']]: activeIndex === index,
                    })}
                  ></span>
                </div>
                {activeIndex === index && (
                  <div className={styles.accordionPanel}>
                    <div className={styles.filterGroup}>
                      {filter.values.map(value => (
                        <button
                          key={value}
                          className={styles.filterTag}
                          onClick={() => toggleFilter(filter.key, value)}
                        >
                          {value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.filterActions}>
            <button
              className={styles.showResults}
              onClick={applyFilters}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Show results'}
            </button>
            <button onClick={reset}>Reset</button>
          </div>
        </div>
      )}
    </>
  );
};
