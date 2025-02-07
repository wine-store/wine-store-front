import axios from 'axios';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStoreForWine } from '../../store/storeForWine';

export const FilterForWine = () => {
  const setWine = useStoreForWine((state) => state.setWine);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const activeFilters = Array.from(searchParams.entries());

  const wineTypes = ['Red', 'Rose', 'Sparkling', 'White'];
  const priceRanges = ['00-49', '50-74', '75-99', '100-149', '150-199', '200+'];

  const applyFilters = async() => {
    setLoading(true);
    try {
      const params = new URLSearchParams(activeFilters);
      const response = await axios.get(`/wines?${params.toString()}`);
      setWine(response.data);
      setIsOpen(false);
      } catch (error) {
        console.log("Error fetching filtered data:", error);
      } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSearchParams(new URLSearchParams());
    setIsOpen(false);
  }
    
  return (
    <>
      <button className="filter-btn" onClick={() => setIsOpen(true)}>
        Filter ▼
      </button>

      {isOpen && (
        <div className="filter-modal">
          <div className="filter-content">
            <h3>Your choice</h3>
            <div className="selected-filters">
              {activeFilters.map(([key, value]) => (
                <button
                  key={`${key}-${value}`}
                  onClick={() => toggleFilter(key, value)}
                  className="filter-tag"
                >
                  {key}: {value} 
                </button>
              ))}
            </div>

            <h3>Type</h3>
            <div className="filter-group">
              {wineTypes.map((type, index) => (
                <button key={`${type}-${index}`} onClick={() => toggleFilter('type', type)}>
                  {type}
                </button>
              ))}
            </div>

            <h3>Price range</h3>
            <div className="filter-group">
              {priceRanges.map((price, index) => (
                <button key={`${price}-${index}`} onClick={() => toggleFilter('price', price)}>
                  {price}
                </button>
              ))}
            </div>

            <div className="filter-actions">
              <button className="show-results" onClick={applyFilters} disabled={loading}>
                Show results
              </button>
              <button onClick={reset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
