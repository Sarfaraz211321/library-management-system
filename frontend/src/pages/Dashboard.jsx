import React from 'react';
import { Link } from 'react-router-dom';
const user = JSON.parse(localStorage.getItem('user') || 'null');

export default function Dashboard(){
  return (
    <div>
      <div className="p-4 rounded bg-light">
        <h2>Welcome, {user?.name}</h2>
        <p>Role: {user?.role}</p>
      </div>

      <div className="row mt-4">
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Search Books</h5>
            <p>Find available books.</p>
            <Link to="/books" className="btn btn-outline-primary btn-sm">Search</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Issue Book</h5>
            <p>Issue a book to a member.</p>
            <Link to="/issue" className="btn btn-outline-primary btn-sm">Issue</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Return Book</h5>
            <p>Return a book and pay fines.</p>
            <Link to="/return" className="btn btn-outline-primary btn-sm">Return</Link>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3">
            <h5>Membership</h5>
            <p>Add or update membership.</p>
            <Link to="/membership" className="btn btn-outline-primary btn-sm">Manage</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
