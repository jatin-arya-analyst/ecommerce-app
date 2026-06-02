import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.email || !form.password) { setError('Please fill in all fields'); return; }
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/api/users/login', form);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '85vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #1a1a2e, #16213e)'
    }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: '16px',
        padding: '45px', width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Welcome Back</h2>
        <p style={{ color: '#999', textAlign: 'center', marginBottom: '30px' }}>Login to your ShopEase account</p>

        {error && <div style={{ backgroundColor: '#ffe0e0', color: '#e94560', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Email Address</label>
          <input type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="you@example.com"
            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange}
            placeholder="Enter your password"
            onKeyPress={e => e.key === 'Enter' && handleSubmit()}
            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px', backgroundColor: '#e94560',
          color: '#fff', border: 'none', borderRadius: '10px',
          fontSize: '16px', fontWeight: '600', cursor: 'pointer'
        }}>{loading ? 'Logging in...' : 'Login'}</button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#e94560', fontWeight: '600', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;