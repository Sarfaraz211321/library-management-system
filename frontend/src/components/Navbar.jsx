

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem('user') || 'null');

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container">
//         <Link className="navbar-brand" to="/">Librium Library</Link>
//         <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="nav">
//           {user ? (
//             <>
//               <ul className="navbar-nav me-auto">
//                 {user.role === 'admin' ? (
//                   <>
//                     <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/books">Search Books</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/issue">Issue Book</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/return">Return Book</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/membership">Membership</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/add-book">Add Book</Link></li>
//                   </>
//                 ) : (
//                   <>
//                     <li className="nav-item"><Link className="nav-link" to="/books">Search Books</Link></li>
//                     <li className="nav-item"><Link className="nav-link" to="/return">Return Book</Link></li>
//                   </>
//                 )}
//               </ul>

//               <div className="d-flex align-items-center">
//                 <span className="text-light me-3">Hi, {user.name}</span>
//                 <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
//               </div>
//             </>
//           ) : (
//             <ul className="navbar-nav ms-auto">
//               <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
//               <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
//             </ul>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
const navigate = useNavigate();
const user = JSON.parse(localStorage.getItem('user') || 'null');

const logout = () => {
localStorage.removeItem('token');
localStorage.removeItem('user');
navigate('/login');
};

return ( <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> <div className="container">
{/* Logo + Brand */} <Link className="navbar-brand d-flex align-items-center" to="/">
<img
src="/logo.jpeg"       // public folder me logo.png rakho
alt="Librium Logo"
style={{ width: '30px', height: '30px', marginRight: '8px' }}
/>
Librium Library </Link>

```
    <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="nav">
      {user ? (
        <>
          <ul className="navbar-nav me-auto">
            {user.role === 'admin' ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/books">Search Books</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/issue">Issue Book</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/return">Return Book</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/membership">Membership</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/add-book">Add Book</Link></li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link className="nav-link" to="/books">Search Books</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/return">Return Book</Link></li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            <span className="text-light me-3">Hi, {user.name}</span>
            <button className="btn btn-outline-light btn-sm" onClick={logout}>Logout</button>
          </div>
        </>
      ) : (
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
        </ul>
      )}
    </div>
  </div>
</nav>


);
}
