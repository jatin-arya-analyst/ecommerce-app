import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const allProducts = [
  { id: 1, name: 'Wireless Headphones', price: 2999, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300', category: 'Electronics', description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and crystal clear sound. Perfect for music lovers and professionals alike.', rating: 4.5, reviews: 128 },
  { id: 2, name: 'Running Shoes', price: 1999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', category: 'Fashion', description: 'Lightweight and breathable running shoes with superior cushioning. Designed for both casual wear and serious runners.', rating: 4.3, reviews: 95 },
  { id: 3, name: 'Leather Wallet', price: 799, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300', category: 'Accessories', description: 'Genuine leather bifold wallet with multiple card slots, cash compartment, and RFID blocking technology.', rating: 4.7, reviews: 203 },
  { id: 4, name: 'Smart Watch', price: 4999, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', category: 'Electronics', description: 'Feature-packed smartwatch with health tracking, GPS, notifications, and 7-day battery life. Water resistant up to 50m.', rating: 4.6, reviews: 312 },
  { id: 5, name: 'Sunglasses', price: 1299, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300', category: 'Fashion', description: 'Stylish UV400 polarized sunglasses. Lightweight frame with scratch-resistant lenses. Perfect for outdoor activities.', rating: 4.2, reviews: 76 },
  { id: 6, name: 'Backpack', price: 1599, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300', category: 'Accessories', description: '30L capacity backpack with laptop compartment, multiple pockets, and ergonomic shoulder straps. Ideal for travel and daily use.', rating: 4.4, reviews: 154 },
  { id: 7, name: 'Bluetooth Speaker', price: 3499, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300', category: 'Electronics', description: 'Portable Bluetooth speaker with 360-degree sound, 12-hour battery, IPX7 waterproof rating. Perfect for outdoor adventures.', rating: 4.5, reviews: 89 },
  { id: 8, name: 'Casual T-Shirt', price: 599, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300', category: 'Fashion', description: '100% cotton premium casual t-shirt. Breathable, soft fabric with a relaxed fit. Available in multiple colors.', rating: 4.1, reviews: 267 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) return <div style={{ padding: '50px', textAlign: 'center' }}>Product not found.</div>;

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#e94560', fontSize: '16px', marginBottom: '20px'
      }}>← Back</button>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', backgroundColor: '#fff', borderRadius: '16px', padding: '40px', boxShadow: '0 2px 20px rgba(0,0,0,0.1)' }}>
        <div>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '12px', objectFit: 'cover', height: '350px' }} />
        </div>

        <div>
          <span style={{ backgroundColor: '#f0f0f0', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', color: '#666' }}>{product.category}</span>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '15px 0 10px' }}>{product.name}</h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <span style={{ color: '#f5a623', fontSize: '20px' }}>{stars}</span>
            <span style={{ color: '#666', fontSize: '14px' }}>({product.reviews} reviews)</span>
          </div>

          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#e94560', marginBottom: '20px' }}>₹{product.price}</p>

          <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '25px', fontSize: '15px' }}>{product.description}</p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
            <span style={{ fontWeight: '500' }}>Quantity:</span>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: '18px', background: '#f5f5f5' }}>-</button>
              <span style={{ padding: '8px 16px', fontWeight: '600' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ padding: '8px 14px', border: 'none', cursor: 'pointer', fontSize: '18px', background: '#f5f5f5' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={handleAddToCart} style={{
              flex: 1, padding: '14px', backgroundColor: added ? '#28a745' : '#e94560',
              color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer', transition: 'background 0.3s'
            }}>
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
            <button onClick={() => navigate('/cart')} style={{
              flex: 1, padding: '14px', backgroundColor: '#1a1a2e',
              color: '#fff', border: 'none', borderRadius: '10px', fontSize: '16px',
              fontWeight: '600', cursor: 'pointer'
            }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;