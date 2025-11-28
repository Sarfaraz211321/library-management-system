


import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts';
import '../styles/custom.css';  // 🔥 IMPORT BG STYLE

export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [role,setRole]=useState('user');
  const [error,setError]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post('/auth/register', { name, email, password, role });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Register failed');
    }
  };

  return (
    <div className="auth-bg">   {/* 🔥 FULL BG IMAGE */}
      <div 
        className="card shadow-lg p-4"
        style={{
          width:"450px",
          borderRadius:"20px",
          background:"rgba(255,255,255,0.85)",   // 🔥 glass effect
          backdropFilter:"blur(5px)"
        }}
      >
        <h3 className="text-center mb-3">Register</h3>
        <Alerts message={error} />

        <form onSubmit={submit}>
          <div className="mb-3">
            <label>Name</label>
            <input 
              required 
              value={name} 
              onChange={e=>setName(e.target.value)} 
              className="form-control" 
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input 
              required 
              value={email} 
              onChange={e=>setEmail(e.target.value)} 
              className="form-control"
              type="email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input 
              required 
              value={password} 
              onChange={e=>setPassword(e.target.value)} 
              className="form-control"
              type="password"
            />
          </div>

          <button className="btn btn-success w-100">Register</button>
        </form>

      </div>
    </div>
  );
}
