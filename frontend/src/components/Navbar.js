import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    navigate('/');
  };

  return (
    <nav style={{
      backgroundColor: '#1a1a2e', padding: '0 40px',
      display: 'flex', justifyContent: 'space-between',
      alignItems: 'center', height: '65px',
      position: 'sticky', top: 0, zIndex: 1000,
      boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h1 style={{ color: '#e94560', fontSize: '24px', fontWeight: 'bold' }}>🛍️ ShopEase</h1>
      </Link>

      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Home</Link>
        <Link to="/products" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Products</Link>
        <Link to="/cart" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px', position: 'relative' }}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              position: 'absolute', top: '-8px', right: '-10px',
              backgroundColor: '#e94560', color: '#fff', borderRadius: '50%',
              width: '18px', height: '18px', fontSize: '11px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>{cartCount}</span>
          )}
        </Link>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/admin" style={{ color: '#fff', textDecoration: 'none', fontSize: '15px' }}>Admin</Link>
            )}
            <span style={{ color: '#fff', fontSize: '14px' }}>👋 {user.name}</span>
            <button onClick={handleLogout} style={{
              backgroundColor: '#e94560', color: '#fff', border: 'none',
              padding: '8px 18px', borderRadius: '25px', cursor: 'pointer',
              fontSize: '14px', fontWeight: '500'
            }}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{
            backgroundColor: '#e94560', color: '#fff',
            padding: '8px 20px', borderRadius: '25px',
            textDecoration: 'none', fontSize: '14px', fontWeight: '500'
          }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;