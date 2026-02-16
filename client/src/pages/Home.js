import React, { useState, useEffect } from 'react';
import { propertyAPI } from '../services/api';
import PropertyCard from '../components/PropertyCard';

const Home = () => {
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        const response = await propertyAPI.getAll({ featured: true });
        setFeaturedProperties(response.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProperties();
  }, []);

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Discover the best properties with RealEstate Pro</p>
          <div className="search-bar">
            <input type="text" placeholder="Search by city, property type..." />
            <button>Search</button>
          </div>
        </div>
      </section>

      <section className="featured-properties">
        <div className="container">
          <h2>Featured Properties</h2>
          {loading ? (
            <p>Loading properties...</p>
          ) : (
            <div className="properties-grid">
              {featuredProperties.map(property => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Whether you're buying, selling, or renting, we're here to help.</p>
          <div className="cta-buttons">
            <a href="/listings" className="btn">Browse Properties</a>
            <a href="/register" className="btn btn-secondary">List Your Property</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
