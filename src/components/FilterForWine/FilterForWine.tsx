import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FilterForWine.module.scss';
import classNames from 'classnames';
import { useClickOutside } from '@mantine/hooks';
// import { filterCategories } from '../../types/FilterCategories';
// import { fetchFilters } from '../../utils/fetchFilters';
import { useFilterStore } from '../../store/filtersStore';
// import { fetchData } from '../../utils/fetchData';
import { priseRange } from '../../types/PriseRange';
type Props = {
  category: 'all' | 'wine' | 'object' | 'certificate';
};

export const FilterForWine: React.FC<Props> = ({ category }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const filters = useFilterStore(state => state.filters);
  const error = useFilterStore(state => state.error);
  const loading = useFilterStore(state => state.loading);
  const initialized = useFilterStore(state => state.initialized);
  const initializeFilters = useFilterStore(state => state.initializeFilters);
  const ref = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    if (!initialized && filters.length === 0) {
      initializeFilters();
    }
  }, [initialized, initializeFilters]);
  

  const toggleFilter = useCallback((key: string, value: string) => {
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
  }, [searchParams, setSearchParams]);

  const activeFilters = React.useMemo(() => 
    [...searchParams.entries()]
      .filter(([key]) => filters.some(category => category.key === key))
      .map(([key, value]) => ({ key, value })),
    [searchParams, filters]
  );

  const toggleAccordion = useCallback((index: number) => {
    setActiveIndex(prev => prev === index ? null : index);
  }, []);

  const priceAccordionIndex = 999;
  
  const applyFilters = useCallback(() => {
    setIsOpen(false);
  }, []);

  const reset = useCallback(() => {
    setActiveIndex(null);
    const sortValue = searchParams.get('sort');
    const newParams = new URLSearchParams();
    if (sortValue) {
      newParams.set('sort', sortValue);
    }
    setSearchParams(newParams, { replace: true });
    setIsOpen(false);
  }, [searchParams, setSearchParams]);

  return (
    <>
      <button
        className={classNames(styles.filterBtn, {
          [styles['filterBtn--active']]: isOpen,
        })}
        onClick={() => setIsOpen(true)}
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
              {activeFilters.map(({ key, value }) => (
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
          {category === 'wine' ? (
            <div className={styles.simpleAccordion}>
              {filters.map((filter, index) => (
                <div key={index}>
                  <div
                    className={classNames(styles.accordionControl, {
                      [styles['accordionControl--active']]:
                        activeIndex === index,
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
          ) : (
            <div className={styles.simpleAccordion}>
              <div
                className={classNames(styles.accordionControl, {
                  [styles['accordionControl--active']]:
                    activeIndex === priceAccordionIndex,
                })}
                onClick={() => toggleAccordion(priceAccordionIndex)}
              >
                <span className={styles.accordionControl__text}>
                  Prise range
                </span>
                <span
                  className={classNames(styles.arrowDown, {
                    [styles['arrowDown--active']]:
                      activeIndex === priceAccordionIndex,
                  })}
                ></span>
              </div>
              {activeIndex === priceAccordionIndex && (
                <div className={styles.accordionPanel}>
                  <div className={styles.filterGroup}>
                    {priseRange.values.map(value => (
                      <button
                        key={value}
                        className={styles.filterTag}
                        onClick={() => toggleFilter('priceRanges', value)}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
