import React, { useState, useEffect } from 'react';

const Checkout = ({ updateCartCount }) => {
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({ name: '', address: '', phone: '' });
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState({ cart: [], total: 0 });

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(items);
  }, []);

  const totalCost = cartItems.reduce((sum, item) => sum + Number(item.price) * (item.quantity || 1), 0);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    if (typeof updateCartCount === 'function') updateCartCount();
  };

  if (cartItems.length === 0 && !orderConfirmed) {
    return <div className="invoice-bill"><div className="invoice-header">No items in cart.</div></div>;
  }

  return (
    <div className="container">
      {!orderConfirmed && (
        <div className="invoice-bill">
          <div className="invoice-header">EBUZZIFY - Invoice</div>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th>Price (₹)</th>
                <th>Subtotal (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity || 1}</td>
                  <td style={{ textAlign: 'right' }}>{item.price}</td>
                  <td style={{ textAlign: 'right' }}>{Number(item.price) * (item.quantity || 1)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="invoice-total">Total</td>
                <td className="invoice-total">₹{totalCost}</td>
              </tr>
            </tbody>
          </table>
          <div className="invoice-header" style={{ fontSize: '1.1rem', margin: '18px 0 8px 0' }}>Delivery Details</div>
          <form onSubmit={e => {
            e.preventDefault();
            setConfirmedOrder({ cart: cartItems, total: totalCost });
            localStorage.setItem('lastOrder', JSON.stringify({ address, cart: cartItems, total: totalCost, date: new Date().toISOString() }));
            setOrderConfirmed(true);
            clearCart();
          }}>
            <div style={{ marginBottom: 12 }}>
              <input required placeholder="Full Name" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #ffd700' }}
                value={address.name} onChange={e => setAddress({ ...address, name: e.target.value })} />
              <input required placeholder="Address" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #ffd700' }}
                value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} />
              <input required placeholder="Phone Number" type="tel" pattern="[0-9]{10,}" style={{ width: '100%', marginBottom: 8, padding: 8, borderRadius: 6, border: '1px solid #ffd700' }}
                value={address.phone} onChange={e => setAddress({ ...address, phone: e.target.value })} />
            </div>
            <div className="invoice-header" style={{ fontSize: '1.1rem', margin: '18px 0 8px 0' }}>Order Summary</div>
            <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: '1rem' }}>
              {cartItems.map((item, idx) => (
                <li key={idx} style={{ marginBottom: 4 }}>
                  {item.name} x {item.quantity || 1} = ₹{Number(item.price) * (item.quantity || 1)}
                </li>
              ))}
            </ul>
            <div className="invoice-total" style={{ margin: '10px 0 0 0' }}>Total: ₹{totalCost}</div>
            <button className="checkout-btn" type="submit" style={{ marginTop: 18 }}>Confirm Order</button>
          </form>
        </div>
      )}
      {orderConfirmed && (
        <div className="invoice-bill">
          <div className="invoice-header">Order Confirmed!</div>
          <div style={{ margin: '18px 0', fontSize: '1.1rem' }}>
            Thank you, <b>{address.name}</b>!<br />
            Your order will be delivered to:<br />
            <span style={{ color: '#bfa43a' }}>{address.address}</span><br />
            <span>Contact: {address.phone}</span>
          </div>
          <div className="invoice-header" style={{ fontSize: '1.1rem', margin: '18px 0 8px 0' }}>Order Summary</div>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none', fontSize: '1rem' }}>
            {confirmedOrder.cart.map((item, idx) => (
              <li key={idx} style={{ marginBottom: 4 }}>
                {item.name} x {item.quantity || 1} = ₹{Number(item.price) * (item.quantity || 1)}
              </li>
            ))}
          </ul>
          <div className="invoice-total" style={{ margin: '10px 0 0 0' }}>Total: ₹{confirmedOrder.total}</div>
          <div style={{ marginTop: 18, color: '#2563eb', fontWeight: 600 }}>You will receive a confirmation call soon.</div>
        </div>
      )}
    </div>
  );
};

export default Checkout; 