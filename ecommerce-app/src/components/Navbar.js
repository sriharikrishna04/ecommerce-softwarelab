import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  const isLoggedIn = !!localStorage.getItem('loggedInUser');
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('cart');
    window.location.href = '/';
  };

  return (
    <header className="navbar">
      <nav className="navbar-content">
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/images/image-removebg-preview.png" alt="EBUZZIFY Logo" style={{ height: '80px', width: '80px', objectFit: 'contain', marginRight: '4px' }} />
            {/*<span style={{ fontWeight: 'bold', fontSize: '1.3rem', color: '#d87d4a', letterSpacing: '2px' }}>EBUZZIFY</span>*/}
          </Link>
        </div>
        <div className="navbar-right">
          {!isLoggedIn && <>
            <Link to="/register" className="navbar-link">Register</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </>}
          {isLoggedIn && <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/cart" className="navbar-link">
              Cart{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
