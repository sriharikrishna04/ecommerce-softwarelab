import React, { useState } from 'react';
import products from '../data/products.json';

const Dashboard = ({ updateCartCount }) => {
  const username = localStorage.getItem('loggedInUser');
  const [quantities, setQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleQuantityChange = (id, delta) => {
    setQuantities(q => {
      const newQty = Math.max(1, (q[id] || 1) + delta);
      return { ...q, [id]: newQty };
    });
  };

  const addToCart = (product) => {
    const qty = quantities[product.id] || 1;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    // Check if product already in cart
    const existingIndex = cart.findIndex(item => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity += qty;
    } else {
      cart.push({ ...product, quantity: qty });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    if (typeof updateCartCount === 'function') updateCartCount();
    alert('Added to cart');
  };

  return (
    <div className="container" style={{ display: 'flex', alignItems: 'flex-start', gap: '32px' }}>
      {/* Sidebar Filters */}
      <div style={{ minWidth: 220, maxWidth: 260, background: '#fffbe6', border: '2px solid #ffd700', borderRadius: 12, padding: '24px 18px', boxShadow: '0 2px 12px 0 rgba(212,175,55,0.07)', marginRight: 12 }}>
        <h3 style={{ color: '#bfa43a', fontWeight: 700, fontSize: '1.15rem', marginBottom: 18 }}>Filters</h3>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1.5px solid #ffd700', fontSize: '1rem' }}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
          style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 8, border: '1.5px solid #ffd700', fontSize: '1rem' }}
        />
      </div>
      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: 350, margin: '18px auto 24px auto', display: 'block', padding: 8, borderRadius: 8, border: '1.5px solid #ffd700', fontSize: '1rem', textAlign: 'center' }}
        />
        <h2>Hello, {username}</h2>
        <h3>Our Products</h3>
        <div className="product-grid">
          {products
            .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .filter(product => minPrice === "" || product.price >= Number(minPrice))
            .filter(product => maxPrice === "" || product.price <= Number(maxPrice))
            .map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} width="150" />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                  <span>{quantities[product.id] || 1}</span>
                  <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
                </div>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
