import React, { useState } from 'react';
import api from '../api/api';
import Alerts from '../components/Alerts';

export default function AddBook(){
  const [title,setTitle]=useState('');
  const [author,setAuthor]=useState('');
  const [serialNo,setSerialNo]=useState('');
  const [type,setType]=useState('book');
  const [error,setError]=useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!title || !author || !serialNo) return setError('All fields mandatory');
    try {
      await api.post('/books', { title, author, serialNo, type });
      alert('Book added');
      setTitle(''); setAuthor(''); setSerialNo('');
    } catch (err) {
      setError(err.response?.data?.message || 'Add failed');
    }
  };

  return (
    <div className="col-md-8">
      <h4>Add Book / Movie</h4>
      <Alerts message={error} />
      <form onSubmit={submit}>
        <div className="mb-3">
          <label>Choose</label>
          <div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="type" value="book" checked={type==='book'} onChange={()=>setType('book')} />
              <label className="form-check-label">Book</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="type" value="movie" checked={type==='movie'} onChange={()=>setType('movie')} />
              <label className="form-check-label">Movie</label>
            </div>
          </div>
        </div>
        <div className="mb-3"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} className="form-control" /></div>
        <div className="mb-3"><label>Author</label><input value={author} onChange={e=>setAuthor(e.target.value)} className="form-control" /></div>
        <div className="mb-3"><label>Serial No</label><input value={serialNo} onChange={e=>setSerialNo(e.target.value)} className="form-control" /></div>
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
}
