import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { propertyAPI } from '../services/api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyAPI.getById(id);
        setProperty(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const formatterINR = (value) => {
    try {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    } catch (e) {
      return value;
    }
  };

  const displayPrice = () => {
    if (property.saleOrRent === 'rent' && property.pricePerMonth) {
      return `${formatterINR(property.pricePerMonth)} / month`;
    }
    if (property.price) return formatterINR(property.price);
    return 'Price on request';
  };

  if (loading) return <div className="container"><p>Loading property details...</p></div>;
  if (error) return <div className="container"><p className="error-message">{error}</p></div>;
  if (!property) return <div className="container"><p>Property not found</p></div>;

  return (
    <div className="property-details-page">
      <div className="container">
        <div className="property-gallery">
          {property.images && property.images.length > 0 ? (
            <img src={property.images[0]} alt={property.title} className="main-image" />
          ) : (
            <img src="https://via.placeholder.com/600x400" alt={property.title} className="main-image" />
          )}
        </div>

        <div className="property-info">
          <h1>{property.title}</h1>
          <p className="property-type">{property.type}</p>
          <p className="property-price">{displayPrice()}</p>
          {property.paymentOptions && property.paymentOptions.length > 0 && (
            <p className="payment-options"><strong>Payment Options:</strong> {property.paymentOptions.join(', ')}</p>
          )}

          <div className="property-quick-info">
            <div className="info-item">
              <span className="label">Bedrooms:</span>
              <span className="value">{property.bedrooms}</span>
            </div>
            <div className="info-item">
              <span className="label">Bathrooms:</span>
              <span className="value">{property.bathrooms}</span>
            </div>
            <div className="info-item">
              <span className="label">Area:</span>
              <span className="value">{property.area} Sq Ft</span>
            </div>
            <div className="info-item">
              <span className="label">Status:</span>
              <span className="value">{property.status}</span>
            </div>
          </div>

          <div className="property-description">
            <h2>Description</h2>
            <p>{property.description}</p>
          </div>

          <div className="property-location">
            <h2>Location</h2>
            <p>{property.location}</p>
            <p>{property.city}, {property.state} {property.zipCode}</p>
          </div>

          {property.amenities && property.amenities.length > 0 && (
            <div className="property-amenities">
              <h2>Amenities</h2>
              <ul>
                {property.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="agent-info">
            <h2>Agent Information</h2>
            {property.agent ? (
              <div>
                <p><strong>Name:</strong> {property.agent.name}</p>
                <p><strong>Email:</strong> {property.agent.email}</p>
                <p><strong>Phone:</strong> {property.agent.phone}</p>
              </div>
            ) : (
              <p>Agent information not available</p>
            )}
          </div>

          <button className="btn btn-contact">Contact Agent</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
