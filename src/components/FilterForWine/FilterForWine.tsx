import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStoreForWine } from '../../store/storeForWine';

const filtersFromServer = {
  "wineTypes": ["Red", "Rose", "Sparkling", "White"],
  "priceRanges": ["00-49", "50-74", "75-99", "100-149", "150-199", "200+"],
  "grape": ["Cabernet Sauvignon", "Merlot", "Chardonnay", "Pinot Noir"],
  "country": ["France", "Italy", "Spain", "USA"],
  "vintage": ["2020", "2019", "2018", "2017"],
  "capacity": ["750ml", "1L", "1.5L"],
  "abv": ["12%", "13%", "14%", "15%"],
  "region": ["Bordeaux", "Tuscany", "La Rioja"]
}
export const FilterForWine = () => {
  // const setWine = useStoreForWine((state) => state.setWine);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<{
    label: string;
    key: string;
    values: string[];
  }[]>([]);;

  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        // const response = await axios.get('/path-to-api/filters');
        const filterData = filtersFromServer;

        const filterCategories = [
          { label: 'Type', key: 'wineTypes' },
          { label: 'Price range', key: 'priceRanges' },
          { label: 'Grape', key: 'grape' },
          { label: 'Country', key: 'country' },
          { label: 'Vintage', key: 'vintage' },
          { label: 'Capacity', key: 'capacity' },
          { label: 'ABV', key: 'abv' },
          { label: 'Region', key: 'region' }
        ];

        const mappedFilters = filterCategories.map(({ label, key }) => ({
          label,
          key,
          values: filterData[key as keyof typeof filtersFromServer] || []
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
      newParams.append(key.toLowerCase(), value);
    }

    setSearchParams(newParams);
  };

  const activeFilters = Array.from(searchParams.entries());

  const applyFilters = async () => {
    setLoading(true);
    try {
      // const params = new URLSearchParams(activeFilters);
      // const response = await axios.get(`/wines?${params.toString()}`);
      // setWine(response.data);
      setIsOpen(false);
    } catch (error) {
      console.log('Error fetching filtered data:', error);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSearchParams(new URLSearchParams());
    setIsOpen(false);
    setActiveIndex(null);
  };

  
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
    const toggleAccordion = (index: number) => {
      setActiveIndex((prev) => (prev === index ? null : index));
    };

    return (
      <>
        <button className="filter-btn" onClick={() => setIsOpen(prevState => !prevState)}>
          Filter ▼
        </button>
     
        {isOpen && !error && (
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
                    {value}
                  </button>
                ))}
              </div>

              <div className="simple-accordion">
                {filters.map((filter, index) => (
                  <div key={index}>
                    <div
                      className="accordion-control"
                      onClick={() => toggleAccordion(index)}
                    >
                      {filter.label}
                    </div>
                    {activeIndex === index && (
                      <div className="accordion-panel">
                        <div className="filter-group">
                          {filter.values.map((value) => (
                            <button key={value} className="filter-tag" onClick={() => toggleFilter(filter.key, value)}>
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
  

              <div className="filter-actions">
                <button className="show-results" onClick={applyFilters} disabled={loading}>
                  {loading ? 'Loading...' : 'Show results'}
                </button>
                <button onClick={reset}>Reset</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

