import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookSearch from './pages/BookSearch';
import IssueBook from './pages/IssueBook';
import ReturnBook from './pages/ReturnBook';
import AddBook from './pages/AddBook';
import UpdateBook from './pages/UpdateBook';
import Membership from './pages/Membership';
import PayFine from './pages/PayFine';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/books" element={<PrivateRoute><BookSearch /></PrivateRoute>} />
          <Route path="/issue" element={<PrivateRoute><IssueBook /></PrivateRoute>} />
          <Route path="/return" element={<PrivateRoute><ReturnBook /></PrivateRoute>} />
          <Route path="/add-book" element={<PrivateRoute adminOnly><AddBook /></PrivateRoute>} />
          <Route path="/update-book/:id" element={<PrivateRoute adminOnly><UpdateBook /></PrivateRoute>} />
          <Route path="/membership" element={<PrivateRoute><Membership /></PrivateRoute>} />
          <Route path="/pay-fine/:transactionId" element={<PrivateRoute><PayFine /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
