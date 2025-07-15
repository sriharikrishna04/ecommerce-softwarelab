import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
          <Link to="/" className="navbar-logo">EBUZZIFY</Link>
        </div>
        <div className="navbar-right">
          {!isLoggedIn && <>
            <Link to="/register" className="navbar-link">Register</Link>
            <Link to="/login" className="navbar-link">Login</Link>
          </>}
          {isLoggedIn && <>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            <Link to="/cart" className="navbar-link">Cart</Link>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </>}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
