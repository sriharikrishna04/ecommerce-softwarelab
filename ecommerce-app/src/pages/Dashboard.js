import React, { useState } from 'react';
import products from '../data/products.json';

const Dashboard = () => {
  const username = localStorage.getItem('loggedInUser');
  const [quantities, setQuantities] = useState({});

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
    alert('Added to cart');
  };

  return (
    <div className="container">
      <h2>Hello, {username}</h2>
      <h3>Our Products</h3>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} width="150" />
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <button onClick={() => handleQuantityChange(product.id, -1)} style={{ width: 32 }}>-</button>
              <span style={{ margin: '0 12px', minWidth: 24, display: 'inline-block', textAlign: 'center' }}>{quantities[product.id] || 1}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)} style={{ width: 32 }}>+</button>
            </div>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
