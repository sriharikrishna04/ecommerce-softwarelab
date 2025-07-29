import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Navbar from './components/Navbar';
import './App.css';
import React, { useState, useEffect } from 'react';
import Checkout from './pages/Checkout';


const App = () => {
  const isLoggedIn = !!localStorage.getItem('loggedInUser');
  const [cartCount, setCartCount] = useState(0);

  // Function to update cart count from localStorage
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setCartCount(count);
  };

  // Update cart count on mount
  useEffect(() => {
    updateCartCount();
    // Listen for cart changes in other tabs/windows
    const onStorage = (e) => {
      if (e.key === 'cart') updateCartCount();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <div>
      <Router>
        <Navbar cartCount={cartCount} />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard updateCartCount={updateCartCount} /> : <Navigate to="/login" />} />
            <Route path="/cart" element={isLoggedIn ? <Cart updateCartCount={updateCartCount} /> : <Navigate to="/login" />} />
            <Route path="/checkout" element={isLoggedIn ? <Checkout updateCartCount={updateCartCount} /> : <Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
