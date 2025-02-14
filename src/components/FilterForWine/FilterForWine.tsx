import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './FilterForWine.module.scss';
import classNames from 'classnames';
// import { useClickOutside } from '@mantine/hooks';
import { useFilterStore } from '../../store/filtersStore';
// import { fetchData } from '../../utils/fetchData';
import { priseRange } from '../../types/PriseRange';
import { Button } from '@mantine/core';
type Props = {
  category: 'all' | 'wine' | 'object' | 'certificate';
  toggleFilterVisibility: () => void;
  isFilterOpen: boolean;
};

export const FilterForWine: React.FC<Props> = ({
  category,
  toggleFilterVisibility,
  isFilterOpen,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isOpen, setIsOpen] = useState(false);
  const [activeIndexes, setActiveIndexes] = useState<Set<number>>(new Set());
  const filters = useFilterStore(state => state.filters);
  const error = useFilterStore(state => state.error);
  const loading = useFilterStore(state => state.loading);
  const initialized = useFilterStore(state => state.initialized);
  const initializeFilters = useFilterStore(state => state.initializeFilters);
  // const ref = useClickOutside(() => setIsOpen(false));

  useEffect(() => {
    if (!initialized && filters.length === 0) {
      initializeFilters();
    }
  }, [initialized, initializeFilters]);

  const toggleFilter = useCallback(
    (key: string, value: string) => {
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
    },
    [searchParams, setSearchParams],
  );

  const activeFilters = React.useMemo(
    () =>
      [...searchParams.entries()]
        .filter(([key]) => filters.some(category => category.key === key))
        .map(([key, value]) => ({ key, value })),
    [searchParams, filters],
  );

  const toggleAccordion = useCallback((index: number, filterLabel: string) => {
    setActiveIndexes(prev => {
      const newIndexes = new Set(prev);
      if (newIndexes.has(index)) {
        newIndexes.delete(index);
      } else {
        newIndexes.add(index);
      }
      return newIndexes;
    });
    // Add fetch count to API
    console.log(filterLabel);
  }, []);

  const applyFilters = useCallback(() => {
    toggleFilterVisibility();
  }, []);

  const reset = useCallback(() => {
    setActiveIndexes(new Set());
    const sortValue = searchParams.get('sort');
    const newParams = new URLSearchParams();
    if (sortValue) {
      newParams.set('sort', sortValue);
    }
    setSearchParams(newParams, { replace: true });
    toggleFilterVisibility();
  }, [searchParams, setSearchParams]);

  return (
    <div
      className={classNames(styles.filter, {
        [styles['filter--active']]: isFilterOpen,
      })}
    >
      {!error && (
        <div className={styles.sidebar}>
          <div className={styles.filterForMob}>
            <span className={styles.arrowDo} onClick={toggleFilterVisibility}></span>
            <span className={styles.filterForMobles__text}>Filter</span>
          </div>
          {activeFilters.length > 0 && (
            <>
              <div className={styles.yourChoice}>
                <div>Your choice</div>
                <Button className={styles.reset} onClick={reset}>
                  Reset
                </Button>
              </div>

              <div className={styles.filterGroup}>
                {activeFilters.map(({ key, value }) => (
                  <button
                    key={`${key}-${value}`}
                    onClick={() => toggleFilter(key, value)}
                    className={classNames(
                      styles.filterTag,
                      styles['filterTag--active'],
                    )}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </>
          )}
          {category === 'wine' ? (
            <div className={styles.simpleAccordion}>
              {filters.map((filter, index) => (
                <div key={index}>
                  <div
                    className={classNames(styles.accordionControl, {
                      [styles['accordionControl--active']]:
                        activeIndexes.has(index),
                    })}
                    onClick={() => toggleAccordion(index, filter.label)}
                  >
                    <span className={styles.accordionControl__text}>
                      {filter.label}
                    </span>
                    <span
                      className={classNames(styles.arrowDown, {
                        [styles['arrowDown--active']]: activeIndexes.has(index),
                      })}
                    ></span>
                  </div>
                  {activeIndexes.has(index) && (
                    <div className={styles.accordionPanel}>
                      <div className={styles.filterGroup}>
                        {filter.values.map(value => (
                          <button
                            key={value}
                            className={classNames(styles.filterTag, {
                              [styles['filterTag--active']]: searchParams
                                .getAll(filter.key)
                                .includes(value),
                            })}
                            onClick={() => toggleFilter(filter.key, value)}
                          >
                            {`${value} (count)`}
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
              <div className={styles.accordionControl}>
                <span className={styles.accordionControl__text}>
                  Prise range
                </span>
              </div>

              <div className={styles.accordionPanel}>
                <div className={styles.filterGroup}>
                  {priseRange.values.map(value => (
                    <button
                      key={value}
                      className={classNames(styles.filterTag, {
                        [styles['filterTag--active']]: searchParams
                          .getAll('priceRanges')
                          .includes(value),
                      })}
                      onClick={() => toggleFilter('priceRanges', value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Button
            className={styles.button}
            onClick={applyFilters}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Show (count )results'}
          </Button>
        </div>
      )}
    </div>
  );
};
