import React from 'react';

const PropertyCard = ({ property }) => {
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

  // Resolve image: prefer src/imgs map, then absolute/public path, then external URL
  const resolveImage = (img) => {
    if (!img) return '/images/placeholder.svg';
    // If it starts with '/' assume public path (served from public/)
    if (img.startsWith('/')) return img;
    // If it's a full URL
    if (img.startsWith('http')) return img;
    // fallback to public images imgs folder
    return `/images/imgs/${img}`;
  };

  // Debug: log resolved image path (helps when images don't load)
  try {
    const resolved = resolveImage(property.images?.[0]);
    // eslint-disable-next-line no-console
    console.debug('Property image resolved:', property._id, resolved);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.debug('Property image resolve error', property._id, e);
  }

  return (
    <div className="property-card">
      <div className="property-image">
        <img src={resolveImage(property.images?.[0])} alt={property.title} />
      </div>
      <div className="property-content">
        <h3>{property.title}</h3>
        <p className="property-type">{property.type}</p>
        <p className="property-location">{property.location}</p>
        <div className="property-details">
          <span>{property.bedrooms} Beds</span>
          <span>{property.bathrooms} Baths</span>
          <span>{property.area} Sq Ft</span>
        </div>
        <div className="property-footer">
          <p className="price">{displayPrice()}</p>
          <a href={`/property/${property._id}`} className="btn-view">View Details</a>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
