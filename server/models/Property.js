const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  zipCode: String,
  type: {
    type: String,
    enum: ['house', 'apartment', 'commercial', 'land'],
    default: 'house'
  },
  bedrooms: Number,
  bathrooms: Number,
  area: Number, // in sq ft
  // Optional fields for Indian-style listings / payments
  saleOrRent: {
    type: String,
    enum: ['sale', 'rent'],
    default: 'sale'
  },
  pricePerMonth: Number, // for rentals (INR/month)
  paymentOptions: [String], // e.g., ['EMI','UPI','NetBanking']
  agent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  images: [String],
  amenities: [String],
  featured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);
