import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>RealEstate Pro is your trusted platform for buying, selling, and renting properties.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/listings">Properties</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: sheikarshath941@gmail.com</p>
            <p>Phone: +91 8122841324</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 RealEstate Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
