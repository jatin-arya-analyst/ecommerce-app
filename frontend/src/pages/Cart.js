import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => item.id === id ? { ...item, quantity: newQty } : item);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 99 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) return (
    <div style={{ textAlign: 'center', padding: '80px 40px' }}>
      <p style={{ fontSize: '60px' }}>🛒</p>
      <h2 style={{ fontSize: '24px', margin: '20px 0 10px' }}>Your cart is empty</h2>
      <p style={{ color: '#999', marginBottom: '30px' }}>Add some products to get started!</p>
      <Link to="/products" style={{
        backgroundColor: '#e94560', color: '#fff',
        padding: '12px 30px', borderRadius: '25px',
        textDecoration: 'none', fontWeight: '600'
      }}>Browse Products</Link>
    </div>
  );

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px' }}>Shopping Cart ({cartItems.length} items)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        {/* Cart Items */}
        <div>
          {cartItems.map(item => (
            <div key={item.id} style={{
              backgroundColor: '#fff', borderRadius: '12px',
              padding: '20px', marginBottom: '15px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
              display: 'flex', gap: '20px', alignItems: 'center'
            }}>
              <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '8px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{item.name}</h3>
                <p style={{ color: '#666', fontSize: '13px', marginBottom: '10px' }}>{item.category}</p>
                <p style={{ color: '#e94560', fontWeight: 'bold', fontSize: '18px' }}>₹{item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', background: '#f5f5f5', fontSize: '16px' }}>-</button>
                  <span style={{ padding: '6px 14px', fontWeight: '600' }}>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', background: '#f5f5f5', fontSize: '16px' }}>+</button>
                </div>
                <p style={{ fontWeight: '600', minWidth: '80px', textAlign: 'right' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeItem(item.id)} style={{ padding: '6px 12px', border: 'none', cursor: 'pointer', color: '#e94560', background: '#fff', fontSize: '16px', fontWeight: '600' }}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#f9f9f9', borderRadius: '12px', padding: '25px', height: 'fit-content', position: 'sticky', top: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>Order Summary</h3>
          <div style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>
            <span>Total</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button onClick={() => navigate('/checkout')} style={{
            width: '100%', padding: '14px', backgroundColor: '#e94560', color: '#fff',
            border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold',
            cursor: 'pointer', marginBottom: '10px'
          }}>Proceed to Checkout</button>
          <Link to="/products" style={{
            display: 'block', textAlign: 'center', padding: '12px',
            color: '#e94560', textDecoration: 'none', fontWeight: '600',
            border: '1px solid #e94560', borderRadius: '8px'
          }}>Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;