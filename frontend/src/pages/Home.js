import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', category: 'Electronics' },
  { id: 2, name: 'Running Shoes', price: 1999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', category: 'Fashion' },
  { id: 3, name: 'Leather Wallet', price: 799, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300', category: 'Accessories' },
  { id: 4, name: 'Smart Watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', category: 'Electronics' },
  { id: 5, name: 'Sunglasses', price: 1299, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300', category: 'Fashion' },
  { id: 6, name: 'Backpack', price: 1599, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', category: 'Accessories' },
];

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        color: '#fff',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '20px' }}>
          Shop The Latest Trends
        </h1>
        <p style={{ fontSize: '18px', color: '#ccc', marginBottom: '35px' }}>
          Discover thousands of products at amazing prices
        </p>
        <Link to="/products" style={{
          backgroundColor: '#e94560',
          color: '#fff',
          padding: '15px 40px',
          borderRadius: '30px',
          textDecoration: 'none',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          Shop Now →
        </Link>
      </div>

      {/* Featured Products */}
      <div style={{ padding: '50px 40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '30px', textAlign: 'center' }}>
          Featured Products
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {products.map(product => (
            <div key={product.id} style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 2px 15px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '15px' }}>
                <span style={{
                  backgroundColor: '#f0f0f0',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  color: '#666'
                }}>{product.category}</span>
                <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '10px 0 5px' }}>{product.name}</h3>
                <p style={{ color: '#e94560', fontWeight: 'bold', fontSize: '18px' }}>₹{product.price}</p>
                <Link to={`/product/${product.id}`} style={{
                  display: 'block',
                  marginTop: '12px',
                  backgroundColor: '#1a1a2e',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>View Details</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;