import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) { setError('Please fill in all fields'); return; }
    if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/api/users/register', {
        name: form.name, email: form.email, password: form.password
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', padding: '12px 15px', border: '1px solid #ddd',
    borderRadius: '8px', fontSize: '15px', outline: 'none', boxSizing: 'border-box'
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
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: '#999', textAlign: 'center', marginBottom: '30px' }}>Join ShopEase today</p>

        {error && <div style={{ backgroundColor: '#ffe0e0', color: '#e94560', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px' }}>{error}</div>}

        {[
          { label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe' },
          { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
          { label: 'Password', name: 'password', type: 'password', placeholder: 'Min. 6 characters' },
          { label: 'Confirm Password', name: 'confirmPassword', type: 'password', placeholder: 'Repeat your password' },
        ].map(field => (
          <div key={field.name} style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: '500', marginBottom: '8px', fontSize: '14px' }}>{field.label}</label>
            <input type={field.type} name={field.name} value={form[field.name]}
              onChange={handleChange} placeholder={field.placeholder} style={inputStyle} />
          </div>
        ))}

        <button onClick={handleSubmit} disabled={loading} style={{
          width: '100%', padding: '14px', backgroundColor: '#e94560',
          color: '#fff', border: 'none', borderRadius: '10px',
          fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '8px'
        }}>{loading ? 'Creating account...' : 'Create Account'}</button>

        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#e94560', fontWeight: '600', textDecoration: 'none' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;