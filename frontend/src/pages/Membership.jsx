// import React, { useState } from 'react';
// import api from '../api/api';
// import Alerts from '../components/Alerts';

// export default function Membership(){
//   const [name,setName]=useState('');
//   const [email,setEmail]=useState('');
//   const [duration,setDuration]=useState('6m'); // default 6 months
//   const [membershipNumber,setMembershipNumber]=useState('');
//   const [action,setAction]=useState('new');
//   const [error,setError]=useState(null);

//   const submitAdd = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!name) return setError('Name required');
//     try {
//       const res = await api.post('/members', { name, email, duration });
//       alert('Member added: ' + res.data.membershipNumber);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed');
//     }
//   };

//   const submitUpdate = async (e) => {
//     e.preventDefault();
//     setError(null);
//     if (!membershipNumber) return setError('Membership Number required');
//     try {
//       if (action === 'cancel') {
//         await api.put('/members', { membershipNumber, action: 'cancel' });
//         alert('Membership cancelled');
//       } else {
//         await api.put('/members', { membershipNumber, action: 'extend', extendMonths: 6 });
//         alert('Membership extended by 6 months');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed');
//     }
//   };

//   return (
//     <div className="col-md-8">
//       <h4>Membership</h4>
//       <Alerts message={error} />
//       <div className="card p-3 mb-4">
//         <h5>Add Membership</h5>
//         <form onSubmit={submitAdd}>
//           <div className="mb-3"><label>Name</label><input value={name} onChange={e=>setName(e.target.value)} className="form-control" /></div>
//           <div className="mb-3"><label>Email</label><input value={email} onChange={e=>setEmail(e.target.value)} className="form-control" /></div>
//           <div className="mb-3">
//             <label>Duration</label>
//             <select className="form-select" value={duration} onChange={e=>setDuration(e.target.value)}>
//               <option value="6m">6 months</option>
//               <option value="1y">1 year</option>
//               <option value="2y">2 years</option>
//             </select>
//           </div>
//           <button className="btn btn-primary">Add Membership</button>
//         </form>
//       </div>

//       <div className="card p-3">
//         <h5>Update / Cancel Membership</h5>
//         <form onSubmit={submitUpdate}>
//           <div className="mb-3">
//             <label>Membership Number</label>
//             <input value={membershipNumber} onChange={e=>setMembershipNumber(e.target.value)} className="form-control" />
//           </div>
//           <div className="mb-3">
//             <div className="form-check form-check-inline">
//               <input className="form-check-input" type="radio" name="action" id="extend" value="extend" checked={action==='extend'} onChange={()=>setAction('extend')} />
//               <label className="form-check-label" htmlFor="extend">Extend (default 6 months)</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input className="form-check-input" type="radio" name="action" id="cancel" value="cancel" checked={action==='cancel'} onChange={()=>setAction('cancel')} />
//               <label className="form-check-label" htmlFor="cancel">Cancel</label>
//             </div>
//           </div>
//           <button className="btn btn-warning">Update Membership</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts';
import '../styles/custom.css';   // 🔥 IMPORT BG STYLE

export default function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [showPassword,setShowPassword]=useState(false);
  const [error,setError]=useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if(res.data.user.role === 'admin'){
        navigate('/'); 
      } else {
        navigate('/books');
      }

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-bg">   {/* 🔥 FULL BG IMAGE */}
      <div 
        className="card shadow-lg p-4"
        style={{
          width:"400px",
          borderRadius:"20px",
          background:"rgba(255,255,255,0.85)",   // 🔥 glassy effect
          backdropFilter:"blur(5px)"
        }}
      >
        <h3 className="text-center mb-3">Login</h3>
        <Alerts message={error} />

        <form onSubmit={submit}>
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
            <div className="input-group">
              <input 
                required 
                value={password} 
                onChange={e=>setPassword(e.target.value)}
                className="form-control"
                type={showPassword ? 'text' : 'password'}
              />
              <button 
                type="button" 
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(s => !s)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>

      </div>
    </div>
  );
}
