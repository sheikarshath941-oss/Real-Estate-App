import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';

const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    type: '',
    priceMin: '',
    priceMax: ''
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyAPI.getAll(filters);
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      city: '',
      type: '',
      priceMin: '',
      priceMax: ''
    });
  };

  return (
    <div className="listings-page">
      <div className="container">
        <h1>Property Listings</h1>

        <div className="filters">
          <div className="filter-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder="Enter city"
            />
          </div>

          <div className="filter-group">
            <label>Type</label>
            <select name="type" value={filters.type} onChange={handleFilterChange}>
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="commercial">Commercial</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Min Price</label>
            <input
              type="number"
              name="priceMin"
              value={filters.priceMin}
              onChange={handleFilterChange}
              placeholder="Minimum price"
            />
          </div>

          <div className="filter-group">
            <label>Max Price</label>
            <input
              type="number"
              name="priceMax"
              value={filters.priceMax}
              onChange={handleFilterChange}
              placeholder="Maximum price"
            />
          </div>

          <button onClick={handleResetFilters} className="btn-reset">Reset Filters</button>
        </div>

        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <>
            <p className="result-count">Found {properties.length} properties</p>
            <div className="properties-grid">
              {properties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Listings;
