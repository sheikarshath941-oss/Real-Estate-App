const connectDB = require('./config/db');
const Property = require('./models/Property');

const seedProperties = [
  {
    title: 'Modern Family Home',
    description: 'A beautiful 4 bedroom family home with spacious garden.',
    price: 450000,
    location: '123 Maple Street',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62704',
    type: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    images: ['/images/imgs/Modern-living-room-with-large-sectional-and-artistic-wall-decor.webp'],
    amenities: ['Garage', 'Garden', 'Fireplace'],
    featured: true
  },
  {
    title: 'Mumbai Central Apartment',
    description: 'Stylish 2 BHK apartment in the heart of Mumbai.',
    // price in INR for sale
    price: 7500000,
    // typical local address format
    location: '45 Marine Lines, Apt 8B',
    city: 'Mumbai',
    state: 'MH',
    zipCode: '400020',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 980,
    images: ['/images/imgs/Hiranandani-Gardens-Apartments-Powai-Mumbai.jpg'],
    amenities: ['Lift', 'Security'],
    featured: false,
    // Indian-specific fields
    saleOrRent: 'sale',
    pricePerMonth: 0,
    paymentOptions: ['EMI', 'UPI', 'NetBanking']
  },
  {
    title: 'Office Space',
    description: 'Open plan commercial office suitable for small teams.',
    price: 750000,
    location: '200 Business Park',
    city: 'Greenville',
    state: 'CA',
    zipCode: '90210',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 4500,
    images: ['/images/imgs/office-space-with-abundance-natural-light-office-space-images-office-space-designs_1002350-1816.jpg'],
    amenities: ['Parking', 'Cafeteria'],
    featured: false
  },
  {
    title: 'Cozy Cottage',
    description: 'Charming 2 bedroom cottage near the lake.',
    price: 220000,
    location: '7 Lakeview Lane',
    city: 'Lakeside',
    state: 'FL',
    zipCode: '32003',
    type: 'house',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    images: ['/images/imgs/cozy-cottage.jpg'],
    amenities: ['Boat Dock', 'Patio'],
    featured: false
  },
  {
    title: 'Vacant Land Parcel',
    description: '10 acres of undeveloped land, perfect for investment.',
    price: 150000,
    location: 'County Road 12',
    city: 'Hillview',
    state: 'TX',
    zipCode: '75001',
    type: 'land',
    bedrooms: 0,
    bathrooms: 0,
    area: 435600,
    images: ['/images/imgs/vacant-land.webp'],
    amenities: [],
    featured: false
  }
];

const seed = async () => {
  try {
    await connectDB();
    // Clear existing properties (DEV ONLY)
    await Property.deleteMany({});
    const created = await Property.insertMany(seedProperties);
    console.log(`Inserted ${created.length} properties`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
