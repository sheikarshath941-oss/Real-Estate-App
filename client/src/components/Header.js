import React from 'react';

const Header = ({ isLoggedIn, userRole, onLogout }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <h1>RealEstate Pro</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/listings">Properties</a></li>
            {isLoggedIn && userRole === 'agent' && (
              <li><a href="/my-listings">My Listings</a></li>
            )}
            {isLoggedIn ? (
              <>
                <li><a href="/profile">Profile</a></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
