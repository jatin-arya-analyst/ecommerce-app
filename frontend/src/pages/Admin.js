import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', category: 'Electronics', stock: '', image: '', description: '' });
  const [msg, setMsg] = useState('');

  const token = user?.token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    const { data } = await axios.get('http://localhost:5000/api/products');
    setProducts(data);
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders/all', config);
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`, config);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setForm({ name: product.name, price: product.price, category: product.category, stock: product.stock, image: product.image || '', description: product.description || '' });
    setShowForm(true);
  };

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.stock) return alert('Fill all fields');
    try {
      if (editProduct) {
        await axios.put(`http://localhost:5000/api/products/${editProduct._id}`, form, config);
      } else {
        await axios.post('http://localhost:5000/api/products', form, config);
      }
      setMsg(editProduct ? '✅ Product updated!' : '✅ Product added!');
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: '', price: '', category: 'Electronics', stock: '', image: '', description: '' });
      fetchProducts();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setMsg('❌ Failed. Make sure you are logged in as admin.');
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status }, config);
    fetchOrders();
  };

  const stats = [
    { label: 'Total Products', value: products.length, icon: '📦', color: '#4e54c8' },
    { label: 'Total Orders', value: orders.length, icon: '🛒', color: '#e94560' },
    { label: 'Total Revenue', value: '₹' + orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0), icon: '💰', color: '#28a745' },
    { label: 'Total Users', value: '—', icon: '👥', color: '#ff6b35' },
  ];

  const statusColor = { Delivered: '#28a745', Shipped: '#007bff', Processing: '#ff6b35', Cancelled: '#e94560' };

  const inputStyle = {
    width: '100%', padding: '10px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', marginBottom: '12px'
  };

  return (
    <div style={{ display: 'flex', minHeight: '90vh' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', backgroundColor: '#1a1a2e', padding: '30px 0', flexShrink: 0 }}>
        <h2 style={{ color: '#e94560', textAlign: 'center', fontSize: '20px', marginBottom: '30px' }}>⚙️ Admin</h2>
        {[
          { key: 'dashboard', label: '📊 Dashboard' },
          { key: 'products', label: '📦 Products' },
          { key: 'orders', label: '🛒 Orders' },
        ].map(item => (
          <button key={item.key} onClick={() => setActiveTab(item.key)} style={{
            display: 'block', width: '100%', padding: '14px 25px',
            backgroundColor: activeTab === item.key ? '#e94560' : 'transparent',
            color: '#fff', border: 'none', cursor: 'pointer',
            textAlign: 'left', fontSize: '15px', fontWeight: '500'
          }}>{item.label}</button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', backgroundColor: '#f5f5f5' }}>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
              {stats.map(stat => (
                <div key={stat.label} style={{
                  backgroundColor: '#fff', borderRadius: '12px', padding: '25px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.08)', borderLeft: `4px solid ${stat.color}`
                }}>
                  <p style={{ fontSize: '30px', marginBottom: '10px' }}>{stat.icon}</p>
                  <p style={{ fontSize: '26px', fontWeight: 'bold', color: stat.color }}>{stat.value}</p>
                  <p style={{ color: '#666', fontSize: '14px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Manage Products</h2>
              <button onClick={() => { setShowForm(true); setEditProduct(null); setForm({ name: '', price: '', category: 'Electronics', stock: '', image: '', description: '' }); }} style={{
                backgroundColor: '#e94560', color: '#fff', border: 'none',
                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600'
              }}>+ Add Product</button>
            </div>

            {msg && <p style={{ padding: '10px 15px', borderRadius: '8px', marginBottom: '15px', backgroundColor: msg.includes('✅') ? '#e8f5e9' : '#ffebee', color: msg.includes('✅') ? '#2e7d32' : '#c62828' }}>{msg}</p>}

            {showForm && (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }}>
                <h3 style={{ marginBottom: '20px', fontWeight: 'bold' }}>{editProduct ? 'Edit Product' : 'Add New Product'}</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div><label style={{ fontSize: '13px', fontWeight: '500' }}>Product Name</label><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '13px', fontWeight: '500' }}>Price (₹)</label><input type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '13px', fontWeight: '500' }}>Stock</label><input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} style={inputStyle} /></div>
                  <div><label style={{ fontSize: '13px', fontWeight: '500' }}>Category</label>
                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                      <option>Electronics</option><option>Fashion</option><option>Accessories</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '13px', fontWeight: '500' }}>Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} /></div>
                  <div style={{ gridColumn: '1 / -1' }}><label style={{ fontSize: '13px', fontWeight: '500' }}>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} /></div>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <button onClick={handleSubmit} style={{ backgroundColor: '#e94560', color: '#fff', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>{editProduct ? 'Update' : 'Add Product'}</button>
                  <button onClick={() => setShowForm(false)} style={{ backgroundColor: '#f0f0f0', border: 'none', padding: '10px 25px', borderRadius: '8px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            )}

            <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9f9f9' }}>
                    {['Name', 'Category', 'Price', 'Stock', 'Actions'].map(h => (
                      <th key={h} style={{ padding: '14px 15px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '600' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id} style={{ borderTop: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: '500' }}>{p.name}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.category}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px', color: '#e94560', fontWeight: '600' }}>₹{p.price}</td>
                      <td style={{ padding: '12px 15px', fontSize: '14px' }}>{p.stock}</td>
                      <td style={{ padding: '12px 15px', display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(p)} style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                        <button onClick={() => handleDelete(p._id)} style={{ backgroundColor: '#e94560', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders */}
        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '25px' }}>Manage Orders ({orders.length})</h2>
            {orders.length === 0 ? (
              <p style={{ color: '#999', textAlign: 'center', padding: '50px' }}>No orders yet.</p>
            ) : (
              <div style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9f9f9' }}>
                      {['Customer', 'Items', 'Total', 'Status', 'Update'].map(h => (
                        <th key={h} style={{ padding: '14px 15px', textAlign: 'left', fontSize: '13px', color: '#666', fontWeight: '600' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id} style={{ borderTop: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '12px 15px', fontSize: '14px' }}>{order.user?.name || 'Unknown'}</td>
                        <td style={{ padding: '12px 15px', fontSize: '14px' }}>{order.items?.length} item(s)</td>
                        <td style={{ padding: '12px 15px', fontSize: '14px', fontWeight: '600', color: '#e94560' }}>₹{order.totalAmount}</td>
                        <td style={{ padding: '12px 15px' }}>
                          <span style={{ backgroundColor: (statusColor[order.status] || '#999') + '20', color: statusColor[order.status] || '#999', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{order.status}</span>
                        </td>
                        <td style={{ padding: '12px 15px' }}>
                          <select value={order.status} onChange={e => updateOrderStatus(order._id, e.target.value)}
                            style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '13px', cursor: 'pointer' }}>
                            {['Processing', 'Shipped', 'Delivered', 'Cancelled'].map(s => <option key={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;