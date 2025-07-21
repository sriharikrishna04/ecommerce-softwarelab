import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const updateCart = (newCart) => {
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const removeFromCart = (indexToRemove) => {
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove);
    updateCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    setShowInvoice(false);
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

          <button
            onClick={clearCart}
            style={{ marginTop: '10px', backgroundColor: '#f97316' }}
          >
            Clear All
          </button>

          {/* ✅ Generate Invoice Button */}
          <div className="cart-invoice-btn">
            <button
              onClick={() => setShowInvoice(true)}
              style={{
                backgroundColor: '#2563eb',
                width: '100%',
                maxWidth: '400px'
              }}
            >
              Generate Invoice
            </button>
          </div>
        </>
      )}

      {/* ✅ Invoice Section */}
      {showInvoice && cartItems.length > 0 && (
        <div
          style={{
            marginTop: '30px',
            padding: '20px',
            border: '2px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#f8f8f8',
            color: 'black'
          }}
        >
          <h3 style={{ textAlign: 'center' }}>Invoice</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Item</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'center' }}>Qty</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>Price (₹)</th>
                <th style={{ borderBottom: '1px solid #ccc', textAlign: 'right' }}>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td style={{ padding: '6px 0' }}>{item.name}</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>{item.quantity || 1}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>{item.price}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>{Number(item.price) * (item.quantity || 1)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} style={{ paddingTop: '10px', fontWeight: 'bold', textAlign: 'right' }}>Total</td>
                <td style={{ paddingTop: '10px', textAlign: 'right', fontWeight: 'bold' }}>
                  ₹{totalCost}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
