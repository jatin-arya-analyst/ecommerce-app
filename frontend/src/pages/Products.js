import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (selectedCategory !== 'All') params.category = selectedCategory;
      const { data } = await axios.get('http://localhost:5000/api/products', { params });
      let sorted = [...data];
      if (sortBy === 'low') sorted.sort((a, b) => a.price - b.price);
      if (sortBy === 'high') sorted.sort((a, b) => b.price - a.price);
      setProducts(sorted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, [selectedCategory, sortBy]);

  const categories = ['All', 'Electronics', 'Fashion', 'Accessories'];

  return (
    <div style={{ padding: '30px 40px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '25px' }}>All Products</h2>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input type="text" placeholder="Search products..."
          value={search} onChange={e => setSearch(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && fetchProducts()}
          style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', width: '250px' }} />
        <div style={{ display: 'flex', gap: '10px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{
              padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer',
              backgroundColor: selectedCategory === cat ? '#e94560' : '#f0f0f0',
              color: selectedCategory === cat ? '#fff' : '#333',
              fontWeight: '500', fontSize: '14px'
            }}>{cat}</button>
          ))}
        </div>
        <select onChange={e => setSortBy(e.target.value)}
          style={{ padding: '10px 15px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', cursor: 'pointer' }}>
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
        <button onClick={fetchProducts} style={{
          backgroundColor: '#e94560', color: '#fff', border: 'none',
          padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
        }}>Search</button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '50px' }}>Loading products...</p>
      ) : (
        <div>
          <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>{products.length} products found</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '25px' }}>
            {products.map(product => (
              <div key={product._id} style={{
                backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden',
                boxShadow: '0 2px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                <div style={{ padding: '15px' }}>
                  <span style={{ backgroundColor: '#f0f0f0', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', color: '#666' }}>{product.category}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '10px 0 5px' }}>{product.name}</h3>
                  <p style={{ color: '#e94560', fontWeight: 'bold', fontSize: '18px' }}>₹{product.price}</p>
                  <Link to={`/product/${product._id}`} style={{
                    display: 'block', marginTop: '12px', backgroundColor: '#1a1a2e',
                    color: '#fff', padding: '10px', borderRadius: '8px',
                    textAlign: 'center', textDecoration: 'none', fontSize: '14px'
                  }}>View Details</Link>
                </div>
              </div>
            ))}
          </div>
          {products.length === 0 && (
            <p style={{ textAlign: 'center', color: '#999', marginTop: '50px', fontSize: '18px' }}>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;