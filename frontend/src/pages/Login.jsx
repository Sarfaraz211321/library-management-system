// import React, { useState } from 'react';
// import api from '../api/api';
// import { useNavigate } from 'react-router-dom';
// import Alerts from '../components/Alerts';

// export default function Login(){
//   const [email,setEmail]=useState('');
//   const [password,setPassword]=useState('');
//   const [showPassword,setShowPassword]=useState(false);
//   const [error,setError]=useState(null);
//   const navigate = useNavigate();

//   const submit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const res = await api.post('/auth/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-6">
//         <h3>Login</h3>
//         <Alerts message={error} />
//         <form onSubmit={submit}>
//           <div className="mb-3">
//             <label>Email</label>
//             <input required value={email} onChange={e=>setEmail(e.target.value)} className="form-control" type="email" />
//           </div>
//           <div className="mb-3">
//             <label>Password</label>
//             <div className="input-group">
//               <input required value={password} onChange={e=>setPassword(e.target.value)} className="form-control" type={showPassword ? 'text' : 'password'} />
//               <button type="button" className="btn btn-outline-secondary" onClick={()=>setShowPassword(s=>!s)}>
//                 {showPassword ? 'Hide' : 'Show'}
//               </button>
//             </div>
//           </div>
//           <button className="btn btn-primary">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';
import Alerts from '../components/Alerts';

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

    // Redirect based on role
    if(res.data.user.role === 'admin'){
      navigate('/'); // Dashboard
    } else {
      navigate('/books'); // Search Books
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Login failed');
  }
};

  return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight:"100vh"}}>
      <div 
        className="card shadow-lg p-4"
        style={{
          width:"400px",
          borderRadius:"20px",
          background:"linear-gradient(135deg,#e3f2fd,#ffffff)"
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
                onClick={()=>setShowPassword(s=>!s)}
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
