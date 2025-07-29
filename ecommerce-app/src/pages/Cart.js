import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [address, setAddress] = useState({ name: '', address: '', phone: '' });
  const [confirmedOrder, setConfirmedOrder] = useState({ cart: [], total: 0 });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    if (typeof updateCartCount === 'function') updateCartCount();
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setShowInvoice(false);
    if (typeof updateCartCount === 'function') updateCartCount();
  };

  const changeQuantity = (index, delta) => {
    const updatedCart = cartItems.map((item, i) => {
      if (i === index) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const totalCost = cartItems.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-img" />
              <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <div className="cart-quantity-controls">
                  <button onClick={() => changeQuantity(index, -1)}>-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => changeQuantity(index, 1)}>+</button>
                </div>
              </div>
              <button className="cart-remove-btn" onClick={() => removeFromCart(index)}>Remove</button>
            </div>
          ))}
          <hr />
          <h3>Total Cost: ₹{totalCost}</h3>
          <button className="checkout-btn" onClick={() => navigate('/checkout')} style={{ marginTop: 18 }}>Proceed to Checkout</button>
          <button
            onClick={clearCart}
            style={{ marginTop: '10px', backgroundColor: '#f97316' }}
          >
            Clear All
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
