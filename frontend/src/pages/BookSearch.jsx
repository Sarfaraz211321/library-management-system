import React, { useState } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';
import { useNavigate } from 'react-router-dom';

export default function BookSearch(){
  const [q,setQ]=useState('');
  const [results,setResults]=useState([]);
  const [error,setError]=useState(null);
  const [selectedSerial,setSelectedSerial]=useState(null);
  const navigate = useNavigate();

  const search = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.get(`/books/search?q=${encodeURIComponent(q)}`);
      setResults(res.data);
    } catch (err) {
      setError('Search failed');
    }
  };

  const selectRow = (serial) => {
    setSelectedSerial(serial);
  };

  return (
    <div>
      <h4>Search Books</h4>
      <Alerts message={error} />
      <form className="row g-2 mb-3" onSubmit={search}>
        <div className="col-auto flex-grow-1">
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="title, author or serial" className="form-control" />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Search</button>
        </div>
      </form>

      <table className="table">
        <thead>
          <tr><th>Title</th><th>Author</th><th>Serial</th><th>Type</th><th>Available</th><th>Pick</th></tr>
        </thead>
        <tbody>
          {results.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.serialNo}</td>
              <td>{b.type}</td>
              <td>{b.available ? 'Yes' : 'No'}</td>
              <td>
                <input type="radio" name="pick" checked={selectedSerial===b.serialNo} onChange={()=>selectRow(b.serialNo)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-3">
        <button className="btn btn-success me-2" disabled={!selectedSerial} onClick={()=>navigate('/issue', { state: { serialNo: selectedSerial } })}>Issue Selected</button>
        <button className="btn btn-warning" disabled={!selectedSerial} onClick={()=>navigate('/return', { state: { serialNo: selectedSerial } })}>Return Selected</button>
      </div>
    </div>
  );
}
